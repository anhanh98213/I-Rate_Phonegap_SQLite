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
                <div class="card mt-2" style="width:90%;">
                    <div class="card-header text-center">
                        <h5 class="card-title">`+ note.RestaurantName + ` </h5>
                        <h6 class="card-subtitle mb-2 text-muted"> (`+ note.RestaurantType + `)</h6>
                    </div>
                    <div class="card-body">
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
                <div class="card mt-2" style="width:90%;">
                    <div class="card-header text-center">
                        <h5 class="card-title">`+ note.RestaurantName + ` </h5>
                        <h6 class="card-subtitle mb-2 text-muted"> (`+ note.RestaurantType + `)</h6>
                    </div>
                    <div class="card-body">
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

var fast_food = false;
var seafood = false;
var grill = false;
var all = false;

function setFalse(){
    fast_food = false;
    seafood = false;
    grill = false;
    all = false;
}
function setElse(){
    setFalse();
    unChooseType();
    fetchData();
}

function searchType(idFocus) {
    switch (idFocus) {
        case "Fast_food":
            if(fast_food == false){
                setFalse();
                fast_food = true;
                chooseType(idFocus);
                searchRestaurantType(idFocus);
            }else setElse();
            break;
        case "Seafood":
            if(seafood == false){
                setFalse();
                seafood = true;
                chooseType(idFocus);
                searchRestaurantType(idFocus);
            }else setElse();
            break;
        case "Grill":
            if(grill == false){
                setFalse();
                grill = true;
                chooseType(idFocus);
                searchRestaurantType(idFocus);
            }else setElse();
            break;
        case "All":
            if(all == false){
                setFalse();
                all = true;
                chooseType(idFocus)
                fetchData();
            }else setElse();
            break;
    }
}

function chooseType(idFocus){
    var array = ["Fast_food", "Seafood", "Grill", "All"]
    // var RestaurantType = document.getElementById(idFocus).innerHTML
    array.forEach(id => {
        if (id == idFocus) {
            document.getElementById(id).classList.remove("bg-white");
            document.getElementById(id).classList.remove("text-dark");
            document.getElementById(id).classList.add("bg-info");
            document.getElementById(id).classList.add("text-white");

        } else {
            document.getElementById(id).classList.remove("bg-info");
            document.getElementById(id).classList.remove("text-white");
            document.getElementById(id).classList.add("bg-white");
            document.getElementById(id).classList.add("text-dark");
        }
    })
}
function unChooseType(){
    var array = ["Fast_food", "Seafood", "Grill", "All"]
    array.forEach(id => {
            document.getElementById(id).classList.remove("bg-info");
            document.getElementById(id).classList.remove("text-white");
            document.getElementById(id).classList.add("bg-white");
            document.getElementById(id).classList.add("text-dark");
        
    })
}

function searchRestaurantType(RestaurantType) {
    db.transaction(function (tx) {
        tx.executeSql(`SELECT * FROM iRate WHERE RestaurantType LIKE '%${RestaurantType}%'`, [], function (tx, result) {
            var len = result.rows.length;
            var contentInner = ''
            for (var i = 0; i < len; i++) {
                var note = result.rows.item(i)
                contentInner += ` 
                <div class="card mt-2" style="width:90%;">
                <div class="card-header text-center">
                    <h5 class="card-title">`+ note.RestaurantName + ` </h5>
                    <h6 class="card-subtitle mb-2 text-muted"> (`+ note.RestaurantType + `)</h6>
                </div>
                <div class="card-body">
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