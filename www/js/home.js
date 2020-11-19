var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    fetchData();
}
function fetchData() {
    db.transaction(function (tx) {
        tx.executeSql("select * from iRate", [], function (tx1, result) {
            var len = result.rows.length;
            var contentInner = ''
            for (var i = 0; i < len; i++) {
                var note = result.rows.item(i)
                contentInner += ` 
                <div class="card mt-2" style="width: 95%;">
                    <div class="card-body">
                        <div class="text-center">
                            <h5 class="card-title">`+ note.restaurantName + ` </h5>
                            <h6 class="card-subtitle mb-2 text-muted">`+ note.restaurantType + `</h6>
                        </div>
                        <p>Name of the reporter: `+ note.reporterName + `</p>
                        <p>Date and time of the visit: `+ note.visitDate + `</p>
                        <p>Average meal price per person: `+ note.avarageMealPrice + `</p>
                        <p>Service Rating: `+ note.serviceRating + `</p>
                        <p>Cleanliness Rating: `+ note.cleanlinessRating + `</p>
                        <p>Food Quality Rating: `+ note.foodQualityRating + `</p>
                        <p>Notes: `+ note.notes + `</p>
                    </div>
                </div>`
                document.getElementById("content").innerHTML = contentInner
            }
        }, errorCB);

    }, errorCB, successCB);
}
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}

function successCB() {
}

