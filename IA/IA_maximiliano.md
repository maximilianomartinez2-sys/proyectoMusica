Maximiliano Martinez
Herramienta utilizada: gemini
conversacion : https://gemini.google.com/app/45fd0d395e6476b9?hl=es
Preguntas hechas a la IA

1 "¿Debo escribir código en app.js o en perfil.html?"
Respuesta: Se diferenció la responsabilidad de las capas: perfil.html 
maneja únicamente la estructura visual y los contenedores estáticos 
(id), mientras que app.js concentra la lógica dinámica, 
encargándose de extraer los datos del navegador e inyectarlos en el HTML.

2"¿Dónde debería empezar la etiqueta <form>?"
espuesta: Se analizó la semántica de HTML para entender que el formulario debe envolver estrictamente a todos los campos de entrada 
(inputs) y al botón de envío (submit), permitiendo que el navegador agrupe los datos correctamente antes de procesarlos.

3"¿Por qué cuando relleno los datos y pongo 'crear cuenta' se reinician los datos y no pasa nada?"

Respuesta: Se explicó el comportamiento predeterminado de HTML 
(recargar la página al enviar un formulario) y la necesidad indispensable
de interceptar ese comportamiento utilizando e.preventDefault().

4"Pregunta: "¿Por qué al presionar 'crear cuenta' los datos se borran y no avanza, a pesar de tener el event listener?"

Respuesta: Se profundizó en el ciclo de vida del DOM y el impacto de utilizar la etiqueta type="module"
en los scripts, lo cual puede provocar que JavaScript intente buscar elementos antes de que la página termine de renderizarse en la pantalla.

5"Pregunta: "¿Para qué sirven las líneas de código que buscan el usuario y validan las credenciales con .find()?"

Respuesta: Se desglosó la lógica de autenticación: leer los inputs, parsear el arreglo
desde el localStorage con JSON.parse(), y utilizar el método funcional .find() para evaluar coincidencias exactas de correo y contraseña.

6"Pregunta: "¿Por qué ese código de validación no debía ir suelto y necesitaba una función?"

Respuesta: Se contrastó la ejecución síncrona (código que corre de inmediato al abrir la página con campos vacíos)
frente a la ejecución dirigida por eventos (código encapsulado que solo se dispara cuando el usuario interactúa y hace clic).


7"Pregunta: "¿Cómo se envuelve la lógica en una función manejadora de eventos para que no se ejecute automáticamente?"

Respuesta: Se implementó el uso de un escuchador de eventos (addEventListener("submit", function(e) { ... })) para garantizar que
el procesamiento de datos ocurra de manera controlada y en el momento preciso.

8"Pregunta: "¿Con el comando git push se debió haber mandado a GitHub?"

Respuesta: Se analizó la retroalimentación de la terminal al sincronizar ramas locales con remotas
mediante el seguimiento (tracking) configurado con el parámetro -u origin.

9"Pregunta: "¿Dónde debería salir lo del Compare y Pull Request en GitHub?"

Respuesta: Se revisó el flujo de trabajo colaborativo en plataformas Git, identificando cómo el selector de ramas
en la interfaz web permite comparar cambios recientes entre la rama de trabajo (cambiosMax) y la rama principal (main).

10"Pregunta: "¿Por qué hay líneas en rojo en la vista de cambios de Git (Git Diff)?"

Respuesta: Se interpretó el código de colores del control de versiones, donde el rojo representa código antiguo o 
removido y el verde indica las nuevas líneas agregadas, facilitando la auditoría de modificaciones antes de confirmar un commit.

¿Cómo confirmar visualmente en la terminal que los cambios se subieron correctamente?"

Respuesta: Se estudiaron los mensajes de resumen de objetos comprimidos y la confirmación de la ruta de ramas
(cambiosMax -> cambiosMax) generados por Git al completar con éxito el envío al repositorio remoto.

11"Pregunta: "¿Cuál es el propósito global de haber estructurado los bloques de registro, login y perfil en cadena?"

Respuesta: Se evaluó el flujo completo de una aplicación web: el Registro almacena usuarios en el localStorage, el Login valida credenciales 
y genera una sesión activa (UsuarioLogueado), y el Perfil consume esa sesión para personalizar la interfaz.

12 Pregunta: "¿Qué pasos lógicos debe seguir JavaScript al cargar la página de perfil?"
Respuesta: Se estableció la secuencia algorítmica: leer el objeto almacenado en el navegador, seleccionarlo mediante su identificador único en el DOM (document.getElementById),
y modificar sus propiedades de texto (textContent) para renderizar la información del usuario autenticado.

