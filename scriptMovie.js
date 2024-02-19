
let username = "";
let points = 0;
const imageFilesMovie = ["PoranekKojota.jpg", "Psy.jpg", "tytanik.jpg", "300Spartan.jpg","karatekid.jpg","pulpfiction.jpg","potop.jpg","forestgump.jpg"];

let usedImageIndexes = [];


var uzytkownicyMOVIE = JSON.parse(localStorage.getItem("uzytkownicyMOVIE")) || {};
localStorage.setItem("uzytkownicyMOVIE", JSON.stringify(uzytkownicyMOVIE));

/////movie
/**Wyswietla PANEL LOGOWANIA do quizu z kadrami filmowymi
 * 
 * @function
 */

function startMovie(){
    odNowa();
    // Pokaż panel logowania
    document.getElementById("start-content").style.display = "block";
    document.getElementById("h2").style.display='block';
    document.getElementById("h2").innerText="Quiz z kadrami filmowymi";

    document.getElementById("buttonMovie").style.display='inline-block';
    document.getElementById("buttonCytaty").style.display='none';
    document.getElementById("buttonRap").style.display = 'none';
    document.getElementById("buttonCytatyMovie").style.display='none';

    
}

/**
 * Jeżeli nazwa nie jest pusta i nie powtarza się, to rozpozyna sesje tworzac nowego uzytkownika w lokalStorage. Wywoluje funkcje 
 *          getRandomImageRap()
 *          displayStartRap()
 *          updateResultTable2()
 * Gdy warunki nie sa spelnione wywoluje funkcje 
 *         brakOdpowiedzi()
 * lub     zajetanazwa()
 * @function
 */
function startSessionMovie() {
    username = document.getElementById("username").value;
    points=0;
    if (username !== "") {
        if (!uzytkownicyMOVIE[username]){
            uzytkownicyMOVIE[username] = {
                nazwa: username,
                wynik: 0
            };

            // Zapisz zaktualizowane dane w localStorage
            localStorage.setItem("uzytkownicyMOVIE", JSON.stringify(uzytkownicyMOVIE));
            getRandomImageMovie();
            displayStartMovie();


            updateResultTable();
            var listaNazwUzytkownikow = Object.keys(uzytkownicyMOVIE);
            console.log("Movie Zdjecia");
            console.log("Użytkownicy: "+listaNazwUzytkownikow);
        }
        else{
            zajetanazwa();
            document.getElementById("username").value = "";

        }
    } else {
        brakOdpowiedzi();
    }
}

/**
 * Funkcja pomocna jedynie do testowania aplikacji. Czysci nam dane w obiekcie i odswieza strone 
 * 
 * @function
 */
function clearLocalStorage() {
    console.log(uzytkownicyMOVIE);

    // Wyczyść local storage
    localStorage.clear();

    // Aktualizuj obiekt uzytkownicy, aby odzwierciedlić wyczyszczenie local storage
    uzytkownicyMOVIE = {};

    console.log(uzytkownicyMOVIE);
    updateResultTable();
      window.location.reload();

}
/**
 * Jezeli dlugosc talbicy uzytych indekow jest rowna tablicy zdjec to wywoluje funckje 
 *         end(usedImageIndexes.length)
 * W innych wypadkach losuje zmienna randomIndex. Wstawia do quizu zdjecie o danym indeksie z folderu.
 * 
 * @function
 */
function getRandomImageMovie() {
    //Wybiera zdjecie z folderu
    if (usedImageIndexes.length === imageFilesMovie.length) {
        end(usedImageIndexes.length);
    }
    else{
    let randomIndex;

    //losuje zdjecie z tablicyZdjec
    do {
        randomIndex = Math.floor(Math.random() * imageFilesMovie.length);
    } while (usedImageIndexes.includes(randomIndex));

    usedImageIndexes.push(randomIndex);

    const randomImageFileName = imageFilesMovie[randomIndex];
    const imagePath = `ZdjeciaMovie/${randomImageFileName}`;

    var imageElement = document.getElementById("quizImage");
    imageElement.src = imagePath;
    document.getElementById("movieName").value = "";
}
}

/**
 * Pobiera inputy do zmiennych
 * Jezeli input jest pusty funkcja wywoluje 
 *          brakOdpowiedzi();
 *          i konczy dzialanie
 * Usuwa białe znaki oraz zamienia wszystkie litery na małe. Jeżeli input zgadza sie z nazwa obrazka to 
 *          uzytkownikowi przyznawany jest punkt oraz wywolywane sa funckcje
 *              updateResultTable()
 *              sucess()
 *              getRandomImageRap()
 *          w przeciwnym wypadku usuwa wprowadzone znaki do inputa oraz wywouje funkcje 
 *              fail() 
 * @function
 */
