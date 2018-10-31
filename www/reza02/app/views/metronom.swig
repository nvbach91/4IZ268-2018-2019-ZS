{% extends "layouts/_layout.swig" %}
{% block bodyClass %}page-detail{% endblock %}
{% block pageTitle %}| Pražský metronom{% endblock %}
{% block description %}Pražský metronom je kinetický sochařský objekt Vratislava Nováka, instalovaný roku 1991 v místě bývalého Stalinova pomníku v Praze na Letné nad Čechovým mostem.{% endblock %}

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

        <p class="text--perex text--large text--italic">Pražský metronom je&nbsp;kinetický sochařský objekt Vratislava Nováka, instalovaný roku 1991 v&nbsp;místě bývalého Stalinova pomníku v&nbsp;Praze na&nbsp;Letné nad&nbsp;Čechovým mostem.</p>

        <!-- Table -->
        <table class="table">
          <thead>
            <tr>
              <th colspan="2">Údaje o&nbsp;pomníku</th>
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
        <p>Autorem je&nbsp;sochař a&nbsp;profesor Vysoké školy uměleckoprůmyslové Vratislav Karel Novák (1942–2014), který&nbsp;se&nbsp;kinetickým uměním zabýval od&nbsp;roku 1968. Během pobytu na&nbsp;Miami University v&nbsp;Ohio v&nbsp;letech 2001 až 2002 vytvořil spolu s&nbsp;americkou umělkyní Suzan Rae Ewingovou 27&nbsp;m vysoký kinetický objekt Krystalová věž, představující symbol svobody, který&nbsp;zvítězil v&nbsp;mezinárodní soutěži v&nbsp;Cincinnati.</p>

        <p>V roce 2003 byl&nbsp;využit k&nbsp;propagaci referenda o&nbsp;přistoupení České republiky k&nbsp;Evropské unii, kdy&nbsp;se&nbsp;jeho kyvadlo pohybovalo mezi slovy ANO a&nbsp;NE. Roku 2009 zase symbolicky odměřoval čas předsednictví České republiky Evropské unii.</p>

        <p>Pražský metronom bohužel čím dál častěji postihují poruchy, takže bývá někdy i&nbsp;dlouhé týdny mimo provoz. Poslední velká rekonstrukce proběhla v&nbsp;roce 2015.</p>

        <figure>
          <img class="lazy" data-src="./images/places/metronom/metronom-cervena-rucicka.jpg" alt="Metronom: Červená ručička metronomu">
          <figcaption>Červená „ručička" metronomu</figcaption>
        </figure>

        <p>K 1. dubnu 2016 se&nbsp;metronom vrátil na&nbsp;své místo, avšak společnost PSN jej v&nbsp;rámci rekonstrukce opatřila novým zeleným nátěrem, což&nbsp;bylo kritizováno veřejností a&nbsp;umělci jako pozměňování díla k&nbsp;reklamním účelům. Nedlouho nato, došlo koncem&nbsp;dubna 2016 k&nbsp;protestu a&nbsp;natření skupinou BOLT 958 zpět na&nbsp;červenou barvu.</p>

        <p>Od&nbsp;metronomu se&nbsp;pravidelně odpaluje pražský novoroční ohňostroj, naposledy byl&nbsp;odsud odpalován 1.&nbsp;ledna 2018.</p>

        <h2 class="h2">Popis</h2>
        <p>Pražský objekt, který&nbsp;autor nazval Stroj času měl svým umístěním na&nbsp;podstavci bývalého Stalinova pomníku rovněž symbolizovat neúprosné plynutí času a&nbsp;varovnou připomínku minulosti. Stroj svým vzhledem připomíná Mälzelův metronom a&nbsp;ačkoliv jeho mechanická konstrukce je&nbsp;jiná, vžil se&nbsp;spíše název Metronom. Spolu s&nbsp;kyvadlem je&nbsp;vysoký 25&nbsp;m a&nbsp;váží 7 tun. Stroj pohánějící pohyblivé součásti je&nbsp;uložen v&nbsp;tříbokém jehlanu. Kyvadlo s&nbsp;výkyvem 60 stupňů je&nbsp;vyváženo vahadlem se&nbsp;dvoutunovým závažím. Byl&nbsp;vyroben společností ČKD Racionalizace na&nbsp;objednávku Společnosti pro&nbsp;Československou všeobecnou výstavu. Pro&nbsp;obavy z&nbsp;narušené statiky podstavce po&nbsp;odstřelení Stalinova pomníku nemohl být metronom instalován za&nbsp;pomocí jeřábu. Byl&nbsp;sem dopraven a&nbsp;usazen pomocí velkého vrtulníku 15.&nbsp;května 1991 u&nbsp;příležitosti Všeobecné československé výstavy v&nbsp;Praze. Původně vznikl jako dočasná stavba.</p>

        <figure>
          <img class="lazy" data-src="./images/places/metronom/metronom-boty.jpg" alt="Metronom: Typicky zavěšené boty">
          <figcaption>Typicky zavěšené boty</figcaption>
        </figure>

        <div class="text-center">
          <a href="./kam-na-vylet.html" class="link" title="Zpět">Co&nbsp;takhle něco jiného?</a>
        </div>

      </section>

    </article>
  </main>

{% endblock %}
