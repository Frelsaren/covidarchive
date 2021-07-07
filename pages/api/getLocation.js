export default async function handler(req, res) {
    await fetch('http://api.ipstack.com/'+req.connection.remoteAddress+'?access_key='+process.env.IPStackAPIKey)
        .then(response => response.json())
        .then(result => {
            if(res["country_name"]){return res.status(200).json({"status": "Ok","country" : result["country_name"]})}
            return res.status(200).json({"status": "Failed"});
        })
        .catch(err => res.status(200).json({"status": "Failed"}))

}
  