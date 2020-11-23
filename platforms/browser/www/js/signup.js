var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);
var email = document.getElementById("email_field")
var password = document.getElementById("password_field")
var confirm_password = document.getElementById("confirm_password_field")
function signUp() {
    if (email.value.length < 4) {
        alert('Please enter an email address.');
        email.focus();
        return;
    }else if (password.value.length < 8) {
        alert('Please enter a password.');
        password.focus();
        return;
    }else if (confirm_password.value.length < 8) {
        alert('Please enter a confirm password.');
        confirm_password.focus();
        return;
    }else if (confirm_password.value != password.value) {
        alert('Please enter a confirm password.');
        confirm_password.focus();
        return;
    }else{
        db.transaction(function (tx){
            tx.executeSql("INSERT INTO User (email, password) VALUES (?,?)", 
            [email.value, confirm_password.value],
            function (tx, result) {
                localStorage.setItem('email', email.value)
                alert("Create account success");
                window.location.href = "login.html";
            },
            function (tx, error) {
                console.log('ERROR:', error);
            })
        })
    }
}   

function goLogin(){
    window.location.href = "login.html";
}