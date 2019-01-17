const globals = {
  api_paste_code_names: ["4CS", "6502 ACME Cross Asse...", "6502 Kick Assembler", "6502 TASM/64TASS", "ABAP", "ActionScript", "ActionScript 3", "Ada", "AIMMS", "ALGOL 68", "Apache Log", "AppleScript", "APT Sources", "Arduino", "ARM", "ASM (NASM)", "ASP", "Asymptote", "autoconf", "Autohotkey", "AutoIt", "Avisynth", "Awk", "BASCOM AVR", "Bash", "Basic4GL", "Batch", "BibTeX", "Blitz Basic", "Blitz3D", "BlitzMax", "BNF", "BOO", "BrainFuck", "C", "C (WinAPI)", "C for Macs", "C Intermediate Language", "C#", "C++", "C++ (WinAPI)", "C++ (with Qt extensi...", "C: Loadrunner", "CAD DCL", "CAD Lisp", "Ceylon", "CFDG", "ChaiScript", "Chapel", "Clojure", "Clone C", "Clone C++", "CMake", "COBOL", "CoffeeScript", "ColdFusion", "CSS", "Cuesheet", "D", "Dart", "DCL", "DCPU-16", "DCS", "Delphi", "Delphi Prism (Oxygene)", "Diff", "DIV", "DOT", "E", "Easytrieve", "ECMAScript", "Eiffel", "Email", "EPC", "Erlang", "Euphoria", "F#", "Falcon", "Filemaker", "FO Language", "Formula One", "Fortran", "FreeBasic", "FreeSWITCH", "GAMBAS", "Game Maker", "GDB", "Genero", "Genie", "GetText", "Go", "Groovy", "GwBasic", "Haskell", "Haxe", "HicEst", "HQ9 Plus", "HTML", "HTML 5", "Icon", "IDL", "INI file", "Inno Script", "INTERCAL", "IO", "ISPF Panel Definition", "J", "Java", "Java 5", "JavaScript", "JCL", "jQuery", "JSON", "Julia", "KiXtart", "Kotlin", "Latex", "LDIF", "Liberty BASIC", "Linden Scripting", "Lisp", "LLVM", "Loco Basic", "Logtalk", "LOL Code", "Lotus Formulas", "Lotus Script", "LScript", "Lua", "M68000 Assembler", "MagikSF", "Make", "MapBasic", "Markdown", "MatLab", "mIRC", "MIX Assembler", "Modula 2", "Modula 3", "Motorola 68000 HiSof...", "MPASM", "MXML", "MySQL", "Nagios", "NetRexx", "newLISP", "Nginx", "Nim", "Žádná", "NullSoft Installer", "Oberon 2", "Objeck Programming L...", "Objective C", "OCalm Brief", "OCaml", "Octave", "Open Object Rexx", "OpenBSD PACKET FILTER", "OpenGL Shading", "Openoffice BASIC", "Oracle 11", "Oracle 8", "Oz", "ParaSail", "PARI/GP", "Pascal", "Pawn", "PCRE", "Per", "Perl", "Perl 6", "PHP", "PHP Brief", "Pic 16", "Pike", "Pixel Bender", "PL/I", "PL/SQL", "PostgreSQL", "PostScript", "POV-Ray", "PowerBuilder", "PowerShell", "ProFTPd", "Progress", "Prolog", "Properties", "ProvideX", "Puppet", "PureBasic", "PyCon", "Python", "Python for S60", "q/kdb+", "QBasic", "QML", "R", "Racket", "Rails", "RBScript", "REBOL", "REG", "Rexx", "Robots", "RPM Spec", "Ruby", "Ruby Gnuplot", "Rust", "SAS", "Scala", "Scheme", "Scilab", "SCL", "SdlBasic", "Smalltalk", "Smarty", "SPARK", "SPARQL", "SQF", "SQL", "StandardML", "StoneScript", "SuperCollider", "Swift", "SystemVerilog", "T-SQL", "TCL", "Tera Term", "thinBasic", "TypoScript", "Unicon", "UnrealScript", "UPC", "Urbi", "Vala", "VB.NET", "VBScript", "Vedit", "VeriLog", "VHDL", "VIM", "Visual Pro Log", "VisualBasic", "VisualFoxPro", "WhiteSpace", "WHOIS", "Winbatch", "XBasic", "XML", "Xorg Config", "XPP", "YAML", "Z80 Assembler", "ZXBasic"],
  api_paste_code: [ "4cs", "6502acme", "6502kickass", "6502tasm", "abap", "actionscript", "actionscript3", "ada", "aimms", "algol68", "apache", "applescript", "apt_sources", "arduino", "arm", "asm", "asp", "asymptote", "autoconf", "autohotkey", "autoit", "avisynth", "awk", "bascomavr", "bash", "basic4gl", "dos", "bibtex", "blitzbasic", "b3d", "bmx", "bnf", "boo", "bf", "c", "c_winapi", "c_mac", "cil", "csharp", "cpp", "cpp-winapi", "cpp-qt", "c_loadrunner", "caddcl", "cadlisp", "ceylon", "cfdg", "chaiscript", "chapel", "clojure", "klonec", "klonecpp", "cmake", "cobol", "coffeescript", "cfm", "css", "cuesheet", "d", "dart", "dcl", "dcpu16", "dcs", "delphi", "oxygene", "diff", "div", "dot", "e", "ezt", "ecmascript", "eiffel", "email", "epc", "erlang", "euphoria", "fsharp", "falcon", "filemaker", "fo", "f1", "fortran", "freebasic", "freeswitch", "gambas", "gml", "gdb", "genero", "genie", "gettext", "go", "groovy", "gwbasic", "haskell", "haxe", "hicest", "hq9plus", "html4strict", "html5", "icon", "idl", "ini", "inno", "intercal", "io", "ispfpanel", "j", "java", "java5", "javascript", "jcl", "jquery", "json", "julia", "kixtart", "kotlin", "latex", "ldif", "lb", "lsl2", "lisp", "llvm", "locobasic", "logtalk", "lolcode", "lotusformulas", "lotusscript", "lscript", "lua", "m68k", "magiksf", "make", "mapbasic", "markdown", "matlab", "mirc", "mmix", "modula2", "modula3", "68000devpac", "mpasm", "mxml", "mysql", "nagios", "netrexx", "newlisp", "nginx", "nim", "text", "nsis", "oberon2", "objeck", "objc", "ocaml-brief", "ocaml", "octave", "oorexx", "pf", "glsl", "oobas", "oracle11", "oracle8", "oz", "parasail", "parigp", "pascal", "pawn", "pcre", "per", "perl", "perl6", "php", "php-brief", "pic16", "pike", "pixelbender", "pli", "plsql", "postgresql", "postscript", "povray", "powerbuilder", "powershell", "proftpd", "progress", "prolog", "properties", "providex", "puppet", "purebasic", "pycon", "python", "pys60", "q", "qbasic", "qml", "rsplus", "racket", "rails", "rbs", "rebol", "reg", "rexx", "robots", "rpmspec", "ruby", "gnuplot", "rust", "sas", "scala", "scheme", "scilab", "scl", "sdlbasic", "smalltalk", "smarty", "spark", "sparql", "sqf", "sql", "standardml", "stonescript", "sclang", "swift", "systemverilog", "tsql", "tcl", "teraterm", "thinbasic", "typoscript", "unicon", "uscript", "upc", "urbi", "vala", "vbnet", "vbscript", "vedit", "verilog", "vhdl", "vim", "visualprolog", "vb", "visualfoxpro", "whitespace", "whois", "winbatch", "xbasic", "xml", "xorg_conf", "xpp", "yaml", "z80", "zxbasic"],

  expire_paste_code_names: ["Nikdy", "10 minut", "1 hodina", "1 den", "1 týden", "2 týdny", "1 měsíc", "6 měsíců", "1 rok"],
  expire_paste_code: ["N", "10M", "1H", "1D", "1W", "2W", "1M", "6M", "1Y"],

  visibility_paste_code_names: ["Veřejná", "Neveřejná", "Privátní"],
  visibility_paste_code: ["0", "1", "2"],

  api_dev_key: "f6a8d98cec3041c0a4edfcc68594120b",
  paste_public: 0,
  paste_unlisted: 1,
  paste_private: 2,
  expire_never: "N",
  expire_ten_minutes: "10M",
  expire_one_hour: "1H",
  expire_one_day: "1D",
  expire_one_week: "1W",
  expire_two_weeks: "2W",
  expire_one_month: "1M",
  expire_six_months: "6M",
  expire_one_year: "1Y",
  create_paste_url: "https://pastebin.jiripolacek.net/api/Post",
  login_user_url: "https://pastebin.jiripolacek.net/api/Login",
  get_paste_url: "https://pastebin.jiripolacek.net/api/api_raw.php",
  api_option_userdetails: "userdetails",
  api_option_show_paste: "show_paste",
  api_option_list: "list",
  api_user_key_local_storage: "api_user_key",

  account_pro_value: "0",
};

