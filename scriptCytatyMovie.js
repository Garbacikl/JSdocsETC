var uzytkownicyCytatyMovie = JSON.parse(localStorage.getItem("uzytkownicyCytatyMovie")) || {};
localStorage.setItem("uzytkownicyCytatyMovie", JSON.stringify(uzytkownicyCytatyMovie));

let bazaCytatyMovie = [
    {
      Vinci: {
        tekst: "-Po co ci to?<br>-Leonardo na ścianie, CHAD<br> -To powieś se Di Caprio",
      },
      Poranekkojota: {
        tekst: "-Po po trzecie PRIMO ULTIMO! Nikt nie otwiera tyh drzwi.<br>-Ale dlaczego<br>-Bo tam jest zamkniety Rambo<br>-A kto to jest Rambo?<br>-Nie twoja sprawa, Bambo",
      },
      Chłopakiniepłaczą:{
        tekst:"-Jest tu jakis cwaniak?<br>-Nie, nie ma tu żadnego cwaniaka<br>-To daj piontaka<br>-Ja jestem cwaniak i wynocha stąd",
    }
    }
  ];
let currentTitleCytatMovie;
let iloscCytatowMovie = Object.keys(bazaCytatyMovie[0]).length;
const movieKeys = Object.keys(bazaCytatyMovie[0]);
/**
 * Wyswietla panel do logowania 
 * 
 * @function
 */
function startCytatyMovie(){
    odNowa();
    document.getElementById("start-content").style.display = "block";
    document.getElementById("h2").style.display='block';
    document.getElementById("h2").innerText="Z ktorego filmu jest ten klasYk?";

    document.getElementById("buttonCytatyMovie").style.display='inline-block';
    document.getElementById("buttonAnswerCytatyMovie").style.display='inline-block';
    document.getElementById("buttonRandomCytatyMovie").style.display='inline-block';

    document.getElementById("buttonRap").style.display = 'none';
    document.getElementById("buttonMovie").style.display='none';
    document.getElementById("buttonCytaty").style.display='none';
    

}

/**
 * Dodaje nowego uzytkownika do localStorage
 * Rozpozyna sesje tworzac nowego uzytkownika w lokalStorage
 * Jeżeli nazwa nie jest pusta i nie powtarza się, to rozpozyna sesje tworzac nowego uzytkownika w lokalStorage. Wywoluje funkcje 
 *          getRandomCytatMovie()
 *          displayStartCytatyMovies()
 *          updateResultTableCytatyMovie()
 * Gdy warunki nie sa spelnione wywoluje funkcje 
 *         brakOdpowiedzi()
 * lub     zajetanazwa()
 * @function
 */
function startSessionCytatyMovie() {
    username = document.getElementById("username").value;
    points=0;
    if (username !== "") {
        if (!uzytkownicyCytatyMovie[username]){
            uzytkownicyCytatyMovie[username] = {
                nazwa: username,
                wynik: 0
            };

            // Zapisz zaktualizowane dane w localStorage
            localStorage.setItem("uzytkownicyCytatyMovie", JSON.stringify(uzytkownicyCytatyMovie));
            
            getRandomCytatMovie();
            displayStartCytatyMovies();
            updateResultTableCytatyMovie();

            var listaNazwUzytkownikow = Object.keys(uzytkownicyCytatyMovie);
            console.log("Movie Cytaty");
            console.log("Użytkownicy: "+listaNazwUzytkownikow);
        }
        else{
            zajetanazwa();
            document.getElementById("username").value = "";

        }
    } else {
        brakOdpowiedzi();
    }
    console.log(points, usedImageIndexes.length);
}
/**
 * Wyswietla elementy quizu odkrywajac elemnty dokumentu
 * 
 * @function
 */
function displayStartCytatyMovies(){
    document.getElementById("start-content").style.display = "none";
    if(window.innerWidth > 768) {
        document.getElementById("movie-content").style.display = "flex";
    }
    else{
        displayMobile();
    }
    
    document.getElementById("quizImage").style.display = 'none';
    document.getElementById("koniec").style.display='none';
    document.getElementById("cytat").style.display='block';
    document.getElementById("buttonAnswerCytatyMovie").style.display='inline-block';
    document.getElementById("button2").style.display='inline-block';
    document.getElementById("buttonRandomCytatyMovie").style.display='inline-block';
    document.getElementById("movieName").style.display='inline-block';
    document.getElementById("tytul").style.display='block';

    document.getElementById("raperName").style.display="none";
    document.getElementById('buttonAnswerMovie').style.display = "none";
    document.getElementById('buttonRandomMovie').style.display = "none";
    document.getElementById('buttonAnswerRap').style.display = "none";
    document.getElementById('buttonRandomRap').style.display = "none";
    document.getElementById('buttonAnswerCytaty').style.display = "none";
    document.getElementById('buttonRandomCytaty').style.display = "none";
}

