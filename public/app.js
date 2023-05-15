const aircrafts = document.querySelector('.aircrafts');
const acBtn = document.getElementById('acBtn');
const searchBtn = document.getElementById('searchBtn');
const searchInp = document.getElementById('search');
const postBtn = document.getElementById('postBtn');
const delBtn = document.getElementById('delBtn');
const patchBtn = document.getElementById('patchBtn');


//      to generate all the aircraft's information
let getAircrafts = () => {
    aircrafts.innerHTML = '';
    fetch("/api/aircraft")
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        for (let aircraft of data) {
            const div = document.createElement("div");
            for (let prop in aircraft) {
                if(prop !== "id") {
                const span = document.createElement("span");
                span.innerText = `${prop}: ${aircraft[prop]},  `;
                div.appendChild(span);
                }
            }
            aircrafts.appendChild(div);
        }
    });
}   

acBtn.addEventListener("click", getAircrafts);
getAircrafts;


//          get a specific aircraft by searching name
searchBtn.addEventListener("click", () => {
    aircrafts.innerHTML = '';
    let aircraftName = searchInp.value;
    fetch(`/api/aircraft/${aircraftName}`)
    .then((res) => res.json())
    .then((data) => {
        for(let aircraft in data) {
            if(aircraft !== 'id'){
            const span = document.createElement("span");
            span.innerText = `${aircraft}: ${data[aircraft]}  `;
            aircrafts.appendChild(span);
            }
        };
    //   console.log(data);
    });
});



//          deleting an aircraft
delBtn.addEventListener("click", () => {
    const name = document.getElementById('deleteInput').value;

    aircrafts.innerHTML = '';

    fetch(`/api/aircraft/delete/${name}`,{
        method: 'DELETE'
    })
    .then((res) => res.json())
    .then((data) => {
     console.log(data);
    });

});




