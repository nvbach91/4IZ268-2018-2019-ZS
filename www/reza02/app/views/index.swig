{% extends "layouts/_layout.swig" %}
{% block bodyClass %}page-homepage{% endblock %}
{% block pageTitle %}{% endblock %}
{% block description %}Description{% endblock %}

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

        <p class="text--large">Praha je hlavní a současně největší město Česka a 15. největší město Evropské unie. Leží mírně na sever od středu Čech na řece Vltavě, uvnitř Středočeského kraje, jehož je správním centrem, ale jako samostatný kraj není jeho součástí. Je sídlem velké části státních institucí a množství dalších organizací a firem. Sídlí zde prezident republiky, parlament, vláda, ústřední státní orgány a jeden ze dvou vrchních soudů. Mimoto je Praha sídlem řady dalších úřadů, jak ústředních, tak i územních samosprávných celků; sídlí zde též ústředí většiny politických stran, hnutí a iniciativ a centrály téměř všech církví, náboženských a dalších sdružení s celorepublikovou působností registrovaných v ČR.</p>

        <p class="text--large">Do dnešní podoby se Praha vyvíjela jedenáct století. Coby historická metropole byla hlavním městem Českého knížectví, Českého království a sídelním městem císařů Svaté říše římské. Město hrálo významnou roli v české a protestantské reformaci, ve Třicetileté válce a v dějinách 20. století jako hlavní město Československa, a to jak během obou světových válek, tak v poválečné komunistické éře. Praha je domovem řady slavných kulturních atrakcí, z nichž mnohé přežily zničující období Evropy 20. století. Mezi hlavní atrakce patří Pražský hrad, Karlův most, Staroměstské náměstí s Pražským orlojem, Josefov, Petřín a Vyšehrad. Od roku 1992 je historické centrum Prahy zapsáno do seznamu světového kulturního dědictví UNESCO.</p>

        <p class="text--large">Praha se rozkládá na území 496 km² a má okolo 1,3 milionu obyvatel, v pražské metropolitní oblasti o rozloze 4 983 km<sup>2</sup> žije 2,6 milionu obyvatel.</p>

        <p class="text--large">Praha také vysoce ekonomicky vyspělým a bohatým regionem s vysokou životní úrovní, přičemž tímto vyniká nejen nad české, ale i nad evropské standardy. Podle statistik Eurostatu je devátým nejbohatším regionem v Evropě. HDP na obyvatele v Praze dosahuje 171 % průměru celé Evropské unie (HDP na obyvatele Česka dosahuje pouze 80 %). V Praze sídlí celkem 12 univerzit (vysokých škol univerzitního typu).</p>

        <p class="text--large">Praha je všeobecně považována za jedno z nejkrásnějších měst v Evropě. Historické centrum města s jedinečným panoramatem Pražského hradu, největšího hradního komplexu na světě, je památkovou rezervací UNESCO. Právě historické jádro města a mnohé památky přilákají ročně miliony turistů ze zemí celého světa. V roce 2017 navštívilo Prahu 8,5 milionu turistů, je to tedy páté nejnavštěvovanější město Evropy, po Londýně, Paříži, Istanbulu a Římu.</p>

      </section>

    </article>
  </main>

{% endblock %}
