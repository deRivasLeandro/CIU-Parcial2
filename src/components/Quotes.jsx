import React, { useEffect, useState } from 'react';
import walter_white from '../img/bb_walter_white.png';
import jesse_pinkman from '../img/bb_jesse_pinkman.png';
import saul_goodman from '../img/bb_saul_goodman.png';
import gus_fring from '../img/bb_gus_fring.png';
import mike_ehrmantraut from '../img/bb_mike_ehrmantraut.png';
import hank_schrader from '../img/bb_hank_schrader.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../css/quotes.css';

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
        H3UltimasFrases: "#ultimasFrases",
        Recomendacion1: "#recomendacion1",
        Recomendacion2: "#recomendacion2",
        Recomendacion3: "#recomendacion3",
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
                document.querySelector(elementos.H3FraseDePersonaje).innerHTML = "No hay registros para ese autor." 
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
        if(localStorage.getItem('citas')) {
            let ultimasFrases = localStorage.getItem('citas')
            ultimasFrases = ultimasFrases.slice(1, ultimasFrases.length-2).split(`"`).filter(frase => frase !== `,`)
            if(ultimasFrases.length >= 4) {
                ultimasFrases = ultimasFrases.slice(-4)
                document.querySelector(elementos.H3UltimasFrases).innerHTML = `
                    - "${ultimasFrases[1]}"
                    <br>
                    - "${ultimasFrases[2]}"
                    <br>
                    - "${ultimasFrases[3]}"
                `;
            } else if(ultimasFrases.length == 1) {
                document.querySelector(elementos.H3UltimasFrases).innerHTML = "No hay frases guardadas."
            } else {
                if(ultimasFrases.length === 2){
                    document.querySelector(elementos.H3UltimasFrases).innerHTML = `
                        - "${ultimasFrases[1]}"
                    `
                } else {
                    document.querySelector(elementos.H3UltimasFrases).innerHTML = `
                        - "${ultimasFrases[1]}"
                        <br>
                        - "${ultimasFrases[2]}"
                    `
                }            
            }
        }
    }

    //Escribe el nombre de la opción en el input
    const agregarOpcion = (opcion) => {
        document.querySelector("#personajeInput").value = opcion;
        editarNombre(opcion)
    } 

    //Función que genera las recomendaciones
    const generarRecomendaciones = async() => {
            var opciones = await consultarPersonajesDisponibles();
            var recomendacion1 = opciones[0];
            var recomendacion2 = opciones[1];
            var recomendacion3 = opciones[2];

            document.querySelector(elementos.Recomendacion1).innerHTML = recomendacion1;
            document.querySelector(elementos.Recomendacion1).onclick = () => { agregarOpcion(recomendacion1); };

            document.querySelector(elementos.Recomendacion2).innerHTML = recomendacion2;
            document.querySelector(elementos.Recomendacion2).onclick = () => { agregarOpcion(recomendacion2); };

            document.querySelector(elementos.Recomendacion3).innerHTML = recomendacion3;
            document.querySelector(elementos.Recomendacion3).onclick = () => { agregarOpcion(recomendacion3); };
    }

    useEffect(() => {
        if(document.querySelector(elementos.Recomendacion1).innerHTML === "") {
            generarRecomendaciones();
            actualizarUltimasFrases();
        }
        document.querySelectorAll(".personaje-caja").forEach((personaje) => {
            personaje.addEventListener('click', () => {
                agregarOpcion(personaje.innerText)
            });
        })
    }, []);

    return (  
        <>  
            <Container className='container-main'>
                <div id='fix-personajes' className="nav-fix"></div>
                <h3 className='titulo'>Seleccione el personaje del cual desea leer una frase o escriba su nombre más abajo:</h3>
                <Row>
                    <Col sm={6} lg={4}>
                        <div className="personaje-caja">
                            <p className="personaje-nombre">Walter White</p>
                            <img src={walter_white} alt="Walter White" className='personaje-img'/>
                        </div>
                    </Col>
                    <Col sm={6} lg={4}>
                        <div className="personaje-caja">
                            <p className="personaje-nombre">Jesse Pinkman</p>
                            <img src={jesse_pinkman} alt="Jesse Pinkman" className='personaje-img'/>
                        </div>
                    </Col>
                    <Col sm={6} lg={4}>
                        <div className="personaje-caja">
                            <p className="personaje-nombre">Saul Goodman</p>
                            <img src={saul_goodman} alt="Saul Goodman" className='personaje-img'/>
                        </div>
                    </Col>
                    <Col sm={6} lg={4}>
                        <div className="personaje-caja">
                            <p className="personaje-nombre">Mike Ehrmantraut</p>
                            <img src={mike_ehrmantraut} alt="Mike Ehrmantraut" className='personaje-img'/>
                        </div>
                    </Col>
                    <Col sm={6} lg={4}>
                        <div className="personaje-caja">
                            <p className="personaje-nombre">Gustavo Fring</p>
                            <img src={gus_fring} alt="Gustavo Fring" className='personaje-img'/>
                        </div>
                    </Col>
                    <Col sm={6} lg={4}>
                        <div className="personaje-caja">
                            <p className="personaje-nombre">Hank Schrader</p>
                            <img src={hank_schrader} alt="Hank Schrader" className='personaje-img'/>
                        </div>
                    </Col>
                    
                </Row>
            </Container>
            <Container className="container-input">
                <div id='fix-buscador' className="nav-fix"></div>
                <h3 className='titulo'>Escriba el nombre del personaje del que quiera leer una frase:</h3>
                <input 
                    type="text" 
                    id="personajeInput"
                    onChange={(e) => editarNombre(e.target.value)}
                ></input>
                <br />
                <Button
                    variant="outline-success"
                    id='buscar-frases'
                    onClick={buscarPersonajeEnApi}
                >Buscar Frases
                </Button>
                <br />
                <h5 className='text-center'>O escoja una de nuestras recomendaciones:</h5>
                <ul>
                    <li><button id="recomendacion1"></button></li>
                    <li><button id="recomendacion2"></button></li>
                    <li><button id="recomendacion3"></button></li>
                </ul>
                <div id="frase-div">
                    <h3>Frase</h3>
                    <p id="frase">No has solicitado ninguna frase todavía.</p>
                </div>
                <div id='fix-frases' className="nav-fix"></div>
                <div id="ultimas-div">
                    <h3>Últimas frases vistas:</h3>
                    <h3 id="ultimasFrases">No hay historial de frases.</h3>
                </div>
            </Container>
        </>
    );
}
 
export default Quotes;
