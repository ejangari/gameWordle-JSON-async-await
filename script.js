let wordInserted = "";
let currentLine = document.querySelector(".game").firstElementChild;
let currentSquare = currentLine.firstElementChild;
let letterOfWordToGuess = []; //Contiene en cada espacio del array las letras de la palabra a adivinar
let letterOfWordOfDayArray = [];
let pressEnter = false;

let idCurrentLetterOnSquare = [];//idCurrentLetterOnSquare
let classNameCurrentLine = [];

let squareGreen;
let squareOrange;

let wordOfDay='';
let idCurrentSquare;
let loadPage=false;

// Event listener for keydown event
document.addEventListener('keydown', async function (event) {
    console.log('Empezo a Escuchar: '+event.key);
    console.log('wordInserted.length: '+wordInserted.length);

    if(wordInserted.length === 0){
        //Consumir API para validar si el usuario adivino la palabra
        wordOfDay = await getWord();
        console.log('palabra a adivinar: ' + wordOfDay);
    }

    if (event.code.startsWith('Key')) {
        console.log('Key pressedddddddddddd');

        if(wordInserted.length < 5){
            currentSquare.textContent = event.key;
            console.log('event.key presionado: '+event.key);
        }else{
            console.log('No tiene mas espacios para ingresar la letra');
        }

        
        console.log('Tiene nextElementSibling ???'+currentSquare.nextElementSibling);
        pressEnter = false;
        if (currentSquare.nextElementSibling) {
            console.log('----------Si tiene nextElementSibling ???'+currentSquare.nextElementSibling);


            //obtener el className de la linea de la letra ingresada
            classNameCurrentLine = currentLine.className;//guessLine1
            //console.log('classNameCurrentLine: '+classNameCurrentLine);

            //obtener el id de la linea de la letra ingresada
            idCurrentLetterOnSquare = idCurrentLetterOnSquare.concat(currentSquare.id);
            idCurrentSquare = currentSquare.id;
            console.log('idCurrentLetterOnSquare: '+idCurrentLetterOnSquare + ' ,ID LETRA ingresada: '+currentSquare.id);

            //aca esta cambiando al next sibling
            currentSquare = currentSquare.nextElementSibling;

            console.log('wordInserted.length ANTES del <=4 : '+wordInserted.length);
            console.log('wordInserted: '+wordInserted);
            if (wordInserted.length <= 4) {
                wordInserted += event.key;
                letterOfWordToGuess = letterOfWordToGuess.concat(event.key);
                //idCurrentLetterOnSquare = idCurrentLetterOnSquare.concat(idCurrentLetterOnSquare);
                console.log('Adiciono letter to wordInserted: '+wordInserted);       
                console.log('WordInserted.length: '+wordInserted.length);        
                // console.log('Adiciono letter to letterOfWordToGuess: '+letterOfWordToGuess);            
                // console.log('Adiciono letter to idCurrentLetterOnSquare: '+idCurrentLetterOnSquare);
            }
        } else {
            console.log('----------NO TIENE  nextElementSibling: '+currentSquare.nextElementSibling);
            console.log('wordInserted.length Later: '+wordInserted.length);
            console.log('wordInserted Later: '+wordInserted);
            if (wordInserted.length <= 4) {
                wordInserted += event.key;
                
                letterOfWordToGuess = letterOfWordToGuess.concat(event.key);
                idCurrentSquare = currentSquare.id;
                idCurrentLetterOnSquare = idCurrentLetterOnSquare.concat(currentSquare.id);
                
                console.log('Adiciono letter to wordInserted: '+wordInserted+'  FUERA del if del NextSElementibling');
                console.log('Adiciono letter to letterOfWordToGuess: '+letterOfWordToGuess+'  FUERA del if del NextSElementibling');
                console.log('Adiciono letter to idCurrentLetterOnSquare: '+idCurrentLetterOnSquare+'  FUERA del if del NextSElementibling');
                console.log('Adiciono letter to  WordInserted.length: '+wordInserted.length); 
            }    

            //Debe presionar Enter o Borrar
            //Si no tiene nextElementSibling, el usuario debe pasar o q presiona enter o backspace
            console.log("No tiene nextElementSibling, el usuario debe pasar o q presiona enter o backspace");   
        }
        //validateMaxLength(event, 1);
    } else if (event.code.startsWith('Enter')) {
        pressEnter = true;
        console.log('Enter pressed: '+pressEnter);

        console.log('wordInserted.length en el ENTER: '+wordInserted.length);
        console.log('En el Enter wordInserted: '+wordInserted);

        if (wordInserted.length > 0) {
            //consumir el API validar si es palabra
            const isValidWord = await validateIsWord(wordInserted);
            console.log("Es una palabra valida: "+isValidWord);

            if(isValidWord){
                console.log('wordOfDay es === a wordInserted: '+wordOfDay === wordInserted);
                if (wordOfDay === wordInserted) {
                    //alert('You win');
                    loadPage=false;
                    //poner en verde la palabra
                    for(let i=0; i<wordInserted.length;i++){
                        squareGreen = document.getElementById(idCurrentLetterOnSquare[i]);
                        squareGreen.style.background = "green";
                    }
                    reloadPage(loadPage);
                    return;
                } else {

                    console.log('Buen intento pero no es la palabra del dia, vamos a colocar los colores de las letras que si aparecen en la palabra del dia');

                    const itemCountsWordDay = countItems(wordOfDay);
                    //console.log('itemCountsWordDay: ' + JSON.stringify(itemCountsWordDay));
                    // itemCountsWordDay:{
                    //     "a":{                    //keysWordDay
                    //         "count":2,
                    //         "position":[0,3]
                    //         },
                    //     "t":{                    //keysWordDay
                    //         "count":1,
                    //         "position":[1]
                    //         },
                    //     "m":{                    //keysWordDay
                    //         "count":1,
                    //         "position":[2]
                    //         },
                    //     "s":{                    //keysWordDay
                    //         "count":1,
                    //         "position":[4]
                    //         }
                    // }
                    const keysWordDay = Object.keys(itemCountsWordDay);
                    // console.log('keysWordDay: ' + keysWordDay); //keysWordDay: a,t,m,s    Es cada letra del array de la palabra del dia sin repetir
                    // console.log('keysWordDay.length: ' + keysWordDay.length); //keysWordDay.length: 4


                    const itemCountsWordInserted = countItems(wordInserted);
                    //console.log('itemCountsWordInserted: ' + JSON.stringify(itemCountsWordInserted));
                    // itemCountsWordInserted: {
                    //     "a":{                        //keysWordInserted
                    //         "count":2,
                    //         "position":[0,4]
                    //         },
                    //     "m":{                        //keysWordInserted
                    //         "count":2,
                    //         "position":[1,2]
                    //         },
                    //     "s":{                        //keysWordInserted
                    //         "count":1,
                    //         "position":[3]
                    //         }
                    // }
                    const keysWordInserted = Object.keys(itemCountsWordInserted);
                    //console.log('keysWordInserted: ' + keysWordInserted); //keysWordInserted: a,m,s    Es cada letra del array de la palabra del dia sin repetir
                    console.log('-------Antes del primre FOR j=0, keysWordDay.length: ' + keysWordDay.length); //keysWordDay.length:

                    for (j = 0; j < keysWordDay.length; j++) { //keysWordDay.length: 4
                        //console.log('keysWordDay[' + j + ']: ' + keysWordDay[j]);
                        // keysWordDay[0]: a
                        // keysWordDay[1]: t
                        // keysWordDay[2]: m
                        // keysWordDay[3]: s

                        const countWordDay = itemCountsWordDay[keysWordDay[j]];
                        //console.log('countWordDay : ' + JSON.stringify(countWordDay));
                        //countWordDay: {"count":2,"position":[0,3]}                Letra a de la palabra del dia
                        // countWordDay: {"count":1,"position":[1]}                 Letra t de la palabra del dia
                        // countWordDay: {"count":1,"position":[2]}                 Letra m de la palabra del dia
                        // countWordDay: {"count":1,"position":[4]}                 Letra s de la palabra del dia
                        
                        //console.log('countWordDay.count: ' + countWordDay.count);
                        //countWordDay.count: 2
                        //countWordDay.count: 1
                        //countWordDay.count: 1
                        //countWordDay.count: 1



                        console.log('-------Antes del primre FOR m=0, keysWordInserted.length: ' + keysWordInserted.length); //keysWordInserted.length:
                        for (m = 0; m < keysWordInserted.length;) { //keysWordInserted.length: 3
                            //console.log('keysWordInserted[' + m + ']: ' + keysWordInserted[m]);
                            // keysWordInserted[0]: a
                            // keysWordInserted[2]: m
                            // keysWordInserted[3]: s

                            const countWordInserted = itemCountsWordInserted[keysWordInserted[m]];
                            console.log('countWordInserted : ' + JSON.stringify(countWordInserted));
                            //countWordInserted: {"count":2,"position":[0,4]}                Letra l de la palabra del dia
                            // countWordInserted: {"count":1,"position":[1]}                 Letra o de la palabra del dia
                            // countWordInserted: {"count":1,"position":[2]}                 Letra c de la palabra del dia
                            // countWordInserted: {"count":1,"position":[3]}                 Letra a de la palabra del dia
                            
                            //console.log('countWordInserted.count: ' + countWordInserted.count);
                            //countWordInserted.count: 2
                            //countWordInserted.count: 1
                            //countWordInserted.count: 1
                            //countWordInserted.count: 1
                            

                            console.log('Son iguales las letras????? ' + keysWordDay[j] + ' === ' + keysWordInserted[m]);
                            //Son iguales las letras:
                            if (keysWordDay[j] === keysWordInserted[m]) {
                                console.log('Si son iguales las letras: ' + keysWordDay[j] + ' === ' + keysWordInserted[m]);
                                //validar posiciones y cantidad de veces q se repite la letra

                                console.log('...FOR i=0 hasta donde countWordDay.count es:' + countWordDay.count);
                                for (i = 0; i < countWordDay.count;) {
                                    console.log('...keysWordDay[j]: '+keysWordDay[j]+ ' & Position WordDay: ' + countWordDay.position[i]);  //Son las posiciones de la letra en la palabra del dia en la q esta la letra
                                    // Position WordDay: 0
                                    // Position WordDay: 3


                                    //Debo averiguar la posicion de la letra en lapalabra insertada si es la misma de la posicion palabra del dia??

                                    console.log('......FOR n=0 hasta donde countWordInserted.count es: ' + countWordInserted.count);
                                    for (n = 0; n < countWordInserted.count;n++) {
                                        console.log('Entro al for de N=0');
                                        console.log('......keysWordInserted[m]: '+keysWordInserted[m]+ ' & Position WordInserted: ' + countWordInserted.position[n]);  //Son las posiciones de la letra en la palabra del dia en la q esta la letra
                                        // Position WordInserted: 3


                                        console.log('--------countWordDay.position['+i+']: ' + countWordDay.position[i] + ' & countWordInserted.position['+n+']: ' + countWordInserted.position[n]);
                                        if(countWordDay.position[i] === countWordInserted.position[n]){
                                            //ponga en verde la cantidad de los cuadros exactos
                                            console.log('VERDE idCurrentLetterOnSquare: '+idCurrentLetterOnSquare[countWordInserted.position[n]]);
                                            squareGreen = document.getElementById(idCurrentLetterOnSquare[countWordInserted.position[n]]);
                                            squareGreen.style.background = "green";
                                            console.log('************squareGreen.style.background: ' + squareGreen.style.background);
                                            i++;
                                        }else{
                                            console.log('No son iguales las posiciones aunque las letras seasn las mismas, entonces hay q poner el color naranja en la posicion de la letra adivinada');
                                            //ponga en naranja la cantidad de los cuadros exactos
                                            console.log('ORANGE idCurrentLetterOnSquare: '+idCurrentLetterOnSquare[countWordInserted.position[n]]);
                                            squareOrange = document.getElementById(idCurrentLetterOnSquare[countWordInserted.position[n]]);
                                            squareOrange.style.background = "orange";
                                            console.log('************squareGreen.style.background: ' + squareOrange.style.background);
                                            i++;
                                        }
                                        console.log('Se salio del IF donde se comparan las posiciones de las letras');
                                    }//Fin n=0
                                    console.log('Se salio del FOR de las posiciones de las letras de la palabra ingresada, donde n=0');
                                    console.log('j: '+j+' m:'+m+' n= '+n+' y countWordInserted.count:'+countWordInserted.count+' ,keysWordDay[j]: ' +keysWordDay[j] + ' , keysWordInserted[m]: '+keysWordInserted[m]);
                                    //i++;
                                    console.log('i= '+i+' y countWordDay.count: '+countWordDay.count);
                                }//Fin i=0
                                console.log('Se salio del FOR de las posiciones de las letras de la palabra del dia, donde i=0');
                                m++;
                            }else{
                                //No son iguales las letras ingresadas
                                console.log('-------------No son iguales las letras ingresadas, que debemos hacer???');
                                
                                //Debo pasar a la siguiente letra de la palabra ingresada, para ver si esta dentro de la palabra del dia, osea aumentar el M del keyWordInserted
                                console.log('Antes el m: '+m);
                                console.log('Antes keysWordInserted['+m+']: '+keysWordInserted[m]);
                                m++;
                                console.log('despues el m: '+m);
                                console.log('Despues keysWordInserted['+m+']: '+keysWordInserted[m]);
                            }
                        }//Fin m=0
                        console.log('Se salio del FOR M=0 del tamano de las letras de la palabra ingresada sin repetir');
                    }//Fin j=0  
                    console.log('Se salio del FOR J=0 del tamano de las letras de la palabra del dia sin repetir');
                }
                console.log('Se salio del else cuando worDay y WordInserted no son iguales');

                //Cuando ya ingreso toda la palabra y presiono enter no debe dejar escribir mas letras en esa linea y debe pasar a la sgte linea
                console.log('Debe pasar a la sgte Linea: currentLine.nextElementSibling ANTES DEL IF '+currentLine); 
                console.log(currentLine.nextElementSibling);
                if (currentLine.nextElementSibling) {
                    console.log('Debe pasar a la sgte Linea: currentLine.nextElementSibling '+currentLine); 
                    currentLine = currentLine.nextElementSibling;    //Sgte fila guessLine2
                    console.log('Debe pasar de linea currentLine: '+currentLine.className);
                    classNameCurrentLine = currentLine.className;
                    console.log('classNameCurrentLine: '+classNameCurrentLine);


                    currentSquare = currentSquare.nextElementSibling;
                    console.log('currentSquare de la siguiente linea: '+currentLine.nextElementSibling);
                    currentSquare = currentLine.firstElementChild;

                    wordInserted = "";
                    letterOfWordToGuess = [];
                    idCurrentLetterOnSquare = [];

                } else {
                    loadPage=true;
                    reloadPage(loadPage);             
                }
            }else{
                alert(JSON.stringify(wordInserted)+' is not a valid word, let\'s try again');
                wordInserted = "";
                letterOfWordToGuess=[];
                idCurrentLetterOnSquare=[];
                //currentSquare.textContent = "";
                
                //Cuando ya ingreso toda la palabra y presiono enter no debe dejar escribir mas letras en esa linea y debe pasar a la sgte linea
                console.log(currentLine.nextElementSibling);
                if (currentLine.nextElementSibling) {
                    console.log('Debe pasar a la sgte Linea: currentLine.nextElementSibling '+currentLine); 
                    currentLine = currentLine.nextElementSibling;    //Sgte fila guessLine2
                    console.log('Debe pasar de linea currentLine: '+currentLine.className);
                    classNameCurrentLine = currentLine.className;
                    console.log('classNameCurrentLine: '+classNameCurrentLine);

                    currentSquare = currentSquare.nextElementSibling;
                    console.log('currentSquare de la siguiente linea: '+currentLine.nextElementSibling);
                    currentSquare = currentLine.firstElementChild;

                    wordInserted = "";
                    letterOfWordToGuess = [];
                    idCurrentLetterOnSquare = [];
                    //currentSquare.textContent = "";

                }else{
                    loadPage=true;
                    reloadPage(loadPage);
                }
            }
        } else {
            alert('No ingreso ninguna palabra, vuelve a intentarlo');
        }
    }else if (event.code.startsWith('Backspace')) {
    
        console.log('Entro por Backspace');

        if (pressEnter) {
            console.log('No se puede borrar, ya presiono Enter');
            pressEnter = false;
            console.log('pressEnter: ' + pressEnter);
            return false;
        } else {

            console.log('Se puede borrar, no ha presionado Enter');
            console.log('BACKSPACE pressed');
            pressEnter = false;

            //borrar la letra anterior y del array
            let a = idCurrentLetterOnSquare.length;
            console.log('idCurrentLetterOnSquare de la Letra a borrar: '+idCurrentLetterOnSquare);
            console.log('currentSquare.id de la Letra a borrar: '+currentSquare.id);

            console.log('Tamano de idCurrentLetterOnSquare on BACKSPACE: ' + a);
            //wordInserted -= event.key;
            //currentSquare.textContent = "";
            console.log('Entro a Borrar letras y wordInserted.length ANTES DE BORRAR LA LETRA: ' + wordInserted.length);
            

            let deleteColorOfIdCurrentLetterOnSquare;

            if (wordInserted.length>0) {
                console.log('Entro a wordInserted.length>0 en BACKSPACE: ' + wordInserted);
                console.log('Entro a wordInserted.length en BACKSPACE es: ' + wordInserted.length);

                if(wordInserted.length<5){
                    console.log('wordInserted.length es < 5, ENTRO por el IF, osea q debe borrar la letra anterior al currentSquare');
                    currentSquare = currentSquare.previousElementSibling;
                }
                    currentSquare.textContent = "";
                    wordInserted = wordInserted.slice(0, -1);
                    console.log('WordInserted despues de borrar: ' + wordInserted);
                    letterOfWordToGuess.pop();
                    idCurrentLetterOnSquare.pop();

                    console.log('Elimino letter to letterOfWordToGuess: '+letterOfWordToGuess);            
                    console.log('Elimino letter to idCurrentLetterOnSquare: '+idCurrentLetterOnSquare);
                    console.log('ID letter a borrar idCurrentSquare: '+idCurrentSquare);

                    //Cuando borre se deben quitar los colores de los square
                    deleteColorOfIdCurrentLetterOnSquare = '';
                    console.log('EDDYJO -     '+document.getElementById(idCurrentSquare));
                    deleteColorOfIdCurrentLetterOnSquare = document.getElementById(idCurrentSquare);
                    deleteColorOfIdCurrentLetterOnSquare.style.background = "white";
                    
                    console.log('Nuevo wordInserted.length DESPUES de haber borrado la letra: '+wordInserted.length);
                    console.log('Nuevo currentSquare.textContent DESPUES de haber borrado la letra: '+currentSquare.textContent);
                    console.log('Borro letter to wordInserted: '+wordInserted);            
                    console.log('Borro letter to letterOfWordToGuess: '+letterOfWordToGuess);            
                    console.log('Borro letter to idCurrentLetterOnSquare: '+idCurrentLetterOnSquare);

                    console.log('Current Id de la letra que borre: '+currentSquare.id);
                    idCurrentLetterOnSquare = idCurrentLetterOnSquare.concat(idCurrentSquare);
                    console.log('Anadió el ID de la letra borrada otra vez al vector idCurrentLetterOnSquare: '+idCurrentLetterOnSquare);

            } else {
                console.log('No hay letras para borrar');
                console.log('wordInserted length no es >0, NO entro por el IF');
            }
        }


    }else {
        console.log(event.code+' and '+event.key+' special key pressed, don\'t do anything');
        //document.removeEventListener('keydown', handleKeyDown); // Remove listener after keyDown
        //return false;
    }
});


