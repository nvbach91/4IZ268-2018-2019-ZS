{% extends "layouts/_layout.swig" %}
{% block bodyClass %}page-detail{% endblock %}
{% block pageTitle %}{% endblock %}
{% block description %}Description{% endblock %}

{% block main %}

  <div class="teaser teaser--screen" style="background-image: url(images/places/rasinovo-nabrezi/teaser.jpg);">
    <span class="teaser__title text--thin">Rašínovo nábřeží</span>
    <span class="teaser__subtitle text--thin">Naše krásná Praha</span>

    <!-- Scroll To Content -->
    <button class="teaser__chevron scrollTo" href="#content">
      <img src="./images/icons/chevron.svg" alt="">
    </button>
  </div>

  <main class="main container">
    <article id="content" class="main__content">

      <section class="section">
        <h1 class="h1">Rašínovo nábřeží</h1>

        <p class="text--perex text--large text--italic">Rašínovo nábřeží je kinetický sochařský objekt Vratislava Nováka, instalovaný roku 1991 v místě bývalého Stalinova pomníku v Praze na Letné nad Čechovým mostem.</p>

        <!-- Table -->
        <table class="table">
          <thead>
            <tr>
              <th colspan="2">Údaje o nábřeží</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Městská část</th>
              <td>Praha 2</td>
            </tr>
            <tr>
              <th>Čtvrť</th>
              <td>Nové Město, Vyšehrad</td>
            </tr>
            <tr>
              <th>Začíná na</th>
              <td>Vyšehradský tunel</td>
            </tr>
            <tr>
              <th>Končí na</th>
              <td>Jiráskův most</td>
            </tr>
          </tbody>
        </table>

        <h2 class="h2">Historie</h2>
        <p>Dnešní Rašínovo nábřeží s náplavkou vzniklo ve dvou etapách. První část od Palackého náměstí k Jiráskovu náměstí byla postavena v letech 1870-1878 souběžně s mostem Palackého. Druhá část od Palackého náměstí k vyšehradské skále byla dokončena v roce 1905 spolu s vyšehradským tunelem. Výstavbě nábřeží padlo za oběť starobylé Podskalí, svérázná osada pražských plavců a vorařů. Jejich každodenní život, svázaný s řekou Vltavou, připomíná jediná dochovaná stavba, bývalá podskalská celnice na Výtoni. Široká náplavka Rašínova nábřeží sloužila v úseku mezi Palackého a Jiráskovým mostem jako hlavní přístaviště Pražské paroplavební společnosti a výchozí bod populárních výletů do Štěchovic. Část náplavky mezi Palackého a železničním mostem původně sloužila ke kotvení a rozebírání vorů, plavených po řece do Prahy ze šumavských lesů. Poslední vory připluly do Prahy v roce 1947.</p>

        <figure>
          <img src="./images/places/rasinovo-nabrezi/img-1.jpg" alt="">
          <figcaption>Rašínovo nábřeží</figcaption>
        </figure>

        <h2 class="h2">Současnost</h2>
        <p>Rašínovo nábřeží je v současné době nejatraktivnější, nejceněnější a společensky nejživější prostor břehů řeky v centrální části Prahy. Náplavka nábřeží je definována souvislým prostorem v úseku mezi výběžkem vyšehradské skály u Výtoně a Jiráskovým mostem u Žofína. Prostor nábřeží je součástí historické struktury Nového Města s přímou vazbou na důležitá veřejná prostranství v této lokalitě. Návštěvníkům se zde naskýtá překrásný výhled na panorama Hradčan, které je tak často vyhledáváno turisty. Na náplavce Rašínova nábřeží mohou návštěvníci dlouhodobě navštívit takové aktivity, jakými jsou loď (A)VOID společně s Café (A)VOID, Bajkazyl , Party Grill Boat, loď Tyrš nebo loď Tajemství, na níž můžete shlédnout divadelní představení. Pravidelně každou sobotu, kromě výjimečných situací, se v prostoru náplavky konají oblíbené Farmářské trhy.</p>

        <figure>
          <img src="./images/places/rasinovo-nabrezi/img-2.jpg" alt="">
          <figcaption>Rašínovo nábřeží</figcaption>
        </figure>

      </section>

    </article>
  </main>

{% endblock %}
