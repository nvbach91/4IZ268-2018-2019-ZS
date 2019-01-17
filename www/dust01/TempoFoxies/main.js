
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
    
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
            let errorMessage = error.message;
            window.alert("Error: " + errorMessage);
        });
    
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                user.updateProfile({
                    displayName: userName,
                    photoURL: "..."
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
    $("#registr").submit(function (config) {
        $(this);
        var c = $("#fname").val(),
            d = $("#lname").val(),
            e = $("#bdate").val(),
            f = $("#tel").val(),
            g = $("#email").val(),
            z = { fname: c, lname: d, bdate: e, tel: f, email: g };
            if(!c || !d|| !e|| !f|| !g){
                alert("Nevyplněny údaje, prosím vyplňte všechny informace")
                return false;
            }else{
        return db.push(z).then(function (config) {
            alert("Registrace proběhla úspěšně")
            $(".sucess").css("display", "block"),
                $(".sucess-none").css("display", "none")
                c = $("#fname").val("")
                d = $("#lname").val(""),
                e = $("#bdate").val(""),
                f = $("#tel").val(""),
                g = $("#email").val(""),
                z = { fname: c, lname: d, bdate: e, tel: f, email: g };

        }), !1
    }})
}