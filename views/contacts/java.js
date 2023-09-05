import { createNotification } from "../components/notification.js";

// Eventos:s
const nombreInput = document.querySelector("#nombre-input");
const phoneInput = document.querySelector("#phone-input");
const formBtn = document.querySelector("#form-btn");
const form = document.querySelector("#form");
const cerrarBtn = document.querySelector("#cerrar-btn");
const ul = document.querySelector('ul');


// REGEXR

const nombre_regexr=/^[A-Z]{1}[a-z]{0,15} [A-Z]{1}[a-z]{0,11}$/
const phone_regexr=/^[0](412|414|416|426|424|212)[0-9]{7}$/

// Declarar variables de validaciones

let nameValidation = false;
let phoneValidation = false;

// Funcion para validar nya:

const validateInput = (input, regexrValidation) => {

    const infoTest = nombreInput.parentElement.children[1];
    formBtn.disabled = nameValidation && phoneValidation ? false : true;

};

    nombreInput.addEventListener ("input", e => {
    nameValidation = nombre_regexr.test(nombreInput.value);
    validateInput (nombreInput,nameValidation);

});
// Funcion para validar telefono: 


phoneInput.addEventListener("input", e => {
    phoneValidation = phone_regexr.test(phoneInput.value);
    validateInput(phoneInput,phoneValidation);
    });

// if (!user){
//     window.location.href = '../home/index.html';
// }

const getContactos = async () => {
    try{
        const {data} = await axios.get ("/api/contacts",{
            withCredentials: true
        });
        data.forEach(contact => {
            const listItem = document.createElement('li');
            listItem.id = contact.id
            listItem.innerHTML= `
            <li class="contacto-item" id="${contact.id}">
            <button type="button" class="delete-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg></button>
                
                <input type="text" class="edit-name" value="${contact.name}"readonly>
                <input type="text" class="edit-phone"  value="${contact.phone}"readonly>
                
                <button type="button" class="edit-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg></button>
            </li>
            `
             ul.append(listItem);
             console.log(contact.id);
        });

    }catch {

        window.location.pathname = '/login';
    }
    
};
getContactos();


const deleteFunc = (id) => {
    console.log("delete" + id);
}

form.addEventListener ( 'submit', async e => {
	e.preventDefault();

    try {
        if (nombreInput.value === '' || phoneInput.value === '' ) {
            return
        }
    
        // Create list item
    
        const { data } = await axios.post('/api/contacts', { name: nombreInput.value, phone: phoneInput.value});
        console.log(data); 
    
        const listItem = document.createElement('li');
            listItem.id = data.id
            listItem.innerHTML= `
            <li class="contacto-item" id="${data.id}">
            <button type="button" class="delete-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg></button>
                
                <input type="text" class="edit-name" value="${data.name}"readonly>
                <input type="text" class="edit-phone"  value="${data.phone}"readonly>
                
                <button type="button" class="edit-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg></button>
            </li>
            `
             ul.append(listItem);
    
        // Empty input
        nombreInput.value = '';
        phoneInput.value = '';

    } catch (error) {
        console.log(error);
        createNotification(true, error.response.data.error)
        setTimeout(() => { 
            notification.classList.add('hidden');
        }, 5000)
    }
	// Check if the input is empty

});

let editnameValidation = true;
let editphoneValidation = true;