//FREQUENTLY USED ELEMENTS
const navbarToggleExternalContentElement = $('#navbarToggleExternalContent');
const loginFormToggleElement = $('#loginFormToggle');
const logoutButtonElement = $('#logoutButton');
const loginButtonElement = $('#loginButton');
const userNameElement = $('#userName');
const proBadgeElement = $('#proBadge');
const userAvatarElement = $('#userAvatar');
const syntaxSelectElement = $('#syntaxSelect');
const expirationSelectElement = $('#expirationSelect');
const visibilitySelectElement = $('#visibilitySelect');
const statusBoxElement = $('#statusBox');
const userPastesElement = $('#userPastes');
const createNewPasteButtonElement = $('#createNewPasteButton');
const mainElement = $('main');

//HELPERS
/**
 * Selects default Pastebin options of logged user.
 * @param {number} defaultSyntaxCode syntax code defined in globals.api_paste_code
 * @param {number} defaultExpirationCode expiration code defined in globals.expire_paste_code
 * @param {number} defaultVisibilityCode visibility code defined in globals.visibility_paste_code
 */
function selectUsersDefaultPastebinOptions(defaultSyntaxCode, defaultExpirationCode, defaultVisibilityCode){
    let defaultSyntaxIndex = globals.api_paste_code.indexOf(defaultSyntaxCode);
    let defaultExpirationIndex = globals.expire_paste_code.indexOf(defaultExpirationCode);
    let defaultVisibilityIndex = globals.visibility_paste_code.indexOf(defaultVisibilityCode);

    if (defaultSyntaxIndex === -1){ defaultSyntaxIndex = 148; } 

    if (defaultExpirationIndex === -1) { defaultExpirationIndex = 0; }

    if (defaultVisibilityIndex !== -1) { defaultVisibilityIndex = 0; }

    selectPastebinOptions(defaultSyntaxIndex, defaultExpirationIndex, defaultVisibilityIndex);
}

