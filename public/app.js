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


//          adding an aircraft to the database
postBtn.addEventListener("click", () => {
    aircrafts.innerHTML = '';

    const name = document.getElementById("nameInput").value;
    const role = document.getElementById("roleInput").value;
    const callName = document.getElementById("callNameInput").value;
    const firstFlight = document.getElementById("firstFlightInput").value;
    const status = document.getElementById("statusInput").value;

    const aircraft = {
        name: name,
        role: role,
        call_name: callName,
        first_flight: firstFlight,
        status: status
    };

    fetch('/api/aircraft/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aircraft)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
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


// Add an event listener to the patchBtn
patchBtn.addEventListener("click", () => {
    aircrafts.innerHTML = '';

    const name = document.getElementById("nameInput1").value;
    const role = document.getElementById("roleInput1").value;
    const callName = document.getElementById("callNameInput1").value;
    const firstFlight = document.getElementById("firstFlightInput1").value;
    const status = document.getElementById("statusInput1").value;
    const aircraftName = document.getElementById("updateInp").value;
    console.log("asdfasd")
    
    const aircraft = {
        name: name || null,
        role: role || null,
        call_name: callName || null,
        first_flight: firstFlight || null,
        status: status || null
    };

    console.log(aircraft)
    
    fetch(`/api/aircraft/patch/${aircraftName}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aircraft)
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
      });
});



// fetch(`/api/aircraft/patch/${aircraftName}`, {
//     method: 'PATCH',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(aircraft)
// })
// .then((res) => res.json())
// .then((data) => {
//     console.log(data);
// });