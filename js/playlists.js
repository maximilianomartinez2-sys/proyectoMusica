import Alpine from 'alpinejs';
import { obtenerPlaylists, obtenerCanciones, crearPlaylist, editarPlaylist, eliminarPlaylist} from './api.js';
window.Alpine=Alpine;
Alpine.data('playlistsApp',()=>({
    playlists:[],
    canciones:[],
    cargando:true,
    error:null,
    usuarioId: 1,
    nombreNuevaPlaylist:'',
    editandoId:null,
    nombreEdicion:'',
    guardando:false,
    mensaje:'',
    errorAccion:'',
    errorNombreNueva:'',
    errorNombreEdicion:'',
    async crearNuevaPlaylist(forzarError = false){
    if(this.guardando || this.cargando){
        return;
    }
    this.mensaje='';
    this.errorAccion='';
    this.errorNombreNueva='';
    const nombre=this.nombreNuevaPlaylist.trim();
    if(nombre === ''){
        this.errorNombreNueva='Escribe el nombre de la playlist';
        return;
    }
    this.guardando=true;
    try{
        const respuesta=await crearPlaylist(
            nombre,
            this.usuarioId,
            forzarError
        );
        if(!respuesta.ok){
            this.errorAccion=respuesta.error;
            return;
        }
        this.playlists.push(respuesta.data);
        this.nombreNuevaPlaylist='';
        this.mensaje='Playlist creada correctamente';
    }catch{
        this.errorAccion='No se pudo crear la playlist';
    }finally{
        this.guardando=false;
    }
    },
    iniciarEdicion(playlist){
    if(this.guardando || this.cargando) {
        return;
    }
        this.editandoId=playlist.id;
        this.nombreEdicion=playlist.nombre;
        this.errorNombreEdicion='';
        this.errorAccion='';
        this.mensaje='';
    },
    cancelarEdicion(){
    if (this.guardando){
        return;
    }
        this.editandoId=null;
        this.nombreEdicion='';
        this.errorNombreEdicion='';
        this.errorAccion='';
    },
    async guardarEdicion(forzarError = false){
        if(this.guardando || this.cargando || this.editandoId === null){
            return;
        }
        this.mensaje='';
        this.errorAccion='';
        this.errorNombreEdicion='';
        const nombre=this.nombreEdicion.trim();
        if (nombre === ''){
            this.errorNombreEdicion = 'Escribe un nombre para la playlist';
            return;
        }
        this.guardando=true;
        try{
            const respuesta = await editarPlaylist(
            this.editandoId,
            nombre,
            forzarError
            );
            if(!respuesta.ok){
            this.errorAccion=respuesta.error;
            return;
            }
            this.playlists=this.playlists.map(playlist=>playlist.id === respuesta.data.id ? respuesta.data :playlist);
            this.editandoId=null;
            this.nombreEdicion='';
            this.mensaje='Playlist actualizada correctamente';   
        }catch{
            this.errorAccion='No se pudo editar la playlist';
        }finally{
            this.guardando=false;
        }
    },    
    cancionesDePlaylists(playlist){
        return playlist.cancionIds.map(id=>this.canciones.find(cancion=>cancion.id===id)).filter(cancion=>cancion!==undefined);
    },
    async init(forzarError=false){
        this.cargando=true;
        this.error=null;
        try{
            const[respuestaPlaylists, respuestaCanciones]=await Promise.all([obtenerPlaylists(forzarError), obtenerCanciones()]);
            if(!respuestaPlaylists.ok){
                throw new Error(respuestaPlaylists.error);
            }
            if(!respuestaCanciones.ok){
                throw new Error(respuestaCanciones.error);
            }
            this.playlists=respuestaPlaylists.data;
            this.canciones=respuestaCanciones.data;
        }catch(error){
            this.error=error.message || 'No se pudieron cargar las playlists';
        }finally{
            this.cargando=false;
        }
    }
}));
Alpine.start();