window.addEventListener('load', (event) =>
{

    //<script src="js/scriptClothesED.js"></script>

    const baseUrl = 'http://localhost:5000/api/boutiques';

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const idBoutique = urlParams.get('boutiqueIde');

    const PrivateToken = JSON.parse(sessionStorage.getItem('token'));
    const user=sessionStorage.getItem('user');
    if(user!=null)
    {
        document.getElementById('logged').innerText = user
    }

    //GET
    async function fetchGetClothes()
    {
        const url=`${baseUrl}/${id}/clothes`
        let h=new Headers();
        h.append('Authorization', `Bearer ${PrivateToken}`);
        let req = new Request(url, {
            method: 'GET',
            mode: 'cors',
            headers: h
        });
        
        let response = await fetch(req);
        
        try{
            if(response.status === 200)
            {
                let data = await response.json();
                var clothesStringMap = data.map(c => `
                    <tr >
                        <td> ${c.name} </td>
                        <td> ${c.size} </td>
                        <td> ${c.brand} </td>
                        <td> ${c.stock} </td>
                        <td> ${c.sell} </td>
                        <td 
                            <div>
                                <button type="button" class="btn btn-outline-info" onclick="updateStock(${c.id})"> Recargar Stock </button>
                            </div>
                        </td>
                    </tr>
                `)
                var clothesContent = `<ul id="clothesList">${clothesStringMap.join('')}</ul>`;
                document.getElementById("clothes-list-content").innerHTML = clothesContent;
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





    var getClothes = document.getElementById("content-clothes")
    if(getClothes)
    {
        getClothes.addEventListener('load', fetchGetClothes());
    }

});