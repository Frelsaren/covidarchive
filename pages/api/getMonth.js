import fs from 'fs'
import getToken from '/functions/getToken'

export default async function handler(req,res){
  const tokenFile = 'token.json';
  const tokenData = await getToken(tokenFile);
  if (req.body["month"] !== undefined)
  {
    const archive = await getMonthly(req.body["month"], tokenData)
    await generateCountries(archive)
    res.status(200).json(archive);
  }
}

async function generateCountries(archive) {
  var countries = JSON.parse(fs.readFileSync('archive/countries.json'))
  archive.map((item) => {
    const currentCountry = item["country_region"] ? item["country_region"] : item["country_region_[0]"];
    if (!countries.includes(currentCountry)) {
      countries.push(currentCountry);
    }
  })
  await countries.sort();
  fs.writeFileSync('archive/countries.json', JSON.stringify(countries));
}

async function getMonthly(month, tokenData) {
  let archive;
  if(!fs.existsSync('archive/'+month+'2020.json'))
  {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + tokenData["token"])

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch("https://api.covid19api.dev/"+month+"2020", requestOptions)
      .then(response => response.json())
      .then(result => {
        archive = result["Document"]
        fs.writeFileSync('archive/'+month+'2020.json',JSON.stringify(archive))
        return archive
      })
      .catch(error => console.log('error', error));
  }
  else {
    archive = JSON.parse(fs.readFileSync('archive/'+month+'2020.json'))
    return archive
  }
}