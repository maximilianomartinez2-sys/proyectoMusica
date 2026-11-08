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
const playMainBtn=document.querySelector(".PlayMain");
const musicBar=document.querySelector(".MusicBar");
const  musicTimeLabel=document.querySelector(".MusicTime");
const prevBtn=document.querySelector(".PlayerControls button:first-child");
const nextBtn=document.querySelector(".PlayerControls button:last-child");
function reproducirCancion(){
    reproducir=true;
    if(playMainBtn) playMainBtn.textContent="Pausa";
    if(temporizador){
        temporizador=setInterval(()=>{
            const cancion=canciones[cancionActual];
        if(tiempoTranscurrido<cancion.segundos){
            tiempoTranscurrido++;
            actualizarBarra(cancion);
        }else{
            siguienteCancion();
        }
    }, 1000);
}
}   
function pausarCancion(){
    reproducir=false;
    if(playMainBtn) playMainBtn.textContent='&#9658;';
    clearInterval(temporizador);
    temporizador=null;
}
function toggleReproduccion(){
    if(reproducir){
        pausarCancion();
    }else{
        reproducirCancion();
    }
}
function actualizarBarra(cancion){
    const porcentaje=(tiempoTranscurrido/cancion.segundos)*100;
    if(musicBar){
        musicBar.style.background=`linear-gradient(to right, #1db954 ${porcentaje}%, #404040 ${porcentaje}%)`;
    }
    const mins=Math.floor(tiempoTranscurrido/60);
    const segs=tiempoTranscurrido%60;
    const segsFormateados=segs<10?`0${segs}`:segs;
    if(musicTimeLabel){
        musicTimeLabel.textContent=`${mins}:${segsFormateados}/${cancion.duracion}`;
    }
}
function siguienteCancion(){
    tiempoTranscurrido=0;
    if(colaReproduccion.length>0){
        const proxima=colaReproduccion.shift();
        alert('Reproduciendo desde cola: ${proxima.titulo}');
    }else{
        cancionActual=(cancionActual+1)%canciones.length;
    }
    reproducirCancion();
}
function anteriorCancion(){
    tiempoTranscurrido=0;
    cancionActual=(cancionActual-1+canciones.length)%canciones.length;
    reproducir
}
if(playMainBtn) playMainBtn.addEventListener("click", toggleReproduccion);
if(prevBtn) prevBtn.addEventListener("click", anteriorCancion);
if(nextBtn) nextBtn.addEventListener("click", siguienteCancion);