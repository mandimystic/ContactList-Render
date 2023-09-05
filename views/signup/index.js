import { createNotification } from "../components/notification.js";

const form = document.querySelector("#form");
const inputName = document.querySelector("#name-input");
const inputEmail = document.querySelector("#email-input");
const password = document.querySelector("#password-input");
const match = document.querySelector("#match-input");
const formBtn = document.querySelector("#form-btn");
const notification = document.querySelector('#notification');


// REGEXR

const name_regexr = /^[A-Z][a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[A-Z][a-zA-ZÀ-ÿ\u00f1\u00d1\s]*)$/
const email_regexr = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const pasw_regexr = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[@.*]).{8,20}$/;

let nameValidation = false;
let emailValidation = false;
let passValidation = false;
let matchValidation = false;


// Funcion generica 

const validateInput = (input, regexrValidation) => {

const checkIcon = input.parentElement.children[1]
const xIcon = input.parentElement.children[2]

 if (nameValidation && emailValidation && passValidation && matchValidation){
    formBtn.disabled = false;
    } else {
   formBtn.disabled = true;
    }      

if (input.value == ""){ 
    // Aqui todos van con remove para que no se muestre nada si el  input esta vacio
    xIcon.classList.add("hidden");
    checkIcon.classList.add("hidden");

} else if (regexrValidation){
    // Si el input es verdadero mostrará el icono check, y removera X
    xIcon.classList.add("hidden");
    checkIcon.classList.remove("hidden");
}else {
    //  Aqui sucede lo contrario
    xIcon.classList.remove("hidden");
    checkIcon.classList.add("hidden");
}
}

inputName.addEventListener("input", e => {
    nameValidation = name_regexr.test(inputName.value)
    validateInput(inputName,nameValidation);
});

inputEmail.addEventListener("input", e => {
    emailValidation = email_regexr.test(inputEmail.value)
    validateInput(inputEmail,emailValidation);
});

inputEmail.addEventListener("input", e => {
    emailValidation = email_regexr.test(inputEmail.value)
    validateInput(inputEmail,emailValidation);
});

password.addEventListener("input", e => {
    passValidation = pasw_regexr.test(password.value)
    validateInput(password, passValidation);
// Se debe colocar la validcion del match aqui pq depende de la contraseña
    matchValidation = match.value === password.value;
    validateInput(match,matchValidation);
});

match.addEventListener("input", e => {
    matchValidation = match.value === password.value;
    validateInput(match, matchValidation);
});

form.addEventListener("submit", async e => {
    e.preventDefault();
    try {
     const newUser = {

            name: inputName.value,
            email: inputEmail.value,
            password: password.value
        }
        const {data} = await axios.post('/api/users', newUser) ;
        createNotification(false, data)
        setTimeout(() => { 
        notification.classList.add('hidden');
    }, 5000)
        inputName.value = "";
        inputEmail.value = "";
        password.value= "";
        match.value = "";

        validateInput(inputName,false);
        validateInput(inputEmail,false);
        validateInput(password,false);
        validateInput(match,false);
        
    } catch (error) {
        createNotification(true, error.response.data.error)
        setTimeout(() => { 
        notification.classList.add('hidden');
    }, 5000)
}
});

