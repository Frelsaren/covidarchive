import fs from 'fs'

async function getToken(tokenFile) {
    await _checkTokenFile(tokenFile)
    let tokenData = JSON.parse(fs.readFileSync(tokenFile, 'utf8'))
    if(new Date(tokenData["expiration"]) < new Date()){
      fs.unlinkSync(tokenFile)
      await _checkTokenFile(tokenFile)
      tokenData = JSON.parse(fs.readFileSync(tokenFile, 'utf8'))
    }
    return tokenData
  }
  
  function _checkTokenFile(tokenFile) {
    if(!fs.existsSync(tokenFile)){
  
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
            fs.writeFileSync(tokenFile, JSON.stringify(dict), (err, result) => {if(err) console.log('error', err)})
            return dict
          }
          else return {}
        })
        .catch(error => {throw error});
    }
    return 'exist'
  }
module.exports = getToken