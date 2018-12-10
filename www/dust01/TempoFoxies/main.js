$(document).ready(function () {
    if ($('#registr').length > 0) {
        registrationScript('forcontact');
    }
});
function registrationScript(value) {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBRfCZklFkOBqNFqsqHF22dlZbkwfYHhe0",
        authDomain: "tempotitans-a6ee0.firebaseapp.com",
        databaseURL: "https://tempotitans-a6ee0.firebaseio.com",
        projectId: "tempotitans-a6ee0",
        storageBucket: "tempotitans-a6ee0.appspot.com",
        messagingSenderId: "69362409933"
    };
    firebase.initializeApp(config);

    var db = firebase.database().ref("users");
    $("#registr").submit(function (config) {
        $(this);
        var c = $("#fname").val(),
            d = $("#lname").val(),
            e = $("#bdate").val(),
            f = $("#tel").val(),
            g = $("#email").val(),
            z = { fname: c, lname: d, bdate: e, tel: f, email: g };
            if(c =="" || d==""||e==""||f==""||g==""){
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