13 Pregunta: ¿Por qué es estrictamente necesario utilizar JSON.stringify() antes de guardar un arreglo u objeto en el localStorage?

Respuesta: Porque el almacenamiento local del navegador (localStorage) solo permite almacenar cadenas de texto (strings). JSON.stringify()
convierte estructuras de datos complejas de JavaScript en formato de texto plano para que puedan ser guardadas correctamente sin perder su formato estructural.

14 Métodos de Arreglos en JavaScript
Pregunta: ¿Cuál es la diferencia fundamental entre utilizar el método .find() frente al método .filter() al momento de buscar un usuario por su correo?

Respuesta: El método .find() busca y devuelve únicamente el primer elemento que cumple con la condición booleana y detiene la búsqueda de inmediato. 
En cambio, .filter() recorre todo el arreglo de principio a fin y devuelve un nuevo arreglo con todas las coincidencias encontradas.
Para el login, .find() es ideal porque un correo es único

15 Pregunta: ¿Por qué es obligatorio incluir e.preventDefault() dentro de la función manejadora del evento submit en un formulario?

Respuesta: Porque por defecto los formularios HTML recargan la página completa al presionar un botón de envío (submit), lo que borraría cualquier estado o variable en memoria. e.preventDefault()
intercepta y anula ese comportamiento predeterminado del navegador, permitiendo que la lógica en JavaScript procese los datos de forma local y asíncrona.


16 Pregunta: ¿Qué diferencia técnica existe entre modificar una etiqueta con .textContent en comparación con .innerHTML?

Respuesta: .textContent interpreta y asigna estrictamente texto plano, lo cual es seguro y eficiente para mostrar datos de usuarios.
Por el contrario, .innerHTML analiza la cadena como código HTML, lo que permite insertar etiquetas de forma dinámica pero introduce
graves vulnerabilidades de seguridad (como ataques XSS) si se manipulan datos ingresados directamente por usuarios sin depurar.

17 Pregunta: ¿Por qué en el diseño del sistema se separaron dos llaves independientes en el localStorage: "UsuariosRegistrados" y "UsuarioLogueado"?

Respuesta: Porque cumplen roles lógicos completamente diferentes en la arquitectura de la aplicación:

"UsuariosRegistrados" funciona como una base de datos acumulativa que almacena el histórico de todas las cuentas creadas.

"UsuarioLogueado" actúa como una variable de estado de sesión transitoria, registrando exclusivamente qué usuario específico
tiene privilegios activos en la plataforma en ese momento.

18 Pregunta: ¿Qué utilidad práctica tiene el parámetro -u (upstream) al ejecutar git push -u origin cambiosMax por primera vez?

Respuesta: Configura un vínculo de seguimiento permanente (tracking) entre la rama local actual (cambiosMax) y la rama remota en el servidor de GitHub. Gracias a esto, en los siguientes envíos de código ya no es necesario
especificar el nombre remoto ni la rama completa, bastando con escribir simplemente git push

19 Pregunta: ¿Por qué al usar la directiva type="module" en un <script> el navegador puede generar errores si se intenta buscar un elemento del DOM inmediatamente al cargar el archivo?

Respuesta: Porque los scripts marcados como módulos se cargan y ejecutan de forma diferida (deferred) por defecto. Esto provoca que el archivo de JavaScript intente ejecutarse
antes de que el árbol del DOM (el contenido HTML) termine de renderizarse por completo en la memoria del navegador, requiriendo validaciones de nulidad o eventos de carga como DOMContentLoaded.

si quiero que al presionar "crear cuenta" me dirija al index.html que debo poner?
gemini:Para conectar tu formulario de registro con index.html utilizando el archivo app.js (y aprovechando que usas Alpine.js y almacenamiento local en tu proyecto MusicU), lo mejor es manejarlo con JavaScript mediante un evento submit. Así evitamos que la página se recargue de forma brusca y guardamos los datos del usuario en localStorage para que quede la sesión iniciada.

Aquí tienes cómo debes estructurar ambas partes:

1. Modificar tu formulario en registrar.html
Asegúrate de que tus inputs tengan sus atributos id bien definidos (como ya los tenías) para poder capturarlos desde app.js:

HTML
<form id="formRegistro">
    <input type="text" id="nombre" placeholder="Ingrese el nombre de usuario" required>
    <br><br>
    <input type="email" id="correo" placeholder="Ingrese su correo" required>
    <br><br>
    <input type="password" id="contrasena" placeholder="Ingrese su contraseña" required>
    <br><br>
    <button type="submit">Crear cuenta</button>
</form>


CONCLUSION
La IA me ayudo a entender conceptos que no acababa de dominar, y me ayudo a corroborar si lo que estaba haciendo tenia logica.
