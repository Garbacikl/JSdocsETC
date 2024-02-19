let raperzy = [
    {
      Belmondo: {
        tekst: "''Po pięć koła se podjadę<br>Mój człowiek Donald ma już taką dziabę <br> Ty wykonujesz lot; Paweł Jumper <br> Wszystko jest kawałem oraz żartem''",
        nazwa: "Scrooge Ebenezer"
      },
      MalikMontana: {
        tekst: "''Czerwone podeszwy po czerwonym dywanie <br>Moje trampki z nazwy jakbym był chrześcijanem<br>Wchodzę znowu do Louis i witają szampanem<br>Zdjęcie chcesz mieć z gwiazdą<br>Podejdź, nie wstydź się chamie''",
        nazwa: "Lessie wróć"
      },
      Mata:{
        tekst:"'Masz się za estetkę, a ja znam brzydulę<br>Co sprzedaje nam te paczki w kształcie trumien<br>A jest coś, co przeraża nas bardziej, niż wizja raka i gangren<br>Niż wizja spalonych gardeł'",
        nazwa:"Lucky"   
    },
    Gospel:{
        tekst:"'Mam własny show jak Kuba Wojewódzki<br>Gdzie włochaty grubas gryzie wszystkich gości w sutki<br>Jeździć im po familii, kręcić filmy jak Ingrid Bergman<br>Gdzie pingwin gryzie piętę a na węgiel leci pętla'",
        nazwa:"Chciałbym być"
    },
    Opał:{
        tekst:"'Mama mówiła: 'Łukaszku, żyj tak, żeby do końca życia już mieć o czym pisać'<br>Mieć takie wsparcie w rodzicach to fart jest (co?), jak wpadnie, to zrobię Wam wakacje życia<br>Jak robimy coś nielegalnie, to chyba banalne, że nie rzucę tego na liniach<br>Twój idol tak robi, to fajnie (to hustler), a tak generalnie generuje przypał'",
        nazwa:"Bratushka"
    }
    }
  ];
let currentTitleCytat;
let currentRaperName;
let iloscRaperow = Object.keys(raperzy[0]).length;
const raperKeys = Object.keys(raperzy[0]);

var uzytkownicyCYTATY = JSON.parse(localStorage.getItem("uzytkownicyCYTATY")) || {};
localStorage.setItem("uzytkownicyCYTATY", JSON.stringify(uzytkownicyCYTATY));

/**
 * Wyswietla PANEL LOGOWANIA do quizu z cytatami tekstow
 * 
 * @function
 */
function startCytaty(){
    odNowa();
    document.getElementById("start-content").style.display = "block";
    document.getElementById("h2").style.display='block';
    document.getElementById("h2").innerText="cytaty polskich rapstars";
    document.getElementById("buttonCytaty").style.display='inline-block';
    document.getElementById("buttonAnswerCytaty").style.display='inline-block';
    document.getElementById("buttonRandomCytaty").style.display='inline-block';

    document.getElementById("buttonRap").style.display = 'none';
    document.getElementById("buttonMovie").style.display='none';
    document.getElementById("buttonCytatyMovie").style.display='none';
}

/**
 * Rozpozyna sesje tworzac nowego uzytkownika w lokalStorage
 * Jeżeli nazwa nie jest pusta i nie powtarza się, to rozpozyna sesje tworzac nowego uzytkownika w lokalStorage. Wywoluje funkcje 
 *          getRandomImageRap()
 *          displayStartRap()
 *          updateResultTable3()
 * Gdy warunki nie sa spelnione wywoluje funkcje 
 *         brakOdpowiedzi()
 * lub     zajetanazwa()
 * @function
 */
