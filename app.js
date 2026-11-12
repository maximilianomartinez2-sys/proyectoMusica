const usuarioActual = JSON.parse(localStorage.getItem("UsuarioLogueado"));
if(!usuarioActual && window.location.pathname.includes("index.html")){
    alert("tienes que iniciar sesion");
    window.location.href ="login.html";
}




import Alpine from 'alpinejs'
import { obtenerCanciones } from './js/api';
window.Alpine = Alpine
Alpine.data('musicApp', () => ({
    canciones: [],
    cargando: true,
    error: null,
    busqueda: '',
    generoSeleccionado: '',
    criterioOrden: 'titulo',
    favoritos: JSON.parse(localStorage.getItem('misFavoritos')) || [],
    cancionActual: null,
    indiceActual: 0,
    reproduciendo: false,
    segundosTranscurridos: 0,
    temporizador: null,
    colaReproduccion: [],
    modalDetalle: false,
    cancionModal: null,
    menuAbiertoID: false,
    notificacion: {mostrar: false, mensaje: ''},
    async init(forzarError=false) {
        this.cargando=true;
        this.error=null;
        try{
            const respuesta=await obtenerCanciones(forzarError);
            if(!respuesta.ok){
                throw new Error(respuesta.error);
            }
            this.canciones=respuesta.data;
            if(this.canciones.length>0){
                this.cancionActual=this.canciones[0];
            }
        } catch (error) {
            this.error= 'Error al cargar las canciones';
            console.error(error);
        } finally {
            this.cargando=false;
        }
    },
    get cancionesFiltradas() {
        return this.canciones
            .filter(cancion => {
                const coincideBusqueda = this.busqueda === '' || cancion.titulo.toLowerCase().includes(this.busqueda.toLowerCase());
                const coincideGenero = this.generoSeleccionado === '' || cancion.genero === this.generoSeleccionado;
                return coincideBusqueda && coincideGenero;
            })
            .sort((a, b)=> {
                if (this.criterioOrden === 'titulo') {
                    return a.titulo.localeCompare(b.titulo);
                } else if (this.criterioOrden === 'artista') {
                    return a.artista.localeCompare(b.artista);
                }
                return 0;
            });
    },
    get generos(){
        return [...new Set(this.canciones.map(cancion => cancion.genero))];
    },
    reproducir(cancion=null){
        if(cancion){
            this.cancionActual=cancion;
            this.indiceActual=this.canciones.findIndex(item => item.id === cancion.id);
            this.segundosTranscurridos=0;
        }else if(!this.cancionActual && this.canciones.length > 0){
            this.cancionActual = this.canciones[0];
            this.indiceActual=0;
        }
        this.reproduciendo=true;
        if(this.temporizador) clearInterval(this.temporizador);
        this.temporizador = setInterval (() => {
            if(this.cancionActual && this.segundosTranscurridos < this.cancionActual.duracionSegundos){
               this.segundosTranscurridos++; 
            }else{
                this.siguiente();
            }
        }, 1000);
    },
    pausar(){
        this.reproduciendo=false;
        clearInterval(this.temporizador);
        this.temporizador=null;
    },
    togglePlay(){
        if(this.reproduciendo){
            this.pausar();
        }else{
            this.reproducir();
        }
    },
    siguiente(){
        this.segundosTranscurridos=0;
        if(this.colaReproduccion.length>0){
            this.cancionActual=this.colaReproduccion.shift();
            this.mostrarToast(`Reproduciendo: ${this.cancionActual.titulo}`);
        }else if(this.canciones.length>0){
            this.indiceActual=(this.indiceActual+1)%this.canciones.length;
            this.cancionActual=this.canciones[this.indiceActual];
        }
        if(this.reproduciendo) this.reproducir();
    },
    anterior(){
        this.segundosTranscurridos=0;
        if(this.canciones.length>0){
            this.indiceActual=(this.indiceActual-1+this.canciones.length)%this.canciones.length;
            this.cancionActual=this.canciones[this.indiceActual];
        }
        if(this.reproduciendo) this.reproducir();
    },
    get porcentajeProgreso(){
        if(!this.cancionActual) return 0;
        return (this.segundosTranscurridos/this.cancionActual.duracionSegundos)*100;
    },
    get tiempoFormateadoActual(){
        const min=Math.floor(this.segundosTranscurridos/60);
        const seg=this.segundosTranscurridos%60;
        return `${min}:${seg<10?'0':''}${seg}`;
    },
    esFavorito(id){
        return this.favoritos.some(cancion => cancion.id === id);
    },
    toggleFavorito(cancion){
        if(this.esFavorito(cancion.id)){
            this.favoritos=this.favoritos.filter(item => item.id !== cancion.id);
            this.mostrarToast(`Eliminando de favoritos: ${cancion.titulo}`);
        }else{
            this.favoritos.push(cancion);
            this.mostrarToast(`Agregando a favoritos: ${cancion.titulo}`);
        }
        localStorage.setItem(`misFavoritos`, JSON.stringify(this.favoritos));
    },
    agregarACola(cancion){
        this.colaReproduccion.push(cancion);
        this.mostrarToast(`"${cancion.titulo}" agregada a la cola`);
        this.menuAbiertoID=null;
    },
    verDetalle(cancion){
        this.cancionModal=cancion;
        this.modalDetalle=true;
        this.menuAbiertoID=null;
    },
    mostrarToast(mensaje){
        this.notificacion.mensaje=mensaje;
        this.notificacion.mostrar=true;
        setTimeout(() => {
            this.notificacion.mostrar=false;
        }, 3000);
    }
}));
Alpine.start();
///////////
const UsuariosRegistrados = 'musicuUsuarios';
const SesionActiva = 'musiuSesionActiva';
function inicializarUsuarios(){
if(!localStorage.getItem(UsuariosRegistrados)){
   const primerUsuario = [{id:1, nombre:"juan", correo:"juan@gmail.com", contrasena:"1234"}];
   localStorage.setItem(UsuariosRegistrados, JSON.stringify(primerUsuario));
}
} inicializarUsuarios();

