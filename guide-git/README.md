## Použití verzovacího nástroje Git pro předmět 4IZ268
Tento návod Ti pomůže s použitím Gitu během předmětu 4IZ268. Hodně štěstí!



### Setup, Ready, Go!
1. Nainstaluj si Git v počítači, pokud ho ještě nemáš -- [https://git-scm.com/downloads](https://git-scm.com/downloads), všude dávej Next.
    - Potom si možná budeš muset přidat cestu k git.exe do PATH pro použití v **`příkazovém okně`**.
    - **Pokud používáš školní PC**, postupuj s instalací Gitu podle [https://github.com/nvbach91/4IZ268-2018-2019-ZS/tree/master/guide-uep](https://github.com/nvbach91/4IZ268-2018-2019-ZS/tree/master/guide-git)
2. Registruj se na GitHub, pokud ještě nemáš účet -- [https://github.com/join](https://github.com/join). Zvol si nějaké jednoduché a dobře zapamatovatelné uživatelské jméno.
3. Otevři příkazové okno CMD nebo PowerShell v domovském adresáři, např. v **`C:\Users\User\Projects\`**, 
    - tj. otevřeš tuto složku, podržíš SHIFT, klikneš někam do prázdna pravou myškou a vybereš **Příkazové okno** nebo **PowerShell**. Tahle finta je hodně užitečná.
4. **Naklonuj** si tento repozitář, 
    - tj. spustíš příkaz **`git clone https://{XXXX}@github.com/nvbach91/4IZ268-{YYYY}-{YYYY}-{SS}.git`**, přitom: 
        - nahradíš **`{XXXX}`** svým **username** na github, např. **`nvbach91`**. (POZOR: ty složené závorky jdou taky pryč!)
        - nahradíš **`{YYYY}-{YYYY}`** aktuálními roky, např. **`2018-2019`**,
        - nahradíš **`{SS}`** buď **`ZS`** nebo **`LS`**,
        - tedy celkem např. **`git clone https://nvbach91@github.com/nvbach91/4IZ268-2018-2019-ZS.git`**,
        - takhle dostaneš adresář s názvem **`4IZ268-2018-2019-ZS`**.
5. **Otevři tento adresář ve vývojovém prostředí**, 
    - tj. vybereš **File > Open Folder** a najdeš si složku **`C:\Users\User\Projects\4IZ268-{YYYY}-{YYYY}-{SS}`**.
    - otevři si integrovaný příkazový řádek pro zadávání příkazů. (Pro VS Code je to pomocí kláves **Ctrl + `** - zpětný apostrof aka. gravis - to tlačítko je pod Esc a vedle jedničky).
6. Vytvořiš si **vlastní branch**, 
    - tj. spustíš příkaz **`git checkout -b student-{xname}`** (nahraď **`{xname}`** svým **xname**).
7. Zveřejníš tuto **branch** a přitom ji nastavíš jako **upstream** u sebe, 
    - tj. spustíš příkaz **`git push --set-upstream origin student-{xname}`** (nahraď **`{xname}`** svým **xname**).
8. Ve složce **`www`** si vytvoříš svou složku, kterou nazveš svým **xname**, 
    - např. **`C:\Users\User\Projects\4IZ268-2018-2019-ZS\www\nguv03\`**.
9. Sem vložíš své **HTML** soubory a jsi připraven.



### Standardní proces schválení změn v kódu pomocí příkazů
1. Uděláš nějaké změny v kódu a chceš to uložit na GIT, tak spustíš CMD ve složce tvého projektu.
2. Zkontroluješ stav projektu,
    - tj. spustíš příkaz **`git status`**.
3. Podíváš se na vyznačené změny,
    - tj. spustíš příkaz **`git diff`**. Z toho odejdeš pomocí klávesy **`Q`**.
4. Přidáš tyto změny do **fáze** (stage),
    - tj. spustíš příkaz **`git add -A`**.
5. Potvrdíš tyto změny,
    - tj. spustíš příkaz **`git commit -m "{MESSAGE}"`**. Tady místo **`{MESSAGE}`** napíšeš krátký popis těch změn nebo jejich účel.
    - POZOR: do zprávičky piš vždy něco smysluplného
6. Pošleš tyto změny na repozitář,
    - tj. spustíš příkaz **`git push`**. Zadáš heslo a tvůj kód je v cloudu na tvé **branch**i.



### Zjednodušené gitování ve VS Code
Pokud sis zvolil nějaké slušné **vývojové prostředí**, např. [VS Code](https://code.visualstudio.com/download), udělal jsi dobře! **IDE** ti totiž bude ukazovat změny v kódu a také se postará o Git příkazy na dva kliky. Tj. nemusíš dělat ty příkazy nahoře. Nastavení VS Code viz [https://github.com/nvbach91/4IZ268-2018-2019-ZS/blob/master/guide-uep].(https://github.com/nvbach91/4IZ268-2018-2019-ZS/blob/master/guide-uep).
1. **Změny** uvidíš přímo v IDE když klikneš na levou záložku **Source Control** nebo **Ctrl + Shift + G**.
2. Jestli chceš udělat **commit**, tak tady můžeš napsat **commit message** do horního políčka a klikneš na ✔.
    - POZOR: do zprávičky piš vždy něco smysluplného
3. A posledním krokem je **Push**. To vybereš vedle ✔ v menu. Zadáš **heslo** a je to.



### Pull Requesty
Pokud jsi spokojený se svými změnami (po několika **commit**ech + push) a chceš je zveřejnit na produkci (tj. na **master branch**), musíš udělat tzv. **Pull Request**, tj. mě požádáš o schválení tvých změn na produkci.
1. Jdeš na GitHub repozitář, najdeš si svou **branch** a uděláš **Pull Request** na pár kliků.
2. Já dostanu notifikaci, pak se na to podívám a případně schválím,
    - tj. já udělám **review**,
        - v případě **approve** udělám **merge** tvé **branch**e na **master branch** a do minuty se to projeví na webu,
        - v případě **changes requested** budeš muset doladit svůj **Pull Request** tím, že uděláš opravy, a pak zase **commit** a **push**.
3. Zkontroluješ si svůj nový web a budeš šťastný. (Odkaz na tvůj web ti sdělím na cvičení)
    - odkaz na tvůj web by měl být **`https://fcp.vse.cz/4IZ268/{YYYY}-{YYYY}-{SS}/www/{xname}/`**
        - místo **`{xname}`** dáš svůj **xname**,
        - místo **`{YYYY}-{YYYY}`** dáš aktuální akademický rok, např. **`2018-2019`**,
        - místo **`{SS}`** dáš **`ZS`** nebo **`LS`**.



### Další postupy v gitu
- Zjištění názvu **branch**e, na které právě jsi 
    - **`git branch`**.
- Přechod na jinou existující **branch** 
    - **`git checkout {BRANCH-NAME}`**, místo **`{BRANCH-NAME}`** dáš název **branch**e.
- Odstranění **branch**e lokálně
    - **`git branch -d {BRANCH-NAME}`**, místo **`{BRANCH-NAME}`** dáš název **branch**e.
- Aktualizace **branch**e, na které právě jsi 
    - **`git pull`**.
- Aktualizace celého projektu nanečisto 
    - **``git fetch``**.
- Vytváření nové **branch**e a přechod na ni 
    - **`git checkout -b {BRANCH-NAME}`** // tohle už jsi jednou dělal při prvnotním nastavení.



### Synchronizace s master branch
Možná budeš chtít synchronizovat svou **branch** tak, aby obsahovala to, co obsahuje master branch na GitHubu. V našem případě to není třeba, jelikož pracuješ pouze v rámci své složky/**branch**e, a to vždy samostatně. Ale pokud bylo potřeba, tak je na to následující sekvence příkazů. **POZOR: tohle nejde vrátit zpět!**
1. **`git checkout {BRANCH-NAME}`**, místo **`{BRANCH-NAME}`** dáš název tvé branche
2. **`git pull origin master`**
3. **`git push`**



### Poznámky
- Budeš mít pouze jednu **branch** s názvem **`student-{xname}`**. Nevytvářej nové.
- Nemanipuluj se **složkami**/**branch**i tvých spolužáků, jinak ti **Pull Request neprojde** :)
- Veškeré kódy musíš naformátovat před **commit**em



### Git the princess
[Credit](https://toggl.com/programming-princess/)
![Git the princess](https://assets.toggl.com/images/toggl-how-to-save-the-princess-in-8-programming-languages-0c32e93f47f3f6401913846c4c184e3e.jpg)