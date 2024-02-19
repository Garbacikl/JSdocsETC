
var uzytkownicyRAP = JSON.parse(localStorage.getItem("uzytkownicyRAP")) || {};
localStorage.setItem("uzytkownicyRAP", JSON.stringify(uzytkownicyRAP));

const imageFilesRap = ["mata.jpg", "gospel.jpg", "szpaku.jpg", "tacohemingway.jpg", "wini.jpg"];

/**
 * Wyswietla PANEL LOGOWANIA do quizu ze zdjeciami 
 * @function 
 */
function startRap(){
    odNowa();

    document.getElementById("start-content").style.display = "block";
    document.getElementById("h2").style.display='block';
    document.getElementById("h2").innerText="Rozpoznaj po zdjeciu gracza";
    document.getElementById("buttonRap").style.display='inline-block';
    document.getElementById('buttonAnswerRap').style.display='inline-block';
    document.getElementById('buttonRandomRap').style.display='inline-block';

    document.getElementById("buttonCytaty").style.display='none';
    document.getElementById("buttonMovie").style.display='none';
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
function startSessionRap() {
    username = document.getElementById("username").value;
    points=0;
    if (username !== "") {
        if (!uzytkownicyRAP[username]){
            uzytkownicyRAP[username] = {
                nazwa: username,
                wynik: 0
            };

            // Zapisz zaktualizowane dane w localStorage
            localStorage.setItem("uzytkownicyRAP", JSON.stringify(uzytkownicyRAP));
            
            getRandomImageRap();
            displayStartRap();

            updateResultTable2();
            var listaNazwUzytkownikow = Object.keys(uzytkownicyRAP);
            console.log("Muzyka Zdjecia");
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
 * Jezeli dlugosc talbicy uzytych indekow jest rowna tablicy zdjec to wywoluje funckje 
 *         end(usedImageIndexes.length)
 * W innych wypadkach losuje zmienna randomIndex. Wstawia do quizu zdjecie o danym indeksie z folderu.
 * 
 * @function 
 */
function getRandomImageRap() {
    //Wybiera zdjecie z folderu
    if (usedImageIndexes.length === imageFilesRap.length) {
        end(usedImageIndexes.length);
    }
    else{
    let randomIndex;

    //losuje zdjecie z tablicyZdjec
    do {
        randomIndex = Math.floor(Math.random() * imageFilesRap.length);
    } while (usedImageIndexes.includes(randomIndex));

    usedImageIndexes.push(randomIndex);

    const randomImageFileName = imageFilesRap[randomIndex];
    const imagePath = `ZdjecieRap/${randomImageFileName}`;

    var imageElement = document.getElementById("quizImage");
    imageElement.src = imagePath;
    document.getElementById("movieName").value = "";}
}

/**
 * Pobiera inputy do zmiennych
 * Jezeli input jest pusty funkcja wywoluje 
 *          brakOdpowiedzi();
 *          i konczy dzialanie
 * Usuwa białe znaki oraz zamienia wszystkie litery na małe. Jeżeli input zgadza sie z nazwa obrazka to 
 *          uzytkownikowi przyznawany jest punkt oraz wywolywane sa funckcje
 *              updateResultTable2()
 *              sucess()
 *              getRandomImageRap()
 *          w przeciwnym wypadku usuwa wprowadzone znaki do inputa oraz wywouje funkcje 
 *              fail()
 * @function 
 */
function checkAnswerRap() {
    //Sprawdz odpowiedz
    const movieNameInput = document.getElementById("movieName").value;
    var movieName = movieNameInput.replace(/\s/g, "").toLowerCase();

    if (!movieNameInput) {

        brakOdpowiedzi();
        return;
    }

    var imageElement = document.getElementById("quizImage");
    var imagePath = imageElement.src;
    var imageName = imagePath.split("/").pop().split(".")[0].toLowerCase();

    if (imageName == movieName) {
        points++;
        uzytkownicyRAP[username].wynik = points;
        localStorage.setItem("uzytkownicyRAP", JSON.stringify(uzytkownicyRAP));
        updateResultTable2();
        sucess();
        getRandomImageRap();

    } else {
        document.getElementById("movieName").value = "";
        fail();
    }
}
/**
 * Zamyka okno z tym quizem zakrywajac elementy
 * 
 * @function
 */

function displayEndRap(){
    document.getElementById("quizImage").style.display = 'none';
    document.getElementById("buttonAnswerRap").style.display='none';
    document.getElementById("button2").style.display='none';
    document.getElementById("buttonRandomRap").style.display='none';
    document.getElementById("movieName").style.display='none';
    document.getElementById("tytul").style.display='none';
}
/**
 * Otwiera okno z quizem odkrywajac elemnty dokumentu
 * 
 * @function
 */
function displayStartRap(){
    document.getElementById("start-content").style.display = "none";
    if(window.innerWidth > 768) {
        document.getElementById("movie-content").style.display = "flex";
    }
    else{
        displayMobile();
    }
    document.getElementById("quizImage").style.display = 'block';
    document.getElementById("koniec").style.display='none';

    document.getElementById("buttonAnswerRap").style.display='inline-block';
    document.getElementById("button2").style.display='inline-block';
    document.getElementById("buttonRandomRap").style.display='inline-block';
    document.getElementById("movieName").style.display='inline-block';
    document.getElementById("tytul").style.display='block';

    document.getElementById("cytat").style.display="none";
    document.getElementById("raperName").style.display="none";
    document.getElementById('buttonAnswerMovie').style.display = "none";
    document.getElementById('buttonRandomMovie').style.display = "none";
    document.getElementById('buttonAnswerCytaty').style.display = "none";
    document.getElementById('buttonRandomCytaty').style.display = "none";
    document.getElementById("buttonAnswerCytatyMovie").style.display='none';
    document.getElementById("buttonRandomCytatyMovie").style.display='none';
}

/**
 * Forem szuka uzytkownika w obiekcie, nastepnie wstawia nazwe uzytkownika i wynik do tabeli.
 * 
 * @function
 */
function updateResultTable2() {
    //Aktualizuj tabele
    var resultTableBody = document.querySelector("#resultTableMovie tbody");
    resultTableBody.innerHTML = "";
    for (const [username, user] of Object.entries(uzytkownicyRAP)) {
        var row = resultTableBody.insertRow();
        var usernameCell = row.insertCell(0);
        var pointsCell = row.insertCell(1);

        usernameCell.innerText = user.nazwa;
        pointsCell.innerText = user.wynik;
    }
}