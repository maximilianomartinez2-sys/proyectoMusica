const canciones = [
    {
        id: 1,
        titulo: "Cancion 1",
        artista: "Artista 1",
        duracion: "3:30"
    },
    {
        id: 2,
        titulo: "Cancion 2",
        artista: "Artista 2",
        duracion: "4:15"
    }
];
let playlist = JSON.parse(localStorage.getItem("misPlaylist")) || [{nombre: "Favoritas", canciones: []}];
let colaReproduccion=[];
let cancionActual = 0;
let reproducir = false;
let tiempoTranscurrido = 0;
let temporizador=null;
const formulario=document.getElementById("formLogin");
if(formulario){
    formulario.addEventListener("submit", function(evento){
        evento.preventDefault();
        const correo=document.getElementById("correo").value;
        const contrasena=document.getElementById("contrasena").value;
        const mensaje=document.getElementById("mensajeLogin");
        if(correo ==="" || contrasena===""){
            mensaje.textContent="Debes completar todos los campos";
        }else{
            mensaje.textContent="Formulario enviado correctamente";
        }
    });
}