function checkAnswerMovie() {
    //Sprawdz odpowiedz
    const movieNameInput = document.getElementById("movieName").value;
    var movieName = movieNameInput.replace(/\s/g, "").toLowerCase();

    if (!movieNameInput) {

        brakOdpowiedzi();
        return;
    }
    console.log("Input: "+movieNameInput);
    console.log("Odpowiedz:"+movieName);
    var imageElement = document.getElementById("quizImage");
    var imagePath = imageElement.src;
    var imageName = imagePath.split("/").pop().split(".")[0].toLowerCase();

    if (imageName == movieName) {
        points++;
        uzytkownicyMOVIE[username].wynik = points;
        localStorage.setItem("uzytkownicyMOVIE", JSON.stringify(uzytkownicyMOVIE));
        updateResultTable();
        sucess();
        getRandomImageMovie();
        console.log("Punkty:"+points);

    } else {
        document.getElementById("movieName").value = "";
        fail();
    }
}
/**
 * Forem szuka uzytkowinka w obikcie i dodaje do tabeli jego nazwe oraz punkty 
 * 
 * @function
 */
function updateResultTable() {
    //Aktualizuj tabele
    var resultTableBody = document.querySelector("#resultTableMovie tbody");
    resultTableBody.innerHTML = "";
    for (const [username, user] of Object.entries(uzytkownicyMOVIE)) {
        var row = resultTableBody.insertRow();
        var usernameCell = row.insertCell(0);
        var pointsCell = row.insertCell(1);

        usernameCell.innerText = user.nazwa;
        pointsCell.innerText = user.wynik;
    }
}


/**
 * Ukryj element .quiz-content
 *   var quizContent = document.querySelector(".quiz-content")
 *   var koniecElement = document.getElementById("koniec")
 * Podaje wynik koncowy. Wywoluje funkcjce :
 *      displayEndMovie()
 *      displayEndCytatyMovie()
 *      displayEndRap()
 *      displayEndCytaty()
 * @function
 */
function end(doZdobycia) {
    // Ukryj element .quiz-content
    var quizContent = document.querySelector(".quiz-content");
    var koniecElement = document.getElementById("koniec");

    // Sprawdź, czy element quizContent istnieje
    if (quizContent && koniecElement) {
    
        displayEndMovie();
        displayEndRap();
        displayEndCytaty();
        displayEndCytatyMovie();
                // Ustaw tekst w elemencie koniec
        koniecElement.style.display='block';
        koniecElement.style.paddingTop = '30%';
        koniecElement.style.color = '#333';
        koniecElement.style.fontSize = '50';
        koniecElement.style.fontWeight = 'bold';
        koniecElement.innerText = "Zdobyłeś:" + points + "/" + doZdobycia;
    }
}


/**
 * Usunięcie poprzedniej animacji
 * const messageElement = document.getElementById('message')
 * Wyswietla przez 2s animacje success w divie messaage
 * const messageElement = document.getElementById('message')
 *   messageElement.style.animation = 'none'
 *   messageElement.style.padding='5px 10px 0px 10px'
 *   messageElement.innerText = 'Poprawna odpowiedz'
 *   messageElement.style.border = '2px solid #45a049'
 *   messageElement.style.borderRadius = '10px'
 *   messageElement.style.backgroundColor = '#fff
 *   messageElement.style.animation='successAnimation 2s 2'
 *   setTimeout(() => {
 *       messageElement.innerText = ''
 *       messageElement.style.border = '0px'
 *       messageElement.style.animation = 'none'
 *       messageElement.style.padding='0px'
 *     }, 2000); 
 * @function
 */
