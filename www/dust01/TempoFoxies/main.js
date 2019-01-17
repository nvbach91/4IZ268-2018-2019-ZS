
    var config = {
        apiKey: "AIzaSyBRfCZklFkOBqNFqsqHF22dlZbkwfYHhe0",
        authDomain: "tempotitans-a6ee0.firebaseapp.com",
        databaseURL: "https://tempotitans-a6ee0.firebaseio.com",
        projectId: "tempotitans-a6ee0",
        storageBucket: "tempotitans-a6ee0.appspot.com",
        messagingSenderId: "69362409933"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function(user) {
        console.log(user);
        if (user) {
            // User is signed in.
            //navigace
            document.getElementById("signout-btn-nav").style.display = "initial";
    
            //formulare
            document.getElementById("user_div").style.display = "flex";
            document.getElementById("signin_div").style.display = "none";
            document.getElementById("signup_div").style.display = "none";
    
            document.getElementById("welcome-h3").innerText = "Vítej! " + user.displayName;
            document.getElementById("info-pLog").innerText = "Narozen " + user.displayBirthday + "Post " + user.displayPost;
        } else {
            // No user is signed in.
            //navigace
            document.getElementById("signout-btn-nav").style.display = "none";
    
            //formulare
            document.getElementById("user_div").style.display = "none";
            document.getElementById("signin_div").style.display = "flex";
            document.getElementById("signup_div").style.display = "flex";
        }
    });
    
    function signUp(){
        let userEmail = document.getElementById("sign_up_email_field").value;
        let userPassword = document.getElementById("sign_up_password_field").value;
        let userName = document.getElementById("sign_up_name_field").value;
        let userBirth = document.getElementById("sign_up_birth_field").value;
        let userPost = document.getElementById("sign_up_post_field").value;
      //  let userPhoto = document.getElementById("sign_up_photo_field").value;
    
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
            let errorMessage = error.message;
            window.alert("Error: " + errorMessage);
        });
    
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                user.updateProfile({
                    displayName: userName,
                    displayBirthday: userBirth,
                    displayPost: userPost,
                //  photoURL: userPhoto,
                }).then(function() {
                    console.log("Uspech!");
                }).catch(function(error) {
                    console.log("Error: " + error.message);
                });
                console.log(user);
            }
        });
    }
    
    
    function signIn() {
        let userEmail = document.getElementById("sign_in_email_field").value;
        let userPassword = document.getElementById("sign_in_password_field").value;
    
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
            let errorMessage = error.message;
            window.alert("Error: " + errorMessage);
        });
    }
    
    function signOut() {
        firebase.auth().signOut().then(function() {  
           window.alert("Úspěšně jste se odhlásili!");
           document.getElementById("sign_in_email_field").value="";
           document.getElementById("sign_in_password_field").value="";
           document.getElementById("sign_up_email_field").value="";
           document.getElementById("sign_up_password_field").value="";
           document.getElementById("sign_up_name_field").value="";
            }).catch(function(error) {
            window.alert("Něco se nepovedlo: " + error.message);
        });
    }

    //registrace nh
    
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

    $("#registr").submit(function (config) {
        $(this);
        var c = firstName.val(),
            d = lastName.val(),
            e = birthDate.val(),
            f = tel.val(),
            g = email.val(),
            z = { fname: c, lname: d, bdate: e, tel: f, email: g };
            if(!c || !d|| !e|| !f|| !g){
                alert("Nevyplněny údaje, prosím vyplňte všechny informace")
                return false;
            }else{
        return db.push(z).then(function (config) {
            alert("Registrace proběhla úspěšně")
            $(".sucess").css("display", "block"),
                $(".sucess-none").css("display", "none")
                c = firstName.val("")
                d = lastName.val(""),
                e = birthDate.val(""),
                f = tel.val(""),
                g = email.val(""),
                z = { fname: c, lname: d, bdate: e, tel: f, email: g };

        }), !1
    }})
}