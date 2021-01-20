const fetchInfoVelib = () => {


  const url ='https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=100&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes'
    fetch(url).then((response) =>
      response.json().then((data) => {
        selector.innerHTML =""
        velibInfo(data);

      ;}))
      .catch((error) => console.error('error:', error));


}

const velibInfo = (data) => {
  const dataArray = data.records;
  const selector = document.getElementById('selector');
  dataArray.forEach( (item) => {
    const name = item.fields.name;
    const numberElectricVelibs = item.fields.ebike;
    const numberClassicalVelibs = item.fields.mechanical;
    const numberOfAvailableSpots = item.fields.numdocksavailable;

    showVelibStation(selector, name, numberClassicalVelibs, numberElectricVelibs, numberOfAvailableSpots);
  });
};


const showVelibStation = (selector, name, numberClassicalVelibs, numberElectricVelibs, numberOfAvailableSpots) => {
  selector.innerHTML += `
    <div class="card border mb-3 mx-3" style="width: 20rem;">
          <h3 class="card-header pt-2 px-2">Station : ${name}</h3>
          <p class="pt-2 px-2">${numberClassicalVelibs} classical Velibs</p>
          <p class="pt-2 px-2">${numberElectricVelibs} electric Velibs</p>
          <p class="pt-2 px-2">${numberOfAvailableSpots} electric Velibs</p>
      </div>
  `

}

const selector = document.getElementById('selector')

fetchInfoVelib();
setInterval(fetchInfoVelib, 3000);
