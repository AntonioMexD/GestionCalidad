window.addEventListener('load', (event) => {

  //<script src="js/scriptClothesED.js"></script>
  const baseUrl = 'http://localhost:5000/api/boutiques';

  if (event.origin !== baseUrl)
    return;

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');



  const PrivateToken = JSON.parse(sessionStorage.getItem('token'));
  const user = sessionStorage.getItem('user');
  if (user != null) {
    document.getElementById('logged').innerText = user
  }

  //GET
  async function fetchGetClothes() {
    const url = `${baseUrl}/${id}/clothes`
    let h = new Headers();
    h.append('Authorization', `Bearer ${PrivateToken}`);
    let req = new Request(url, {
      method: 'GET',
      mode: 'cors',
      headers: h
    });

    let response = await fetch(req);

    try {
      let data = await response.json();
      var clothesStringMap = data.map(c => `
                    <tr >
                        <td> ${c.name} </td>
                        <td> ${c.size} </td>
                        <td> ${c.brand} </td>
                        <td> ${c.price} Bs. </td>
                        <td> ${c.genre} </td>
                        <td> ${c.stock} </td>
                        <td 
                            <div>
                                <a type="button" class="btn btn-outline-info" href="/Clothes/EditClothes.html?id=${c.id}&boutiqueIde=${c.boutiqueIde}"> Editar </a>
                                
                                <button type="button" class="btn btn-outline-info" onclick="updateSales(${c.id})"> Vender </button>
                                
                            </div>
                        </td>
                    </tr>
                `)
      var clothesContent = `<ul id="clothesList">${clothesStringMap.join('')}</ul>`;
      document.getElementById("clothes-list-content").innerHTML = clothesContent;
    } catch (error) {
      console.log(error);
      throw new error(await response.text());
    }
  }

  //POST
  function registerClothes(eventRegister) {

    console.log(eventRegister.currentTarget);
    event.preventDefault();


    var data = {
      name: eventRegister.currentTarget.name.value,
      size: eventRegister.currentTarget.size.value,
      brand: eventRegister.currentTarget.brand.value,
      price: parseInt(eventRegister.currentTarget.price.value),
      genre: event.currentTarget.genre.value,
      stock: 50,
      sell: 0,
      boutiqueIde: parseInt(id)
    }

    const idB = data.boutiqueIde;
    console.log(idB);

    const url = `${baseUrl}/${id}/clothes`;
    console.log(data);

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PrivateToken}`

      }
    }).then((response) => {
        window.location.replace(`Clothes.html?id=${id}`)
    }).catch((error) => {
      debugger;
      console.log(error);
    });
  }
  //Filtro
  function filter(e) {
    var x = document.getElementById("clothes-list-content").querySelectorAll("tr");
    x.forEach((element) => {
      let type = element.querySelectorAll("td")[1].innerText
      let valorAFiltrar = e.target.id
      element.style.display = "table-row";
      if (type != valorAFiltrar && valorAFiltrar != "All") {
        element.style.display = "none";
      }
    })
  }
  function filterGender(e) {
    var x = document.getElementById("clothes-list-content").querySelectorAll("tr");
    x.forEach((element) => {
      let type = element.querySelectorAll("td")[4].innerText
      let valorAFiltrar = e.target.id
      element.style.display = "table-row";
      if (type !== valorAFiltrar && valorAFiltrar !== "All") {
        element.style.display = "none";
      }
    })
  }
  function crearProducto() {
    window.location.replace(`/Clothes/CreateClothes.html?id=${id}`)
  }


  var getClothes = document.getElementById("content-clothes")
  if (getClothes) {
    getClothes.addEventListener('load', fetchGetClothes());
  }

  var postClothes = document.getElementById("create-clothes");
  if (postClothes) {
    postClothes.addEventListener("submit", registerClothes);
  }
  document.getElementById("create").onclick = crearProducto;
  document.getElementById("filters").onclick = filter;
  document.getElementById("filtersG").onclick = filterGender;

});