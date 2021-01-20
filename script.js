const fetchInfoVelib = () => {


  const url ='https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&q=&rows=100&facet=name&facet=is_installed&facet=is_renting&facet=is_returning&facet=nom_arrondissement_communes'
    fetch(url).then((response) =>
      response.json().then((data) => {
        velibInfo(data);
      ;}))
      .catch((error) => console.error('error:', error));


}

const velibInfo = (data) => {
  const dataArray = data.records
      for (let i = 0; i < dataArray.length; i++) {
        let name = dataArray[i].fields.name
        let numberElectricVelibs = dataArray[i].fields.ebike
        let numberClassicalVelibs = dataArray[i].fields.mechanical
        let numberOfAvailableSpots = dataArray[i].fields.numdocksavailable

        const selector = document.getElementById('selector')
        showVelibStation(selector, name, numberClassicalVelibs, numberElectricVelibs, numberOfAvailableSpots)

      }
}


const showVelibStation = (selector, name, numberClassicalVelibs, numberElectricVelibs, numberOfAvailableSpots) => {
  selector.innerHTML += `
    <div class="card border-primary mb-3" style="max-width: 20rem;">
          <h2>Station : ${name}</h2>
          <p>${numberClassicalVelibs} classical Velibs</p>
          <p>${numberElectricVelibs} electric Velibs</p>
          <p>${numberOfAvailableSpots} electric Velibs</p>
      </div>
  `
}


setInterval(fetchInfoVelib, 3000);
