# My Timetable

Google Chrome extension určené pro studenty VŠE. Importuje a zobrazuje rozvrh studenta.

## Instalace

Momentální instalace extension při vývoji:

 1. Otevřít [chrome extensions](chrome://extensions/)
 2. Zapnout "Režim pro vývojáře"
 3. Kliknout na "Načíst nerozbalené"
 4. Zvolit složku s chrome extension

## Verze

### Funkce v momentální verzi (0.1)

 - Vytvoření tokenu pro přístup do API. *(token je uložen v storage.sync, takže rozvrh bude načtený všude, kde se uživatel přihlásí do chromu)*
 - Načtení rozvrhových akcí do JSONu a odeslání do API.
 - Čtení dat o rozvrhu z API do seznamu rozvrhových akcí.

### Soon

- Možnost přepnutí ze zobrazení rozvrhových akcí na zobrazení rozvrhu.
- Možnost schování hodin z rozvrhu. *(pokud student na některé přednášky nechodí)*
- Zadávání úkolů k jednotlivým předmětům.

## Ostatní

### Smazání tokenu uživatele

Pro smazání tokenu stačí vložit tento řádek do konzole. Po otevření pop-upu *(případně okna, ve kterém běží content script)* se token vygeneruje znovu.

*Uživateli se ztratí všechna uložená data!*

```
chrome.storage.sync.clear();
```
