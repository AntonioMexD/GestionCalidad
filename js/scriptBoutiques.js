

const baseUrl = 'http://localhost:5000/api';
const PrivateToken = JSON.parse(sessionStorage.getItem('token'));
const urlParams = new URLSearchParams(window.location.search);
const user=sessionStorage.getItem('user');
if(user!=null)
{
    document.getElementById('logged').innerText = user
}
const id = urlParams.get('id');

//GETBYID
async function fetchGetBoutique() {
    const url = `${baseUrl}/boutiques/${id}`;
    let h=new Headers();
        h.append('Authorization', `Bearer ${PrivateToken}`);
        let req = new Request(url, {
            method: 'GET',
            mode: 'cors',
            headers: h
        });
        
        let response = await fetch(req);
    try {
        if (response.status === 200) {
            let data = await response.json();
            console.log(data);
            document.getElementById("name").value = data.name
            document.getElementById("country").value = data.country
            document.getElementById("address").value = data.address
            document.getElementById("owner").value = data.owner
            document.getElementById("mobilePhone").value = data.mobilePhone
        }
        else {
            console.log(error);
            throw new error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

//PUT
function updateBoutique(event)
{
    event.preventDefault();
    const boutique = {
        name: event.currentTarget.name.value,
        country: event.currentTarget.country.value,
        address: event.currentTarget.address.value,
        owner: event.currentTarget.owner.value,
        mobilePhone: event.currentTarget.mobilePhone.value
    }
    console.log(boutique);
    console.log(id);

    fetch('http://localhost:5000/api/boutiques/'+id, {
        headers : {
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${PrivateToken}`
        },
        method : 'PUT',
        body : JSON.stringify(boutique)
    }).then((response) => {
        window.location.replace('/Boutiques.html')
    })

};

//DELETE
function deleteBoutique(event)
{
    console.log(id);
    fetch('http://localhost:5000/api/boutiques/'+id,
    {
        headers : {
            'Authorization': `Bearer ${PrivateToken}`
        },
        method: 'DELETE'
    }).then((response) => {
        window.location.replace('/Boutiques.html')
    })
};


fetchGetBoutique();

var editBoutique = document.getElementById("edit-boutique");
if(editBoutique)
{
    editBoutique.addEventListener("submit", updateBoutique);
}