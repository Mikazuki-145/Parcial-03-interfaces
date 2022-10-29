const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	Nombres: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	Apellidos: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	Password: /^.{4,12}$/, // 4 a 12 digitos.
	Correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	Categoria: /^[a-zA-ZÀ-ÿ\s]{1,11}$/, // Letras y espacios, pueden llevar acentos.
}

const campos = {
	Nombres: false,
	Apellidos: false,
	Password: false,
	Correo: false,
	Categoria: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "Nombres":
			validarCampo(expresiones.Nombres, e.target, 'Nombres');
		break;
		case "Apellidos":
			validarCampo(expresiones.Apellidos, e.target, 'Apellidos');
		break;
		case "Password":
			validarCampo(expresiones.Password, e.target, 'Password');
			validarPassword2();
		break;
		case "Password2":
			validarPassword2();
		break;
		case "Correo":
			validarCampo(expresiones.Correo, e.target, 'Correo');
		break;
		case "Categoria":
			validarCampo(expresiones.Categoria, e.target, 'Categoria');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('Password');
	const inputPassword2 = document.getElementById('Password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__Password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__Password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__Password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__Password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__Password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['Password'] = false;
	} else {
		document.getElementById(`grupo__Password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__Password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__Password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__Password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__Password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['Password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const Terminos = document.getElementById('Terminos');
	if(campos.Nombres && campos.Apellidos && campos.Password && campos.Correo && campos.Categoria && Terminos.checked ){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});