/**
 * Selects given Pastebin options.
 * @param {number} syntaxIndex Index of syntax element to select.
 * @param {number} expirationIndex Index of expiration element to select.
 * @param {number} visibilityIndex Index of visibility element to select.
 */
function selectPastebinOptions(syntaxIndex, expirationIndex, visibilityIndex){
    syntaxSelectElement.val(syntaxIndex);
    expirationSelectElement.val(expirationIndex);
    visibilitySelectElement.val(visibilityIndex);
}

/**
 * Checks if userApiKey is not null.
 * @param {string} userApiKey Users Pastebin API key.
 * @return {boolean} true if userApiKey is not null; false otherwise.
 */
function userApiKeyNotNull(userApiKey){
    if(userApiKey == null){
        return false;
    }
    return true;
}

/**
 * Gets users Pastebin API key from localStorage.
 * @return {string} Users Pastebin API key if exists; null otherwise.
 */
function getUserApiKey(){
    return localStorage.getItem(globals.api_user_key_local_storage);
}

/**
 * Removes users Pastebin API key from localStorage.
 */
function removeUserApiKey(){
    localStorage.removeItem(globals.api_user_key_local_storage);
}

/**
 * 
 * @param {string} userAccountType User account type from range {"0", "1"}.
 * @return {boolean} Returns true if userAccount type is PRO; false otherwise.
 */
function isUserAccountTypePro(userAccountType){
    if(userAccountType === globals.account_pro_value){
        return true;
    }
    return false;
}

/**
 * Shows jQuery object DOM element in UI.
 * @param  {...Object} elements Elements to show.
 */
