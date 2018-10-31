{% extends "layouts/_layout.swig" %}
{% block bodyClass %}page-homepage{% endblock %}
{% block pageTitle %}{% endblock %}
{% block description %}Žijete v Praze nebo jste jen návštěvníky a chcete poznat ty nejkrásnější místa v Srdci Evropy? Tak jste tu správně! Máme pro Vás tipy, jak si zpříjemnit celý den.{% endblock %}

{% block main %}

  <div class="teaser teaser--screen">
    <span class="teaser__title text--thin">Srdce Evropy</span>
    <span class="teaser__subtitle text--thin">Naše krásná Praha</span>

    <!-- Scroll To Content -->
    <button class="teaser__chevron scrollTo" href="#content">
      <img src="./images/icons/chevron.svg" alt="">
    </button>
  </div>

  <main class="main container">
    <article id="content" class="main__content">
      <!-- HP sections -->
      <section class="section">
        <h1 class="h1">Praha</h1>

        <p class="text--perex text--large text--italic">
          Žijete v&nbsp;Praze nebo jste jen&nbsp;návštěvníky a&nbsp;chcete poznat&nbsp;ty nejkrásnější místa v&nbsp;Srdci Evropy?
          <br>
          <br>
          <strong>Tak&nbsp;jste&nbsp;tu správně!</strong>
          <br>
          Máme pro&nbsp;Vás tipy, jak si zpříjemnit celý den.
        </p>

        <p class="text--large">Praha je&nbsp;hlavní a&nbsp;současně největší město Česka a&nbsp;15. největší město Evropské unie. Leží mírně na&nbsp;sever od&nbsp;středu Čech na&nbsp;řece Vltavě, uvnitř Středočeského kraje, jehož je&nbsp;správním centrem, ale jako samostatný kraj není jeho součástí.&nbsp;Je&nbsp;sídlem velké části státních institucí a&nbsp;množství dalších organizací a&nbsp;firem. Sídlí zde prezident republiky, parlament, vláda, ústřední státní orgány a&nbsp;jeden ze&nbsp;dvou vrchních soudů. Mimoto je&nbsp;Praha sídlem řady dalších úřadů, jak ústředních, tak&nbsp;i&nbsp;územních samosprávných celků; sídlí zde též ústředí většiny politických stran, hnutí a&nbsp;iniciativ a&nbsp;centrály téměř všech církví, náboženských a&nbsp;dalších sdružení s&nbsp;celorepublikovou působností registrovaných v&nbsp;ČR.</p>

        <p class="text--large">Do&nbsp;dnešní podoby se&nbsp;Praha vyvíjela jedenáct století. Coby historická metropole byla hlavním městem Českého knížectví, Českého království a&nbsp;sídelním městem císařů Svaté říše římské. Město hrálo významnou roli v&nbsp;české a&nbsp;protestantské reformaci, ve&nbsp;Třicetileté válce a&nbsp;v&nbsp;dějinách 20. století jako hlavní město Československa, a&nbsp;to&nbsp;jak během obou světových válek, tak&nbsp;v&nbsp;poválečné komunistické éře. Praha je&nbsp;domovem řady slavných kulturních atrakcí, z&nbsp;nichž mnohé přežily zničující období Evropy 20. století. Mezi hlavní atrakce patří Pražský hrad, Karlův most, Staroměstské náměstí s&nbsp;Pražským orlojem, Josefov, Petřín a&nbsp;Vyšehrad. Od&nbsp;roku 1992 je&nbsp;historické centrum Prahy zapsáno do&nbsp;seznamu světového kulturního dědictví UNESCO.</p>

        <figure>
          <img class="lazy" data-src="./images/places/praha/vaclavske-namesti.jpg" alt="Václavské náměstí a pohled od sochy svatého Václava">
          <figcaption>Václavské náměstí a pohled od sochy svatého Václava</figcaption>
        </figure>

        <p class="text--large">Praha se&nbsp;rozkládá na&nbsp;území 496 km² a&nbsp;má okolo 1,3 milionu obyvatel, v&nbsp;pražské metropolitní oblasti o&nbsp;rozloze 4 983 km<sup>2</sup> žije 2,6 milionu obyvatel.</p>

        <p class="text--large">Praha také vysoce ekonomicky vyspělým a&nbsp;bohatým regionem s&nbsp;vysokou životní úrovní, přičemž tímto vyniká nejen nad&nbsp;české, ale i&nbsp;nad&nbsp;evropské standardy. Podle statistik Eurostatu je&nbsp;devátým nejbohatším regionem v&nbsp;Evropě. HDP na&nbsp;obyvatele v&nbsp;Praze dosahuje 171&nbsp;% průměru celé Evropské unie (HDP na&nbsp;obyvatele Česka dosahuje pouze 80 %). V&nbsp;Praze sídlí celkem 12 univerzit (vysokých škol univerzitního typu).</p>

        <p class="text--large">Praha je&nbsp;všeobecně považována za&nbsp;jedno z&nbsp;nejkrásnějších měst v&nbsp;Evropě. Historické centrum města s&nbsp;jedinečným panoramatem Pražského hradu, největšího hradního komplexu na&nbsp;světě, je&nbsp;památkovou rezervací UNESCO. Právě historické jádro města a&nbsp;mnohé památky přilákají ročně miliony turistů ze&nbsp;zemí celého světa. V&nbsp;roce 2017 navštívilo Prahu 8,5 milionu turistů, je&nbsp;to&nbsp;tedy páté nejnavštěvovanější město Evropy, po&nbsp;Londýně, Paříži, Istanbulu a&nbsp;Římu.</p>

        <figure>
          <img class="lazy" data-src="./images/places/praha/prazsky-hrad.jpg" alt="Pohled na Pražský hrad">
          <figcaption>Pohled na Pražský hrad</figcaption>
        </figure>

        <div class="text-center">
          A dost! Pojď si s námi vybrat, kam se tentokrát vydáš na
          <a href="./kam-na-vylet.html" class="link" title="Kam na výlet?">výlet</a>.
        </div>

      </section>

    </article>
  </main>

{% endblock %}
