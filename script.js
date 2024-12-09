//Empiezo haciendo uso de la directiva use strict, para evitar errores comunes.
`use strict`;
//Ejecuto la funcion de iniciarJuego una vez se haya cargado todo el documento HTML.
document.addEventListener("DOMContentLoaded", iniciarJuego);
//Funcion que inicia el juego y contiene toda la logica para su funcionamiento.
function iniciarJuego(){
    //Muestro por consola como entra en la funcion.
    console.log("Juego iniciado.");
    //Obtengo los elementos del DOM necesarios para trabajar con ellos y los guardo en variables.
    let formulario = document.getElementById("miFormulario");
    let nombre = document.getElementById("nombre");
    let botonNombre = document.getElementById("introducirNombre");
    let errorNombre = document.getElementById("errorNombre");
    let juego = document.getElementById("juego");
    let botonJugar = document.getElementById("botonJugar");
    let BotonTirarDado = document.getElementById("BotonTirarDado");
    let dadoDivCelda = document.getElementById("dado");
    //Establezco la posicion inicial del heroe en la celda (0,0), y lo guardo en la variable heroPos
    let heroPos = { x: 0, y: 0 };
    //Declaro una variable para controlar que el jugador solo pueda moverse despues de tirar el dado.
    let puedeMover = false; 
    //Creo una etiqueta imagen, la cual contendra el dado y la añado al html.
    //Se mostrara la imagen del dado con el numero 1 desde el principio, despues cuando tire el dado cambiara al numero correspondiente de la tirada.
    let imagenDado = document.createElement("img");
    imagenDado.src = `./img/dado/dado1.png`;
    dadoDivCelda.appendChild(imagenDado);
    //Declaro una variable la cual controlara el numero de tiradas realizadas durante el juego.
    let numeroTiradas = 0;
    // Intento obtener el valor almacenado en el localStorage bajo la clave "recordTiradas"
    let recordActual =  parseInt(localStorage.getItem("recordTiradas")) || 
                        // Si no hay valor almacenado o el valor no se puede convertir a número (es decir, si es null o NaN),
                        // asigno Infinity como valor por defecto (esto indica que no hay récord previo).
                        Infinity;

    //Evento de escucha para cuando el usuario pulse el boton "Introducir nombre"
    botonNombre.addEventListener("click", validarNombre);
        function validarNombre(){
            //Muestro por consola como entro en la funcion de validarNombre.
            //console.log("Dentro de la funcion validar nombre.");
            //Condicion para que el nombre contenga al menos 4 letras    
            if (nombre.value.length < 4) {
                //Si el usuario no introduce un nombre con la condicion especificada, le muestro un mensaje de error.
                errorNombre.textContent = "El nombre del usuario debe contener al menos 4 letras";
                //Resalto el color del error en naranja para hacerlo mas visual al usuario.
                errorNombre.setAttribute("style", "color: orange");
                //Muestro por consola el error del usuario.
                console.log("El usuario ha introducido menos de 4 letras en el nombre.");
            } 
            //Si el usuario introduce numeros en el nombre, entra en la condicion.
            else if(!/^[a-zA-Z]+$/.test(nombre.value)){
                //Le muestro un mensaje de error en pantalla al usuario.
                errorNombre.textContent = "Numeros no permitidos";
                //Y resalto el error en naranja para hacerlo mas visual al usuario.
                errorNombre.setAttribute("style", "color: orange");
                //Muestro por consola el fallo del usuario.
                console.log("El usuario ha introducido numeros en el nombre.");
            }
            //Si el usuario introduce un nombre valido, entra en el else.
            else {
                //Se muestra en pantalla un mensaje al usuario junto a su nombre.
                errorNombre.textContent = `A luchar héroe: ${nombre.value}`;
                //Marco el mensaje con un color de letra blanco, para que el usuario no lo confunda con un error.
                errorNombre.setAttribute("style", "color: whitesmoke");
                //Oculto el boton del nombre.
                botonNombre.setAttribute("style", "display: none");
                //Y muestro el boton del juego para permitir al usuario que comience a jugar.
                botonJugar.setAttribute("style", "display: block");
                //Muestro por consola que el usuario a introducido un nombre valido.
                console.log(`El usuario que va a jugar se ha identificado como ${nombre.value}.`);
            }     
        }
    //Añado un evento de escucha al boton de jugar, para saber cuando lo clicka el usuario y asi poder generar el tablero.
    botonJugar.addEventListener("click", generarTablero);
        //Funcion generar tablero, esta funcion genera un tablero en pantalla de 10x10.
        function generarTablero(){
            //Muestro por consola como entro en la funcion.
            console.log("Dentro de la funcion generar tablero.");
            //Oculto el formulario para que el usuario comience el juego.
            formulario.setAttribute("style", "display:none");
            //Declaro una variable, la cual almacenara una etiqueta tabla. Esta tabla la busca por su id en el documento HTML.
            let tabla = document.getElementById("tabla");
            //Limpio el tablero.
            tabla.innerHTML = ""; 
            //Muestro el div donde almaceno el juego, esto hara que el usuario pueda visualizar el tablero, el dado y el boton de tirar dado.
            juego.setAttribute("style", "display: block");
            //Creo una tabla de 10x10 con un ciclo for, esta tabla representa el tablero de juego.
            //El primer ciclo se encarga de las filas de la tabla, por lo que i representa las filas de la tabla.
            for (let i = 0; i < 10; i++) {
                //Creo y almaceno en una variable la fila de la tabla. Esta variable se ira actualizando con cada vuelta del ciclo for.
                let fila = document.createElement("tr");
                //Este segundo ciclo lo uso para crear las columnas de la tabla, por lo que la j representa las columnas de la tabla.
                for (let j = 0; j < 10; j++) {
                    //Creo una fila en la tabla.
                    let celda = document.createElement("td");
                    //Y dentro de esa celda, creo un div, el cual me permitira trabajar esa celda en concreto de la tabla.
                    let divCelda = document.createElement("div"); 
                        //Añado una clase con el nombre celda, la cual me permitira aplicar estilos css.
                        divCelda.classList.add("celda"); 
                        //AsignO un ID único para cada celda de la tabla.
                        divCelda.id = `celda-${i}-${j}`; 
                    //Busco en la tabla la celda 9-9, esta sera la tabla que contendra el tesoro.
                    if (i === 9 && j === 9) {
                            //Compruebo que esta condicion se cumple con un console.log.
                            console.log("Celda 9-9 encontrada, añadiendo tesoro.");
                            //Añado a la celda 9-9 (la celda de la esquina inferior derecha) el tesoro.
                            divCelda.classList.add("tesoro");
                        }
                    //Añado el div celda a la celda.
                    celda.appendChild(divCelda); 
                    //Añado la celda a la fila correspondiente.
                    fila.appendChild(celda);
                }
                //Añado la fila a la tabla.
                tabla.appendChild(fila);
                //Este proceso se repetira 10 veces en el ciclo, generando asi el tablero 10x10 del juego.
            }
            //Llamo a la funcion colocar heroe, por lo que coloco el heroe en la celda 1-1 del tablero.
            colocarHeroe();
        }
        //Esta funcion sirve para colocar el heroe en una celda especifica de la tabla (tablero).
        function colocarHeroe(){
            //Selecciono todas las celdas con la clase celda e itero en cada una de ellas, eliminando al heroe si esta.
            document.querySelectorAll(".celda").forEach(celda => {
                //Elimina la clase heroe de la celda.
                celda.classList.remove(".hero");
                //Vacia la celda, dejandola sin contenido dentro.
                celda.textContent = ""; 
            })
            //Declaro una variable la cual almacenara las cordenadas en las que se encuentra el heroe.
            //Por lo que si el heroe se encuentra en la celda x2 e y3, almacenara un id: celda-2-3:
            let celdaHeroe = document.getElementById(`celda-${heroPos.x}-${heroPos.y}`);
            //Si la celda en la que se encuentra el heroe existe dentro del DOM, y no es indefenida o nula, se ejecuta la condicion.
            //Por lo que esta condicion verfica que el heroe se encuentra en el tablero.
            if(celdaHeroe){
                //Añado la clase heroe a la celda.
                celdaHeroe.classList.add("hero");   
                //Declaro una variable la cual contendra la imagen del heroe. Por el momento esta variable almacenara una etiqueta img.
                let imagenHeroe = document.createElement("img");
                    //Asocio la imagen de Rayo Maqueen a la variable anteriormente creada.
                    imagenHeroe.src = "./img/rayo.png";
                    //Le modifico el ancho de la imagen.
                    imagenHeroe.style.width = "35px";
                    //Le modifico el alto de la imagen.
                    imagenHeroe.style.height = "35px";
                //Añado la imagen del heroe a la celda en la que se encontra el he.
                celdaHeroe.appendChild(imagenHeroe);
            }
        }
        //Añado un evento de escucha al boton de tirar, para saber si el jugador clicka el boton de tirar dado.
        BotonTirarDado.addEventListener("click", tirarDado);
        //Esta funcion permite que el usuario tire el dado.
        function tirarDado() {
            //Creo una variable la cual almacenara un numero aleatorio del 1 al 6.
            let numTirada = Math.floor(Math.random() * 6) + 1;
            //Indico por consola cuando el usuario tira el dado, de esta manera verifico el funcionamiento correcto de la funcion.
            console.log(`El usuario a tirado el dado, su resultado es ${numTirada}`);
            //Compruebo si ya existe una imagen del dado en el div del dado.
            imagenDado = dadoDivCelda.querySelector("img");
            //Si existe la imagen del dado, la remplazo por la imagen de la nueva tirada.
            if(imagenDado){
                imagenDado.src = `./img/dado/dado${numTirada}.png`;
            } else{
                //Si no existe ninguna imagen del dado, la añado a la variable.
                imagenDado.src = `./img/dado/dado${numTirada}.png`;
                //Y despues la añado al div correspondiente del dado.
                dadoDivCelda.appendChild(imagenDado);
            }
            //Llamo a la funcion resaltar movimientos, pasandole por parametro el numero de celdas a resaltar.
            resaltarMovimientos(numTirada);
            //Añado uno al contador de numero de tiradas.
            numeroTiradas ++;
            //Cambio el valor de la variable a true, indicando que el jugador puede moverse.
            puedeMover = true; 
            //Oculto el boton de tirar el dado.
            BotonTirarDado.setAttribute("style", "display: none");
        }
        //Funcion de resaltar movimientos, esta funcion resalta las celdas a las que el jugador puede moverse, se le pasa
        //por parametro el numero de la tirada de dado, para conocer cuantas celdas se deben resaltar.
        function resaltarMovimientos(ev) {
            //Verifico que se entra a la funcion imprimiendo un mensaje por consola.
            console.log("Celdas resaltadas con posibles movimientos del heroe.");
            //Primero selecciono todas las celdas resaltadas. Si hay varios div con la misma clase, se selecionan todos.
            //Utilizo un bucle foreach para iterar sobre cada una de las celdas resaltadas. Le e representa el elemento actual 
            //de la iteracion.
            document.querySelectorAll(".resaltarCeldas").forEach(e => {
                //Elimino la clase resaltar celda, de la posicion e del ciclo.
                e.classList.remove("resaltarCeldas");
                //Elimino el evento de escuucha de la celda e del ciclo, por lo que no se le permitirá al usuario mover el heroe
                //una vez ya haya realizado el movimiento.
                e.removeEventListener("click", moverHeroe);
            });
            //Creo las opciones de movimientos del heroe, desde el 1 hasta el numero obtenido por el heroe, por lo que el jugador
            //no esta a limitado a mover el numero exacto de la tirada. Si saca un 6 puede moverse 6 o menos celdas.
            for (let pasos = 1; pasos <= ev; pasos++) {
                //Almaceno en un array los posibles movimientos del heroe.
                let movimientos = [
                    //Movimientos a la derecha.
                    { x: heroPos.x + pasos, y: heroPos.y }, 
                    //Movimientos a la izquierda.
                    { x: heroPos.x - pasos, y: heroPos.y }, 
                    //Movimientos hacia abajo.
                    { x: heroPos.x, y: heroPos.y + pasos },
                    //Movimientos hacia arriba.
                    { x: heroPos.x, y: heroPos.y - pasos }
                ];
                //Recorro con un ciclo foreach el array de posibles movimientos del heroe.
                movimientos.forEach(mov => {
                    //Verifico que los posibles movimientos del heroe estan dentro de los limites del tablero, de esta manera
                    //evito que el heroe se salga del tablero.
                    if (mov.x >= 0 && mov.x < 10 && mov.y >= 0 && mov.y < 10) {
                        //Selecciono las celdas a las que se podrá mover el usuario.
                        let celda = document.getElementById(`celda-${mov.x}-${mov.y}`);
                        //Verifico que la celda a la que se puede realizar el movimiento existe.
                        if (celda) {
                            //Si la celda existe, le añado la clase resaltaerCeldas, la cual cambiara el estilo de las celdas.
                            celda.classList.add("resaltarCeldas");
                            //Ademas le añado un evento de escucha, en el que si el jugador clicka esa celda, le permitirá mover 
                            //el heroe e ella.
                            celda.addEventListener("click", moverHeroe);
                        }
                    }
                });
            }
        }
        //Funcion moverHeroe, permite mover el heroe a una celda en concreto.
        function moverHeroe(ev){
            //Condicion para que el usuario no se mueva cuando no se le permite (No se le permite moverse mientras la variable
            //puedeMover este en false).
            if(!puedeMover){
                //Si el usuario intenta hacer un movimiento no permitido, como por ejemplo realizar un segundo movimiento antes
                //de tirar el dado, se mostrara un mensaje en consola para que quede constancia de ello.
                console.log("El usuario a intentado hacer un movimiento no permitido.");
                //Y se le notifica mediante de un alert, dandole instrucciones de lo que debe hacer.
                alert("Solo puedes moverte una vez por tirada, tira de nuevo el dado para realizar otro movimiento.")
                return;
            }
            //Obtengo el id de la celda que fue pulsada y la almaceno en la variable celdaID.
            let celdaID = ev.target.id; 
            //Divido con el metodo split las partes del id de la celda con el limitador "-", por lo que si el id es "celda-0-0",
            //se separara y se convertira en ["celda", "4", "5"].
            let partes = celdaID.split("-");

            //Convierto las posiciones en numeros, por lo que pasa de string a tipo numerico.
            let x = Number(partes[1]); 
            let y = Number(partes[2]); 
            //Actualizo la posicion del heroe, con las nuevas posiciones con valores numericos.
            heroPos = {x, y};
            //Limpio las celdas resaltadas y actualizo la posicion del heroe. 
            //Esto recorriendo las celdas resaltadas para eliminar el resaltado de la celda.
            document.querySelectorAll(".resaltarCeldas").forEach(e => e.classList.remove(".resaltarCeldas"));
            //Coloco el heroe en la nueva posicion.
            colocarHeroe();
            //Imprimo por consola la celda en la que se encuentra el heroe. Esto me permite saber a que celda se desplaza el jugador
            //con cada movimiento.
            console.log(`Posicion del heroe, x: ${x} | y: ${y}`);
            //Muestro el boton de tirar el dado, para que el usuario pueda seguir con su juego.
            BotonTirarDado.setAttribute("style", "display: block");
             //Condicion para cuando el heroe llegue al tesoro, el cual se encuentra en la celda (9-9).
             if(heroPos.x == 9 && heroPos.y == 9){
                //Si el heroe llega a la celda 9-9, significa que ha terminado el juego, por lo que le muestro al usuario
                //la puntuacion que a obtenido y si ha superado o no el record actual.
                comprobarRanking();
                terminarJuego();
            }
            //Despues de que el usuario realize un movimiento, no le permito volver a moverse hasta que vuelva a tirar el dado,
            //por lo que cambio el valor de la variable puedeMover a false.
            puedeMover = false;
        }
        //Funcion para comprobar el record de tiradas del juego.
        function comprobarRanking(){
            //Si el usuario realiza menos tiradas a las establecidas en el record, entra en esta condicion.
            if(numeroTiradas < recordActual){
                //El usuario a superado el record actual, por lo que se cambia el ranking, con el nuevo record establecido.
                localStorage.setItem("recordTiradas", numeroTiradas);
                //Muestro en consola el nuevo record del juegador junto a su nombre.
                console.log>(`El jugador ${nombre}, ha establecido un nuevo record de ${recordActual} tiradas.`)
                //Felicito al usuario por su nuevo record mediante un alert.
                alert(`!Enhorabuena ${nombre.value}, has establecido un nuevo record, con un total de ${numeroTiradas} tiradas!`);
            }
            //Si el usuario no ha superado el record del ranking, entra en esta otra condicion.
            else if(numeroTiradas >= recordActual){
                //Felicito al usuario por terminar el juego, y le notifico que no supero el record. 
                //Tambien le muestro cual es el record actual del ranking.
                alert(`!Enhorabuena ${nombre.value} has ganado el juego con ${numeroTiradas} tiradas! Sin embargo no has superado el record actual de ${recordActual} tiradas.`);
            }
        }
        //Funcion terminarJuego, esta funcion se encarga de esconder el tablero y mostrar un mensaje de despedida.
        function terminarJuego() {
            //Indico por consola que el usuario a terminado el juego, por lo que se a entrado a la funcion.
            console.log(`El jugador a finalizado el juego.`);
            //Escondo el contenedor que contiene el juego, para evitar que el jugador siga realizando movimientos.
            juego.setAttribute("style", "display: none");
            //Creo un nuevo contenedor el cual lo almaceno en una variable.
            let despedida = document.createElement("div");
                //Llamo al nuevo contenedor para darle un id y asi poder personalizarlo en el css.
                despedida.setAttribute("id", "divDespedida");
                //Muestro el contenedor de despedida al usuario.
                despedida.setAttribute("style", "display: block");
            //Creo una etiqueta h1 y la almeceno en una variable.
            let textoDespedida = document.createElement("h1");
                //Añado el texto de despedida asociado a la etiqueta h1 recien creada.
                textoDespedida.textContent = `El juego a finalizado, muchas gracias por jugar ${nombre.value}.`;
            //Añado el div de despedida al body del html, para que el usuario lo pueda visualizar.
            document.body.appendChild(despedida);
            //Añado el texto de despedida al div de despedida.
            despedida.appendChild(textoDespedida);

        }       
}