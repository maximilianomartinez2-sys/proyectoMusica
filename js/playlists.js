import Alpine from 'alpinejs';
import { obtenerPlaylists, obtenerCanciones } from './api.js';
window.Alpine=Alpine;
Alpine.data('playlistsApp',()=>({
    playlists:[],
    canciones:[],
    cargando:true,
    error:null,
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