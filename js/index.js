
window.addEventListener('load', (event) => {
    const user = sessionStorage.getItem('user');
    if (user != null) {
        document.getElementById('logged').innerText = user
    }
});
