# Aplikace PaperworkShop

Aplikace je jednoduchý internetový obchod, s frontend na JavaScript pomocí REACT Framework, s backend na Java Spring Boot a s databází PostgresSQL. 


## Co je hotové: 

- Přehled částí aplikace Frontend React 
- Baskend Spring Boot
- Selenium tests app
- Deploy verse na Heroku https://paper-workshop.herokuapp.com (trva asi 5 min pro probuzdeni aplikace)

## Inicializacni postup: 

1. Stahnut toto repository
2. Nainstalujte docker podle pokynů https://docs.docker.com/engine/install/
3. Nainstalujte docker-compose podle pokynů:  https://docs.docker.com/compose/install/
3. Povolte běžným uživatelům používat docker podle pokynů https://docs.docker.com/engine/install/linux-postinstall/
4. Spustit build-docker.sh v korene projektu
5. Otevrite web-browser - localhost


## Use cases(funkcionalita aplikace):

1. Neprihlasheny uživatel: prohlizet zbozi, pridat do košiku, košik je v local storage, tat ne zdtratom obsah.
2. Neprihlasheny uživatel uprava košiku.
3. Prihlašeny  uživatel: nakoupit zboži v košiku. Vybarat zpusob paltby,  dodani a zadat osobni udaje.
4. Prihlašeny  uživatel: mu6e prohlizet stav objednavky
5. Prihlašeny  uživatel: pres + hodiny session vprši, a uživatel musí se prihlasit znova. 
6. Admin muže upravit zbozi (nazev, množství, a popis) data se uloží do DB.
7. Admin muže videt stav a obsach objednavek se statusem "TAKE AWAY" 

admin: user alvina@gmail.com password 12345678

## Prioritizace části aplikace:

Nejdůležitější částí aplikace je backend, který řídí všechny procesy včetně přidávání do databáze. 
Další nejdůležitější částí je frontend, je to nástroj nejen pro uživatele, ale také pro správce obchodu. 
Nejméně komplikovaná část databáze.


## Procesní testování:

Pro procesní testování byl vybrán nejdůležitější backend metoda Order. Byl vytvořen procesní diagram, a použit nastroj Oxygen. Vysledných kombinací se následně skládají testovací scénáře. Procesí testu back-end/src/test/java/backEndTests


## Unit testy:

Testuje session manager důležitou část aplikace + White box

## Mock testy Web controlleru:

Testuje připojení k databazí vytvořením Mock objektů repository. 

## Selenium testy uživatelského rozhraní:

8+ Testy uživatelskécho rozhraní, testuje přihlášení uživatele, přidání do košíku, vyplnění formuláře, včetně neplatných údajů. 
Kromě toho se testuje přidání do úložiště Lockal storage. 

















