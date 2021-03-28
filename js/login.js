const login = document.getElementById('login');


const clientId = '6334759ba3374cd1b6ae3341ad7dc6ba';
const localhost = 'http://localhost:5501/';
const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${localhost}&response_type=token`;

login.addEventListener('click', ev => {
    ev.preventDefault();
    location.replace(url);
});