export async function obtenerCanciones(forzarError=false) {
    const latencia=300+Math.floor(Math.random()*501);
    await new Promise((resolve)=>{
        setTimeout(resolve, latencia);
    });
    try {
    if(forzarError){
        throw new Error('Error de prueba');
    }
    const url=new URL('../canciones.json', import.meta.url);
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