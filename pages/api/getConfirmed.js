import moment from 'moment'
export default async function handler(req,res) {
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + req.body["token"])
    
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };
    var url = "https://api.covid19api.dev/time_series_confirmed_global"

    if(req.body["token"]){
      await fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => result["Message"] === "Record found" ? res.status(200).json(result["Document"]): res.status(500).json({}))
        .catch(error => res.status(500).json('error', error));
    } else {
      res.status(500).json({})
    }

    
}   