function startSessionCytaty() {
    username = document.getElementById("username").value;
    points=0;
    if (username !== "") {
        if (!uzytkownicyCYTATY[username]){
            uzytkownicyCYTATY[username] = {
                nazwa: username,
                wynik: 0
            }

            // Zapisz zaktualizowane dane w localStorage
            localStorage.setItem("uzytkownicyCYTATY", JSON.stringify(uzytkownicyCYTATY));
            
            getRandomCytat();
            displayStartCytaty();
            updateResultTable3();
            var listaNazwUzytkownikow = Object.keys(uzytkownicyCYTATY);

            console.log("Muzyka Cytaty");
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
 * Otwiera okno z quizem odkrywajac elemnty dokumentu
 * 
 * @function
 */
function displayStartCytaty(){
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
    document.getElementById("buttonAnswerCytaty").style.display='inline-block';
    document.getElementById("button2").style.display='inline-block';
    document.getElementById("buttonRandomCytaty").style.display='inline-block';
    document.getElementById("movieName").style.display='inline-block';
    document.getElementById("tytul").style.display='block';
    document.getElementById("raperName").style.display="block";


    document.getElementById('buttonAnswerMovie').style.display = "none";
    document.getElementById('buttonRandomMovie').style.display = "none";
    document.getElementById('buttonAnswerRap').style.display = "none";
    document.getElementById('buttonRandomRap').style.display = "none";
    document.getElementById('buttonAnswerRap').style.display = "none";
    document.getElementById("buttonAnswerCytatyMovie").style.display='none';
    document.getElementById("buttonRandomCytatyMovie").style.display='none';

}

/**
 * Funkcja losuje kolejny cytat, wyswietla w divie, przypisuje do zmiennych po wyborze
 * Jezeli dlugosc talbicy uzytych indekow jest rowna tablicy zdjec to wywoluje funckje 
 *         end(usedImageIndexes.length*2)
 * W innych wypadkach losuje zmienna randomIndex. Wstawia do quizu zdjecie o danym indeksie z folderu. Ustawia nazwe i tytul jako zmienna globalna
 * 
 * @function
 */
function getRandomCytat(){

    if (usedImageIndexes.length === iloscRaperow) {
        end(usedImageIndexes.length*2);
    } else {
        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * raperKeys.length);
        } while (usedImageIndexes.includes(randomIndex));

        usedImageIndexes.push(randomIndex);
        console.log(randomIndex);
        
        const raperName = raperKeys[randomIndex];
        const raperCytat = raperzy[0][raperName].tekst;
        const titleCytat = raperzy[0][raperName].nazwa;

        // Aktualizuje elementy na stronie z nowym cytatem
        var cytatElement = document.getElementById("cytat");
        cytatElement.innerHTML = raperCytat;
        document.getElementById("movieName").value = "";
        document.getElementById("raperName").value = "";

        currentRaperName = raperName.replace(/\s/g, "").toLowerCase();
        currentTitleCytat = titleCytat.replace(/\s/g, "").toLowerCase();

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
 *              getRandomImageRap()
 *          w przeciwnym wypadku usuwa wprowadzone znaki do inputa oraz wywouje funkcje 
 *              fail() 
 * @funcion
 */
function checkAnswerCytat() {
    const movieNameInputSpace = document.getElementById("movieName").value;
    const movieNameInput = movieNameInputSpace.replace(/\s/g, "").toLowerCase();
    
    const raperNameInputSpace = document.getElementById("raperName").value;
    const raperNameInput = raperNameInputSpace.replace(/\s/g, "").toLowerCase();

    if (!movieNameInput && !raperNameInput) {
        brakOdpowiedzi();
        return;
    }

    if (raperNameInput === currentRaperName || movieNameInput === currentTitleCytat) {
        if(raperNameInput === currentRaperName && movieNameInput === currentTitleCytat){
        points=points+2;}
        else{
            points++;
        }
        uzytkownicyCYTATY[username].wynik = points;
        localStorage.setItem("uzytkownicyRAP", JSON.stringify(uzytkownicyCYTATY));
        updateResultTable3();
        sucess();
        getRandomCytat();
    } else {
        document.getElementById("movieName").value = "";
        document.getElementById("raperName").value="";
        fail();
    }
}

/**
 * Chowa elementy quizu z cytatami
 * 
 * @function
 */
function displayEndCytaty(){
    document.getElementById("cytat").style.display = 'none';
    document.getElementById("buttonAnswerCytaty").style.display='none';
    document.getElementById("button2").style.display='none';
    document.getElementById("buttonRandomCytaty").style.display='none';
    document.getElementById("movieName").style.display='none';
    document.getElementById("raperName").style.display='none';
    document.getElementById("tytul").style.display='none';
}

/**
 * Forem szuka uzytkownika w obiekcie, nastepnie wstawia nazwe uzytkownika i wynik do tabeli.
 * 
 *@function 
 */
function updateResultTable3() {
    //Aktualizuj tabele
    var resultTableBody = document.querySelector("#resultTableMovie tbody");
    resultTableBody.innerHTML = "";
    for (const [username, user] of Object.entries(uzytkownicyCYTATY)) {
        var row = resultTableBody.insertRow();
        var usernameCell = row.insertCell(0);
        var pointsCell = row.insertCell(1);

        usernameCell.innerText = user.nazwa;
        pointsCell.innerText = user.wynik;
    }
}