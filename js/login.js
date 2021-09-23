window.addEventListener('load', (event) => {

    function login(event) {
        event.preventDefault();
        console.log(event.currentTarget.correo.value);
        console.log(event.currentTarget.contra.value);
        var url = 'http://localhost:5000/api/auth/Login';
        var data = {
            Email: event.currentTarget.correo.value,
            Password: event.currentTarget.contra.value,
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
                if(response.isSuccess)
                {
                    var user = data.Email.split('@')[0];
                    sessionStorage.setItem('token',JSON.stringify(response.message));
                    sessionStorage.setItem('user',user);
                    window.location.replace('/index.html')
                }
               
            });
        
    }
    document.getElementById("login-form").addEventListener("submit", login);
});
   