const canciones = [
    {
        id: 1,
        titulo: "Bohemian Rhapsody",
        artista: "Queen",
        duracionTexto: "3:38",
        duracionSegundos: 218
    },
    {
        id: 2,
        titulo: "Cancion 2",
        artista: "Artista 2",
        duracionTexto: "4:15",
        duracionSegundos: 255
    }
];
//let playlist = JSON.parse(localStorage.getItem("misPlaylist")) || [{nombre: "Favoritas", canciones: []}];
//let colaReproduccion=[];
let cancionActual = 0;
let reproduciendo = false;
let segundosTranscurrido = 0;
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
const playMainBtn=document.querySelector(".PlayerControls .PlayMain");
const musicBarProgress=document.querySelector(".PlayerControls .MusicBarProgress");
const  musicTimeLabel=document.querySelector(".PlayerControls .MusicTime");
const prevBtn=document.querySelector(".PlayerControls .BtnPrev");
const nextBtn=document.querySelector(".PlayerControls .BtnNext");
function actualizarBarra(){
    const cancion=canciones[cancionActual];
    const porcentaje=(segundosTranscurrido/cancion.duracionSegundos)*100;
    if(musicBarProgress){
        musicBarProgress.style.width=`${porcentaje}%`;
    }
    const minutos=Math.floor(segundosTranscurrido/60);
    const segundos=segundosTranscurrido%60;
    const tiempoFormateado= segundos<10? `0${segundos}`: segundos;
    if(musicTimeLabel){
        musicTimeLabel.textContent=`${minutos}:${tiempoFormateado} / ${cancion.duracionTexto}`;
    }
}
function reproducirCancion(){
    reproduciendo=true;
    if(playMainBtn) playMainBtn.textContent="⏸";
    if(!temporizador){
        temporizador=setInterval(()=>{
            const cancion=canciones[cancionActual];
        if(segundosTranscurrido<cancion.duracionSegundos){
            segundosTranscurrido++;
            actualizarBarra(cancion);
        }else{
            siguienteCancion();
        }
    }, 1000);
}
}   
function pausarCancion(){
    reproduciendo=false;
    if(playMainBtn) playMainBtn.innerHTML='&#9658;';
    clearInterval(temporizador);
    temporizador=null;
}
function toggleReproduccion(){
    if(reproduciendo){
        pausarCancion();
    }else{
        reproducirCancion();
    }
}
function siguienteCancion(){
    segundosTranscurrido=0;
    cancionActual=(cancionActual+1)%canciones.length;
    actualizarBarra();
    if(reproduciendo) reproducirCancion();
}
function anteriorCancion(){
    segundosTranscurrido=0;
    cancionActual=(cancionActual-1+canciones.length)%canciones.length;
    actualizarBarra();
    if(reproduciendo) reproducirCancion();
}
if(playMainBtn) playMainBtn.addEventListener("click", toggleReproduccion);
if(prevBtn) prevBtn.addEventListener("click", anteriorCancion);
if(nextBtn) nextBtn.addEventListener("click", siguienteCancion);
const botonesLista=document.querySelectorAll('.Musics .PlayButton');
botonesLista.forEach((boton, index)=>{
    boton.addEventListener("click", ()=>{
        cancionActual=index;
        segundosTranscurrido=0;
        actualizarBarra();
        reproducirCancion();
    });
});