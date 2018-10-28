{% extends "layouts/_layout.swig" %}
{% block bodyClass %}page-detail{% endblock %}
{% block pageTitle %}{% endblock %}
{% block description %}Description{% endblock %}

{% block main %}

  <div class="teaser teaser--screen" style="background-image: url(images/places/metronom/teaser.jpg);">
    <span class="teaser__title text--thin">Pražský metronom</span>
    <span class="teaser__subtitle text--thin">Naše krásná Praha</span>

    <!-- Scroll To Content -->
    <button class="teaser__chevron scrollTo" href="#content">
      <img src="./images/icons/chevron.svg" alt="">
    </button>
  </div>

  <main class="main container">
    <article id="content" class="main__content">

      <section class="section">
        <h1 class="h1">Pražský metronom</h1>

        <p class="text--perex text--large text--italic">Pražský metronom je kinetický sochařský objekt Vratislava Nováka, instalovaný roku 1991 v místě bývalého Stalinova pomníku v Praze na Letné nad Čechovým mostem.</p>

        <!-- Table -->
        <table class="table">
          <thead>
            <tr>
              <th colspan="2">Údaje o pomníku</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Autor</th>
              <td>Vratislav Karel Novák</td>
            </tr>
            <tr>
              <th>Rok vzniku</th>
              <td>1991</td>
            </tr>
            <tr>
              <th>Umístění</th>
              <td>Letná</td>
            </tr>
          </tbody>
        </table>

        <h2 class="h2">Historie</h2>
        <p>Autorem je sochař a profesor Vysoké školy uměleckoprůmyslové Vratislav Karel Novák (1942–2014), který se kinetickým uměním zabýval od roku 1968. Během pobytu na Miami University v Ohio v letech 2001 až 2002 vytvořil spolu s americkou umělkyní Suzan Rae Ewingovou 27 m vysoký kinetický objekt Krystalová věž, představující symbol svobody, který zvítězil v mezinárodní soutěži v Cincinnati.</p>

        <p>V roce 2003 byl využit k propagaci referenda o přistoupení České republiky k Evropské unii, kdy se jeho kyvadlo pohybovalo mezi slovy ANO a NE. Roku 2009 zase symbolicky odměřoval čas předsednictví České republiky Evropské unii.</p>

        <p>Pražský metronom bohužel čím dál častěji postihují poruchy, takže bývá někdy i dlouhé týdny mimo provoz. Poslední velká rekonstrukce proběhla v roce 2015.</p>

        <figure>
          <img src="./images/places/metronom/img-1.jpg" alt="">
          <figcaption>Červená „ručička" metronomu</figcaption>
        </figure>

        <p>K 1. dubnu 2016 se metronom vrátil na své místo, avšak společnost PSN jej v rámci rekonstrukce opatřila novým zeleným nátěrem, což bylo kritizováno veřejností a umělci jako pozměňování díla k reklamním účelům. Nedlouho nato, došlo koncem dubna 2016 k protestu a natření skupinou BOLT 958 zpět na červenou barvu.</p>

        <p>Od metronomu se pravidelně odpaluje pražský novoroční ohňostroj, naposledy byl odsud odpalován 1. ledna 2018.</p>

        <h2 class="h2">Popis</h2>
        <p>Pražský objekt, který autor nazval Stroj času měl svým umístěním na podstavci bývalého Stalinova pomníku rovněž symbolizovat neúprosné plynutí času a varovnou připomínku minulosti. Stroj svým vzhledem připomíná Mälzelův metronom a ačkoliv jeho mechanická konstrukce je jiná, vžil se spíše název Metronom. Spolu s kyvadlem je vysoký 25 m a váží 7 tun. Stroj pohánějící pohyblivé součásti je uložen v tříbokém jehlanu. Kyvadlo s výkyvem 60 stupňů je vyváženo vahadlem se dvoutunovým závažím. Byl vyroben společností ČKD Racionalizace na objednávku Společnosti pro Československou všeobecnou výstavu. Pro obavy z narušené statiky podstavce po odstřelení Stalinova pomníku nemohl být metronom instalován za pomocí jeřábu. Byl sem dopraven a usazen pomocí velkého vrtulníku 15. května 1991 u příležitosti Všeobecné československé výstavy v Praze. Původně vznikl jako dočasná stavba.</p>

        <figure>
          <img src="./images/places/metronom/img-2.jpg" alt="">
          <figcaption>Typicky zavěšené boty</figcaption>
        </figure>

      </section>

    </article>
  </main>

{% endblock %}
