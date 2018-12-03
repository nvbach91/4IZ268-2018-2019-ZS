// Příklad volání na GitHub API
const client_id = '6354a2375afaa786f0d9'     // client_id získáte po registraci OAuth účtu
const client_secret = '3ec6771086fe8de2e8b270cd6ddd718a9515b645'; // client_secret získáte po registraci OAuth účtu
const baseApiUrl = 'https://api.github.com';
// sestavujeme URL, který obsahuje parametry client_id a client_secret
// každý parametr se určuje v podobě klíč=hodnota, více parametry se oddělují ampersandem, 
// na začátek přidáme otazník
// např. ?client_id=abcdef&client_secret=fedcba

/*
 * TENTOKRÁT JSEM SI OBČAS VYPOMOHL Z ŘEŠENÍ NA GH #LENOST
 */

function renderUser(user){

    Object.keys(user).forEach(function(key) {
        if(!user[key]) {user[key] = ''};
    });

    const userHTML = `
    <div class="profile">
    <div class="profile__photo">
        <img src="${user.avatar_url}" alt="" class="img">
    </div>
    <div class="profile__name">
        <h2>${user.name}</h2>
        <a href="${user.html_url}" class="button button--text">Show profile</a>
    </div>
    <div class="profile__info">

        <div class="profile__detail">
            <div class="profile__detailName">Login</div>
            <div class="profile__detailValue">${user.login}</div>
        </div>
        <div class="profile__detail">
            <div class="profile__detailName">Company</div>
            <div class="profile__detailValue">${user.company}</div>
        </div>
        <div class="profile__detail">
            <div class="profile__detailName">Location</div>
            <div class="profile__detailValue">${user.location}</div>
        </div>
        <div class="profile__detail">
            <div class="profile__detailName">Bio</div>
            <div class="profile__detailValue">${user.bio}</div>
        </div>
        <div class="profile__detail">
            <div class="profile__detailName">Email</div>
            <div class="profile__detailValue">${user.email}</div>
        </div>
        <div class="profile__detail">
            <div class="profile__detailName">Followers</div>
            <div class="profile__detailValue">${user.followers}</div>
        </div>
        <div class="profile__detail">
            <div class="profile__detailName">Registered</div>
            <div class="profile__detailValue">${new Date(user.created_at).toLocaleDateString('cs-CZ')}</div>
        </div>
    </div>

    <div class="profile__repos">
        <h3>Repos</h3>
        <div class="profile__detail">
            <div class="profile__detailName">Registered</div>
            <div class="profile__detailValue"></div>
        </div>
    </div>
</div>
    `;
    return userHTML;
}

$(document).ready(function() {
    const form = $('#js-form');
    const search = $('#js-search');
    const output = $('#js-output');

    form.submit(function(e) {
      e.preventDefault();
      const searchValue = search.val();
      if (!searchValue) {
        return false;
      }
      const url = baseApiUrl + '/users/' + searchValue + '?client_id=' + client_id + '&client_secret=' + client_secret;
      output.empty();
      $.ajax({
        url: url,
        data: {
          client_id: client_id,
          client_secret: client_secret,
        },
      }).done(function(user) {


        output.html(renderUser(user));
      }).fail(function() {
        output.html('<h2>User not found</h2>');
      });
  });
});