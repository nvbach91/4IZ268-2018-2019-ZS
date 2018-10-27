{% extends "layouts/_layout.swig" %}
{% block bodyClass %}homepage{% endblock %}
{% block pageTitle %}{% endblock %}
{% block description %}Description{% endblock %}

{% block main %}

  <div class="teaser">
    <span class="teaser__title">Srdce Evropy</span>
    <span class="teaser__subtitle">Naše krásná Praha</span>

    <!-- Scroll To Content -->
    <button class="teaser__chevron scrollTo" href="#content">
      <img src="./images/icons/chevron.svg" alt="">
    </button>
  </div>

  <article id="content" class="main__content container">
    <!-- HP sections -->
    <section class="section">
      <h1 class="h1">Praha</h1>
      
    </section>

  </article>

{% endblock %}
