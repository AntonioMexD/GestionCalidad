
const baseUrl = 'http://localhost:5000/api/boutiques';

const urlParams = new URLSearchParams(window.location.search);
const idClothes = urlParams.get('id');

const idBoutique = urlParams.get('boutiqueIde');
const PrivateToken = JSON.parse(sessionStorage.getItem('token'));
const user=sessionStorage.getItem('user');
if(user!=null)
{
    document.getElementById('logged').innerText = user
}
const h = new Headers();
h.append('Authorization', `Bearer ${PrivateToken}`);


//GETBYID
async function fetchGetClothe() {
    const url = `${baseUrl}/${idBoutique}/clothes/${idClothes}`;

    //let PrivateToken = JSON.parse(sessionStorage.getItem('token'));
    //let h = new Headers();
   // h.append('Authorization', `Bearer ${PrivateToken}`);
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
            document.getElementById("size").value = data.size
            document.getElementById("brand").value = data.brand
            document.getElementById("price").value = data.price
            document.getElementById("genre").value = data.genre
            document.getElementById("stock").value = data.stock
            document.getElementById("sell").value = data.sell
            document.getElementById("boutiqueIde").value = data.boutiqueIde
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
function updateClothes(event) {

    event.preventDefault();
    const clothes = {
        name: event.currentTarget.name.value,
        size: event.currentTarget.size.value,
        brand: event.currentTarget.brand.value,
        price: parseInt(event.currentTarget.price.value),
        genre: event.currentTarget.genre.value,
        stock: parseInt(event.currentTarget.stock.value),
        sell: parseInt(event.currentTarget.sell.value)
    }
    console.log(clothes);
    console.log(idBoutique);
    console.log(idClothes);

    fetch('http://localhost:5000/api/boutiques/' + idBoutique + '/clothes/' + idClothes, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${PrivateToken}`
        },
        method: 'PUT',
        body: JSON.stringify(clothes)
    }).then((response) => {
        if(response.status==200)
        {
            window.location.replace('/Clothes/Clothes.html?id=' + idBoutique)
        }
        
    })
};

//DELETE
function deleteClothes(event) {
    fetch('http://localhost:5000/api/boutiques/' + idBoutique + '/clothes/' + idClothes,
        {
            headers: {
                'Authorization': `Bearer ${PrivateToken}`
            },
            method: 'DELETE'
        }).then((response) => {
            window.location.replace('/Clothes/Clothes.html?id=' + idBoutique)
        })
};

fetchGetClothe();

var editClothes = document.getElementById("edit-clothes");
if (editClothes) {
    editClothes.addEventListener("submit", updateClothes);
}