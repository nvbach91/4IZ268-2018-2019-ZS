# Git The Hub

Vytvořte aplikaci, která bude umět zobrazit informace ohledně uživatelů na GitHubu. Použijte **jQuery** pro manupulaci s DOM a AJAX. 

Aplikace nejprve vyzve uživatele k **zadání** uživatelského jména **GitHub uživatele**. Po každém submitnutí pošle **GET požadavek** na **GitHub API** a v případě nalezení uživatele zobrazí jeho informace v HTML podle obrázku dole. V případě nenalezení uživatele aplikace vypíše příslušnou hlášku do HTML stránky. 

Po zobrazení základních informací aplikace pošle další **GET požadavek** na GitHub API a načte **seznam repozitářů** daného uživatele a zobrazí je na stránce pod uživatelem.

GitHub API: [https://developer.github.com/v3/](https://developer.github.com/v3/)
- Autentizace k API [https://developer.github.com/v3/#authentication](https://developer.github.com/v3/#authentication)
- Načtení uživatele [https://developer.github.com/v3/users/#get-a-single-user](https://developer.github.com/v3/users/#get-a-single-user)
- Načtení seznamu repozitářů [https://developer.github.com/v3/repos/#list-user-repositories](https://developer.github.com/v3/repos/#list-user-repositories)

FYI:
- Abyste mohli libovolně používat **GitHub API**, je potřeba si zaregistrovat tzv. **OAuth účet** na GitHubu následovně
    - Přihlašte se na GitHub a otevřete **Settings** [https://github.com/settings/](https://github.com/settings/)
    - Vyberte **Developer settings**
    - Vytvořte novou **OAuth aplikaci** dle obrázku
    - Poznamenejte si **Client ID** a **Client Secret** a uložte je do proměnných ve vašem JavaScriptu
![image](https://user-images.githubusercontent.com/20724910/49305160-c035ed00-f4ce-11e8-89a9-be86f4d95bf4.png)

```js
var App = App || {};
// příklad volání na GitHub API
App.client_id = '...';     // client_id získáte po registraci OAuth účtu
App.client_secret = '...'; // client_secret získáte po registraci OAuth účtu
App.baseApiUrl = 'https://api.github.com';
var url = App.baseApiUrl + '/users/' + searchValue + 
    '?client_id=' + App.client_id + '&client_secret=' + App.client_secret;
$.getJSON(url).done(function(user) {
    App.renderUser(user);
    App.fetchRepositories(user.login);
}).fail(function() {
    App.jUserProfile.html('<p>User not found</p>');
});
```

![image](https://user-images.githubusercontent.com/20724910/49305585-f031c000-f4cf-11e8-962c-77b231916b7e.png)


[Demo aplikace](https://fcp.vse.cz/4IZ268/2018-2019-ZS/www/nguv03/homework-08/solution/)
