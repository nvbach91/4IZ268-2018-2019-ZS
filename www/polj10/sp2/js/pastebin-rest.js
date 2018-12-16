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
};

//HELPERS
function loadUserDefaults(defaultSyntaxCode, defaultExpirationCode, defaultVisibilityCode) {
    const syntaxSelectElement = document.getElementById("syntaxSelect");
    const expirationSelectElement = document.getElementById("expirationSelect");
    const visibilitySelectElement = document.getElementById("visibilitySelect");

    const defaultSyntaxIndex = globals.api_paste_code.indexOf(defaultSyntaxCode);
    const defaultExpirationIndex = globals.expire_paste_code.indexOf(defaultExpirationCode);
    const defaultVisibilityIndex = globals.visibility_paste_code.indexOf(defaultVisibilityCode);

    if (defaultSyntaxIndex !== -1){
        syntaxSelectElement.selectedIndex = defaultSyntaxIndex;
    } else {
        syntaxSelectElement.selectedIndex = 148;
    }

    if (defaultExpirationIndex !== -1) {
        expirationSelectElement.selectedIndex = defaultExpirationIndex;
    }

    if (defaultVisibilityIndex !== -1) {
        visibilitySelectElement.selectedIndex = defaultVisibilityIndex;
    }
}
function hasUserApiKey() {
    const apiUserKey = localStorage.getItem(globals.api_user_key_local_storage);
    if(apiUserKey == null){
        return false;
    }
    return true;
}
function showLoggedUserUi(userName, avatarUrl, userAccountType) {
    const loginFormElement = document.getElementById("loginForm");
    const logoutButtonElement = document.getElementById("logoutButton");
    const userNameElement = document.getElementById("userName");
    const userAvatarImgElement = document.getElementById("userAvatar");

    if(!loginFormElement.classList.contains("hidden")){
        loginFormElement.classList.add("hidden");
    }

    if(logoutButtonElement.classList.contains("hidden")){
        logoutButtonElement.classList.remove("hidden");
    }

    if(userNameElement.classList.contains("hidden")){
        userNameElement.innerText = userName;
        userNameElement.classList.remove("hidden");
    }

    if(userAvatarImgElement.classList.contains("hidden")){
        userAvatarImgElement.setAttribute("src", avatarUrl);
        userAvatarImgElement.classList.remove("hidden");
    }

    if(userAccountType === "0"){
        const visibilitySelect = document.getElementById("visibilitySelect");
        visibilitySelect.lastElementChild.disabled = true;
        document.getElementById("proBadge").classList.add("hidden");
    }
}
function showAnonymousUserId() {
    const loginFormElement = document.getElementById("loginForm");
    const logoutButtonElement = document.getElementById("logoutButton");
    const userNameElement = document.getElementById("userName");
    const userAvatarImgElement = document.getElementById("userAvatar");

    if(loginFormElement.classList.contains("hidden")){
        loginFormElement.classList.remove("hidden");
    }

    if(!logoutButtonElement.classList.contains("hidden")){
        logoutButtonElement.classList.add("hidden");
    }

    if(!userNameElement.classList.contains("hidden")){
        userNameElement.classList.add("hidden");
    }

    if(!userAvatarImgElement.classList.contains("hidden")){
        userAvatarImgElement.classList.add("hidden");
    }

    const syntaxSelect = document.getElementById("syntaxSelect");
    const expirationSelect = document.getElementById("expirationSelect");
    const visibilitySelect = document.getElementById("visibilitySelect");

    syntaxSelect.selectedIndex = 148;
    expirationSelect.selectedIndex = 0;
    visibilitySelect.selectedIndex = 0;

    visibilitySelect.lastElementChild.disabled = true;
}
function closeStatusPanel() {
    const statusBox = document.getElementById("statusBox");
    statusBox.className = "";
    statusBox.classList.add("hidden");
}
function showStatusPanel(color, message) {
    const statusBox = document.getElementById("statusBox");
    const statusLinkWrap = document.getElementById("statusLinkWrap");
    statusLinkWrap.innerText = message;
    statusBox.className = "";
    statusBox.classList.add(color);
}
function assignEventListeners() {
    document.getElementById("loginButton").onclick = login;
    document.getElementById("logoutButton").onclick = logout;
    document.getElementById("createNewPasteButton").onclick = createNewPaste;
    document.getElementById("closeStatusButton").onclick = closeStatusPanel;
}
function init() {
    assignEventListeners();

    const syntaxSelect = document.getElementById("syntaxSelect");
    for(let i = 0; i < globals.api_paste_code_names.length; i++)
    {
        const opt = document.createElement("option");
        opt.value= i.toString();
        opt.innerHTML = globals.api_paste_code_names[i];
        syntaxSelect.appendChild(opt);
    }
    syntaxSelect.selectedIndex = 148;

    const expirationSelect = document.getElementById("expirationSelect");
    for(let i = 0; i < globals.expire_paste_code_names.length; i++)
    {
        const opt = document.createElement("option");
        opt.value= i.toString();
        opt.innerHTML = globals.expire_paste_code_names[i];
        expirationSelect.appendChild(opt);
    }
    expirationSelect.selectedIndex = 0;

    const visibilitySelect = document.getElementById("visibilitySelect");
    for(let i = 0; i < globals.visibility_paste_code_names.length; i++)
    {
        const opt = document.createElement("option");
        opt.value= i.toString();
        opt.innerHTML = globals.visibility_paste_code_names[i];
        visibilitySelect.appendChild(opt);
    }
    visibilitySelect.selectedIndex = 0;

    if(hasUserApiKey()){
        getUserInfo();
    } else {
        showAnonymousUserId();
    }
}

