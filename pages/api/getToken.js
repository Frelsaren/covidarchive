export default async function handler(req,res) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "username": "public_user",
      "password": "public_pass"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let dict = null
    return fetch("https://api.covid19api.dev/token", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result["Document"] !== undefined) {
          const expirationDate = new Date()
          expirationDate.setSeconds(expirationDate.getSeconds() + 200000)
          dict = {
            'token': result["Document"],
            'expiration': expirationDate
          }
          return res.status(200).json(dict)
        }
        else return {}
      })
      .catch(error => {res.status(500)});
  }
