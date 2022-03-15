const URL = "https://miemt.me/CA1/api/cityinfo"

function getAllCityInfo(){
    return fetch(URL+"/all")
    .then(res=> res.json())
}

const cityFacade = {
    getAllCityInfo
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

   export default cityFacade;