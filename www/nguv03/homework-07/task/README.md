## Memorama, Match Match, Match Up, Memory, Pelmanism, Shinkei-suijaku, Pexeso or simply Pairs.

Vytvořte zjednodušenou hru **Pexeso** pro jednoho hráče čistě pomocí JavaScriptu a CSS pro stylování (tj. **nebudete šahat do výchozího HTML souboru**). 

Hra bude spočívat v **postupném otáčení karet**. V každém tahu hráč otočí postupně dvě karty a **pokud se shodují, přičte si jeden bod a karty zůstanou odhalené**. **Pokud se neshodují, tak se karty vrátí do původního neodhaleného stavu a hráči se odečte jeden bod**. Počet bodů nesmí být záporný. 

Karty budou obsahovat **anglické názvy měst po celém světě**: třeba Prague, London, Paris, Moscow, California, Vancouver, Sydney... a **podle nich** také budete **porovnávat shody**. 

Na herní plochu umístěte **alespoň 20 karet** (tj. do 5 sloupců a 4 řádky, a to vždy sudý počet) v náhodném pořadí. 

Po **kliknutí** se karta otočí (tj. stačí aby byl vidět obsah karty, tj. název města, nemusíte dělat animace). Hra skončí ve chvíli, kdy jsou všechny karty odhaleny a uživateli se **zobrazí celkový počet bodů**. 

Používejte pouze Vanilla JavaScript, případně ES6, ES7. Pokud někdo chce používat jQuery, tak ať mi předem napíše do mailu.



### Nazávazný návod (pokud nevíte kde začít):

- Vytvořte potřebné CSS třídy pro **hrací plochu**, **karty ve výchozím stavu**, **karty v otočeném stavu** apod.
- Vyberte DOM element hrací plochu a element pro výpis počtu bodů.
- Nadefinujte **seznam měst** do pole.
- **Naduplikujte tento seznam**, aby každé město tam bylo dvakrát, pomocí metody `array.concat(array)`. 
- Aby hra byla zajímavější, **zamíchejte pořadí měst** pomocí metody `array.sort()` následovně:
```js
var cities = ['Barcelona', 'Dortmund', 'Madrid', 'Turin', '...'];
cities = cities.concat(cities);
cities.sort(function() { return .5 - Math.random(); });
```
- Vytvořte **pomocné proměnné**, abyste mohli sledovat stav hry, tj. **počet bodů**, **otočené karty**, **počet otočených karet**...
- Vytvořte funkci, která bude mít na starost **vytvořit jednu kartu** pomocí DOM metod.
  - `document.createElement(...);`
  - `element.classList.add(...);`
  - `element.innerText = '...';`
  - `element.addEventListener(...);`
  - `parent.appendChild(...);`
  - Přitom nabindujte **událost kliknutí** na kartu. Při této události by se mělo odhalit vybraná karta a aktualizovat stav hry.
  - **Viditelnost obsahu karty** naimplemenujte dle libosti, třeba to bude
    - pomocí barvy písmena a pozadí, pak jenom změníte barvu jednoho z nich
    - pomocí vnořeného elementu, který by měl display none, atd.
  - Pro **porovnání obsahu karet** můžete použít **dvě globální proměnné**, které se budou měnit dle stavu hry v závislosti na právě otevřených kartách. Např. když kliknete na první kartu tak se přiřadí do první proměnné. Když kliknete na druhou kartu, tak se přiřadí do druhé proměnné a pak budete porovnávat jejich obsahy. **Po skončení tahu** se obě proměnné **resetují** a začne nový tah.
  - Uživatel může **otočit maximálně dvě karty najednou**.
- Pomocí této funkce budete vytvářet 20+ karet v cyklu podle seznamu měst a přitom je budete vkládat do kontejneru karet

Rozhraní také **vhodně nastylujte**.
![image](https://user-images.githubusercontent.com/20724910/48949139-3e2a4f00-ef37-11e8-8b8e-138c87e47704.png)

[Demo](https://fcp.vse.cz/4IZ268/2018-2019-ZS/www/nguv03/homework-07/solution/index.html)