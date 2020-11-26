var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);
document.addEventListener("deviceready", onDeviceReady, false);
var user = JSON.parse(localStorage.getItem('user'));
function onDeviceReady() {
    renderInfor()
}
function renderInfor() {
    let infor = `
    <div class="row">
        <div class="col-2 row">
            <div class="align-self-center ml-2 mt-2">
                <i onclick="goBack()" class="fa fa-chevron-left" style="font-size:medium"></i>
            </div>
        </div>
        <div class="col-10 text-center">
            <p style="color: #f46169;" class="h3 pt-3">EDIT PROFILE</p>
        </div>
    </div>
    <div class="text-center">
        <img class="rounded-circle mt-3" style="width: 50%;" src="./img/user.jpg" alt="Logo">
    </div>
    <p class="text-center mt-2 mb-4" style=" font-weight: bold; font-size: x-large">${user.name}</p>
    
    <div class="row">
        <div class="col" style="background: #ffe9e9;"></div>
        <div class="col-auto text-center"><b>PROFILE</b></div>
        <div class="col" style="background: #ffe9e9;"></div>
    </div>
    <div class="mt-3">
        <div class="form-group">
            <label>Name:</label>
            <input id="name" type="text" value="${user.name}" class="form-control text-dark border py-4">
        </div>
        <div class="form-group">
            <label>Address:</label>
            <input id="address" type="text" value="${user.address}" class="form-control text-dark border py-4">
        </div>
        <div class="form-group">
            <label>Telephone:</label>
            <input id="telephone" type="text" value="${user.telephone}" class="form-control text-dark border py-4">
        </div>
        <div class="form-group">
            <label>Email:</label>
            <input id="email" type="text" value="${user.email}" class="form-control text-dark border py-4" disabled>
        </div>
        <div class="form-group">
            <label>Job:</label>
            <input id="job" type="text" value="${user.job}" class="form-control text-dark border py-4">
        </div>
    </div>
    `
    document.getElementById("infor").innerHTML = infor

}

function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}

function success() {
}

function editProfile() {
    let name = document.getElementById("name")
    let address = document.getElementById("address")
    let telephone = document.getElementById("telephone")
    let job = document.getElementById("job")
    let executeQuery = `UPDATE User SET  name = ?, address = ?, telephone = ?, job = ? where email = ?`;
    if (name.value.length == 0) {
        name.classList.add("border-danger");
        name.focus()
    } else if (address.value.length == 0) {
        address.classList.add("border-danger");
        address.focus()
    } else if (telephone.value.length == 0) {
        telephone.classList.add("border-danger");
        telephone.focus()
    } else {
        name.classList.remove("border-danger");
        address.classList.remove("border-danger");
        telephone.classList.remove("border-danger");
        console.log(user)
        var r = confirm("Want to change your account information?");
        if (r == true) {
            db.transaction(function (tx) {
                tx.executeSql(executeQuery, [name.value, address.value, telephone.value, job.value, user.email],
                    function (tx, result) {
                        alert("The account information has changed successfully");
                        localStorage.setItem('user', JSON.stringify({ address: address.value, email: user.email, id: 3, job: job.value, name: name.value, password: user.telephone, telephone: telephone.value }))
                        window.location.href = "profile.html";
                    },
                    function (tx, error) {
                        console.log('ERROR:', error);
                    })
            })
        }
    }
}

function goBack() {
    window.history.back();
}