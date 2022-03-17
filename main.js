import "./styles/style.css"
// import "bootstrap/dist/css/bootstrap.css"
import './facade'
import facade from './facade'
import './hobbyFacade'
import hobbyFacade from "./hobbyFacade";
import './cityFacade'
import cityFacade from "./cityFacade";





var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
let searchBTN = document.getElementById("searchbtn");

searchBTN.addEventListener('click', (event) => {
    // event.preventDefault();
    let selectfield = document.getElementById("myselect").value;
    let inputTextField = document.getElementById("inpuf");
    if (selectfield == "id"){ 
      getPersonById(inputTextField.value);
    }
    if(selectfield == "Zipcode"){
    getPersonsByZip(inputTextField.value);
    }
    if(selectfield == "Hobby"){
      getPersonsByHobby(inputTextField.value);
      }
    else if (selectfield == "Phone number") {
      
        getPersonsByPhonenr(inputTextField.value);
        
      
    }
 
});

let addNewUserBtn = document.getElementById("addNewUserBtn");
addNewUserBtn.addEventListener('click', (event)=>{
  event.preventDefault();
  let newUser = {
    firstname: document.getElementById("fname").value,
    lastname: document.getElementById("lname").value,
    email: document.getElementById("email").value,
    phones: [
      {
        number: document.getElementById("phonenr").value,
        description: document.getElementById("phoneSelect").value
      }
    ],
    address: {
      street: document.getElementById("adrstreet").value,
      additionalInfo: document.getElementById("adradditional").value,
      city: document.getElementById("adrcity").value,
      zipcode: document.getElementById("adrzip").value
    },
    hobbies: [
      {
        description: document.getElementById("hobbySelect").value,
        name: document.getElementById("hobbySelect").value
      }
    ]
  }
  facade.addPerson(newUser)
  .then(user => {
    alert("User added")
  })
})

let editUserBtn = document.getElementById("edit");
editUserBtn.addEventListener('click', (event)=>{
  event.preventDefault();
  let idUser = document.getElementById("iduser").value;
  let updateUser = {
    id: idUser,
    firstname: document.getElementById("efname").value,
    lastname: document.getElementById("elname").value,
    email: document.getElementById("eemail").value,
    phones: [
      {
        number: document.getElementById("ephonenr").value,
        description: document.getElementById("ephoneSelect").value
      }
    ],
    address: {
      street: document.getElementById("eadrstreet").value,
      additionalInfo: document.getElementById("eadradditional").value,
      city: document.getElementById("eadrcity").value,
      zipcode: document.getElementById("eadrzip").value
    },
    hobbies: [
      {
        name: document.getElementById("ehobbySelect").value,
        description: document.getElementById("ehobbySelect").value
      }
    ]
  }
  facade.editPerson(idUser, updateUser)
  .then(user =>{
    alert("user with ID: " + idUser+ " has been updated")
  })
  .catch(err =>{
    if (err.status) {
      err.fullError.then(e => console.log(e.msg))
    }
    else{console.log("Network error");}
  });
})



let deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener('click', (event)=>{
  event.preventDefault();
  let userId = document.getElementById("userid").value;
  facade.deletePerson(userId)
  .then(user =>{
    alert("user with id: " + userId+ "deleted")
  })
})

// facade.getHello()
// .then(data => {
//   let hellomsg = document.getElementById("hello");
//   hellomsg.innerHTML = `msg: ${data.msg}`
// })
function getphone(person){
    if (person.phones.length > 0){
      return [person.phones[0].id,person.phones[0].number,person.phones[0].description]
    } else {
      return ["No Number","No Number","No Number"];
    }
}

function getHobbies(person){
    if (person.hobbies.length > 0){
      return [person.hobbies[0].id,person.hobbies[0].name,person.hobbies[0].description]
    } else {
      return ["No Hobby","No Hobby","No Hobby"];
    }
}

facade.getAllPeople()
.then(persons => {
  const userRows = persons.map(person => `
  <tr>
    <td>${person.id}</td>
    <td>${person.firstname}</td>
    <td>${person.lastname}</td>
    <td>${person.email}</td>
    <td>${getphone(person)[1]}</td>
    <td>${person.address.street} ${person.address.additionalInfo}</td>
    <td>${person.address.city}</td>
    <td>${person.address.zipcode}</td>
    <td>${getHobbies(person)[1]}</td>
  </tr>
  `)
  const userRowsAsStrings = userRows.join("")
  document.getElementById("allUserRows").innerHTML = userRowsAsStrings;
})

