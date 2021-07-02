export default function handler(req, res) {
    console.log('http://api.ipstack.com/'+req.connection.remoteAddress+'?access_key='+process.env.IPStackAPIKey)
    fetch('http://api.ipstack.com/'+req.connection.remoteAddress+'?access_key='+process.env.IPStackAPIKey)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            if(res["country_name"] !== undefined){res.status(200).json({"status": "Ok","country" : result["country_name"]})}
            else {res.status(200).json({"status": "Failed"})};
        })
}
  