ul.addEventListener('click', async e => {
	// Select delete-icon
	if (e.target.closest('.delete-icon')) {
		const li = e.target.closest('.delete-icon').parentElement.parentElement;
		await axios.delete (`http://localhost:5003/api/contacts/${li.id}`);
		li.remove();
	}

if (e.target.closest(".edit-icon")) {

    const editIcon = e.target.closest(".edit-icon");

    const editInputname = editIcon.parentElement.children[1];

    const editInputphone = editIcon.parentElement.children[2];

 if (editIcon.classList.contains("editando")) {

    console.log(editnameValidation, editphoneValidation);

    try {

    const id = e.target.parentElement.id
    await axios.patch(`http://localhost:5003/api/contacts/${id}`,{name: editInputname.value, phone:editInputphone.value});

    editIcon.classList.remove("editando");

    editInputname.setAttribute("value", editInputname.value);
    editInputphone.setAttribute("value", editInputphone.value);

    editInputname.setAttribute("readonly","true");
    editInputphone.setAttribute("readonly","true");

    console.log(editphoneValidation);

    editIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-svg">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
                `;

    createNotification(false, `${editInputname.value} saved and updated`)
    setTimeout(() => { 
        notification.classList.add('hidden');
    }, 5000)
    

    } catch (error) {
     console.log(error);
        createNotification(true, error.response.data.error)
        setTimeout(() => { 
            notification.classList.add('hidden');
        }, 5000)
    }
   
 } else {
 
    editIcon.classList.add("editando");

    editInputname.removeAttribute("readonly");
    editInputphone.removeAttribute("readonly");


    const validateEdits = (input, regexrValidation) => {
        const infoinputs = input.parentElement.children[1];
        // editIcon.disabled = editnameValidation && editphoneValidation ? false : true;        
    }

    editInputname.addEventListener ("input", e => {
    editnameValidation = nombre_regexr.test(editInputname.value);
    validateEdits (editInputname,editnameValidation);
    
    });

    editInputphone.addEventListener("input", e => {
        editphoneValidation = phone_regexr.test(editInputphone.value);
        validateEdits (editInputphone,editphoneValidation);
        console.log(editphoneValidation);

    });

    editIcon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-svg">
    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
    `;

    }
}

});



















// form.addEventListener("submit", async e => {
//     e.preventDefault();
//     const responseJSON = await fetch ("http://localhost:3005/contactos", {
//         method: "POST",
//         headers: {
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify({user: user.username, nombre: nombreInput.value, telefono: phoneInput.value}),
//     });

//     const response = await responseJSON.json();

// // crear el contenido del formulario


// const li = document.createElement("li");

// // El contenido se rellena segun input usuario

// li.innerHTML = `
//             <li class="contacto-item" id="${response.id}">
//             <button type="button" class="delete-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-svg">
//             <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg></button>
            
//             <input type="text" class="edit-name" value="${nombreInput.value}"readonly>
//             <input type="text" class="edit-phone"  value="${phoneInput.value}"readonly>
            
//             <button type="button" class="edit-icon"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-svg">
//             <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
//             </svg></button>
//             </li>
            
//  `;
//  // Anexo la Li a la LIST (ya declarada en HTML- UL)

//  list.append(li);

//  // Limpiar inputs despues de introducir los primeros datos

// nombreInput.value = "";
// phoneInput.value = "";
// validateInput(nombreInput);
// validateInput(phoneInput);
// nameValidation = false;
// phoneValidation = false;
// formBtn.disabled = true;

// // Se guarden los primeros datos dando paso a escribir un contact nuevo

// // localStorage.setItem ("listaContactos",list.innerHTML)
// });

// // Valor y funcion al boton delete

// list.addEventListener("click", async e => {
//     if (e.target.closest(".delete-icon")) {
//         const id = e.target.parentElement.id
//         console.log(e.target);
//         await fetch (`http://localhost:3005/contactos/${id}`, {method: "DELETE"});
//         e.target.closest(".delete-icon").parentElement.parentElement.remove()
//         // localStorage.setItem("listaContactos",list.innerHTML)
//     }

// // Valor y funcion al boton edit

// if (e.target.closest(".edit-icon")) {

//     const editIcon = e.target.closest(".edit-icon");

//     const editInputname = editIcon.parentElement.children[1];

//     const editInputphone = editIcon.parentElement.children[2];

//  if (editIcon.classList.contains("editando")) {

//     editIcon.classList.remove("editando");

//     editInputname.setAttribute("value", editInputname.value);
//     editInputphone.setAttribute("value", editInputphone.value);

//     editInputname.setAttribute("readonly","true");
//     editInputphone.setAttribute("readonly","true");

//     editIcon.innerHTML = `
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-svg">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
//     </svg>
//                 `;
    
//     const id = e.target.parentElement.id
//     await fetch(`http://localhost:3005/contactos/${id}`,{ 
//     method: 'PATCH',
//     headers: {
//     'Content-Type': 'application/json'
//      },
//      body: JSON.stringify({user: user.username, nombre: editInputname.value, telefono: editInputphone.value}),
//     });

    

// // localStorage.setItem("listaContactos", list.innerHTML);
 
//  } else {
 
//     editIcon.classList.add("editando");

//     editInputname.removeAttribute("readonly");
//     editInputphone.removeAttribute("readonly");

//     let editnameValidation = true;
//     let editphoneValidation = true;


//     const validateEdits = (input, regexrValidation) => {
//         const infoinputs = input.parentElement.children[1];
//         editIcon.disabled = editnameValidation && editphoneValidation ? false : true
//     }

//     editInputname.addEventListener ("input", e => {
//     editnameValidation = nombre_regexr.test(editInputname.value);
//     validateEdits (editInputname,editnameValidation);
    
//     });

//     editInputphone.addEventListener("input", e => {
//         editphoneValidation = phone_regexr.test(editInputphone.value);
//         validateEdits (editInputphone,editphoneValidation);

//     });


//     editIcon.innerHTML = `
//     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="edit-svg">
//     <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
//     </svg>
//     `;
//     }
// }
 
// });

// cerrarBtn.addEventListener("click", async e => {
//     localStorage.removeItem("user");
//     window.location.href = '../home/index.html';
//  });  


