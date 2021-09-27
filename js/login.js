window.addEventListener('load', function (event) {

  const baseUrl = 'http://localhost:5000/api/auth/Login';
  if (event.origin !== baseUrl) // Compliant
    return;
  function login(eventLogin) {
    event.preventDefault();
    console.log(eventLogin.currentTarget.correo.value);
    console.log(eventLogin.currentTarget.contra.value);
    var url = baseUrl;
    var data = {
      Email: eventLogin.currentTarget.correo.value,
      Password: eventLogin.currentTarget.contra.value,
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return res.json()
    })
      .catch(error => console.error('Error:', error))
      .then((response) => {
        if (response.isSuccess) {
          var user = data.Email.split('@')[0];
          sessionStorage.setItem('token', JSON.stringify(response.message));
          sessionStorage.setItem('user', user);
          window.location.replace('/index.html')
        }

      });

  }
  document.getElementById("login-form").addEventListener("submit", login);
});
