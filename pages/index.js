import { useEffect, useState } from 'react'
import CustomAppBar from '../components/CustomAppBar';
import Search from '../components/Search'
import Content from '../components/Content'
import Container from '@material-ui/core/Container'
import { LinearProgress, makeStyles } from '@material-ui/core';
import Cookies from 'universal-cookie';

const useStyles = makeStyles({
  content: {
    marginTop: "2.5%"
  }
})

const cookies = new Cookies();

export default function App() {  
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState()
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [rawConfirmed, setRawConfirmed] = useState();
  const [rawDeaths, setRawDeaths] = useState();
  const [rawRecovered, setRawRecovered] = useState();
  const [countries, setCountries] = useState();
  
  const classes = useStyles();

  useEffect(()=>{
    fetch('/api/getLocation')
      .then(response => response.json())
      .then(result => {
        if(result["status"] === "Ok" && countries.includes(result["country"])) setSelectedCountry()
      })
  }, [countries])

  useEffect(()=>{
    const tokenCookie = cookies.get('token')
    const expirationCookie = cookies.get('expiration')
    if(expirationCookie === undefined ||new Date(expirationCookie)<new Date()) {
      fetch('/api/getToken')
        .then(response => response.json())
        .then(result => {
          setToken(result);
          cookies.set("token", result["token"]);
          cookies.set("expiration", result["expiration"])
        })
    } else {
      setToken({"token": tokenCookie, "expiration": expirationCookie})
    }
      
  }, [])

  useEffect(()=>{
    if(token !== undefined) {
      if(rawConfirmed === undefined){
        fetch('/api/getConfirmed', {
          "headers": {'Content-Type': 'application/json'},
          "method": "POST",
          "body": JSON.stringify({"token": token["token"]})
        })
          .then(response => response.json())
          .then(result => {
            setRawConfirmed(result);
            const countryList = []
            result.map(item =>{
              !countryList.includes(item["country_region"]) ? countryList.push(item["country_region"]) : null
            })
            setCountries(countryList)
          })
      }
      if(rawDeaths === undefined){
        fetch('/api/getDeaths', {
          "headers": {'Content-Type': 'application/json'},
          "method": "POST",
          "body": JSON.stringify({"token": token["token"]})
        })
          .then(response => response.json())
          .then(result => {
            setRawDeaths(result);
          })
      }
      if(rawRecovered === undefined){
        fetch('/api/getRecovered', {
          "headers": {'Content-Type': 'application/json'},
          "method": "POST",
          "body": JSON.stringify({"token": token["token"]})
        })
          .then(response => response.json())
          .then(result => {
            setRawRecovered(result);
          })
      }
    }
  },[token])
  useEffect(()=>{
    if(rawConfirmed && rawDeaths && rawRecovered) setLoading(false)
  })
  return (
    <>
      <CustomAppBar/>
      {loading ? <LinearProgress /> : null }
      <Container maxWidth="md" className={ classes.content }>
        {rawConfirmed ? <Search token={token} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} countries={countries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />:null}
        {selectedCountry !== '' && selectedMonth !== '' && !loading ? <Content month={selectedMonth} country={selectedCountry} confirmed={rawConfirmed.filter(item => item["country_region"] === selectedCountry)} deaths={rawDeaths.filter(item => item["country_region"] === selectedCountry)} recovered={rawRecovered.filter(item => item["country_region"] === selectedCountry)}/> : null} 
      </Container>
    </>
  )
}