function sucess(){
    // Wyswietl animacje success
    const messageElement = document.getElementById('message');
    messageElement.style.animation = 'none';
    messageElement.style.padding='5px 10px 0px 10px';
    messageElement.innerText = 'Poprawna odpowiedz';
    messageElement.style.border = '2px solid #45a049'; 
    messageElement.style.borderRadius = '10px'; 
    messageElement.style.backgroundColor = '#fff'; 
    messageElement.style.animation='successAnimation 2s 2'; 
    setTimeout(() => {
        messageElement.innerText = '';
        messageElement.style.border = '0px';
        messageElement.style.animation = 'none';
        messageElement.style.padding='0px'

      }, 2000); 
}
/** 
 * Usunięcie poprzedniej animacji
 * const messageElement = document.getElementById('message')
 * Wyswietla przez 2s animacje fail w divie messaage
 * messageElement.style.animation = 'none'
 *   messageElement.style.padding='5px 10px 0px 10px'
 *   messageElement.innerText = 'Błędna odpowiedz'
 *   messageElement.style.border = '2px solid rgb(251, 56, 92)'
 *   messageElement.style.borderRadius = '10px'
 *   messageElement.style.backgroundColor = '#fff'
 *   messageElement.style.animation='failAnimation 2s 2'
 *   setTimeout(() => {
 *       messageElement.innerText = ''
 *       messageElement.style.border = '0px'
 *       messageElement.style.animation = 'none'
 *       messageElement.style.padding='0px'
 *     }, 2000); 
 * @function
 */
function fail(){
    // Wyswietl animacje fail

    const messageElement = document.getElementById('message');

    // Usunięcie poprzedniej animacji
    messageElement.style.animation = 'none';
    messageElement.style.padding='5px 10px 0px 10px';

    messageElement.innerText = 'Błędna odpowiedz';
    messageElement.style.border = '2px solid rgb(251, 56, 92)'; 
    messageElement.style.borderRadius = '10px'; 
    messageElement.style.backgroundColor = '#fff';
    messageElement.style.animation='failAnimation 2s 2'; 

    setTimeout(() => {
        messageElement.innerText = '';
        messageElement.style.border = '0px';
        messageElement.style.animation = 'none';
        messageElement.style.padding='0px'
      }, 2000); 
}

/**
 * Usunięcie poprzedniej animacji
 * const messageElement = document.getElementById('message')
 * Wyswietla przez 2sek brakOdpwoiedzi animacje w divie messaage
 * messageElement.style.animation = 'none'
 *   messageElement.style.padding='5px 10px 0px 10px'
 *   messageElement.innerText = 'Brak odpowiedzi'
 *   messageElement.style.border = '2px solid rgb(235, 187, 66)'
 *   messageElement.style.borderRadius = '10px'
 *   messageElement.style.backgroundColor = '#fff'
 *   messageElement.style.animation = 'brakOdpowiedziAnimation 2s 2'
 *   setTimeout(() => {
 *       messageElement.innerText = ''
 *       messageElement.style.border = '0px'
 *       messageElement.style.animation = 'none'
 *       messageElement.style.padding='0px'
 *     }, 2000);
 * @function
 */
function brakOdpowiedzi() {
    // Wyswietl animacje brakOdpowiedzi

    const messageElement = document.getElementById('message');

    // Usunięcie poprzedniej animacji
    messageElement.style.animation = 'none';
    messageElement.style.padding='5px 10px 0px 10px';

    messageElement.innerText = 'Brak odpowiedzi';
    messageElement.style.border = '2px solid rgb(235, 187, 66)';
    messageElement.style.borderRadius = '10px';
    messageElement.style.backgroundColor = '#fff';
    messageElement.style.animation = 'brakOdpowiedziAnimation 2s 2';

    setTimeout(() => {
        messageElement.innerText = '';
        messageElement.style.border = '0px';
        messageElement.style.animation = 'none';
        messageElement.style.padding='0px'
      }, 2000);
}

/**
 * Usunięcie poprzedniej animacji
 * const messageElement = document.getElementById('message')
 * Wyswietla animacje  w divie messaage uzywany przy loowaniu
 * messageElement.style.animation = 'none'
 *   messageElement.style.padding='5px 10px 0px 10px'
 *     messageElement.innerText = 'Nazwa Zajeta'
 *   messageElement.style.border = '2px solid rgb(235, 187, 66)'
 *   messageElement.style.borderRadius = '10px'
 *   messageElement.style.backgroundColor = '#fff'
 *   messageElement.style.animation = 'brakOdpowiedziAnimation 2s 2'
 *   setTimeout(() => {
 *       messageElement.innerText = ''
 *       messageElement.style.border = '0px'
 *       messageElement.style.animation = 'none'
 *       messageElement.style.padding='0px'
 *     }, 2000);
 * @function
 */
