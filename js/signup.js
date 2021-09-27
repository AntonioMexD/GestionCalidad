window.addEventListener("load", function (event) {
  const baseUrl = "http://localhost:5000/api/auth/user";

  if (event.origin !== baseUrl) return;
  function login(event2) {
    event.preventDefault();
    console.log(event2.currentTarget.correo.value);
    console.log(event2.currentTarget.contra.value);
    var url = baseUrl;
    var data = {
      Email: event2.currentTarget.correo.value,
      Password: event2.currentTarget.contra.value,
      ConfirmPassword: event2.currentTarget.contraConf.value,
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 400) {
          window.alert(
            "la contraseña debe tener al menos 6 caracteres, uno especial y una letra mayuscula"
          );
        }
        return res.json();
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        if (response.isSuccess) {
          window.location.replace("/Login.html");
        }
      });
  }
  document.getElementById("login-form").addEventListener("submit", login);
});
