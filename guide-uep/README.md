## Nastavení vývojového prostředí v PC učebnách VŠE
Tento návod Ti pomůže s nastavením vývojového prostředí VS Code + Git v počítačových učebnách VŠE. Hodně štěstí!



### Návod
0. Na ploše je složka Programy. V ní si najdi soubor **`\_Menu\Verify application on D\GIT - verify`** a spusť ho (chvíli to potrvá). Tím u sebe rozchodíš Git.
1. Stáhni si VS Code v zip distribuci - [https://code.visualstudio.com/Download](https://code.visualstudio.com/Download).
2. Rozbal obsah zip souboru do **`D:\Users\{XNAME}\Programs\vscode\`**, místo **`{XNAME}`** dej svůj **xname**.
3. Vytvoř si odkaz na soubor **`D:\Users\{XNAME}\Programs\vscode\Code.exe`** a dej ho na plochu.
4. Otevři VS Code, klikni na **File > Preferences > Settings**.
5. Klikni na ... vpravo nahoře a vyber **Open settings.json**.
6. V pravé části vlož následující konfigurační kód a ulož to. Tohle je kvůli propojení Gitu s VS Code.
```js
{
    "terminal.integrated.shell.windows": "D:\\Programy\\GIT\\bin\\bash.exe",
    "git.path": "D:\\Programy\\GIT\\bin\\git.exe"
}
```
7. A tím máš připravené vývojové prostředí tak, jak to mají profíci. Tak pojďme psát kódy!



### Live server
Nebaví tě furt mačkat refresh v prohlížeči? Mám pro tebe dobrou zprávu! Ve VS Code se dá nastavit projekt tak, aby to šlo automaticky.

1. Ve VS Code otevři levou záložku Extensions (Ctrl + Shift + X).
2. Vyhledej "Live Server" a nainstaluj ho.
3. Klikni pravou myší v souboru index.html a vyber **Open with Live Server**.

Teď se ti v prohlížeči bude automaticky načítat novou verzi stránky, jakmile uložíš soubor.
