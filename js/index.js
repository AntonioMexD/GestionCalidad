
window.addEventListener('load', (event) => {

  if (event.origin !== "http://localhost:5000")
    return;
  const user = sessionStorage.getItem('user');
  if (user != null) {
    document.getElementById('logged').innerText = user
  }
});
