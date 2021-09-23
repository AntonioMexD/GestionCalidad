window.addEventListener('load', (event) => {

    function login(event) {

        event.preventDefault();
        console.log(event.currentTarget.correo.value);
        console.log(event.currentTarget.contra.value);
        var url = 'http://localhost:5000/api/auth/user';
        var data = {
            Email: event.currentTarget.correo.value,
            Password: event.currentTarget.contra.value,
            ConfirmPassword: event.currentTarget.contraConf.value
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if(res.status===400)
            {

                window.alert("la contraseña debe tener al menos 6 caracteres, uno especial y una letra mayuscula");
            }
            return res.json()
        })
            .catch(error => console.error('Error:', error))
            .then((response) => {
                if (response.isSuccess) {
                    window.location.replace('/Login.html')
                }
                

            });

        

    }
    document.getElementById("login-form").addEventListener("submit", login);
});
