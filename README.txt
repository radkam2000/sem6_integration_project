Nazwa projektu: Aplikacja zestawiająca dane kryptowalut z tradycyjną giełdą

Skład grupy: surname name, surname name

Podział pracy: 
    Frontend - surname name
    Backend - surname name
    Dockeryzacja - surname name
    Reasearch - surname name, surname name

Lista technologii:
    - Node.js (javaScript runtime environment)
    - Express.js (web application framework, back-end) 
    - React.js (front-end JavaScript library)
    - MongoDB (noSql database)
    - Docker (konteneryzacja)


Opis projektu
    Projekt ma za zadanie w wygodny sposób przedstawiać dane wybranych kryptowalut oraz indeksów giełdowych. Ich zestawienie pozwala na łatwą ocenę ich wzrostów i spadków w danym czasie. Aplikacja zawiera równierz kalkulator, króry oblicza stopę zwrotu oraz zysk/stratę z podanej kwoty, w wybranym czasie. Pozwala to na dostrzeżenie opłacalności inwestycji w wybrane aktywa.

Uruchomienie projektu
    - (wymaga zainstalowanego dockera) Należy otworzyć terminal w folderze projektu i wykonać polecenie "docker compose up --build --force-recreate", powinno to poprawnie utworzyć oraz uruchomić stack aplikacji.
    
    - (wymaga zainstalowanego Node.js, npm, opcjonalnie docker) W przypadku niepowodzenia urchomienia przy pomocy docker compose, należy wykonać z terminala polecenie "npm install" w katalogach frontend oraz backend, natomiast bazę można uruchomić za pomocą polecenia "docker run --name mongodb -p 27017:27017 mongo" oraz zmienić w pliku backend/.env zmienną na DB=mongodb://localhost/IS_project, jeżeli nie chcemy uruchamiać zdockeryzowanego MongoDB, należy w pliku backend/.env ustawić zmienną DB aby łączyła się z bazą urchomioną w inny sposób, ostatnim krokiem jest uruchomienie serwerów frontend i backend. Trzeba w każdym folderów uruchomić terminal i uruchomić serwery, backend: "npm start", frontend: "npm run start"

Interakcja z aplikacją zachodzi w przeglądarce, pod adresem http://localhost:3000/

Dane:
    Dane o kryptowalutach są pobierane z api CoinGecko https://www.coingecko.com/api/documentations/v3
    Dane o giełdzie są pobierane z api FRED ST. LOUIS FED https://fred.stlouisfed.org/docs/api/fred/