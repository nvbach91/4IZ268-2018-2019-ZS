var App = App || {}
App.client_id = 'bbf8f12db564bbc95ab5'
App.client_secret = '978698cd1686d48068f705e012d97bcc848774fc'
App.baseApiUrl = 'https://api.github.com'
App.renderUser = function (user) {
  var html = `
    <div class="name">${user.name || ''}</div>
    <div class="avatar" style="background-image: url(${user.avatar_url})"></div>
  <div class="info">
    <div class="info_login">
      <div id="title">Login:</div>
      <div class="subtitle" >${user.login}</div>
    </div>
    <div class="info_email">
      <div id="title">Email:</div>
      <div class="subtitle" >${user.email || ''}</div>
    </div>
    <div class="info_company">
      <div id="title">Company:</div>
      <div class="subtitle">${user.company || ''}</div>
    </div>
    <div class="info_location">
      <div id="title">Location:</div>
      <div class="subtitle">${user.location || ''}</div>
    </div>
    <div class="info_description">
      <div id="title">Description:</div>
      <div class="subtitle">${user.bio || ''}</div>
    </div>
    <div class="info_followers">
      <div id="title">Followers:</div>
      <div class="subtitle">${user.followers || ''}</div>
    </div>
    <div class="info_regday">
      <div id="title">Registered:</div>
      <div class="subtitle">${new Date(user.created_at).toLocaleDateString('cs-CZ')}</div>
    </div>
    <a class="viewprofile" href="${user.html_url || ''}">View profile</a>  
  </div>
`;
  $('#profile').html(html);
}
App.fetchRepositories = function (username) {
  var url = App.baseApiUrl + '/users/' + username + '/repos'
  var repos = $('#repos')
  repos.empty()
  repos.append($('<div class="loader"></div>'))
  $.ajax({
    url: url,
    data: {
      client_id: App.client_id,
      client_secret: App.client_secret
    }
  }).done(function (repositories) {
    $('<div class="loader"></div>').remove()
    repositories.forEach(function (repository) {
      html += `
            <li class="repository">
              <div class="repo-url"><a href="${repository.html_url}">${
        repository.html_url
        }</a></div>
            </li>
          `
    })
    $('#repos')
      .empty()
      .append(html)
  });
}
App.init = function () {
  $('#search-form').submit(function (e) {
    e.preventDefault()
    if (!$('#search-input').val()) {
      return false
    }
    var url = App.baseApiUrl + '/users/' + $('#search-input').val()
    $('#profile').empty()
    $('#profile').append($('<div class="loader"></div>'))
    $.ajax({
      url: url,
      data: {
        client_id: App.client_id,
        client_secret: App.client_secret
      }
    })
      .done(function (user) {
        App.renderUser(user)
        App.fetchRepositories(user.login)
      })
      .fail(function () {
        $('#profile').html('<p>User not found</p>')
      })
  })
};
$(document).ready(function () {
  App.init()
});
