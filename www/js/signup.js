var db = window.openDatabase("i-Rate", "1.0", "iRate database", 1000000);



function signUp() {
    var name = document.getElementById("name_field");
    var email = document.getElementById("email_field")
    var password = document.getElementById("password_field")
    var confirm_password = document.getElementById("confirm_password_field")
    if(name.value.length < 4){
        alert('Please enter full name.');
        name.focus();
        return;
    }
    else if (email.value.length < 4) {
        alert('Please enter email.');
        email.focus();
        return;
    }else if (password.value.length < 8) {
        alert('Please enter password.');
        password.focus();
        return;
    }else if (confirm_password.value.length < 8) {
        alert('Please enter password confirm.');
        confirm_password.focus();
        return;
    }else if (confirm_password.value != password.value) {
        alert('Password confirmation does not match password');
        confirm_password.focus();
        return;
    }else{
        db.transaction(function (tx){
            tx.executeSql("INSERT INTO User (email, password, name) VALUES (?,?,?)", 
            [email.value, confirm_password.value, name.value],
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