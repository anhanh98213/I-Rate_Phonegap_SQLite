var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);

var service_Rating = 5
var cleanliness_Rating = 5
var food_Quality_Rating = 5
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    renderRating()
}
function insertData() {
    if (validation()) {
        confirmData()
    }
}
function insertFeedback(tx) {
    var ReporterName = document.getElementById("reporterName").value
    var RestaurantName = document.getElementById("restaurantName").value
    var RestaurantType = document.getElementById("restaurantType").value
    var VisitDate = document.getElementById("timeVisit").value
    var AvarageMealPrice = document.getElementById("price").value
    var ServiceRating = service_Rating
    var CleanlinessRating = cleanliness_Rating
    var FoodQualityRating = food_Quality_Rating
    var Notes = document.getElementById("note").value

    var executeQuery = "INSERT INTO iRate (RestaurantName,RestaurantType, VisitDate,AvarageMealPrice, " +
        " ServiceRating, CleanlinessRating, FoodQualityRating, Notes, ReporterName) VALUES (?,?,?,?,?,?,?,?,?)";
    tx.executeSql(executeQuery, [RestaurantName, RestaurantType, VisitDate, AvarageMealPrice,
        ServiceRating, CleanlinessRating, FoodQualityRating, Notes, ReporterName])
}
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}
function successCB() {
    window.location.href = "home.html"
}

function validation() {
    let date = format(document.getElementById("timeVisit").value)
    if (validateString("reporterName") == false || validateString("restaurantName") == false ||
        validateString("restaurantType") == false || validatedate(date) == false || validateMoney("price") == false) {
        alert("Invalid input fields!")
        return false
    } else return true
}
function validatedate(date) {
    var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
    if (date.match(dateformat)) {
        var opera = date.split('/');
        lopera1 = opera.length;
        if (lopera1 > 1) {
            var pdate = date.split('/');
        }
        var mm = parseInt(pdate[0]);
        var dd = parseInt(pdate[1]);
        var yy = parseInt(pdate[2]);
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
            if (dd > ListofDays[mm - 1]) {
                return false;
            }
        }
        if (mm == 2) {
            var lyear = false;
            if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                lyear = true;
            }
            if ((lyear == false) && (dd >= 29)) {
                return false;
            }
            if ((lyear == true) && (dd > 29)) {
                return false;
            }
        }
    }
    else {
        document.getElementById("timeVisit").classList.add("border-danger");
        return false;
    }
}
function format(inputDate) {
    if (inputDate.length == 0) return ""
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
}
function validateString(id) {
    let str = document.getElementById(id).value
    if (str.length == 0) {
        document.getElementById(id).classList.add("border-danger");
        return false;
    }
    var letters = /[A-Za-z ]/;
    if (str.match(letters)) {
        document.getElementById(id).classList.remove("border-danger");
        return true
    }
    else {
        document.getElementById(id).classList.add("border-danger");
        return false;
    }
}
function validateMoney(id) {
    var money = document.getElementById(id).value
    var moneyformat = /[0-9]./
    if (money.length == 0) {
        document.getElementById(id).classList.add("border-danger");
        return false;
    }
    if (money.match(moneyformat)) {
        document.getElementById(id).classList.remove("border-danger");
        return true
    }
    else {
        document.getElementById(id).classList.add("border-danger");
        return false;
    }
}
function confirmData() {
    var r = confirm("Do you want to sent feedback?");
    if (r == true) {
        db.transaction(insertFeedback, errorCB, successCB)
    }
}
function deleteData() {
    db.transaction(deleteSQL, errorCB, successCB);
}
function deleteSQL(tx) {
    tx.executeSql("delete from iRate")
}