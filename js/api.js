export async function obtenerCanciones(forzarError=false) {
    const latencia=300+Math.floor(Math.random()*501);
    await new Promise((resolve)=>{
        setTimeout(resolve, latencia);
    });
    try {
    if(forzarError){
        throw new Error('Error de prueba');
    }
    const url=new URL('../mocks/canciones.json', import.meta.url);
    const respuesta=await fetch(url);
    if(!respuesta.ok){
        return{
            ok:false,
            status:respuesta.status,
            data:null,
            error:'No se pudo cargar las canciones'
        };
    }
    const canciones=await respuesta.json();
    return{
        ok:true,
        status:200,
        data:canciones,
        error:null,
    };
} catch {
    return{
        ok:false,
        status:500,
        data:null,
        error:'Ocurrió un problema al leer las canciones'
    };
}
}
export async function obtenerPlaylists(forzarError=false){
    const latencia=300+Math.floor(Math.random()*501);
    await new Promise((resolve)=>{
        setTimeout(resolve, latencia);
    });
    try{
        if(forzarError){
            throw new Error('Error de prueba');
        }
        const guardadas=localStorage.getItem('playlists');
        if(guardadas!=null){
        return{
            ok:true,
            status:200,
            data:JSON.parse(guardadas),
            error:null
        };
    }
        const url=new URL('../mocks/playlists.json', import.meta.url);
        const respuesta=await fetch(url);
        if(!respuesta.ok){
            return{
                ok:false,
                status:respuesta.status,
                data:null,
                error:'No se pudieron cargar las playlists'
            };
        }
        let playlists=await respuesta.json();
        const actuales=localStorage.getItem('playlists');
        if(actuales===null){
            localStorage.setItem('playlists', JSON.stringify(playlists));
        }else{
            playlists=JSON.parse(actuales);
        }
        return{
            ok:true,
            status:200,
            data:playlists,
            error:null
        };
    } catch{
        return{
            ok:false,
            status:500,
            data:null,
            error:'Ocurrió un problema al leer las playlists'
        };
    }
}
export async function crearPlaylist(nombre, usuarioId, forzarError=false){
    try{
        const respuesta=await obtenerPlaylists(forzarError);
        if(!respuesta.ok){
            return respuesta;
        }
        if(typeof nombre !=='string' || nombre.trim()===''){
            return{
                ok:false,
                status:400,
                data:null,
                error:'Escribe el nombre de la playlist'
            };
        }
        if(!Number.isInteger(usuarioId)||usuarioId<1){
            return{
                ok:false,
                status:400,
                data:null,
                error:'El usuario debe tener un identificador válido'
            };
        }
        const playlists=JSON.parse(localStorage.getItem('playlists'));
        const nuevaPlaylist={
            id:Math.max(0,...playlists.map(playlist=>playlist.id))+1,
            nombre:nombre.trim(),
            usuarioId,
            cancionIds:[]
        };
        playlists.push(nuevaPlaylist);
        localStorage.setItem('playlists', JSON.stringify(playlists));
        return{
            ok:true,
            status:201,
            data:nuevaPlaylist,
            error:null
        };
    }catch{
        return{
            ok:false,
            status:500,
            data:null,
            error:'No se pudo guardar la playlist'
        };
    }
}
export async function editarPlaylist(id, nombre, forzarError = false) {
  try {
    const respuesta = await obtenerPlaylists(forzarError);
    if (!respuesta.ok) {
      return respuesta;
    }
    if (!Number.isInteger(id) || id < 1) {
      return {
        ok: false,
        status: 400,
        data: null,
        error: 'El identificador de la playlist es inválido'
      };
    }
    if (typeof nombre !== 'string' || nombre.trim() === '') {
      return {
        ok: false,
        status: 400,
        data: null,
        error: 'Escribe un nombre para la playlist'
      };
    }
    const playlists = JSON.parse(localStorage.getItem('playlists'));
    const playlist = playlists.find(item => item.id === id);
    if (!playlist) {
      return {
        ok: false,
        status: 404,
        data: null,
        error: 'No se encontró la playlist'
      };
    }
    playlist.nombre = nombre.trim();
    localStorage.setItem('playlists', JSON.stringify(playlists));
    return {
      ok: true,
      status: 200,
      data: playlist,
      error: null
    };
  } catch {
    return {
      ok: false,
      status: 500,
      data: null,
      error: 'No se pudo editar la playlist'
    };
  }
}
export async function eliminarPlaylist(id, forzarError = false) {
  try {
    const respuesta = await obtenerPlaylists(forzarError);

    if (!respuesta.ok) {
      return respuesta;
    }
    if (!Number.isInteger(id) || id < 1) {
      return {
        ok: false,
        status: 400,
        data: null,
        error: 'El identificador de la playlist es inválido'
      };
    }
    const playlists = JSON.parse(localStorage.getItem('playlists'));
    const indice = playlists.findIndex(playlist => playlist.id === id);
    if (indice === -1) {
      return {
        ok: false,
        status: 404,
        data: null,
        error: 'No se encontró la playlist'
      };
    }
    const eliminada = playlists[indice];
    playlists.splice(indice, 1);
    localStorage.setItem('playlists', JSON.stringify(playlists));
    return {
      ok: true,
      status: 200,
      data: eliminada,
      error: null
    };
  } catch {
    return {
      ok: false,
      status: 500,
      data: null,
      error: 'No se pudo eliminar la playlist'
    };
  }
}