function zajetanazwa(){
    const messageElement = document.getElementById('message');

    // Usunięcie poprzedniej animacji
    messageElement.style.animation = 'none';
    messageElement.style.padding='5px 10px 0px 10px';
    messageElement.innerText = 'Nazwa Zajeta';
    messageElement.style.border = '2px solid rgb(235, 187, 66)';
    messageElement.style.borderRadius = '10px';
    messageElement.style.backgroundColor = '#fff';
    messageElement.style.animation = 'brakOdpowiedziAnimation 2s 2';
    setTimeout(() => {
        messageElement.innerText = '';
        messageElement.style.border = '0px';
        messageElement.style.animation = 'none';
        messageElement.style.padding='0px'
      }, 2000);
}


/**
 * Chowa elementy quizu z kadrami filmowymi
 * document.getElementById("quizImage").style.display = 'none'
 *   document.getElementById("buttonAnswerMovie").style.display='none'
 *   document.getElementById("button2").style.display='none'
 *   document.getElementById("buttonRandomMovie").style.display='none'
 *  document.getElementById("movieName").style.display='none'
 *   document.getElementById("tytul").style.display='none'
 * @function
 */
function displayEndMovie(){
    document.getElementById("quizImage").style.display = 'none';
    document.getElementById("buttonAnswerMovie").style.display='none';
    document.getElementById("button2").style.display='none';
    document.getElementById("buttonRandomMovie").style.display='none';
    document.getElementById("movieName").style.display='none';
    document.getElementById("tytul").style.display='none';
}
/**
 * Wyswietla elementy quizu z kadrami chowa reszte
 * 
 * @function
 */
function displayStartMovie(){
    document.getElementById("start-content").style.display = "none";
    if(window.innerWidth > 768) {
        document.getElementById("movie-content").style.display = "flex";
    } else {
        displayMobile();
    }    
    document.getElementById("quizImage").style.display = 'block';
    document.getElementById("koniec").style.display='none';

    document.getElementById("buttonAnswerMovie").style.display='inline-block';
    document.getElementById("button2").style.display='inline-block';
    document.getElementById("buttonRandomMovie").style.display='inline-block';
    document.getElementById("movieName").style.display='inline-block';
    document.getElementById("tytul").style.display='block';

    document.getElementById("cytat").style.display="none";
    document.getElementById("raperName").style.display="none";
    document.getElementById('buttonAnswerRap').style.display = "none";
    document.getElementById('buttonRandomRap').style.display = "none";
    document.getElementById('buttonAnswerCytaty').style.display = "none";
    document.getElementById('buttonRandomCytaty').style.display = "none";
    document.getElementById("buttonAnswerCytatyMovie").style.display='none';
    document.getElementById("buttonRandomCytatyMovie").style.display='none';
}


/**
 * Chowa movie kontent i zeruje zmienne uzykownika
 * 
 * @function
 */
function odNowa(){
    document.getElementById("movie-content").style.display = 'none';

    // Wyzeruj zmienną points
    points = 0;

    // Wyczyść używane indeksy obrazków
    usedImageIndexes = [];
    document.getElementById("username").value = "";
}

/**
 * wyswietla tabele wynikow
 * var resultContainer = document.getElementById('tableMovie')
 *   resultContainer.style.display = 'block'
 *   document.getElementById('pokazywanie').style.display='none'
 *   document.getElementById('howanieee').style.display='inline-block'
 * @function
 */
function showResults() {
    var resultContainer = document.getElementById('tableMovie');
    resultContainer.style.display = 'block';
    document.getElementById('pokazywanie').style.display='none';
    document.getElementById('howanieee').style.display='inline-block';
}

/**
 * chowa tabele wynikow
 * var resultContainer = document.getElementById('tableMovie')
 *   resultContainer.style.display = 'none'
 *   document.getElementById('pokazywanie').style.display='inline-block'
 *   document.getElementById('howanieee').style.display='none'
 * @function
 */
function hideResults() {
    var resultContainer = document.getElementById('tableMovie');
    resultContainer.style.display = 'none';
    document.getElementById('pokazywanie').style.display='inline-block';
    document.getElementById('howanieee').style.display='none';
}

/**
 * zmienne gdy uzytkownik uzywa mobilnego urzadzenia
 * 
 * @function
 */
function displayMobile(){
    document.getElementById("movie-content").style.display = "block";
    document.getElementById("movie-content").style.width = "80%";
    document.getElementById("howanieee").style.transform = "rotate(270deg)";
    document.getElementById("howanieee").style.margin= "-180px";
    document.getElementById("pokazywanie").style.margin= "-180px";
    document.getElementById("pokazywanie").style.transform = "rotate(90deg)";
    document.getElementById("tableMovie").style.width="100%";
}