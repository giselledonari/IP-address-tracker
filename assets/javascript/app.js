let map
let dibujarMapa=(long,lat)=>{
    
    document.querySelector("#mapas").innerHTML=`<div id="map" class="map"></div>`
    map = L.map('map').setView([long, lat], 13);
    let blackMarker=L.icon({
        iconUrl:"./assets/images/icon-location.svg"
    })
    let marker = L.marker([long, lat],{icon:blackMarker}).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
}

dibujarMapa(37.40599,-122.078514)

let btn=document.querySelector("#btn")

btn.addEventListener("click",async(e)=>{
    e.preventDefault()
    let ipInput=document.querySelector("#ipInput").value
    let data=await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_xlwE06CmsBwCAa1KG1y845Ekkqt1C&ipAddress=${ipInput}`)
    
    data=await data.json()

    let ip=data.ip
    document.querySelector("#ip").textContent=ip

    let location=data.location.city+" "+data.location.region+" "+data.location.postalCode
    document.querySelector("#location").textContent=location

    let time="UTC"+data.location.timezone
    document.querySelector("#timeZone").textContent=time

    let isp=data.isp
    document.querySelector("#isp").textContent=isp


    let latitud=data.location.lat
    let longitud=data.location.lng
    console.log(data)
    map.remove()
    dibujarMapa(latitud,longitud)
})
