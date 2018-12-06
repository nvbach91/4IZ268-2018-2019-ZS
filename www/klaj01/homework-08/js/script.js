var App = App || {}
App.client_id = 'bbf8f12db564bbc95ab5'
App.client_secret = '978698cd1686d48068f705e012d97bcc848774fc'
App.baseApiUrl = 'https://api.github.com'
App.createUser = function (user) {
  var infoboxDet = `<div class="infobox">
        <div class="infobox-name">${user.name || ''}</div>
        <div class="infobox-main">
          <div class="avatar" style="background-image: url(${
  user.avatar_url
})"></div>
          <div class="infobox-figure">
            <div class="infobox-login">Login:${user.login}</strong></div>
            <div class="infobox-company">Company:${user.company ||
              ''}</strong></div>
            <div class="infobox-location">Location:${user.location ||
              ''}</strong></div>
            <div class="infobox-bio">Bio:${user.bio || ''}</strong></div>
            <div class="infobox-email">Email:${user.email || ''}</strong></div>
            <div class="infobox-followers">Followers:${user.followers ||
              ''}</strong></div>
            <div class="infobox-created">Created:${user.created_at ||
              ''}</strong></div>
            <div class="infobox-profile"><a href="${user.html_url ||
              ''}">${user.html_url || ''}</a></div>
          </div>
        </div>
        <div class="info-odkaz"><a href="${user.html_url ||
          ''}" target="_blank">View profile</a></div>
      </div>`
  App.userProfile.html(infoboxDet)
}