//API to validate a word
async function validateIsWord(wordInserted) {
    const postValidateWord = "https://words.dev-apis.com/validate-word";
    console.log("Entro a validateIsWord y wordInserted: " + wordInserted);
    const promise = await fetch(postValidateWord, {
        method: "POST",
        body: JSON.stringify({ "word": wordInserted })
    });
    const processedResponse = await promise.json();
    return processedResponse.validWord;
}

//API to get a word
async function getWord() {
    const getWord = "https://words.dev-apis.com/word-of-the-day";
    console.log("Entro a getWord");
    const promise = await fetch(getWord, {
        method: "GET"
    });
    const processedResponse = await promise.json();
    return processedResponse.word;
}

function countItems(arr) {
    const counts = {};
    for (let i = 0; i < arr.length; i++) {
        //counts[item] = (counts[item] || 0) + 1;
        const item = arr[i];
        if (counts[item]) {
            counts[item].count++;
            counts[item].position.push(i);
        } else {
            counts[item] = { count: 1, position: [i] }
        }
    }
    return counts;
}

function reloadPage() {
    let delay;
    console.log('No hay mas lineas para escribir DEBERA EL LISTENER PARAR DE ESCUCHAR????');
    const loser = document.querySelector('h1');

    if(loadPage){
        loser.style.color = "red";
        loser.textContent += ' - You lose this Game';
        delay = 8000;
    }
    else{
        loser.style.color = "blue";
        loser.textContent += ' - You WIN this Game';
        delay = 4000;
        loadPage=false;
    }
    setTimeout(function() {
        location.reload();
        }, delay); // Refresh after 7 seconds   

}

