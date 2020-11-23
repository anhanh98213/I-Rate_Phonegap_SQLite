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
                            <h5 class="card-title">`+ note.RestaurantName + ` </h5>
                            <h6 class="card-subtitle mb-3 text-muted"> (`+ note.RestaurantType + `)</h6>
                        </div>
                        <p><strong>Name of the reporter: </strong>`+ note.ReporterName + `</p>
                        <p><strong>Date and time of the visit: </strong>`+ note.VisitDate + `</p>
                        <p><strong>Average meal price per person:  </strong>$`+ note.AvarageMealPrice + `</p>
                        <p><strong>Service Rating: </strong>`+ note.ServiceRating + `</p>
                        <p><strong>Cleanliness Rating: </strong>`+ note.CleanlinessRating + `</p>
                        <p><strong>Food Quality Rating: </strong>`+ note.FoodQualityRating + `</p>
                        <p><strong>Notes: </strong>`+ note.Notes + `</p>
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

function search() {
    key = document.getElementById("search").value

    db.transaction(function (tx) {
        tx.executeSql(`SELECT * FROM iRate WHERE RestaurantName LIKE '%${key}%'`, [], function (tx, result) {
            var len = result.rows.length;
            var contentInner = ''
            for (var i = 0; i < len; i++) {
                var note = result.rows.item(i)
                contentInner += ` 
                    <div class="card mt-2" style="width: 95%;">
                        <div class="card-body">
                            <div class="text-center">
                                <h5 class="card-title">`+ note.RestaurantName + ` </h5>
                                <h6 class="card-subtitle mb-3 text-muted"> (`+ note.RestaurantType + `)</h6>
                            </div>
                            <p><strong>Name of the reporter: </strong>`+ note.ReporterName + `</p>
                            <p><strong>Date and time of the visit: </strong>`+ note.VisitDate + `</p>
                            <p><strong>Average meal price per person:  </strong>$`+ note.AvarageMealPrice + `</p>
                            <p><strong>Service Rating: </strong>`+ note.ServiceRating + `</p>
                            <p><strong>Cleanliness Rating: </strong>`+ note.CleanlinessRating + `</p>
                            <p><strong>Food Quality Rating: </strong>`+ note.FoodQualityRating + `</p>
                            <p><strong>Notes: </strong>`+ note.Notes + `</p>
                        </div>
                    </div>`
                document.getElementById("content").innerHTML = contentInner
            }
        }, function (tx, error) {
            console.log('ERROR:', error);
        });
    });


}

function searchType(idFocus) {
    var array = ["Fast_food", "Seafood", "Grill", "All"]
    var RestaurantType = document.getElementById(idFocus).innerHTML
    array.forEach(id => {
        if (id == idFocus) {
            document.getElementById(id).classList.remove("bg-white");
            document.getElementById(id).classList.remove("text-dark");
            document.getElementById(id).classList.add("bg-secondary");
            document.getElementById(id).classList.add("text-white");

        } else {
            document.getElementById(id).classList.remove("bg-secondary");
            document.getElementById(id).classList.remove("text-white");
            document.getElementById(id).classList.add("bg-white");
            document.getElementById(id).classList.add("text-dark");
        }
    })
    if (idFocus == "All") fetchData();
    else searchRestaurantType(RestaurantType)

}
function searchRestaurantType(RestaurantType) {
    db.transaction(function (tx) {
        tx.executeSql(`SELECT * FROM iRate WHERE RestaurantType LIKE '%${RestaurantType}%'`, [], function (tx, result) {
            var len = result.rows.length;
            var contentInner = ''
            for (var i = 0; i < len; i++) {
                var note = result.rows.item(i)
                contentInner += ` 
                    <div class="card mt-2" style="width: 95%;">
                        <div class="card-body">
                            <div class="text-center">
                                <h5 class="card-title">`+ note.RestaurantName + ` </h5>
                                <h6 class="card-subtitle mb-3 text-muted"> (`+ note.RestaurantType + `)</h6>
                            </div>
                            <p><strong>Name of the reporter: </strong>`+ note.ReporterName + `</p>
                            <p><strong>Date and time of the visit: </strong>`+ note.VisitDate + `</p>
                            <p><strong>Average meal price per person:  </strong>$`+ note.AvarageMealPrice + `</p>
                            <p><strong>Service Rating: </strong>`+ note.ServiceRating + `</p>
                            <p><strong>Cleanliness Rating: </strong>`+ note.CleanlinessRating + `</p>
                            <p><strong>Food Quality Rating: </strong>`+ note.FoodQualityRating + `</p>
                            <p><strong>Notes: </strong>`+ note.Notes + `</p>
                        </div>
                    </div>`
            }
            document.getElementById("content").innerHTML = contentInner
        }, function (tx, error) {
            console.log('ERROR:', error);
        });
    });
}