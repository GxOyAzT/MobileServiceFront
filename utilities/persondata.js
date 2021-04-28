async function getPeople(){
  var output = fetch('http://mobile.somee.com/api/person').then(data => data.json());

  return output;
}

export default getPeople