function showElements(...elements){
    $.each(elements, function(index, element){
        element.show();
    });
}

/**
 * Hides jQuery object DOM element in UI.
 * @param  {...Object} elements Elements to hide.
 */
function hideElements(...elements){
    $.each(elements, function(index, element){
        element.hide();
    });
}

/**
 * Collapses specified jQuery object DOM elements using bootstrap collapse animation.
 * @param  {...Object} elements Elements to collapse with animation.
 */
function collapseElementsAnimated(...elements){
    $.each(elements, function(index, element){
        element.collapse('hide');
    });
}

/**
 * Shows UI for logged user.
 * @param {string} userName Users username
 * @param {string} avatarUrl Url of users avatar
 * @param {string} userAccountType User account type
 */
function showLoggedUserUi(userName, avatarUrl, userAccountType) {
    collapseElementsAnimated(navbarToggleExternalContentElement); 
    hideElements(loginFormToggleElement);
    showElements(logoutButtonElement, userNameElement, userAvatarElement);

    userNameElement.text(userName);
    userAvatarElement.attr("src", avatarUrl);
    userPastesElement.addClass("remove"); //????????????????????????????????????

    if(!isUserAccountTypePro(userAccountType)){
        disableProAccount();
    }
}

/**
 * Hides Pastebin PRO account UI and disable PRO options.
 */
function disableProAccount(){
    visibilitySelectElement.children().last().attr('disabled','disabled')
    hideElements(proBadgeElement);
}

/**
 * Shows UI for anonymous user.
 */
function showAnonymousUserId() {
    showElements(loginFormToggleElement);
    hideElements(logoutButtonElement, userNameElement, userAvatarElement, userPastesElement);
    disableProAccount();
    selectPastebinOptions(148, 0, 0);
}

/**
 * Closes application notification.
 */
function closeApplicationNotification(){
    $('#statusBox').alert('close');
}

/**
 * Shows application alert notification (and closes previous one).
 * @param {string} color Bootstraps alert contextual class
 * @param {*} messageText Alert text.
 */
function showAlertApplicationNotification(color, messageText){
    closeApplicationNotification(); //Closes previous one - if exists.

    let alertElem = $('<div>', {
        id: 'statusBox',
        class: 'alert alert-dismissible fade show sm-2',
        role: 'alert'
    });
    let closeAlertButtonElem = $('<button>', {
        class: 'close',
        ["data-dismiss"]: 'alert',
        type: 'button'
    });
    closeAlertButtonElem.append($('<span>').html('&times;'))

    alertElem.text(messageText);
    alertElem.addClass(color);
    alertElem.append(closeAlertButtonElem);
    mainElement.append(alertElem);
}

/**
 * Shows application alert notification (and closes previous one).
 * @param {*} link link URL.
 */
function showLinkAlertApplicationNotification(link){
    closeApplicationNotification();
    let alertElem = $('<div>', {
        id: 'statusBox',
        class: 'alert alert-success alert-dismissible fade show',
        role: 'alert'
    });
    let linkElem = $('<a>', {
        href: link,
        target: '_blank'
    });
    linkElem.click(function(){
        closeApplicationNotification();
    });
    let closeAlertButtonElem = $('<button>', {
        class: 'close',
        ["data-dismiss"]: 'alert',
        type: 'button'
    });
    closeAlertButtonElem.append($('<span>').html('&times;'))

    linkElem.text(link);
    alertElem.append(linkElem);

    alertElem.append(closeAlertButtonElem);
    mainElement.append(alertElem);
}

/**
 * Assigns application default event listeners.
 */
function assignEventListeners() {
    loginButtonElement.click(login);
    logoutButtonElement.click(logout);
    createNewPasteButtonElement.click(createNewPaste);
}

/**
 * Initializes Pastebin options.
 */
