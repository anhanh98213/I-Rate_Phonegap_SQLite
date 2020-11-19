var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);

function insertData() {
    if (validation()) {
        confirmData()
    }
}

function insertFeedback(tx) {
    var ReporterName = document.getElementById("ReporterName").value
    var RestaurantName = document.getElementById("RestaurantName").value
    var RestaurantType = document.getElementById("RestaurantType").value
    var VisitDate = document.getElementById("TimeVisit").value
    var AvarageMealPrice = document.getElementById("AvarageMealPrice").value
    var ServiceRating = document.getElementById("ServiceRating").value
    var CleanlinessRating = document.getElementById("CleanlinessRating").value
    var FoodQualityRating = document.getElementById("FoodQualityRating").value
    var Notes = document.getElementById("Note").value

    var executeQuery = "INSERT INTO iRate (RestaurantName, RestaurantType, VisitDate, AvarageMealPrice, " +
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
    console.log(document.getElementById("TimeVisit").value);
    let date = format(document.getElementById("TimeVisit").value);
    if (validateString("ReporterName") == false || validateString("RestaurantName") == false || validateMoney("AvarageMealPrice") == false) {
        alert("Invalid input fields!")
        return false
    } else return true

}

function format(inputDate) {
    if (inputDate.length == 0) return ""
    var date = new Date(inputDate);
    if (!isNaN(date.getTime())) {
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
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
