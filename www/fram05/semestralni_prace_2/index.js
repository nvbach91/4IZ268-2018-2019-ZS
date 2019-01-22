var checked_chars = "";
function check_checks() {
    var capitals_checked = "";
    var small_checked = "";
    var numbers_checked = "";
    var others_checked = "";

    if (document.form.capitals.checked == false && document.form.smalls.checked == false && document.form.numbers.checked == false && document.form.others.checked == false) {
        window.alert("None of the parameters were selected. Please choose at least one to process the request!");
    } else {
        if (document.form.capitals.checked == true) {
            capitals_checked = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        } else {
            capitals_checked = "";
        }
        if (document.form.smalls.checked == true) {
            small_checked = "abcdefghijklmnopqrstuvwxyz";
        } else {
            small_checked = "";
        }
        if (document.form.numbers.checked == true) {
            numbers_checked = "123456789";
        } else {
            numbers_checked = "";
        }
        if (document.form.others.checked == true) {
            others_checked = "@/\()-*+#&";
        } else {
            others_checked = "";
        }
    }

    checked_chars = capitals_checked.concat(small_checked, numbers_checked, others_checked);


    document.getElementById("show").innerHTML = checked_chars;
}

function generate_pswd() {
    var chars = document.getElementById("show").innerHTML;
    var password = '';
    for (var i = 0; i < 15; i++) {
        var strng = Math.floor(Math.random() * chars.length);
        password += chars.substring(strng, strng + 1);
    }
    document.password_box.blank.value = password;
}


const input = document.getElementById("hash-input");
const result = document.getElementById("hash-result");

document.getElementById("hash-md5").addEventListener("click", ev => result.value = hex_md5(input.value));
document.getElementById("hash-sha256").addEventListener("click", ev => result.value = hex_sha256(input.value));
document.getElementById("hash-sha512").addEventListener("click", ev => result.value = hex_sha512(input.value));