//LOGIN
function login() {
    const userName = document.getElementById("loginName").value;
    const password = document.getElementById("loginPassword").value;

    createApiUserKey(userName, password);
    closeStatusPanel();
}
function logout() {
    const localStorage = window.localStorage;
    localStorage.removeItem("api_user_key");
    showAnonymousUserId();
}

function createPasteElement(paste_key, paste_date, paste_title, paste_expire_date, paste_private, paste_format_long, paste_url) {
    const pasteElement = document.createElement("li");
    pasteElement.classList.add("pasteListElement");

    const linkElement = document.createElement("a");
    const dateElement = document.createElement("span");
    const titleElement = document.createElement("span");
    const expireElement = document.createElement("span");
    const privateElement = document.createElement("em");
    const formatElement = document.createElement("format");
    const clearElement = document.createElement("div");
    const clearElement2 = document.createElement("div");
    const deleteButton = document.createElement("button");

    linkElement.innerText = paste_url;
    linkElement.href = paste_url;
    linkElement.target = "_blank";


    titleElement.classList.add("pasteListName");
    expireElement.classList.add("pasteListDate");
    dateElement.classList.add("pasteListDate");
    clearElement.classList.add("clear");
    clearElement2.classList.add("clear");
    deleteButton.classList.add("deletePaste");
    deleteButton.innerText = "Odstranit";
    deleteButton.onclick = function () {
        deletePaste(paste_key);
        listUserPastes();
    };

    dateElement.innerText = "Vytvořeno" +new Date(paste_date * 1000).toLocaleString("cs-CZ");


    titleElement.innerText = paste_title;
    expireElement.innerText = "Expirace: " + new Date(paste_expire_date * 1000).toLocaleString("cs-CZ");
    privateElement.innerText = " (" + globals.visibility_paste_code_names[paste_private] + ")";
    formatElement.innerText = " - " + paste_format_long;

    pasteElement.appendChild(titleElement);
    pasteElement.appendChild(formatElement);
    pasteElement.appendChild(privateElement);


    pasteElement.appendChild(dateElement);
    pasteElement.appendChild(clearElement);

    pasteElement.appendChild(linkElement);

    pasteElement.appendChild(expireElement);
    pasteElement.appendChild(clearElement2);
    pasteElement.appendChild(deleteButton);

    return pasteElement;
}