function initPastebinOptions(){
    var pasteToAppend = $();
    $.each(globals.api_paste_code_names, function(i,e){
        pasteToAppend = pasteToAppend.add(
            $('<option>', {
                value: i.toString(),
                text: globals.api_paste_code_names[i]
            }));
    });
    syntaxSelectElement.append(pasteToAppend);
   
    var expirationToAppend = $();
    $.each(globals.expire_paste_code_names, function(i,e){
        expirationToAppend = expirationToAppend.add(
            $('<option>', {
                value: i.toString(),
                text: globals.expire_paste_code_names[i]
            }));
    });
    expirationSelectElement.append(expirationToAppend);
   
    var visibilityToAppend = $();
    $.each(globals.visibility_paste_code_names, function(i,e){
        visibilityToAppend = visibilityToAppend.add(
            $('<option>', {
                value: i.toString(),
                text: globals.visibility_paste_code_names[i]
            }));
    });
    visibilitySelectElement.append(visibilityToAppend);
}

/**
 * Initializes application.
 */
function init() {
    assignEventListeners();
    initPastebinOptions();
    selectPastebinOptions(148, 0, 0);




    $(function () {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover',
            delay: {
                show: 500,
                hide: 0
            }
        })
      })
    
    let userApiKey = getUserApiKey();
    if(userApiKeyNotNull(userApiKey)){
        getUserInfo();
    } else {
        showAnonymousUserId();
    }
}

/**
 * Login user - use this for login button.
 */
function login() {
    const userNameValue = $('#loginName').val();
    const passwordValue = $('#loginPassword').val();

    createApiUserKey(userNameValue, passwordValue);
}

/**
 * Logout user - use this for logout button.
 */
function logout() {
    removeUserApiKey();
    showAnonymousUserId();
}

/**
 * Transforms given timestamp to cs-CZ locale string.
 * @param {number} timestamp unix timestamp in UTC.
 */
function pastebinTimestampToLocaleString(timestamp){
    return new Date(timestamp * 1000).toLocaleString("cs-CZ");
}

/**
 * Creates paste element in UI.
 * @param {string} paste_key 
 * @param {string} paste_date 
 * @param {string} paste_title 
 * @param {string} paste_expire_date 
 * @param {string} paste_private 
 * @param {string} paste_format_long 
 * @param {string} paste_url 
 */
function createPasteElement(paste_key, paste_date, paste_title, paste_expire_date, paste_private, paste_format_long, paste_url) {
    
    function createPasteElementWrap(paste_key, upPart, bottomPart){
        let pasteElem = $('<div>', {
            id: paste_key,
            class: 'list-group-item mt-4'
        });

        pasteElem.append(upPart);
        pasteElem.append(bottomPart);
        return pasteElem;
    }

    function createPasteElementUpPart(left, right){
        let upPart =  $('<div>', {
            class: 'd-flex w-100 justify-content-between'
        });
        upPart.append(left);
        upPart.append(right);
    
        return upPart;
    }

    function createPasteElementDates(paste_date, paste_expire_date){
        return $('<small>').text(pastebinTimestampToLocaleString(paste_date) + " - " + pastebinTimestampToLocaleString(paste_expire_date));
    }

    function createPasteElementName(paste_title){
        return $('<h5>',{
            class: 'mb-1'
        }).text(paste_title);
    }

    function createPasteElementBottomPart(left, right){
        let bottomPart = $('<div>', {
            class: 'mt-4'
        });
        bottomPart.append(left);
        bottomPart.append(right);
    
        return bottomPart;
    }

    if(paste_title === ""){ paste_title = "[Bez názvu]" }
    
    let dates = createPasteElementDates(paste_date, paste_expire_date);
    let name = createPasteElementName(paste_title);
    let upPart = createPasteElementUpPart(dates, name); 


    let deleteButtonWrap = $('<div>', {
        class: 'float-right'
    });
    let button = $('<button>', {
        class: 'btn btn-outline-secondary',
        type: 'button'
    }).text("Odstranit").click(function(){
        deletePaste(paste_key);
    })
    deleteButtonWrap.append(button);

    let pasteLink = $('<a>',{
        class: 'mb-1 text-decoration-none',
        href: paste_url,
        target: '_blank'
    }).text(paste_url);
    

    let bottomPart = createPasteElementBottomPart(pasteLink, deleteButtonWrap); 

    return createPasteElementWrap(paste_key, upPart, bottomPart);
}

