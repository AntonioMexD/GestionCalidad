window.addEventListener('load', (event) =>
{
    const baseUrl = 'http://localhost:5000/api';
    const PrivateToken = JSON.parse(sessionStorage.getItem('token'));
    const user=sessionStorage.getItem('user');
    if(user!=null)
    {
        document.getElementById('logged').innerText = user
    }

    //GET
    async function fetchGetBoutiques()
    {
        const url=`${baseUrl}/boutiques`;
        let h=new Headers();
        h.append('Authorization', `Bearer ${PrivateToken}`);
        let req = new Request(url, {
            method: 'GET',
            mode: 'cors',
            headers: h
        });
        
        let response = await fetch(req);
        try
        {
            if(response.status === 200)
            {
                let data = await response.json();
                var boutiqueStringMap = data.map(b => `
                    <div class="boutique">
                    <div class="card-header">
                      <h3>  ${b.name} </h3>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${b.country}</h5>
                        <p class="card-text">${b.address}</p>
                        <a type="button" class="btn btn-primary" href="/Clothes/Clothes.html?id=${b.id}">ver productos</a>
                        <a type="button" class="btn btn-primary" href="/EditBoutiques.html?id=${b.id}">Editar Boutique</a>
                        <a type="button" class="btn btn-primary" href="/Clothes/CreateClothes.html?id=${b.id}">Añadir Ropa</a>
                        <a type="button" class="btn btn-primary" href="/Clothes/Sales.html?id=${b.id}">Ventas</a>
                    </div>
                    <div class="card-footer text-muted">
                       TELEFONO ${b.mobilePhone}
                    </div>
                    </div>
                `)
                var boutiqueContent = `<ul id="boutique-list">${boutiqueStringMap.join('')}</ul>`;
                document.getElementById("boutique-card-content").innerHTML = boutiqueContent
            }
            else
            {
                console.log(error);
                throw new error(await response.text());
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }

    //POST
    function registerBoutique(event)
    {
        console.log(event.currentTarget);
        event.preventDefault();
        const url=`${baseUrl}/boutiques`;

        var data = {
            name: event.currentTarget.name.value,
            country: event.currentTarget.country.value,
            address: event.currentTarget.address.value,
            owner: event.currentTarget.owner.value,
            mobilePhone: event.currentTarget.mobilePhone.value
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type' : 'application/json',
                'Authorization': `Bearer ${PrivateToken}`
            }
        }).then((response) => {
            if(response.status === 201)
            {
                window.location.replace('/Boutiques.html');
            }
            else
            {
                response.text().then((data) => {
        
                    console.log(data);
                });
            }
        }).catch((response) => {
            console.log(data);
        });
    }
    function filter(e) {
        var x = document.getElementById("boutique-list").querySelectorAll('.boutique');
       
        for (var i = 0; i < x.length; i++) {
            let type = x[i].querySelectorAll("h5")[0].innerText
            let valorAFiltrar=e.target.id
                x[i].style.display = "block";
                if (type !=valorAFiltrar && valorAFiltrar!="All") {
                    x[i].style.display = "none";
                }

        }
    }




    var getBoutique = document.getElementById("content-boutique")
    if(getBoutique)
    {
        getBoutique.addEventListener('load', fetchGetBoutiques());
    }

    var postBoutique = document.getElementById("create-boutique");
    if(postBoutique)
    {
        postBoutique.addEventListener("submit", registerBoutique);
    }

    var deleteBoutique = document.getElementById("delete-boutique");
    if(deleteBoutique)
    {
        deleteBoutique.addEventListener("submit", deleteBoutique);
    }
    document.getElementById("filters").onclick = filter;


});