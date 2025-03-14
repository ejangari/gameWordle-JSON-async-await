let wordInserted = "";
let currentLine = document.querySelector(".game").firstElementChild;
let currentSquare = currentLine.firstElementChild;
let letterOfWordToGuess = []; //Contiene en cada espacio del array las letras de la palabra a adivinar
let letterOfWordOfDayArray = [];
let pressEnter = false;

let letterUno = 0;
let letterDos = 0;
let letterTres = 0;
let letterCuatro = 0;
let letterCinco = 0;


let idCurrentLetterOnSquare = [];//idCurrentLetterOnSquare
let classNameCurrentLine = [];

let squareGreen;
let squareOrange;

// Event listener for keydown event
document.addEventListener('keydown', async function (event) {
    //console.log('Empezo a Escuchar: '+event.key);
    if (event.code.startsWith('Key')) {
        //console.log('Key pressedddddddddddd');
        currentSquare.textContent = event.key;
        // console.log('event.key presionado: '+event.key);
        // console.log('Tiene nextElementSibling ???'+currentSquare.nextElementSibling);
        pressEnter = false;
        if (currentSquare.nextElementSibling) {

            //obtener el className de la linea de la letra ingresada
            classNameCurrentLine = currentLine.className;//guessLine1
            //console.log('classNameCurrentLine: '+classNameCurrentLine);

            //obtener el id de la linea de la letra ingresada
            idCurrentLetterOnSquare = idCurrentLetterOnSquare.concat(currentSquare.id);
            //console.log('idCurrentLetterOnSquare: '+idCurrentLetterOnSquare);

            //aca esta cambiando al next sibling
            currentSquare = currentSquare.nextElementSibling;


            if (wordInserted.length <= 5) {
                wordInserted += event.key;
                letterOfWordToGuess = letterOfWordToGuess.concat(event.key);
                //idCurrentLetterOnSquare = idCurrentLetterOnSquare.concat(idCurrentLetterOnSquare);
                // console.log('Adiciono letter to wordInserted: '+wordInserted);            
                // console.log('Adiciono letter to letterOfWordToGuess: '+letterOfWordToGuess);            
                // console.log('Adiciono letter to idCurrentLetterOnSquare: '+idCurrentLetterOnSquare);
            }
        } else {

            wordInserted += event.key;
            letterOfWordToGuess = letterOfWordToGuess.concat(event.key);
            idCurrentLetterOnSquare = idCurrentLetterOnSquare.concat(currentSquare.id);
            // console.log('Adiciono letter to wordInserted: '+wordInserted+'  FUERA del if del NextSElementibling');
            // console.log('Adiciono letter to letterOfWordToGuess: '+letterOfWordToGuess+'  FUERA del if del NextSElementibling');
            // console.log('Adiciono letter to idCurrentLetterOnSquare: '+idCurrentLetterOnSquare+'  FUERA del if del NextSElementibling');





            //Debe presionar Enter o Borrar
            //Si no tiene nextElementSibling, el usuario debe pasar o q presiona enter o backspace
            //console.log("No tiene nextElementSibling, el usuario debe pasar o q presiona enter o backspace");   
        }
        //validateMaxLength(event, 1);
    } else if (event.code.startsWith('Enter')) {
        pressEnter = true;
        //console.log('Enter pressed: '+pressEnter);

        // console.log('BORRARON TODO: '+wordInserted.length);
        // console.log('En el Enter wordInserted: '+wordInserted);

        if (wordInserted.length > 0) {
            //consumir el API validar si es palabra
            const isValidWord = await validateIsWord(wordInserted);
            //console.log("Es una palabra valida: "+isValidWord);

            //if(isValidWord){
            //Consumir API para validar si el usuario adivino la palabra
            let wordOfDay = ['a', 't', 'm', 'a', 's'];//await getWord();
            //let wordOfDay = await getWord();
            console.log('palabra a adivinar: ' + wordOfDay);

            //Split Word of the day to compare any letter with the word(letter) guess
            /*for(i=0;i<5;i++){
                letterOfWordOfDayArray= wordOfDay.split('');
                //console.log('FOR FOR letterOfWordOfDayArray['+i+'] '+letterOfWordOfDayArray[i]);                
            }*/
            //console.log("Palabra a adivinar: "+wordOfDay);


            /*let comparation = compareArrays(letterOfWordOfDayArray, letterOfWordToGuess, idCurrentLetterOnSquare);

            if(comparation){
                alert('You win');
                //poner en verde la palabra
            }else{
                console.log('poner colores dentro de la funcion q se creo');
                
            }*/




            if (wordOfDay === wordInserted) {
                alert('You win');
                //poner en verde la palabra
            } else {

                console.log('Buen intento pero no es la palabra del dia');

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
                        //console.log('countWordInserted : ' + JSON.stringify(countWordInserted));
                        //countWordInserted: {"count":2,"position":[0,3]}                Letra a de la palabra del dia
                        // countWordInserted: {"count":1,"position":[1]}                 Letra t de la palabra del dia
                        // countWordInserted: {"count":1,"position":[2]}                 Letra m de la palabra del dia
                        // countWordInserted: {"count":1,"position":[4]}                 Letra s de la palabra del dia
                        
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

                                console.log('......FOR n=0 hasta donde countWordInserted.count es: ' + countWordInserted.count);
                                for (n = 0; n < countWordInserted.count;n++) {
                                    console.log('Entro al for de N=0');
                                    console.log('......keysWordInserted[m]: '+keysWordInserted[m]+ ' & Position WordInserted: ' + countWordInserted.position[n]);  //Son las posiciones de la letra en la palabra del dia en la q esta la letra
                                    // Position WordInserted: 0
                                    // Position WordInserted: 4


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
                                i++;
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
                    console.log('Se salio del FOR del tamano de las letras ingresadas sin repetir, m=0');
                }//Fin j=0


                //--------------------------------------------------------------------------------












                //--------------------------------------------------------------------------------



                /* const itemCountsWordInserted = countItems(wordInserted);
                 console.log('itemCountsWordInserted: ' +JSON.stringify(itemCountsWordInserted));
                 const keysWordInserted = Object.keys(itemCountsWordInserted);
                 console.log('keysWordInserted: '+keysWordInserted); //keysWordInserted: a,m,s   Es cada letra del array de la palabra ingresada sin repetir
                

                let posicionKeyWordDay = -1;
                let posicionKeyWordInserted = -1;
                //let indexWordDay = 0;
                //let indexWordInserted = 0;
                let positionsLetterWordDay = [];
                let positionsLetterWordInserted = [];
                let countRepeatedLettersWordDay = 0;
                let countRepeatedLettersWordInserted = 0;

                keysWordDay.forEach(keyWordDay => {
                    //console.log('keyWordDay: '+keyWordDay); //Es cada letra del array de la palabra del dia //por ejemplo a b i d e
                    //console.log(itemCountsWordDay[keyWordDay]); //Es la cantidad de veces q se repite la letra
                    const valueWordDay = itemCountsWordDay[keyWordDay];
                    //: '+wordOfDay.indexOf(keyWordDay)+'  keyWordDay: '+keyWordDay);   
                    //console.log(`IndexWordDay: ${indexWordDay}, KeyWordDay: ${keyWordDay}, ValueWordDay: ${valueWordDay}`);
                    positionsLetterWordDay += wordOfDay.indexOf(keyWordDay);
                    posicionKeyWordDay++;
                    console.log(`posicionKeyWordDay ${posicionKeyWordDay}, POSITION: ${positionsLetterWordDay} ,KeyWordDay: ${keyWordDay}, ValueWordDay: ${valueWordDay}`);
                    countRepeatedLettersWordDay = valueWordDay;
                    //indexWordDay++;

                    console.log('---------keysWordInserted: ' + keysWordInserted);//son las letras de la palabra ingresada sin repetir, ejemplo: 
                    // la palabra ammsa, keysWordInserted: a m s 



                    keysWordInserted.forEach(keyWordInserted => {
                        console.log('keyWordInserted: ' + keyWordInserted); //Es cada letra del array de la palabra ingresada
                        const valueWordInserted = itemCountsWordInserted[keyWordInserted];
                        //console.log('wordInserted  POSITION: '+wordInserted.indexOf(keyWordInserted)+ '  keyWordInserted: '+keyWordInserted);
                        //console.log(`IndexWordInserted: ${indexWordInserted}, KeyWordInserted: ${keyWordInserted}, ValueWordInserted: ${valueWordInserted}`);
                        positionsLetterWordInserted += wordInserted.indexOf(keyWordInserted);
                        posicionKeyWordInserted++;
                        console.log(`posicionKeyWordInserted ${posicionKeyWordInserted}, POSITION: ${positionsLetterWordInserted}, KeyWordInserted: ${keyWordInserted}, ValueWordInserted: ${valueWordInserted}`);
                        //indexWordInserted++;

                        if (keyWordInserted === keyWordDay) {
                            //Son iguales las letras
                            console.log('...Son iguales las letras: ' + keyWordInserted + ' === ' + keyWordDay);

                            //validar si estan en la misma posicion las letras
                            if (posicionKeyWordDay === posicionKeyWordInserted) {
                                //Estan en la msma posicion la misma letra adivinada y la letra de la palabra del dia
                                console.log('......Estan en la misma posicion la misma letra adivinada y la letra de la palabra del dia');
                                console.log('......countRepeatedLettersWordDay: ' + countRepeatedLettersWordDay);

                                if (countRepeatedLettersWordDay >= 1) {
                                    //Validar si hay mas ValueWordDay y restarlo
                                    console.log('.........Hay mas de una letra en la palabra del dia');
                                    countRepeatedLettersWordDay--;
                                    console.log('.........countRepeatedLettersWordDay: ' + countRepeatedLettersWordDay);

                                    //Poner color verde en la posicion indicada
                                    squareGreen = document.getElementById(idCurrentLetterOnSquare[posicionKeyWordDay]);
                                    squareGreen.style.background = "green";
                                    console.log('.........squareGreen.style.background: ' + squareGreen.style.background);
                                }
                            } else {
                                //NO estan en la msma posicion la misma letra adivinada y la letra de la palabra del dia 
                                console.log('NO estan en la msma posicion la misma letra adivinada y la letra de la palabra del dia');
                            }
                        } else {
                            //No son iguales las letras
                            console.log('...NO son iguales las letras: ' + keyWordInserted + ' != ' + keyWordDay);
                            console.log('...countRepeatedLettersWordDay: ' + countRepeatedLettersWordDay);


                            if (countRepeatedLettersWordDay >= 1) {//Aun hay una o mas letras repetidas en la palabra del dia
                                //Hay mas de una letras adivinada en la palabra del dia
                                console.log('Hay mas de una letra adivinada en la palabra del dia');
                            } else {
                                //no hay mas de una letra adivinada en la palabra del dia
                                console.log('NO hay mas de una letra adivinada en la palabra del dia');
                            }
                        }




                    });



                });
                console.log('keyWordDay.length: ' + posicionKeyWordDay);
                console.log('keyWordInserted.length: ' + posicionKeyWordInserted);

*/







                let a = 0;
                let b = 0;
                //for(a=0;a<tamanoKeyWordInserted;){
                //for(b=0;b<tamanoKeyWordDay;){
                console.log('keysWordDay[a]: ' + keysWordDay[a]);
                console.log('keysWordInserted[b]: ' + keysWordInserted[b]);
                /*if(keysWordDay[a] === keysWordInserted[b]){
                    console.log('Son iguales las letras');
                    squareGreen = document.getElementById(idCurrentLetterOnSquare[b]);
                    squareGreen.style.background = "green";
                    a++;
                    b++;
                }else{
                    console.log('No son iguales las letras');
                    squareOrange = document.getElementById(idCurrentLetterOnSquare[b]);
                    squareOrange.style.background = "orange";
                    b++;
                }*/
                //}
                //}







                //ponere color a cada una de las letras
                /*for(j=0;j<5;j++){  
                    for(i=0;i<5 && j<5;){
                        // console.log('j= '+j+' i= '+i);
                        // console.log(wordInserted.charAt(j) == wordOfDay.charAt(i));
                         console.log('j= '+j+'  LetraInsertada: '+wordInserted.charAt(j));
                         console.log('i= '+i+'  Letra de la Palabra: '+wordOfDay.charAt(i));
                        if(wordInserted.charAt(j) == wordOfDay.charAt(i)){ //Es igual la letra adivinada con la letra de la palabra del dia
                            if(j==i){//esta en la misma posicion hay q poner color verde
                                console.log('j es igual a i, estan en la misma posicion las letras: j=' +j+' i= '+i);
                                    //hay q poner color verde
                                    console.log('idCurrentLetterOnSquare: '+idCurrentLetterOnSquare[j]); //Id del square j
                                    squareGreen = document.getElementById(idCurrentLetterOnSquare[j]);
                                    console.log('squareGreen.style.background: '+squareGreen.style.background);
                                    //console.log('Se pone color verdeeeee');
                                    squareGreen.style.background = "green";
                                    console.log('squareGreen.style.background: '+squareGreen.style.background);
                                    j++;
                                    
                            }else{ //no estan en la misma posicion (j e i) hay q poner color naranja

                                console.log('no estan en la misma posicion');
                                console.log('idCurrentLetterOnSquare: '+idCurrentLetterOnSquare[j]); //Id del square j
                                //hay q poner color naranja
                                squareOrange = document.getElementById(idCurrentLetterOnSquare[j]);
                                //console.log('Se pone color naranjaaaaa');

                                squareOrange.style.background = "orange";
                                j++;

                                
                                
                            }
                            
                            //i++;
                            i=0;
                            //console.log('Dentro del IF j= '+j+' i= '+i);
                        }else{
                            //console.log('No son la misma letra, En el ELSE: j= '+j+' i= '+i);
                            if(i<5){ 
                                console.log('idCurrentLetterOnSquare de i: '+idCurrentLetterOnSquare[i]);
                                let colorSquare = document.getElementById(idCurrentLetterOnSquare[i]);
                                console.log('j= '+j+' i= '+i);
                                console.log('color square before: '+colorSquare.style.background);
                                if(colorSquare.style.background === "orange" || colorSquare.style.background === "green")
                                {
                                    console.log('entro por el IF  de colores naranja y verdes');
                                    //ya encontro una palabra con color naranja o verde entonecs no ponga esta palabra en ningun color
                                    i++;
                                }else{
                                    console.log('entro por el IF SIN COLORES verde o naranja');
                                    
                                    //si en algun momento no son iguales hay q poner color naranja
                                    console.log('idCurrentLetterOnSquare de J: '+idCurrentLetterOnSquare[j]);
                                    squareOrange = document.getElementById(idCurrentLetterOnSquare[j]);
                                    squareOrange.style.background = "white";
                                    //squareOrange.style.background = "orange";
                                    i++;
                                    
                                }


                                    /*console.log('entro por el IF de i<5 cuando las letras no son iguales');
                                    i++;
                                    //si en algun momento no son iguales hay q poner color naranja
                                    squareOrange = document.getElementById(idCurrentLetterOnSquare[j]);
                                    squareOrange.style.background = "white";
                                    //squareOrange.style.background = "orange";
                                    //aca iba un fin de comentario grande/*
                                
                            }   
                        }
                    }
                    i=0;
                    //console.log('iiiiiiiiii= '+i);
                }
                */
            }

            //Cuando ya ingreso toda la palabra y presiono enter no debe dejar escribir mas letras en esa linea y debe pasar a la sgte linea
            if (currentLine.nextElementSibling) {
                //console.log('Debe pasar a la sgte Linea: currentLine.nextElementSibling '+currentLine); 
                currentLine = currentLine.nextElementSibling;    //Sgte fila guessLine2
                //console.log('Debe pasar de linea currentLine: '+currentLine.className);
                classNameCurrentLine = currentLine.className;
                //console.log('classNameCurrentLine: '+classNameCurrentLine);


                currentSquare = currentSquare.nextElementSibling;
                //console.log('currentSquare de la siguiente linea: '+currentLine.nextElementSibling);
                currentSquare = currentLine.firstElementChild;

                wordInserted = "";
                letterOfWordToGuess = [];
                idCurrentLetterOnSquare = [];

            } else {
                console.log('No hay mas lineas para escribir DEBERA EL LISTENER PARAR DE ESCUCHAR????');
                return false;
            }
            /*}else{
                alert('no es una palabra valida');
                wordInserted = "";
                letterOfWordToGuess=[];
                idCurrentLetterOnSquare=[];
                currentSquare.textContent = "";
            }*/
        } else {
            alert('No ingreso ninguna palabra, vuelve a intentarlo');
        }
    } else if (event.code.startsWith('Backspace')) {

        if (pressEnter) {
            console.log('No se puede borrar, ya presiono Enter');
            pressEnter = false;
            console.log('pressEnter: ' + pressEnter);
            return false;
        } else {

            console.log('Se puede borrar, no ha presionado Enter');
            console.log('Backspace pressed');
            pressEnter = false;

            //borrar la letra anterior y del array
            let a = idCurrentLetterOnSquare.length;

            console.log('idCurrentLetterOnSquare on BACKSPACE: ' + a);
            //wordInserted -= event.key;
            currentSquare.textContent = "";
            console.log('Entro a Borrar letras y wordInserted.length ANTES DE BORRAR LA LETRA: ' + wordInserted.length);

            let deleteColorOfIdCurrentLetterOnSquare;

            if (wordInserted.length) {

                //Cuando borre se deben quitar los colores de los square
                deleteColorOfIdCurrentLetterOnSquare = '';
                //console.log(document.getElementById(idCurrentLetterOnSquare[a-1]));
                console.log('deleteColorOfIdCurrentLetterOnSquare: ' + deleteColorOfIdCurrentLetterOnSquare);
                deleteColorOfIdCurrentLetterOnSquare = document.getElementById(idCurrentLetterOnSquare[a - 1]);
                deleteColorOfIdCurrentLetterOnSquare.style.background = "white";


                currentSquare = currentSquare.previousElementSibling;
                wordInserted = wordInserted.slice(0, -1);
                letterOfWordToGuess.pop();
                idCurrentLetterOnSquare.pop();
                //squareGreen = document.getElementById(idCurrentLetterOnSquare);



                /*console.log('Nuevo wordInserted.length DESPUES de haber borrado la letra: '+wordInserted.length);
                console.log('Nuevo currentSquare.textContent DESPUES de haber borrado la letra: '+currentSquare.textContent);
                console.log('Borro letter to wordInserted: '+wordInserted);            
                console.log('Borro letter to letterOfWordToGuess: '+letterOfWordToGuess);            
                console.log('Borro letter to idCurrentLetterOnSquare: '+idCurrentLetterOnSquare);
                */
            } else {
                console.log('No hay letras para borrar');
                console.log('wordInserted length no es >0, NO entro por el IF');
            }

            //usar esto cuado borren letras de la palabra q ingresa
            //let myArray = [1, 2];
            //let newArray = myArray.concat(3, 4); // newArray is [1, 2, 3, 4], myArray is unchanged
        }


    } else {
        console.log('Special key pressed, don\'t do anything');
        //document.removeEventListener('keydown', handleKeyDown); // Remove listener after keyDown
        return false;
    }
    /*if(event.code.startsWith('Digit')){
        console.log('Digit key pressed');

    }else */
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
