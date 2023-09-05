const div = document.querySelector('#notification');

export const createNotification = (isError, message) => {

    if (isError) {
        div.innerHTML= `
        <p>${message}</p>
    `
    } else {
        div.innerHTML= `
        <p>${message}</p>
    `}
}

