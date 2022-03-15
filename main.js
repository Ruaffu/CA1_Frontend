import "./styles/style.css"
// import "bootstrap/dist/css/bootstrap.css"
import './facade'
import facade from './facade'



/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/
let searchBTN = document.getElementById("searchbtn");

searchBTN.addEventListener('click', (event) => {
    event.preventDefault();
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

// facade.getHello()
// .then(data => {
//   let hellomsg = document.getElementById("hello");
//   hellomsg.innerHTML = `msg: ${data.msg}`
// })


facade.getAllPeople()
.then(persons => {
  const userRows = persons.map(person => `
  <tr>
    <td>${person.id}</td>
    <td>${person.firstname}</td>
    <td>${person.lastname}</td>
    <td>${person.email}</td>
    <td>${person.phones.number}</td>
    <td>${person.address.street} ${person.address.additionalInfo}</td>
    <td>${person.address.city}</td>
    <td>${person.address.zipcode}</td>
  </tr>
  `)
  const userRowsAsStrings = userRows.join("")
  console.log(userRowsAsStrings);
  document.getElementById("allUserRows").innerHTML = userRowsAsStrings;
})

var x = document.getElementById("myselect").value;

function getPersonById(id){
  facade.getPerson(id)
.then(data => {
  let singlePersonRecord = document.getElementById("singlePersonRecord");
  singlePersonRecord.innerHTML = ` <br/><strong>Person: </strong><br/> id: ${data.id} firstname: ${data.firstname} lastname: ${data.lastname} email: ${data.email}<br/><br/> 
  <strong>Address: </strong><br/> id: ${data.address.id}<br/> street: ${data.address.street}<br/> city: ${data.address.city}<br/> zipcode: ${data.address.zipcode}<br/>`;
  // singlePersonRecord.innerHTML = renderObjectToHTML(data);
});

}

function getPersonsByHobby(hobby){
  facade.getPersonByHobby(hobby)
  .then(people => {
    const users = people.map(data =>` <br/><strong>Person: </strong><br/> id: ${data.id} firstname: ${data.firstname} lastname: ${data.lastname} email: ${data.email}<br/><br/> 
    <strong>Address: </strong><br/> id: ${data.address.id}<br/> street: ${data.address.street}<br/> city: ${data.address.city}<br/> zipcode: ${data.address.zipcode}<br/>`).join("")
    let singlePersonRecord = document.getElementById("singlePersonRecord");
    singlePersonRecord.innerHTML = users;
  });
}

function getPersonsByZip(zipcode){
  facade.getPersonByZipcode(zipcode)
  .then(people => {
    const users = people.map(data =>` <br/><strong>Person: </strong><br/> id: ${data.id} firstname: ${data.firstname} lastname: ${data.lastname} email: ${data.email}<br/><br/> 
    <strong>Address: </strong><br/> id: ${data.address.id}<br/> street: ${data.address.street}<br/> city: ${data.address.city}<br/> zipcode: ${data.address.zipcode}<br/>`).join("")
    let singlePersonRecord = document.getElementById("singlePersonRecord");
    singlePersonRecord.innerHTML = users;
  });
}

function getPersonsByPhonenr(phonenr){
  facade.getPersonByPhone(phonenr)
  .then(data => {
    let singlePersonRecord = document.getElementById("singlePersonRecord");
  singlePersonRecord.innerHTML = ` <br/><strong>Person: </strong><br/> id: ${data.id} firstname: ${data.firstname} lastname: ${data.lastname} email: ${data.email}<br/><br/> 
  <strong>Address: </strong><br/> id: ${data.address.id}<br/> street: ${data.address.street}<br/> city: ${data.address.city}<br/> zipcode: ${data.address.zipcode}<br/>`;
  });
}


function renderObjectToHTML(myPersonObj) {
  result = `id: ${myPersonObj.id}<br/>
  firstname: ${myPersonObj.firstname}<br/><br/>
  lastname: ${myPersonObj.lastname}<br/><br/>
  email: ${myPersonObj.email}<br/><br/>
  <strong>Address: </strong><br/>
  id: ${myPersonObj.address.id} <br/>
  street: ${myPersonObj.address.street} <br/>
  additionalInfo: ${myPersonObj.address.additionalInfo} <br/>
  city: ${myPersonObj.address.city} <br/>
  zipcode: ${myPersonObj.address.address.zipcode}<br/>`
  return result;
}

// function hideAllShowOne(idToShow)
// {
//   document.getElementById("about_html").style = "display:none"
//   document.getElementById("ex1_html").style = "display:none"
//   document.getElementById("ex2_html").style = "display:none"
//   document.getElementById("ex3_html").style = "display:none"
//   document.getElementById(idToShow).style = "display:block"
// }

// function menuItemClicked(evt)
// {
//   const id = evt.target.id;
//   switch (id)
//   {
//     case "ex1": hideAllShowOne("ex1_html"); break
//     case "ex2": hideAllShowOne("ex2_html"); break
//     case "ex3": hideAllShowOne("ex3_html"); break
//     default: hideAllShowOne("about_html"); break
//   }
//   evt.preventDefault();
// }
// document.getElementById("menu").onclick = menuItemClicked;
// hideAllShowOne("about_html");