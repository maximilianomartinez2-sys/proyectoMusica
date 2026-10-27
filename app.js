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