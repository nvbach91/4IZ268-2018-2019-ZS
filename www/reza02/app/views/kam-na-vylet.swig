{% extends "layouts/_layout.swig" %}
{% block bodyClass %}page-places{% endblock %}
{% block pageTitle %}| Kam na výlet?{% endblock %}
{% block description %}Nevíš kam vyrazit na výlet? Chceš poznat něco nového v naší krásné Praze? Vyber si mezi tipy to pravé pro tebe!{% endblock %}

{% block main %}

  <div class="teaser" style="background-image: url(images/teaser-places.jpg);">
    <span class="teaser__title text--thin">Kam na výlet?</span>
  </div>

  <main class="main container">
    <article id="content" class="main__content">

      <section class="section">
        <h1 class="h1">Kam na výlet?</h1>

        <p class="text--perex text--large text--italic">Nevíš kam vyrazit na výlet? Chceš poznat něco nového v&nbsp;naší krásné Praze?<br>Vyber si mezi tipy to pravé pro tebe!</p>

        <div class="cards">

          <a href="/vitkov.html" class="card" title="Vítkov" style="background-image: url(images/places/vitkov/card.jpg);">
            <div class="card__bottom">
              <span class="card__label text--large text--uppercase">Vítkov</span>
            </div>
          </a>

          <a href="/metronom.html" class="card" title="Pražský metronom" style="background-image: url(images/places/metronom/card.jpg);">
            <div class="card__bottom">
              <span class="card__label text--large text--uppercase">Pražský metronom</span>
            </div>
          </a>

          <a href="/rasinovo-nabrezi.html" class="card" title="Rašínovo nábřeží" style="background-image: url(images/places/rasinovo-nabrezi/card.jpg);">
            <div class="card__bottom">
              <span class="card__label text--large text--uppercase">Rašínovo nábřeží</span>
            </div>
          </a>

        </div>

      </section>

    </article>
  </main>

{% endblock %}
