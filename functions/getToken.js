function getToken() {
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
    };

    return fetch("https://api.covid19api.dev/token", requestOptions)
    .then(response => response.json())
    .then(result => {return result["Document"]})
    .catch(error => {throw(error)});
}
module.exports(getToken)