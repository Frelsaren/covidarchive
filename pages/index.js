import { useEffect, useState } from 'react'
import CustomAppBar from '../components/CustomAppBar';
import Search from '../components/Search'
import Content from '../components/Content'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles({
  content: {
    marginTop: "2.5%"
  }
})

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



  useEffect(async()=>{
    if(!token || new Date(token["expiration"]) < new Date()) {
      await fetch('/api/getToken')
        .then(response => response.json())
        .then(result => setToken(result))
    }
    if(rawConfirmed === undefined && token !== undefined){
      await fetch('/api/getConfirmed', {
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
    if(rawDeaths === undefined && token !== undefined){
      await fetch('/api/getDeaths', {
        "headers": {'Content-Type': 'application/json'},
        "method": "POST",
        "body": JSON.stringify({"token": token["token"]})
      })
        .then(response => response.json())
        .then(result => {
          setRawDeaths(result);
        })
    }
    if(rawRecovered === undefined && token !== undefined){
      await fetch('/api/getRecovered', {
        "headers": {'Content-Type': 'application/json'},
        "method": "POST",
        "body": JSON.stringify({"token": token["token"]})
      })
        .then(response => response.json())
        .then(result => {
          setRawRecovered(result);
        })
    }
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
