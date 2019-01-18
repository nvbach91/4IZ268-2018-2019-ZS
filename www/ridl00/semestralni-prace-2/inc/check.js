
// Token použitý v dalších kódech
var token;

chrome.storage.sync.get('token', function(data){
    token = data.token;
    validateToken(token);
});

/**
 * Generuje náhodný token složený z malých písmen a čísel
 * 
 * @returns náhodný token
 */
function generateToken(){
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Zjišťuje, jestli je v chrome storage uložen token, pokud ne, vygeneruje token a zjistí,
 * jestli už tento token v systému neexistuje. (API automaticky vytvoří záznam v databázi,
 * pokud není vygenerovaný token obsazený)
 * 
 * @param token token
 */
function validateToken(token) {
    if (!token) {
        token = generateToken();

        $.ajax({
            type: 'POST', url: "http://chrome-app.vseved.eu/check/",
            headers: {"Token": token},
            dataType: 'json'
        }).done(function(data) { 
            if(data.result) {
                chrome.storage.sync.set({'token': token, 'view': 'timetable'});
            } else {
                token = null;
                validateToken(token);
            }
        });
    }
}