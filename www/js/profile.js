var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);
let user = JSON.parse(localStorage.getItem('user'))

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    console.log(user)
    renderInfor()
    fetchData()
}

function renderInfor() {
    let avatar = user.name + ''
    let a = avatar.substr(avatar.lastIndexOf(" ")+1, 1)
    let inforInner = `
            <p><b>Address : </b>${user.address}</p>
            <p><b>Telephone : </b>${user.telephone}</p>
            <P><b>Email : </b>${user.username}</P>
            <P><b>Job : </b>${user.job}</P>`
    document.getElementById("infor").innerHTML = inforInner
    let header = `
        <div class="text-center" style="position: absolute; width: 100vw; top: 45vw;">
            <p style=" font-weight: bold; font-size: x-large">${user.name}</p>
        </div>
        <div class="bg-info avatar mt-2">${a}</div>
        <div class="bg-secondary" style=" position: absolute; top: 60vw; left: 5vw; height: 1px; width: 90vw;"></div>
    `
    document.getElementById("header").innerHTML = header

}

function fetchData() {
    db.transaction(function (tx) {
        tx.executeSql(`select * from iRate WHERE email='${user.email}'`, [], function (tx1, result) {
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
                            <i class="fa fa-edit" onclick="editFeedback(${note.id})" style="font-size:24px"></i>

                        </div>
                        <p><strong>Name of the reporter: </strong>`+ note.ReporterName + `</p>
                        <p><strong>Date and time of the visit: </strong>`+ note.VisitDate + `</p>
                        <p><strong>Average meal price per person:  </strong>$`+ note.AvarageMealPrice + `</p>
                        <p><strong>Service Rating: </strong>`+ note.ServiceRating +`</p>
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

function editFeedback(id) {
    localStorage.setItem('idFeedback', id)
    window.location.href = "editFeedback.html";
}
function logout(){
    window.localStorage.clear()
    window.location.href = "login.html";
}