const formRegistro = document.getElementById("formRegistro");
if(formRegistro){
    formRegistro.addEventListener("submit", function(e){
        e.preventDefault();
       const nombre= document.getElementById("nombre").value;
        const correo= document.getElementById("correo").value;
 const contrasena= document.getElementById("contrasena").value;
 const nuevoUsuario={nombre, correo, contrasena};
const usuarios=JSON.parse(localStorage.getItem(UsuariosRegistrados)) || [];
const usuarioEncontrado = usuarios.find(usuario=> usuario.correo === nuevoUsuario.correo)
if(usuarioEncontrado){
    alert("Ya se ha registrado este correo");
}
else{
    usuarios.push(nuevoUsuario);
    localStorage.setItem(UsuariosRegistrados, JSON.stringify(usuarios));
    alert("Registrado con exito");
    window.location.href= "login.html";
}
    });
}

const formLogin = document.getElementById("formLogin");
if(formLogin){
   formLogin.addEventListener("submit", function(e){
    e.preventDefault();
  const correo= document.getElementById("correo").value;
  const contrasena= document.getElementById("contrasena").value;
  const usuarios = JSON.parse(localStorage.getItem(UsuariosRegistrados)) || [];
  const UsuarioValido = usuarios.find(usuario=> usuario.correo === correo && usuario.contrasena === contrasena);
  if(UsuarioValido){
    alert("Bienvenido"+ UsuarioValido.nombre);
    window.location.href="index.html";
  }
  else{
    alert("correo o contrasena incorrecta");
  }
  });
}

const formLogin = document.getElementById("formLogin");
if(formLogin){
    formLogin.addEventListener("submit", function(e){
        e.preventDefault();
      const correo = document.getElementById("correo").value;
      const constrasena = document.getElementById("contrasena").value;
      const usuarios = JSON.parse(localStorage.getItem("UsuariosRegistrados")) || [];
      const UsuarioValido = usuarios.find(usario=>usuario.correo === correo && usuario.contrasena === contrasena);
      if(UsuarioValido){
        alert("Bienvenido "+ UsuarioValido.nombre);
        localStorage.setItem("UsuarioLogueado", JSON.stringify(UsuarioValido));
        window.location.href="perfil.html";
      }
      else{
        alert("contrasena o correo equivocados");
      }
    });
}
const usuarioActual = JSON.parse(localStorage.getItem("UsuarioLogueado"));
if(usuarioActual && document.getElementById("nombreUsuario")){
    document.getElementById("nombreUsuario").textContent = usuarioActual.nombre;
    document.getElementById("correoUsuario").textContent = usuarioActual.correo;
}
/*
dfafniafnefaif
*/

function inicioSesion(){
    const correoLogin = document.getElementById("correo").value;
    const constrasenaLogin= document.getElementById("contrasena").value;
    const usuarios = JSOn.parse(localStorage.getItem("UsariosRegistrados")) || [];
    const usuarioValido = usuarios.find(usuario => usuario.correo === correoLogin && usuarioContrasena === contrasenaLogin);
    if(usuarioValido){
        localStorage.setItem("UsuarioLogueado", JSON.stringify(usuarioValido));
        alert("bienvenido"+ usuarioValido.nombre);
        window.location.href = "index.html";
    }
    else{
        alert("contrasena incorrecta");
    }
}






function cerrarSesion(){
    localStorage.removeItem(UsuarioLogueado);
    window.location.href="registrar.html";
}















