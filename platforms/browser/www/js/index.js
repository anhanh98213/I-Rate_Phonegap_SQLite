var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    db.transaction(populateDB, errorCB, successCB);
    db.transaction(defaultData, errorCB, addSuccessCB);
}
function defaultData(tx) {
    // var defaultData = [
    //     ["McDonald's", "&#127839 Fast food", "15/10/2020", "50.5", "&#128523 Good", "&#128523 Good", "&#128523 Good", "Good service quality", "Le Hong Thu"],
    //     ["French Grill", "&#127830 Grill", "08/10/2020", "75.5","&#128523 Good", "&#128523 Good", "&#128525 Excellent", "Delicious food", "Nguyen Thi Anh Anh"],
    //     ["SHELL FOOD-shellfish & sea food", "&#127844 Seafood", "28/10/2020", "115.8","&#128523 Good", "&#128512 Okay", "&#128523 Good", "Good service quality", "Trinh Van Duy"]
    // ]
    // var executeQuery = "INSERT INTO iRate (RestaurantName, RestaurantType, VisitDate, AvarageMealPrice, " +
    //     " ServiceRating, CleanlinessRating, FoodQualityRating, Notes, ReporterName) VALUES (?,?,?,?,?,?,?,?,?)";
    // defaultData.forEach(element => {
    //     tx.executeSql(executeQuery, element)
    // });
}
function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS iRate (id INTEGER PRIMARY KEY AUTOINCREMENT, RestaurantName text, ' +
        ' RestaurantType text, VisitDate text, AvarageMealPrice text, ServiceRating text, ' +
        ' CleanlinessRating text, FoodQualityRating text, Notes text, ReporterName text)')
}

function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}

function addSuccessCB() {}

function successCB() {
    setTimeout(function () { window.location.href = "home.html"}, 3000)
}