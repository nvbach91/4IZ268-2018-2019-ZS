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

        <p class="text--perex text--large text--italic">Národní památník na Vítkově patří mezi největší dominanty Žižkova. Památník si si ve své historii prošel mnoha zajímavými situacemi. Sloužil jako památka legionářům, stal se skladištěm vojenského materiálu německého  Wehrmachtu, sloužil k propagaci komunistického režimu a v současnosti se zde nachází muzeum novodobých českých a československých dějin. Pojďme se z touto pozoruhodnou stavbou blíže seznámit.</p>

        <!-- Table -->
        <table class="table">
          <thead>
            <tr>
              <th colspan="2">Údaje o muzeu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Adresa</th>
              <td>Vítkov</td>
            </tr>
            <tr>
              <th>Založeno</th>
              <td>1929–1933</td>
            </tr>
            <tr>
              <th>Zaměření</th>
              <td>Vojenství</td>
            </tr>
            <tr>
              <th>Původní účel budovy</th>
              <td>Památník</td>
            </tr>
            <tr>
              <th>Vyhledávané exponáty</th>
              <td>Vojenská technika</td>
            </tr>
          </tbody>
        </table>

        <h2 class="h2">Stavba památníku</h2>
        <p>Stavba Národního památníku na Vítkově probíhala v letech 1929 až 1932. Dne 8. listopadu roku 1928 provedl symbolický výkop památníku prezident T. G. Masaryk. Stavba probíhala podle projektu architekta Jana Závorky. Památník byl postaven jako Památník Národního osvobození k uctění památky českých legionářů a českého odboje v období 1. světové války. Po dokončení stavby se na Vítkově tyčila stavba, dosahující výšky přes třicet metrů. Následovaly práce na interiéru budovy, které se protáhly na šest let. Na výzdobě se podíleli významní umělci, jako například Jakub Obrovský, Karel Pokorný, Max Švabinský, Jan Štursa, nebo Josef Malejovský.</p>

        <figure>
          <img src="./images/places/vitkov/img-2.jpg" alt="">
          <figcaption>Praha 3 - Národní  památník na Vítkově (pohled ze střechy)</figcaption>
        </figure>

        <h2 class="h2">K čemu památník sloužil?</h2>
        <h3 class="h3">Období před druhou světovou válkou</h3>
        <p>Památník byl postaven k uctění památky českých legionářů a českého odboje za první světové války. Tím sloužil památník jako pietní místo, kde byly pokládány věnce a uctíváni padlí hrdinové boje za národní svobodu.</p>

        <h3 class="h3">Období komunismu </h3>
        <p>Po roce 1948 byl památník využit k propagaci komunistického režimu. V budově Památníku byli následně pohřbíváni významní představitelé komunistické strany. Dne 5. prosince roku 1953 bylo v místních prostorách otevřeno mauzoleum Klementa Gottwalda, prvního komunistického prezidenta Československa. Kvůli mauzoleu bylo v podzemí památníku vybudováno rozsáhlé technické příslušenství, které však nestačilo proto, aby mumifikované tělo vydrželo. Postupně začala Gottwaldova mumie hnít a rozpadat se. Roku 1962 bylo tělo zpopelněno a mauzoleum bylo zrušeno. Dále zde byly uloženy ostatky prezidentů: Antonína Zápotockého a Ludvíka Svobody a dalších významných funkcionářů komunistické strany, které byly po roce 1989 z Památníku odstraněny.</p>

        <figure>
          <img src="./images/places/vitkov/img-1.jpg" alt="">
          <figcaption>Praha 3 - Národní  památník na Vítkově</figcaption>
        </figure>

        <h3 class="h3">Současnost </h3>
        <p>Od roku 2000 spravuje Národní památník na Vítkově Oddělení novodobých českých dějin Historického muzea Národního muzea. Od roku 2009 je zrekonstruovaný Památník plně přístupný veřejnosti. Nyní se v prostorách bývalého mauzolea nachází muzeum novodobých českých a československých dějin. Mauzoleum se změnilo v sál pro krátkodobé tematické výstavy. Dále se v zde konají koncerty a jiné divadelní akce. Na střeše památníku byla vybudována vyhlídková terasa a panoramatická kavárna, která návštěvníkům nabídne ojedinělý výhled na Prahu.</p>
        

      </section>

    </article>
  </main>

{% endblock %}
