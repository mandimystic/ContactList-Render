const div = document.querySelector('#notification');

export const createNotification = (isError, message) => {

    div.classList.remove('hidden');

    if (isError) {
        div.innerHTML= `
        <p>${message}</p>
    `
    } else {
        div.innerHTML= `
        <p>${message}</p>
    `}

    console.log('perro');
}

