var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);
var idFeedback = localStorage.getItem('idFeedback')
let user = JSON.parse(localStorage.getItem('user'))

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    fetchData()
}

function goBack() {
    window.history.back();
}

function fetchData() {
    db.transaction(function (tx) {
        tx.executeSql(`select * from iRate WHERE id='${idFeedback}'`, [], function (tx1, result) {
            var contentInner = ''
            var note = result.rows[0]
            console.log(note)
            contentInner = `
                <div class="form-group">
                    <strong>Name of the reporter :</strong>
                    <input id="ReporterName" type="text" class="form-control text-dark mt-2" required value="${note.ReporterName}">
                </div>

                <div class="form-group">
                    <strong>Restaurant Name:</strong>
                    <input id="RestaurantName" type="text" class="form-control text-dark mt-2" required value="${note.RestaurantName}">
                </div>
                <div class="form-group">
                    <strong for="restaurantType">Restaurant type:</strong>
                    <select class="form-control mt-2" id="RestaurantType">
                        <option>&#127839 Fast food</option>
                        <option>&#127844 Seafood</option>
                        <option>&#127830 Grill</option>
                    </select>
                </div>

                <div class="form-group">
                    <strong>Date and time of the visit:</strong>
                    <input id="TimeVisit" type="date" class="form-control text-dark mt-2" required value="${note.VisitDate.split("/").reverse().join("-")}">
                </div>

                <div class="form-group">
                    <strong>Average meal price per person:</strong>
                    <div class="input-group mt-2">
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>
                        <input id="AvarageMealPrice" type="number" class="form-control text-dark"
                            aria-label="Amount (to the nearest dollar)" required value="${note.AvarageMealPrice}">
                    </div>
                </div>

                <div class="form-group">
                    <strong for="serviceRating">Service rating:</strong>
                    <select class="form-control mt-2" id="ServiceRating">
                        <option>&#128525 Excellent</option>
                        <option>&#128523 Good</option>
                        <option>&#128512 Okay</option>
                        <option>&#128534 Need to improve</option>
                    </select>
                </div>

                <div class="form-group">
                    <strong for="cleanlinessRating">Cleanliness rating:</strong>
                    <select class="form-control mt-2" id="CleanlinessRating">
                        <option>&#128525 Excellent</option>
                        <option>&#128523 Good</option>
                        <option>&#128512 Okay</option>
                        <option>&#128534 Need to improve</option>
                    </select>
                </div>

                <div class="form-group">
                    <strong for="foodQualityRating">Food quality rating:</strong>
                    <select class="form-control mt-2" id="FoodQualityRating">
                        <option>&#128525 Excellent</option>
                        <option>&#128523 Good</option>
                        <option>&#128512 Okay</option>
                        <option>&#128534 Need to improve</option>
                    </select>
                </div>

                <div class="form-group">
                    <strong>Notes:</strong>
                    <textarea id="Note" class="form-control text-dark mt-2" rows="3" required> ${note.Notes}</textarea>
                </div>
`
            document.getElementById("content").innerHTML = contentInner
        }, errorCB);

    }, errorCB, successCB);
}
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}
function successCB() {
}

function validation() {
    if (validateString("ReporterName") == false || validateString("RestaurantName") == false ||
        validateString("RestaurantType") == false || validateMoney("AvarageMealPrice") == false || validateTime("TimeVisit")) {
        alert("Invalid input fields!")
        return false
    } else return true
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
function validateTime(id) {
    var time = document.getElementById(id).value
    if (time.length == 0) {
        document.getElementById(id).classList.add("border-danger");
        return false;
    }
}
function editFeedback() {
    var CustomerName = document.getElementById("ReporterName").value
    var RestaurantName = document.getElementById("RestaurantName").value
    var RestaurantType = document.getElementById("RestaurantType").value
    var VisitDate = document.getElementById("TimeVisit").value
    var MealPrice = document.getElementById("AvarageMealPrice").value
    var ServiceStatus = document.getElementById("ServiceRating").value
    var CleanlinessStatus = document.getElementById("CleanlinessRating").value
    var FoodQualityStatus = document.getElementById("FoodQualityRating").value
    var Notes = document.getElementById("Note").value

    var executeQuery = `UPDATE iRate SET ReporterName = ?, RestaurantName = ?, RestaurantType = ?, VisitDate = ?, AvarageMealPrice = ?, 
    ServiceRating = ?, CleanlinessRating = ?, FoodQualityRating = ?, Notes = ?, Email = ? where id=?`;
    if (validation()) {
        var r = confirm("Would you like to modify this feedback?");
        if (r == true) {
            db.transaction(function (tx) {
                tx.executeSql(executeQuery, [CustomerName, RestaurantName, RestaurantType, VisitDate,
                    MealPrice, ServiceStatus, CleanlinessStatus, FoodQualityStatus, Notes, user.email, idFeedback],
                    function (tx, result) {
                        alert("The response has been successfully edited");
                        window.location.href = "profile.html";
                    },
                    function (tx, error) {
                        console.log('ERROR:', error);
                    })
            })
        }
    }

}

function deleteFeedback() {
    if (validation()) {
        var r = confirm("Do you want to delete this feedback?");
        if (r == true) {
            db.transaction(function (tx) {
                tx.executeSql(`DELETE FROM iRate WHERE id='${idFeedback}'`, [],
                    function (tx, result) {
                        alert("The response has been successfully deleted");
                        window.location.href = "profile.html";
                    },
                    function (tx, error) {
                        console.log('ERROR:', error);
                    })
            })
        }
    }

}