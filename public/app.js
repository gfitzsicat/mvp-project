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
    carouselExampleAutoplaying.innerHTML = '';

    
    fetch("/api/aircraft")
    .then((res) => res.json())
    .then((data) => {
      
        console.log(data);
        for (let aircraft of data) {
            const div = document.createElement("div");
            div.className = 'aircraftDiv'
            const img = document.createElement('img'); // Create the image element
            img.src = aircraft.image; // Set the source attribute to the image URL
            img.className = 'ac-img'; // Set the class attribute to apply CSS styling
            img.style.width = '50%';
            img.style.height = '20%';
            img.style.margin = 'auto';
            img.style.border = 'dashed';
            div.appendChild(img); // Append the image element to the div
          console.log(data)

            for (let prop in aircraft) {
              if (prop !== "id" && prop !== "image") {
                  const html = document.createElement('div');
                  // Apply date formatting to "first_flight"
                  if (prop === "first_flight") {
                      aircraft[prop] = luxon.DateTime.fromISO(aircraft[prop]).toFormat("dd LLL yyyy");
                  }
                  html.innerHTML = `<h5>${prop}: ${aircraft[prop]}</h5>`;
                  div.appendChild(html);
              }
          };
            aircrafts.appendChild(div);
        };
    });
}   

acBtn.addEventListener("click", getAircrafts);
getAircrafts;


//          get a specific aircraft by searching name
searchBtn.addEventListener("click", (event) => {
    event.preventDefault()
    aircrafts.innerHTML = '';
    carouselExampleAutoplaying.innerHTML = '';
    container.innerHTML = '';

    let aircraftName = searchInp.value;
    if(!aircraftName ) {
        const div = document.createElement("div");
        div.innerText = ('Please provide a valid aircraft name')
        aircrafts.append(div)
        return
    } else {
        fetch(`/api/aircraft/${aircraftName}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const image = `<img src="${data.image}" class="ac-img" style="width: 60%; height: auto; display: block; margin: 0 auto; border: 1px solid black;">`;
          aircrafts.innerHTML = ''; // Clear the existing content before adding new elements
          aircrafts.insertAdjacentHTML('beforeend', image); // Append the image element once
          
          for (let prop in data) {
            if (prop !== 'id' && prop !== 'image') {
                const div = document.createElement('div');
                const html = document.createElement('h4');
                if (prop === 'first_flight') {
                    data[prop] = luxon.DateTime.fromISO(data[prop]).toFormat('dd LLL yyyy');
                }
                html.innerHTML = `${prop}: ${data[prop]}`;
                div.appendChild(html);
                div.style.display = 'flex';
                div.style.alignItems = 'center';
                div.style.justifyContent = 'center';
                div.style.fontFamily = 'Sans Serif';
                aircrafts.appendChild(div);
            };
          };
        }).catch((error) => {
          console.log(error);
          aircrafts.innerHTML = '';
          const div = document.createElement('div');
          div.innerText = ('No search results found');
          aircrafts.append(div);
        });
      }
});


const admin = 'ZaiZav'

//          deleting an aircraft
delBtn.addEventListener("click", () => {

    let password = prompt(`Password`)
    if(password !== admin) {
      alert("You are not to allowed to delete")
      return;
    } else {

    const name = document.getElementById('deleteInput').value;

    aircrafts.innerHTML = '';
    carouselExampleAutoplaying.innerHTML = '';

    fetch(`/api/aircraft/delete/${name}`,{
        method: 'DELETE',
    })
    .then((res) => res.json())
    .then((data) => {
     console.log(data);
     const span = document.createElement("span");
     span.innerText = `You have deleted ${name}! `;
     span.classList.add('deleted')
     aircrafts.appendChild(span);
    });
  };
});



// let getAircrafts = (e) => {
//     e.preventDefault()
//     aircrafts.innerHTML = '';
//     carouselExampleAutoplaying.innerHTML = '';
  
//     fetch("/api/aircraft")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         for (let aircraft of data) {
//           const div = document.createElement("div");

//           const img = document.createElement('img'); // Create the image element
//           img.src = aircraft.image; // Set the source attribute to the image URL
//           img.className = 'ac-img'; // Set the class attribute to apply CSS styling
//           img.style.width = '20%';
//           img.style.height = '20%';
//           div.appendChild(img); // Append the image element to the div

//           for (let prop in aircraft) {
//             if (prop !== "id" && prop !== "image") {
//               const html = document.createElement('div');
//               html.innerHTML = `<h5>${prop}: ${aircraft[prop]}</h5>;`
//               div.appendChild(html);
//             }
//           }

//           aircrafts.appendChild(div);
//         }
//       });
//   }