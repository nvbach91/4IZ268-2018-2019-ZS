{% extends "layouts/_layout.swig" %}
{% block bodyClass %}page-detail{% endblock %}
{% block pageTitle %}{% endblock %}
{% block description %}Description{% endblock %}

{% block main %}

  <div class="teaser teaser--screen" style="background-image: url(images/places/vitkov/teaser.jpg);">
    <span class="teaser__title text--thin">Vítkov</span>
    <span class="teaser__subtitle text--thin">Naše krásná Praha</span>

    <!-- Scroll To Content -->
    <button class="teaser__chevron scrollTo" href="#content">
      <img src="./images/icons/chevron.svg" alt="">
    </button>
  </div>

  <main class="main container">
    <article id="content" class="main__content">

      <section class="section">
        <h1 class="h1">Vítkov</h1>

        <p class="text--large">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis reprehenderit amet, temporibus animi, recusandae vel asperiores inventore quidem aliquam eligendi unde dignissimos earum fuga provident, voluptatibus optio dolores architecto! Sit.</p>

      </section>

    </article>
  </main>

{% endblock %}
