var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);
document.addEventListener("deviceready", onDeviceReady, false);

var email = document.getElementById("email_field")
var password = document.getElementById("password_field")

function onDeviceReady() {
    receive_data()
}


function receive_data() {
    let email = localStorage.getItem('email')
    if (email != null) {
        console.log(email)
        document.getElementById("email_field").value = email;
    } else {
        console.log('Not have data')
    }
}


function login() {
    if (email.value.length < 4) {
        alert('please enter Email');
        email.focus();
        return;
    } else if (password.value.length < 8) {
        alert('please enter password');
        password.focus();
        return;
    }else{
        db.transaction(function (tx) {
            tx.executeSql(`SELECT * FROM User WHERE email='${email.value}' AND password='${password.value}'` , [], function (tx, result) {
                if (result.rows.length == 1) {
                    localStorage.setItem('user', JSON.stringify(result.rows[0]))
                    window.location.href = "home.html";
                } else {
                    alert('Username or password invalid, please check again!');
                    username.value = "";
                    password.value = "";
                    email.focus();
                }
            }, function (tx, error) {
                console.log('ERROR:', error);
            });
        });
    }
}

function goToHome() {
    window.location.href = "home.html";
}

function goToSignUp() {
    window.location.href = "signup.html";
}