//API FUNCTIONS
function listUserPastes() {
    const apiUserKey = localStorage.getItem("api_user_key");
    const data = new URLSearchParams();
    data.append("api_dev_key", globals.api_dev_key);
    data.append("api_user_key", apiUserKey);
    data.append("api_option", globals.api_option_list);
    document.getElementById("userPastes").classList.remove("hidden");

    postData(globals.create_paste_url, data,
        function (responseText) {
            if (responseText === "No pastes found."){
                document.getElementById("userPastes").classList.add("hidden");
                return;
            }

            if (responseText.includes("Bad API request")){
                showStatusPanel("crimson", "Nepodařilo se načíst uložené texty.");
                return;
            }

            let oParser = new DOMParser();
            let oDOM = oParser.parseFromString(responseText, "application/xml");
            let pastes = oDOM.childNodes;

            const userPastesElement = document.getElementById("userPastes");
            const pasteElementList = document.createElement("ul");
            userPastesElement.appendChild(pasteElementList);

            if(pastes.length === 0){
                document.getElementById("userPastes").classList.add("hidden");
            }

            for (let i = 0; i < pastes.length; i++){
                const paste = pastes[i];
                const paste_key = paste.getElementsByTagName("paste_key")[0].innerHTML;
                const paste_date = paste.getElementsByTagName("paste_date")[0].innerHTML;
                const paste_title = paste.getElementsByTagName("paste_title")[0].innerHTML;
                const paste_expire_date = paste.getElementsByTagName("paste_expire_date")[0].innerHTML;
                const paste_private = paste.getElementsByTagName("paste_private")[0].innerHTML;
                const paste_format_long = paste.getElementsByTagName("paste_format_long")[0].innerHTML;
                const paste_url = paste.getElementsByTagName("paste_url")[0].innerHTML;

                const pasteElement = createPasteElement(paste_key, paste_date, paste_title, paste_expire_date, paste_private, paste_format_long, paste_url);

                pasteElementList.appendChild(pasteElement);
            }
        },
        function (statusText) {
            showStatusPanel("crimson", "Při komunikaci se serverem se vyskytla chyba.")
        });
}
function deletePaste(paste_key) {
    const apiUserKey = localStorage.getItem("api_user_key");
    const data = new URLSearchParams();
    data.append("api_dev_key", globals.api_dev_key);
    data.append("api_user_key", apiUserKey);
    data.append("api_paste_key", paste_key);
    data.append("api_option", "delete");

    postData(globals.create_paste_url, data,
        function (responseText) {
            if (responseText === "Paste Removed"){
                showStatusPanel("green", "Text byl úspěšně odstraněn.")
            } else {
                showStatusPanel("crimson", "Text se nepodařilo odstranit.");
            }
        },
        function (statusText) {
            showStatusPanel("crimson", "Při komunikaci se serverem se vyskytla chyba.")
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
                    showStatusPanel("crimson", "Při komunikaci se serverem se vyskytla chyba.")
                } else {
                    logout();
                    showStatusPanel("crimson", "Při komunikaci se serverem se vyskytla chyba.")
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

                loadUserDefaults(user_format_short, user_expiration, user_private);

                document.getElementById("userName").innerText = user_name;
                document.getElementById("userAvatar").setAttribute("src", user_avatar_url);

                showLoggedUserUi(user_name, user_avatar_url, user_account_type);
                listUserPastes("10");
            }
        },
        function (statusText) {
            showStatusPanel("crimson", "Při komunikaci se serverem se vyskytla chyba.");
        });
}
function createNewPaste() {
    const statusBox = document.getElementById("statusBox");
    statusBox.className = "";
    statusBox.classList.add("hidden");

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
            const statusBox = document.getElementById("statusBox");
            const statusLinkWrap = document.getElementById("statusLinkWrap");

            if(responseText.includes("https://pastebin.com")){
                const link = document.createElement("a");
                link.title = responseText;
                link.href = responseText;
                link.innerText = responseText;
                link.target = "_blank";
                statusLinkWrap.innerHTML = "";
                statusLinkWrap.appendChild(link);
                statusBox.className = "";
                statusBox.classList.add("green");

                document.getElementById("pasteName").value = "";
                document.getElementById("pasteTextArea").value = "";
                listUserPastes();
                return;
            }

            if(responseText === "Post limit, maximum pastes per 24h reached"){
                showStatusPanel("crimson", "Dosáhl/a jste maximálního počtu vložených textů za 24 hodin.");
                // statusLinkWrap.innerText = "Dosáhl/a jste maximálního počtu vložených textů za 24 hodin.";
                // statusBox.className = "";
                // statusBox.classList.add("crimson");
                return;
            }

            if (responseText.includes("maximum")){
                showStatusPanel("crimson", responseText);
                // statusLinkWrap.innerText = responseText;
                // statusBox.className = "";
                // statusBox.classList.add("crimson");
                return;
            }

            if(responseText.includes("empty")){
                showStatusPanel("crimson", "Nebyl zadán žádný text.");
                // statusLinkWrap.innerText = "Nebyl zadán žádný text.";
                // statusBox.className = "";
                // statusBox.classList.add("crimson");
                return;
            }

            if(responseText.includes("expired")){
                logout();
                showStatusPanel("crimson", "Byl/a jste automaticky odhlášen/a");
                // statusLinkWrap.innerText = "Byl/a jste automaticky odhlášen/a";
                // statusBox.classList.add("crimson");
                return;
            }

            showStatusPanel("crimson", "Při komunikaci se vyskytla chyba.");
        },
        function (statusText) {
            showStatusPanel("crimson","Při komunikaci se vyskytla chyba.");
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
                const statusBox = document.getElementById("statusBox");
                const statusLinkWrap = document.getElementById("statusLinkWrap");

                statusLinkWrap.innerText = "Špatné přihlašovací údaje.";
                statusBox.className = "";
                statusBox.classList.add("crimson");
                return;
            }

            if (responseText === "Bad API request, too many logins in 5 minutes. Blocked for 5 minutes."){
                const statusBox = document.getElementById("statusBox");
                const statusLinkWrap = document.getElementById("statusLinkWrap");

                statusLinkWrap.innerText = "Příliš mnoho pokusů o přihlášení za posledních 5 minut. Blokace na 5 minut";
                statusBox.className = "";
                statusBox.classList.add("crimson");
                return;
            }

            if(responseText.includes("Bad API request")){
                const statusBox = document.getElementById("statusBox");
                const statusLinkWrap = document.getElementById("statusLinkWrap");

                statusLinkWrap.innerText = responseText;
                statusBox.className = "";
                statusBox.classList.add("crimson");
                return;
            }

            const localStorage = window.localStorage;
            localStorage.setItem("api_user_key", responseText);
            getUserInfo();
        },
        function (statusText) {
            showStatusPanel("crimson", "Při přihlašování se vyskytla chyba.");
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

init();