/**
 * Funkcja losuje kolejny cytat, wyswietla w divie, przypisuje do zmiennych po wyborze
 * Jezeli dlugosc talbicy uzytych indekow jest rowna tablicy zdjec to wywoluje funckje 
 *         end(usedImageIndexes.length)
 * W innych wypadkach losuje zmienna randomIndex. Wstawia do quizu zdjecie o danym indeksie z folderu
 * 
 * @function 
 */
function getRandomCytatMovie(){

    if (usedImageIndexes.length === iloscCytatowMovie) {
        end(usedImageIndexes.length);
    } else {
        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * movieKeys.length);
        } while (usedImageIndexes.includes(randomIndex));

        usedImageIndexes.push(randomIndex);
        console.log(randomIndex);
        
        const movieName = movieKeys[randomIndex];
        const movieCytat = bazaCytatyMovie[0][movieName].tekst;

        // Aktualizuje elementy na stronie z nowym cytatem
        var cytatElement = document.getElementById("cytat");
        cytatElement.innerHTML = movieCytat;
        document.getElementById("movieName").value = "";

        currentTitleCytatMovie=movieName.replace(/\s/g, "").toLowerCase();
        console.log(usedImageIndexes);
    }
}

/**
  * Pobiera inputy do zmiennych
 * Jezeli input jest pusty funkcja wywoluje 
 *          brakOdpowiedzi();
 *          i konczy dzialanie
 * Usuwa białe znaki oraz zamienia wszystkie litery na małe. 
 * Jeżeli chociaż jeden input zgadza sie z nazwa obrazka to uzytkownikowi przyznawany jest punkt 
 * Jeżeli oba input sie zgadzaja przyznawane są dwa punkty
 * 
 * Wywolywane sa funckcje
 *              updateResultTable3()
 *              sucess()
 *              getRandomCytatMovie();
 *          w przeciwnym wypadku usuwa wprowadzone znaki do inputa oraz wywouje funkcje 
 *              fail()
 * @function 
 */
function checkAnswerCytatMovie() {
    const movieNameInputSpace = document.getElementById("movieName").value;
    const movieNameInput = movieNameInputSpace.replace(/\s/g, "").toLowerCase();


    if (!movieNameInput) {
        brakOdpowiedzi();
        return;
    }

    if(movieNameInput === currentTitleCytatMovie){
        points++;
    
        uzytkownicyCytatyMovie[username].wynik = points;
        localStorage.setItem("uzytkownicyCytatyMovie", JSON.stringify(uzytkownicyCytatyMovie));
        updateResultTableCytatyMovie();
        sucess();
        getRandomCytatMovie();
    } else {
        document.getElementById("movieName").value = "";
        fail();
    }
}

/**
 * Chowa elemnty quizu 
 * 
 * @function
 */
function displayEndCytatyMovie(){
    document.getElementById("cytat").style.display = 'none';
    document.getElementById("buttonAnswerCytatyMovie").style.display='none';
    document.getElementById("button2").style.display='none';
    document.getElementById("buttonRandomCytatyMovie").style.display='none';
    document.getElementById("movieName").style.display='none';
    document.getElementById("tytul").style.display='none';
}

/**
 * Forem szuka uzytkownika w obiekcie, nastepnie wstawia nazwe uzytkownika i wynik do tabeli.
 * 
 *@function 
 */
function updateResultTableCytatyMovie() {
    //Aktualizuj tabele
    var resultTableBody = document.querySelector("#resultTableMovie tbody");
    resultTableBody.innerHTML = "";
    for (const [username, user] of Object.entries(uzytkownicyCytatyMovie)) {
        var row = resultTableBody.insertRow();
        var usernameCell = row.insertCell(0);
        var pointsCell = row.insertCell(1);

        usernameCell.innerText = user.nazwa;
        pointsCell.innerText = user.wynik;
    }
}