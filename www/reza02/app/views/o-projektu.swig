{% extends "layouts/_layout.swig" %}
{% block bodyClass %}page-about{% endblock %}
{% block pageTitle %}| O projektu{% endblock %}
{% block description %}Praha je krásné historické město, naše město a srdce Evropy. Žiju zde již 6 let a stále objevuji nová místa a to je i cílem projektu. Na webu nejdete tipy na výlety a krásná místa, která se v Praze nacházejí. Dočtete se zajímavé informace a v budoucnu, v rámci druhé části projektu, bude implementovaná u každého místa mapa, která vám pomůže s navigací.{% endblock %}

{% block main %}

  <div class="teaser" style="background-image: url(images/teaser-about.jpg);">
    <span class="teaser__title text--thin">O projektu</span>
  </div>

  <main class="main container">
    <article id="content" class="main__content">

      <section class="section">
        <h1 class="h1">O projektu</h1>

        <p class="text--large">Projekt Srdce Evropy vznikl jako studentský projekt předmětu <a href="//insis.vse.cz/auth/katalog/syllabus.pl?predmet=136513" class="link" target="_blank" title="Syllabus předmětu 4IZ268 Webové technologie">4IZ268 Webové technologie</a>.</p>

        <p class="text--large">Praha je&nbsp;krásné historické město, naše město a&nbsp;srdce Evropy. Žiju zde již 6 let a&nbsp;stále objevuji nová místa a&nbsp;to&nbsp;je&nbsp;i&nbsp;cílem projektu. Na&nbsp;webu nejdete <a href="./kam-na-vylet.html" class="link" title="Kam na výlet?">tipy na&nbsp;výlety a&nbsp;krásná místa</a>, která&nbsp;se&nbsp;v&nbsp;Praze nacházejí. Dočtete se&nbsp;zajímavé informace a&nbsp;v&nbsp;budoucnu, v&nbsp;rámci druhé části projektu, bude implementovaná u&nbsp;každého místa mapa, která&nbsp;vám pomůže s&nbsp;navigací.</p>

        <p class="text--large">Doufám, že&nbsp;bude projekt prospěšný všem, co&nbsp;touží poznat <a href="./index.html" class="link" title="Praha Srdce Evropy">Srdce Evropy</a> a&nbsp;to, proč je&nbsp;turisty tak&nbsp;oblíbenou destinací.</p>
      </section>

    </article>

    <aside class="main__side">

      <div class="profil">
        <img class="profil__medailon" src="./images/medailon.jpg" alt="Adam Řezníček">
        <ul class="profil__list list list--no-style">
          <li class="list__item text--large space-m-b-10"><strong>Adam Řezníček</strong></li>
          <li class="list__item">26 let</li>
          <li class="list__item space-m-b-10">Front-end developer</li>
          <li class="list__item">
            <a href="//www.facebook.com/adam.reznicek.988" class="link" target="_blank" title="Můj facebook">
              <img class="icon icon--fb" src="./images/icons/fb.svg" alt="">
              Můj facebook
            </a>
          </li>
          <li class="list__item">
            <a href="mailto:reza02@vse.cz" class="link" title="Školní mail">
              <img class="icon icon--mail" src="./images/icons/mail.svg" alt="">
              Školní mail
            </a>
          </li>
          <li class="list__item">
            <a href="mailto:adam.reznicek1992@gmail.com" class="link" title="Osobní mail">
              <img class="icon icon--mail" src="./images/icons/mail.svg" alt="">
              Osobní mail
            </a>
          </li>
        </ul>
      </div>

    </aside>
  </main>

{% endblock %}
