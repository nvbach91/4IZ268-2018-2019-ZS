{% extends "layouts/_layout.swig" %}
{% block bodyClass %}page-about{% endblock %}
{% block pageTitle %}{% endblock %}
{% block description %}Description{% endblock %}

{% block main %}

  <div class="teaser" style="background-image: url(images/teaser-about.jpg);">
    <span class="teaser__title text--thin">O projektu</span>
  </div>

  <main class="main container">
    <article id="content" class="main__content">

      <section class="section">
        <h1 class="h1">O projektu</h1>

        <p class="text--large">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo pariatur commodi itaque velit, perspiciatis doloremque eveniet, rerum ab voluptate alias nulla quis. Porro, quisquam harum. Maiores explicabo reiciendis quaerat corporis in maxime necessitatibus animi voluptates amet minus excepturi culpa aliquam ipsam ut esse, odio autem. Nobis non eveniet et laboriosam.</p>

      </section>

    </article>

    <aside class="main__side">
    </aside>
  </main>

{% endblock %}
