var config = {
    apiKey: "AIzaSyBRfCZklFkOBqNFqsqHF22dlZbkwfYHhe0",
    authDomain: "tempotitans-a6ee0.firebaseapp.com",
    databaseURL: "https://tempotitans-a6ee0.firebaseio.com",
    projectId: "tempotitans-a6ee0",
    storageBucket: "tempotitans-a6ee0.appspot.com",
    messagingSenderId: "69362409933"
};
firebase.initializeApp(config);


var signoutBtn = document.getElementById("signout-btn-nav");
var userDiv = document.getElementById("user_div");
var signinDiv = document.getElementById("signin_div");
var signupDiv = document.getElementById("signup_div");
var loggedUser = document.getElementById("logged-user");

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log(user);
        // User is signed in.
        //navigace
        signoutBtn.style.display = "initial";

        //formulare
        userDiv.style.display = "flex";
        signinDiv.style.display = "none";
        signupDiv.style.display = "none";

        document.getElementById("welcome-h3").innerText = "Vítej! " + user.displayName;
        loggedUser.innerText = "Přihlášený uživatel: " + user.displayName;
        document.getElementById("info-pLog").innerText ="email: "+user.email +" tel:"+user.phoneNumber;
        
        

        //profile photo
        document.getElementById("profile-photo").src = user.photoURL;

        // document.getElementById("info-pLog").innerText = "Narozen " + user.displayBirthday + "Post " + user.displayPost;
    } else {
        // No user is signed in.
        //navigace
        signoutBtn.style.display = "none";

        //formulare
        userDiv.style.display = "none";
        signinDiv.style.display = "flex";
        signupDiv.style.display = "flex";
        loggedUser.innerText = "";
    }
});


var signupEmail = document.getElementById("sign_up_email_field");
var signupPass = document.getElementById("sign_up_password_field");
var signupName = document.getElementById("sign_up_name_field");
var signupPhoto = document.getElementById("sign_up_photo_field");
var signinEmail = document.getElementById("sign_in_email_field");
var signinPass = document.getElementById("sign_in_password_field");
var signupTel = document.getElementById("sign_up_tel_field");

function signUp() {

    var userEmail = signupEmail.value;
    var userPassword = signupPass.value;
    var userName = signupName.value;
    var userPhoto = signupPhoto.value;
    var userTel = signupTel.value;
    
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
        var errorMessage = error.message;
        window.alert("Error: " + errorMessage);
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.updateProfile({
                displayName: userName,
                photoURL: userPhoto,
                displayEmail: userEmail,
                phoneNumber: userTel,
            }).then(function () {
                console.log("Uspech!");
            }).catch(function (error) {
                console.log("Error: " + error.message);
            });
        }
    });
}


function signIn() {
    let userEmail = signinEmail.value;
    let userPassword = signinPass.value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
        let errorMessage = error.message;
        window.alert("Error: " + errorMessage);
        console.log(error);
    });
}

function signOut() {
    firebase.auth().signOut().then(function () {
        window.alert("Úspěšně jste se odhlásili!");
    }).catch(function (error) {
        window.alert("Něco se nepovedlo: " + error.message);
    });
    signinEmail.value = "";
    signinPass.value = "";
    signupEmail.value = "";
    signupPass.value = "";
    signupName.value = "";
    signupPhoto.value = "";
    signupTel.value= "";
}

$(document).ready(function () {
    if ($('#registr').length > 0) {
        registrationScript('forcontact');
    }
});

function registrationScript(value) {

    var db = firebase.database().ref("users");
    var firstName = $("#fname");
    var lastName = $("#lname");
    var birthDate = $("#bdate");
    var tel = $("#tel");
    var email = $("#email");
    var registerForm = $("#registr");
    registerForm.submit(function (config) {
        $(this);
        var c = firstName.val(),
            d = lastName.val(),
            e = birthDate.val(),
            f = tel.val(),
            g = email.val(),
            z = { fname: c, lname: d, bdate: e, tel: f, email: g };
        if (!c || !d || !e || !f || !g) {
            alert("Nevyplněny údaje, prosím vyplňte všechny informace")
            return false;
        } else {
            return db.push(z).then(function (config) {
                alert("Registrace proběhla úspěšně"),
                    $(".sucess").css("display", "block"),
                    $(".sucess-none").css("display", "none"),
                    c = firstName.val(""),
                    d = lastName.val(""),
                    e = birthDate.val(""),
                    f = tel.val(""),
                    g = email.val(""),
                    z = { fname: c, lname: d, bdate: e, tel: f, email: g };

            })
        }
    })
}