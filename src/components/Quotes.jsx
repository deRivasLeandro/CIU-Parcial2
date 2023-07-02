import React, { useEffect, useState } from 'react';

const Quotes = () => {
    //INICIAMOS EL LOCAL STORAGE
    let citasGuardadas = JSON.parse(localStorage.getItem('citas'));
    if(!citasGuardadas) { citasGuardadas = [] }

    //Función para poner la primera letra en mayúscula
    const capitalize = (nombre) => {
        return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase()
    }

    //Función que devuelve los personajes disponibles
    const consultarPersonajesDisponibles = async() => {
        try {
            const apiResponse = await fetch(`https://api.breakingbadquotes.xyz/v1/quotes/125`);            
            const responseParsed = await apiResponse.json();
            const listaMapeada = responseParsed.map(citaConAutor => citaConAutor.author);
            const autores = []
            await listaMapeada.forEach((autor) => {
                if(!(autores.includes(autor.toLowerCase()))) {
                    autores.push(autor.toLowerCase());
                }
            })
            return autores
        } catch(e) {
            console.log(e)
        }
    }

    //Definición del objeto elementos que va a contener los ids y clases de nuestros elementos
    const elementos = {
        H3FraseDePersonaje: "#frase",
        H3UltimasFrases: "#ultimasFrases"
    }

    //Definición de constantes que referencian elementos html
    const mostradorDeFrases = document.querySelector(elementos.H3FraseDePersonaje);
    const mostradorDeUltimasFrases = document.querySelector(elementos.H3UltimasFrases);

    //HOOKS
    //Acá se almacena el nombre del campeón a consultar
    const [nombreAutor, editarNombre] = useState("");

    //Acá se guardan los datos del campeón consultado
    const [citas, editarCitas] = useState(citasGuardadas);

    //Sirve para actualizar el local storage al hacer algún cambio.
    useEffect(() => {
        citasGuardadas ? localStorage.setItem('citas', JSON.stringify(citas)) : localStorage.setItem('citas', JSON.stringify([]))
    }, [citas]);

    //Función para consultar a la API de Breaking Bad
    const buscarPersonajeEnApi = async() => {
        try {
            const personajesDisponibles = await consultarPersonajesDisponibles();
            if(!personajesDisponibles.includes(nombreAutor.toLowerCase())) {
                document.querySelector(elementos.H3FraseDePersonaje).innerHTML = "No hay registros para ese autor" 
                return
            }
            const nombreCapitalizado = capitalize(nombreAutor);
            const apiResponse = await fetch(`https://api.breakingbadquotes.xyz/v1/quotes/125`);            
            const responseParsed = await apiResponse.json();
            const cita = (responseParsed.find(cita => capitalize(cita.author) === nombreCapitalizado)).quote;
            editarCitas([...citas, cita]);
            mostradorDeFrases.innerHTML = cita
            actualizarUltimasFrases()
        } catch(e) {
            console.log(e)
        };
    }

    //Función para actualizar las últimas frases vistas
    const actualizarUltimasFrases = async () => {
        let ultimasFrases = localStorage.getItem('citas')
        ultimasFrases = ultimasFrases.slice(1, ultimasFrases.length-2).split(`"`).filter(frase => frase !== `,`)
        if(ultimasFrases.length >= 4) {
            ultimasFrases = ultimasFrases.slice(-3)
            mostradorDeUltimasFrases.innerHTML = `
                "${ultimasFrases[1]}"
                <br>
                "${ultimasFrases[2]}"
                <br>
                "${ultimasFrases[3]}"
            `;
        } else if(ultimasFrases.length == 1) {
            mostradorDeUltimasFrases.innerHTML = "No hay frases guardadas."
        } else {
            if(ultimasFrases.length === 2){
                mostradorDeUltimasFrases.innerHTML = `
                    "${ultimasFrases[1]}"
                `
            } else {
                mostradorDeUltimasFrases.innerHTML = `
                    "${ultimasFrases[1]}"
                    <br>
                    "${ultimasFrases[2]}"
                `
            }
            
        }

    }
    

    // //Función para actualizar las últimas frases vistas
    // const actualizarUltimasFrases = () => {
    //     let ultimasFrases = localStorage.getItem('citas')
    //     console.log(ultimasFrases.slice(1, ultimasFrases.length-2).split(`"`).filter(frase => frase !== `,`))
    //     console.log(ultimasFrases.slice(1, ultimasFrases.length-2).split(`"`).filter(frase => frase !== `,`).length)
    //     if(ultimasFrases.slice(1, ultimasFrases.length-2).split(`"`).filter(frase => frase !== `,`).length > 3) {
    //         ultimasFrases = ultimasFrases.slice(1, ultimasFrases.length-2).split(`"`).filter(frase => frase !== `,`).slice(-3)
    //         mostradorDeUltimasFrases.innerHTML = `
    //             "${ultimasFrases[0]}"
    //             <br>
    //             "${ultimasFrases[1]}"
    //             <br>
    //             "${ultimasFrases[2]}"
    //         `;
    //     } else if(ultimasFrases.slice(1, ultimasFrases.length-2).split(`"`).filter(frase => frase !== `,`).length == 0) {
    //         mostradorDeUltimasFrases.innerHTML = "No hay frases guardadas."
    //     } else {
    //         ultimasFrases = ultimasFrases.slice(1, ultimasFrases.length-2).split(`"`).filter(frase => frase !== `,`)
    //         if(ultimasFrases.slice(1, ultimasFrases.length-2).split(`"`).filter(frase => frase !== `,`).length === 1){
    //             mostradorDeUltimasFrases.innerHTML = `
    //                 "${ultimasFrases[0]}"
    //             `
    //         } else {
    //             mostradorDeUltimasFrases.innerHTML = `
    //                 "${ultimasFrases[0]}"
    //                 <br>
    //                 "${ultimasFrases[1]}"
    //             `
    //         }
            
    //     }

    // }
        /*
        ultimasFrases.length > 6 ? 
            ultimasFrases = ultimasFrases.slice(1, ultimasFrases.length-2).split(`"`).filter(frase => frase !== `,`).slice(-3)
            :
            ultimasFrases.length = 0 ? 
            ultimasFrases = "No hay frases guardadas."
            :
            ultimasFrases = ultimasFrases.slice(1, ultimasFrases.length-2).split(`"`).filter(frase => frase !== `,`)
        mostradorDeUltimasFrases.innerHTML = ultimasFrases;
    }
    */

    return (  
        <> 
            <h3>Escriba el nombre del personaje del que quiera leer una frase:</h3>
            <input 
                type="text" 
                id="personajeInput"
                onChange={(e) => editarNombre(e.target.value)}
            ></input>
            <br />
            <button
                onClick={buscarPersonajeEnApi}
            >Buscar Frases
            </button>
            <br />
            <h3>Frase:</h3>
            <h3 id="frase">No has solicitado ninguna frase todavía.</h3>
            <h3>Últimas frases vistas:</h3>
            <h3 id="ultimasFrases">No hay historial de frases.</h3>
        </>
    );
}
 
export default Quotes;
