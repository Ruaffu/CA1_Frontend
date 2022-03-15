const URL = "https://miemt.me/CA1/api/person"

function getHello(){
    return fetch(URL)
    .then(res=> res.json())
}
function getAllPeople(){
    return fetch(URL+"/all")
    .then(res=> res.json())
}

function getPerson(id){
    return fetch(URL+"/"+id)
    .then(handleHttpErrors)
}

function getPersonByHobby(hobby){
  return fetch(URL+"/hobby/"+hobby)
  .then(handleHttpErrors)
}

function getPersonByZipcode(zipcode){
  return fetch(URL+"/zipcode/"+zipcode)
  .then(handleHttpErrors)
}

function getPersonByPhone(phonenr){
  return fetch(URL+"/phone/"+phonenr)
  .then(handleHttpErrors)
}

function addPerson(user){
    const options = makeOptions("POST", user)
    return fetch(URL+"/create", options)
    .then(handleHttpErrors)
}

function editPerson(id,user){
    const options = makeOptions("PUT", user)
    console.log(id);
    return fetch(URL+"/edit/"+id, options)
    .then(handleHttpErrors)
    
}

function deletePerson(id){
    const options = makeOptions("DELETE" )
    return fetch(URL+"/delete/"+id, options)
    .then(handleHttpErrors)
    
}

const facade = {
    getHello,
    getAllPeople,
    getPerson,
    getPersonByHobby,
    getPersonByZipcode,
    getPersonByPhone,
    addPerson,
    editPerson,
    deletePerson
}

function makeOptions(method, body) {
    var opts =  {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if(body){
      opts.body = JSON.stringify(body);
    }
    return opts;
   }

   function handleHttpErrors(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
   }

   export default facade;