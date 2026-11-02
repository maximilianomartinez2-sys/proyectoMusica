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