//API FUNCTIONS
//
function listUserPastes() {
    const apiUserKey = getUserApiKey();
    let data = new URLSearchParams();
    data.append("api_dev_key", globals.api_dev_key);
    data.append("api_user_key", apiUserKey);
    data.append("api_option", globals.api_option_list);
    document.getElementById("userPastes").classList.remove("collapse");

    postData(globals.create_paste_url, data,
        function (responseText) {
            if (responseText === "No pastes found."){
                document.getElementById("userPastes").classList.add("collapse");
                return;
            }

            if (responseText.includes("Bad API request")){
                showAlertApplicationNotification("alert-danger", "Nepodařilo se načíst uložené texty.");               
                return;
            }

            let oParser = new DOMParser();
            let oDOM = oParser.parseFromString("<pastes>"+responseText+"</pastes>", "application/xml");
            let pastes = oDOM.childNodes[0].childNodes;

            for (let i = 0; i < pastes.length; i += 2){
                const paste = pastes[i];
                const paste_key = paste.getElementsByTagName("paste_key")[0].innerHTML;
                const paste_date = paste.getElementsByTagName("paste_date")[0].innerHTML;
                const paste_title = paste.getElementsByTagName("paste_title")[0].innerHTML;
                const paste_expire_date = paste.getElementsByTagName("paste_expire_date")[0].innerHTML;
                const paste_private = paste.getElementsByTagName("paste_private")[0].innerHTML;
                const paste_format_long = paste.getElementsByTagName("paste_format_long")[0].innerHTML;
                const paste_url = paste.getElementsByTagName("paste_url")[0].innerHTML;
                const pasteElement = createPasteElement(paste_key, paste_date, paste_title, paste_expire_date, paste_private, paste_format_long, paste_url);

                userPastesElement.append(pasteElement);
            }
        },
        function (statusText) {
            showAlertApplicationNotification("alert-danger","Při komunikaci se serverem se vyskytla chyba.");               
        });
}
function deletePaste(paste_key) {
    const apiUserKey = getUserApiKey();   
    const data = new URLSearchParams();
    data.append("api_dev_key", globals.api_dev_key);
    data.append("api_user_key", apiUserKey);
    data.append("api_paste_key", paste_key);
    data.append("api_option", "delete");

    postData(globals.create_paste_url, data,
        function (responseText) {
            if (responseText === "Paste Removed"){
                showAlertApplicationNotification("alert-success", "Text byl úspěšně odstraněn.");    
                $('#'+paste_key).remove();   
            } else {
                showAlertApplicationNotification("alert-danger", "Text se nepodařilo odstranit.");       
            }
        },
        function (statusText) {
            showAlertApplicationNotification("alert-danger", "Při komunikaci se serverem se vyskytla chyba.");       
        });


}
function getUserInfo() {
    const apiUserKey = localStorage.getItem("api_user_key");
    const data = new URLSearchParams();
    data.append("api_dev_key", globals.api_dev_key);
    data.append("api_user_key", apiUserKey);
    data.append("api_option", globals.api_option_userdetails);

    postData(globals.create_paste_url, data,
        function (responseText) {
            if(responseText.includes("Bad API request") || responseText.includes(" ")){
                if(responseText.includes("api_user_key")){
                    logout();
                    showAlertApplicationNotification("alert-danger", "Při komunikaci se serverem se vyskytla chyba.");  
                } else {
                    logout();
                    showAlertApplicationNotification("alert-danger", "Při komunikaci se serverem se vyskytla chyba.");  
                }
            } else {
                let oParser = new DOMParser();
                let oDOM = oParser.parseFromString(responseText, "application/xml");
                let item = oDOM.childNodes[0];
                let user_name = item.getElementsByTagName("user_name")[0].innerHTML;
                let user_format_short = item.getElementsByTagName("user_format_short")[0].innerHTML;
                let user_expiration = item.getElementsByTagName("user_expiration")[0].innerHTML;
                let user_avatar_url = item.getElementsByTagName("user_avatar_url")[0].innerHTML;
                let user_private = item.getElementsByTagName("user_private")[0].innerHTML;
                let user_account_type = item.getElementsByTagName("user_account_type")[0].innerHTML;

                selectUsersDefaultPastebinOptions(user_format_short, user_expiration, user_private);

                userNameElement.innerText = user_name;
                userAvatarElement.attr("src", user_avatar_url);

                showLoggedUserUi(user_name, user_avatar_url, user_account_type);
                listUserPastes("10");
            }
        },
        function (statusText) {
            showAlertApplicationNotification("alert-danger", "Při komunikaci se serverem se vyskytla chyba.");  
        });
}
function createNewPaste() {
    const syntaxSelectElement = document.getElementById("syntaxSelect");
    const expirationSelectElement = document.getElementById("expirationSelect");
    const visibilitySelectElement = document.getElementById("visibilitySelect");

    //REQUIRED
    const api_dev_key = globals.api_dev_key;
    const api_option = "paste";
    const api_paste_code = document.getElementById("pasteTextArea").value;

    //OPTIONAL
    const api_user_key = localStorage.getItem(globals.api_user_key_local_storage);
    const api_paste_name = document.getElementById("pasteName").value;
    const api_paste_format = globals.api_paste_code[syntaxSelectElement.selectedIndex];
    const api_paste_private = globals.visibility_paste_code[visibilitySelectElement.selectedIndex];
    const api_paste_expire_date = globals.expire_paste_code[expirationSelectElement.selectedIndex];

    const data = new URLSearchParams();
    data.append("api_dev_key",api_dev_key);
    data.append("api_option",api_option);
    data.append("api_paste_code",api_paste_code);

    data.append("api_user_key",api_user_key);
    data.append("api_paste_name",api_paste_name);
    data.append("api_paste_format",api_paste_format);
    data.append("api_paste_private",api_paste_private);
    data.append("api_paste_expire_date", api_paste_expire_date);

    postData(globals.create_paste_url, data,
        function (responseText) {
            if(responseText.includes("https://pastebin.com")){
                showLinkAlertApplicationNotification(responseText);
                
                document.getElementById("pasteName").value = "";
                document.getElementById("pasteTextArea").value = "";

                const pasteElement = createPasteElement(responseText.split('/').pop(), new Date(), api_paste_name, new Date(), api_paste_private, api_paste_format, responseText);

                $('#userPastes').append(pasteElement);
                return;
            }

            if(responseText === "Post limit, maximum pastes per 24h reached"){
                showAlertApplicationNotification("alert-danger", "Dosáhl/a jste maximálního počtu vložených textů za 24 hodin.");
                return;
            }

            if (responseText.includes("maximum")){
                showAlertApplicationNotification("alert-danger", responseText);
                return;
            }

            if(responseText.includes("empty")){
                showAlertApplicationNotification("alert-danger", "Nebyl zadán žádný text.");
                return;
            }

            if(responseText.includes("expired")){
                logout();
                showAlertApplicationNotification("alert-danger", "Byl/a jste automaticky odhlášen/a.");
                return;
            }

            showAlertApplicationNotification("alert-danger", "Při komunikaci se vyskytla chyba.");
        },
        function (statusText) {
            showAlertApplicationNotification("alert-danger", "Při komunikaci se vyskytla chyba.");
        });
}
function createApiUserKey(userName, password) {
    const data = new URLSearchParams();
    data.append("api_dev_key", globals.api_dev_key);
    data.append("api_user_name", userName);
    data.append("api_user_password", password);

    postData(globals.login_user_url, data,
        function (responseText) {
            if (responseText === "Bad API request, invalid login"){
                $('#loginStatus').text('Špatné přihlašovací údaje.');
                return;
            }

            if (responseText === "Bad API request, too many logins in 5 minutes. Blocked for 5 minutes."){
                $('#loginStatus').text('Příliš mnoho pokusů o přihlášení za posledních 5 minut. Blokace na 5 minut.');
                return;
            }

            if(responseText.includes("Bad API request")){
                $('#loginStatus').text(responseText);
                return;
            }

            $('#loginStatus').text('');
            window.localStorage.setItem("api_user_key", responseText);
            getUserInfo();
        },
        function (statusText) {
            $('#loginStatus').text('Při přihlašování se vyskytla chyba.');
        });
}

//API Fetch
async function postData(url, data, resolutionCallback, rejectionCallback) {
    let res = await fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
             "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: data
    });

    if(res.ok){
        let result = await res.text();
        resolutionCallback(result);
    } else {
        rejectionCallback(res.statusText);
    }
}

$(document).ready(function() {
    init();
});