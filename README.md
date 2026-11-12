# proyectoMusica

Proyecto universitario de una plataforma musical con catálogo dinámico y gestión de playlists mediante una API simulada.

## Integrantes

| Integrante | Responsabilidad |
|---|---|
| Maximiliano Martinez | Login, registro, sesiones y navegación |
| Martín Castro | Interfaz musical y diseño |
| Benjamín Rosales | Mocks, API simulada y playlists |

## Tecnologías

HTML, CSS, JavaScript, Tailwind CSS, Alpine.js, Vite y localStorage.

## Instalación y ejecución

Requisitos: Node.js, npm y Git.

```bash
git clone https://github.com/maximilianomartinez2-sys/proyectoMusica.git
cd proyectoMusica
npm install
npm run dev
```

Abrir la dirección `Local` que muestra Vite en la terminal.

La vista de playlists está en `/playlist.html`. El proyecto debe ejecutarse con Vite para cargar correctamente sus módulos y estilos.

## Datos iniciales

- `mocks/canciones.json`: 10 canciones.
- `mocks/usuarios.json`: 1 usuario de prueba.
- `mocks/playlists.json`: 2 playlists iniciales.

Las modificaciones de playlists se guardan en localStorage, bajo la clave `playlists`, y permanecen al recargar la página.

## Usuario de prueba del mock

- ID: `1`
- Nombre: `Martin`
- Correo: `martin@gmail.com`
- Contraseña: `martin123`

La conexión de estos datos con el flujo de autenticación está pendiente de integración. La vista de playlists utiliza el ID de la sesión y muestra únicamente las playlists de ese usuario.

## API simulada

Los endpoints simulados se utilizan mediante las funciones exportadas de `js/api.js`.

| Servicio | Parámetros | Estado exitoso |
|---|---|---|
| `obtenerCanciones()` | Ninguno | 200 |
| `obtenerPlaylists()` | Ninguno | 200 |
| `crearPlaylist(nombre, usuarioId)` | Nombre y usuario propietario | 201 |
| `editarPlaylist(id, nombre)` | ID y nombre nuevo | 200 |
| `eliminarPlaylist(id)` | ID de la playlist | 200 |
| `agregarCancionAPlaylist(playlistId, cancionId)` | ID de playlist y canción | 200 |
| `quitarCancionDePlaylist(playlistId, cancionId)` | ID de playlist y canción | 200 |

Todas las funciones aceptan un último parámetro opcional `forzarError`, cuyo valor predeterminado es `false`.

### Formato de respuesta

```json
{
  "ok": true,
  "status": 200,
  "data": [],
  "error": null
}
```
`data` contiene una lista o un objeto según la operación. En una respuesta de error, contiene `null`.

Estados de error utilizados:
- `400`: datos inválidos.
- `404`: playlist o canción no encontrada.
- `500`: fallo de la operación o error simulado.
Las consultas simulan una latencia aleatoria de aproximadamente 300 a 800 milisegundos.

### Probar un error

Con el proyecto abierto mediante Vite, ejecutar en la consola del navegador:
```js
const api = await import('/js/api.js');
console.log(await api.obtenerPlaylists(true));
```
La respuesta debe indicar `ok: false` y `status: 500`.

## Estado de la vista de playlists

Implementado y probado:
- Listado de playlists con títulos y artistas de sus canciones.
- Creación y edición de nombres.
- Validación de nombres vacíos.
- Mensajes de éxito y error.
- Estados de carga, lista vacía y reintento.
- Persistencia al recargar.

Pendiente de integración:
- Controles para eliminar playlists y agregar o quitar canciones.
- Consulta de usuarios mediante la API.

## Uso de IA 

Ver la carpeta[IA/](IA/).
