        /*ukládá obsah texboxu do proměnné*/
        function saveTextareaToVar() {
            postTxt = document.querySelector('#textarea').value;
            console.log("Odesílám: " + postTxt);
        }

        /*přiřazuje html elementy k proměnným*/
        checkBoxContainer = document.querySelector("#checkBoxContainer");
        checkBoxForm = document.querySelector("#checkBoxForm");
        mainLoader = document.querySelector("#loader");