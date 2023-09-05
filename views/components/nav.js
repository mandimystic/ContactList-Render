const navbar = document.querySelector('#navbar')

const createNavHome = () => {
    navbar.innerHTML=`
    <div class="max-w-7xl bg-slate-500 opacity-70 h-16 mx-auto flex items-center px-4 justify-between">
    <p class="font-bold text-xl text-white">TodoApp</p>
    <!-- // Version movil -->

    <svg xmlns="http://www.w3.org/2000/svg" 
    fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
    stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer py-2 hover:bg-slate-500">
    <path stroke-linecap="round" stroke-linejoin="round" 
    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>
     
    <!-- // Version escritorio -->
    <div class="hidden md:flex flex-row gap-4">
        <a href="/login/" class="text-white hover:bg-gray-900 py-2 px-4 rounded-lg">Login</a>
        <a href="/signup/" class="text-white bg-slate-400 hover:bg-slate-600 py-2 px-4 rounded-lg" >Sign up</a>
    </div>
    <!-- // menu movil -->

    <div class="bg-slate-700 w-2/4 fixed top-16  right-0 bottom-0 flex justify-center items-center flex-col gap-4 hidden">
        <a href="/login/" class="text-white hover:bg-gray-900 py-2 px-4 rounded-lg">Login</a>
        <a href="/signup/" class="text-white bg-slate-400 hover:bg-slate-600 py-2 px-4 rounded-lg" >Sign up</a>
    </div>

    </div>`
} 

const createNavSignUp = () => {
    navbar.innerHTML=`
    <div class="max-w-7xl bg-slate-500 opacity-70 h-16 mx-auto flex items-center px-4 justify-between">
    <p class="font-bold text-xl text-white">TodoApp</p>
    <!-- // Version movil -->

    <svg xmlns="http://www.w3.org/2000/svg" 
    fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
    stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer py-2 hover:bg-slate-500">
    <path stroke-linecap="round" stroke-linejoin="round" 
    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>
     
    <!-- // Version escritorio -->
    <div class="hidden md:flex flex-row gap-4">
        <a href="/login/" class="text-white hover:bg-gray-900 py-2 px-4 rounded-lg">Login</a>
        <a href="/" class="text-white hover:bg-gray-900 py-2 px-4 rounded-lg">Home</a>
    </div>

    <!-- // menu movil -->

    <div class="bg-slate-700 w-2/4 fixed top-16  right-0 bottom-0 flex justify-center items-center flex-col gap-4 hidden">
        <a href="/login/" class="text-white hover:bg-gray-900 py-2 px-4 rounded-lg">Login</a>
        <a href="/" class="text-white hover:bg-gray-900 py-2 px-4 rounded-lg">Home</a>
    </div>

    </div>
    `
} 

const createNavLogIn = () => {
    navbar.innerHTML=`
    <div class="max-w-7xl bg-slate-500  h-16 mx-auto flex items-center px-4 justify-between">
    <p class="font-bold text-xl text-white">TodoApp</p>
    <!-- // Version movil -->

    <svg xmlns="http://www.w3.org/2000/svg" 
    fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
    stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer py-2 hover:bg-slate-500">
    <path stroke-linecap="round" stroke-linejoin="round" 
    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>
     
    <!-- // Version escritorio -->
    <div class="hidden md:flex flex-row gap-4">
        <a href="/signup/" class="text-white bg-slate-400 hover:bg-slate-600 py-2 px-4 rounded-lg" >Signup</a>
        <a href="/" class="text-white hover:bg-gray-900 py-2 px-4 rounded-lg">Home</a>
    </div>

    <!-- // menu movil -->

    <div class="bg-slate-700 opacity-70 w-2/4 fixed top-16  right-0 bottom-0 flex justify-center items-center flex-col gap-4 hidden">
        <a href="/signup/" class="text-white bg-slate-400 hover:bg-slate-600 py-2 px-4 rounded-lg" >Sign up</a>
        <a href="/" class="text-white hover:bg-gray-900 py-2 px-4 rounded-lg">Home</a>
    </div>

    </div>`
} 

const createNavContacts = () => {
    navbar.innerHTML= `
    <div class="max-w-7xl bg-slate-500  h-16 mx-auto flex items-center px-4 justify-between">
    <p class="font-bold text-xl text-white">TodoApp</p>
    <!-- // Version movil -->

    <svg xmlns="http://www.w3.org/2000/svg" 
    fill="none" viewBox="0 0 24 24" stroke-width="1.5" 
    stroke="currentColor" class="w-10 h-10 md:hidden text-white cursor-pointer py-2 hover:bg-slate-500">
    <path stroke-linecap="round" stroke-linejoin="round" 
    d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>
     
    <!-- // Version escritorio -->
    <div class="hidden md:flex flex-row gap-4">
        <button id= "close-btn" class="text-white hover:bg-gray-900 py-2 px-4 rounded-lg">Log out</button>
    </div>

    <!-- // menu movil -->

    <div class="bg-slate-700 opacity-70 w-2/4 fixed top-16  right-0 bottom-0 flex justify-center items-center flex-col gap-4 hidden">
        <button id= "close-btn" class="text-white hover:bg-gray-900 py-2 px-4 rounded-lg">Log out</button>
    </div>

    </div>`
} 

if (window.location.pathname === '/'){
    createNavHome()
} else if (window.location.pathname ==='/signup/') {
    createNavSignUp()
} else if (window.location.pathname ==='/login/'){
    createNavLogIn()
} else if (window.location.pathname ==='/contacts/'){
    createNavContacts()
};

const navBtn = navbar.children[0].children[1];

navBtn.addEventListener("click", e => {
    const menuMovil= navbar.children[0].children[3];
    if (!navBtn.classList.contains("active")) {
    navBtn.classList.add("active");
    navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />'
    menuMovil.classList.remove("hidden");
    } else {
    navBtn.classList.remove("active");
    navBtn.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />'
    menuMovil.classList.add("hidden");
    } 
})

const closeEscritorio = navbar.children[0].children[2].children[0]; 
const closeMobil = navbar.children[0].children[3].children[0]; 

closeEscritorio.addEventListener("click", async e => {
    try {
        await axios.get('/api/logout');
        window.location.pathname = '/login/'
    } catch (error) {
        console.log(error);
    }
})

closeMobil.addEventListener("click", async e => {
    try {
        await axios.get('/api/logout');
        window.location.pathname = '/login/'
    } catch (error) {
        console.log(error);
    }
})