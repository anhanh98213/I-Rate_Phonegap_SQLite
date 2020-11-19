var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    db.transaction(populateDB, errorCB, successCB);
    db.transaction(defaultData, errorCB, addSuccessCB);
}
function defaultData(tx) {
    var defaultData = [
        ["McDonald's", "Fast food", "15/10/2020", "50.5", "Good", "Good", "Good", "Good service quality", "Le Hong Thu"],
        ["French Grill", "Grill", "08/10/2020", "75.5","Good", "Good", "Excellent", "Delicious food", "Nguyen Thi Anh Anh"],
        ["SHELL FOOD-shellfish & sea food", "Seafood", "28/10/2020", "115.8","Good", "Okay", "Good", "Good service quality", "Trinh Van Duy"]
    ]
    var executeQuery = "INSERT INTO iRate (restaurantName, restaurantType, visitDate, avarageMealPrice, " +
        " serviceRating, cleanlinessRating, foodQualityRating, notes, reporterName) VALUES (?,?,?,?,?,?,?,?,?)";
    defaultData.forEach(element => {
        tx.executeSql(executeQuery, element)
    });
}
function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS iRate (id INTEGER PRIMARY KEY AUTOINCREMENT, restaurantName text, ' +
        ' restaurantType text, visitDate text, avarageMealPrice text, serviceRating text, ' +
        ' cleanlinessRating text, foodQualityRating text, notes text, reporterName text)')
}
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}
function addSuccessCB() {}

function successCB() {
    setTimeout(function () { window.location.href = "home.html"}, 3000)
}