hobbyFacade.getAllHobbies()
.then(hobbies =>{
  const hobbyOptions = hobbies.map(hobby => `
  <option>${hobby.name}</option>
  `).join("")
  document.getElementById("hobbySelect").innerHTML = hobbyOptions;
  document.getElementById("ehobbySelect").innerHTML = hobbyOptions;
})


  hobbyFacade.getAllHobbies()
.then(hobbies =>{
  const displayHobbies = hobbies.map(hobby => `
  <tr>
  <td>${hobby.name}</td>
  <td><a href="${hobby.description}">${hobby.description}</a></td>
</tr>
  `).join("")
  document.getElementById("allHobbyRows").innerHTML = displayHobbies;
})

cityFacade.getAllCityInfo()
.then(cities =>{
  const displayCities= cities.map(city => `
  <tr>
  <td>${city.city}</td>
  <td>${city.zipcode}</td>
</tr>
  `).join("")
  document.getElementById("allCityInfoRows").innerHTML = displayCities;
})



var x = document.getElementById("myselect").value;

function getPersonById(id){
  facade.getPerson(id)
.then(data => {
  let singlePersonRecord = document.getElementById("singlePersonRecord");
  singlePersonRecord.innerHTML = ` <br/><strong>Person: </strong><br/> id: ${data.id}<br/> firstname: ${data.firstname}<br/> lastname: ${data.lastname}<br/> email: ${data.email}<br/> phone: ${getphone(data)[1]}<br/><br/> 
  <strong>Address: </strong><br/> id: ${data.address.id}<br/> street: ${data.address.street}<br/> city: ${data.address.city}<br/> zipcode: ${data.address.zipcode}<br/><br/>
  <strong>Hobbies: </strong><br/> id: ${getHobbies(data)[0]}<br/> name: ${getHobbies(data)[1]}<br/> description: ${getHobbies(data)[2]}<br/>`;
});

}

function getPersonsByHobby(hobby){
  facade.getPersonByHobby(hobby)
  .then(people => {
    const users = people.map(data =>` <br/><strong>Person: </strong><br/> id: ${data.id}<br/> firstname: ${data.firstname}<br/> lastname: ${data.lastname}<br/> email: ${data.email}<br/> phone: ${getphone(data)[1]}<br/><br/> 
    <strong>Address: </strong><br/> id: ${data.address.id}<br/> street: ${data.address.street}<br/> city: ${data.address.city}<br/> zipcode: ${data.address.zipcode}<br/>
    <strong>Hobbies: </strong><br/> id: ${getHobbies(data)[0]}<br/> name: ${getHobbies(data)[1]}<br/> description: ${getHobbies(data)[2]}<br/>`).join("")
    let singlePersonRecord = document.getElementById("singlePersonRecord");
    singlePersonRecord.innerHTML = users;
  });
}

function getPersonsByZip(zipcode){
  facade.getPersonByZipcode(zipcode)
  .then(people => {
    const users = people.map(data =>` <br/><strong>Person: </strong><br/> id: ${data.id}<br/> firstname: ${data.firstname}<br/> lastname: ${data.lastname}<br/> email: ${data.email}<br/> phone: ${getphone(data)[1]}<br/><br/> 
    <strong>Address: </strong><br/> id: ${data.address.id}<br/> street: ${data.address.street}<br/> city: ${data.address.city}<br/> zipcode: ${data.address.zipcode}<br/>
    <strong>Hobbies: </strong><br/> id: ${getHobbies(data)[0]}<br/> name: ${getHobbies(data)[1]}<br/> description: ${getHobbies(data)[2]}<br/>`).join("")
    let singlePersonRecord = document.getElementById("singlePersonRecord");
    singlePersonRecord.innerHTML = users;
  });
}

function getPersonsByPhonenr(phonenr){
  facade.getPersonByPhone(phonenr)
  .then(data => {
    let singlePersonRecord = document.getElementById("singlePersonRecord");
  singlePersonRecord.innerHTML = ` <br/><strong>Person: </strong><br/> id: ${data.id}<br/> firstname: ${data.firstname}<br/> lastname: ${data.lastname}<br/> email: ${data.email}<br/> phone: ${getphone(data)[1]}<br/><br/> 
  <strong>Address: </strong><br/> id: ${data.address.id}<br/> street: ${data.address.street}<br/> city: ${data.address.city}<br/> zipcode: ${data.address.zipcode}<br/>
  <strong>Hobbies: </strong><br/> id: ${getHobbies(data)[0]}<br/> name: ${getHobbies(data)[1]}<br/> description: ${getHobbies(data)[2]}<br/>`;
  })
  .catch(err =>{
    if (err.status) {
      err.fullError.then(e => console.log(e.msg))
    }
    else{console.log("Network error");}
  });
}

