import { useEffect, useState } from 'react'
import CustomAppBar from '../components/CustomAppBar';
import Search from '../components/Search'
import Content from '../components/Content'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
      padding: 0,
      margin: 0,
      fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
  },
  content: {
    marginTop: 20
  }
})

export default function App() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState()
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [confirmed, setConfirmed] = useState();
  const [deaths, setDeaths] = useState();
  const [recovered, setRecovered] = useState();

  const [countries, setCountries] = useState();
  
  const classes = useStyles();

  useEffect(async()=>{
    if(!token || new Date(token["expiration"]) < new Date()) {
      await fetch('/api/getToken')
        .then(response => response.json())
        .then(result => setToken(result))
    }
    if(confirmed === undefined && token !== undefined){
      await fetch('/api/getConfirmed', {
        "headers": {'Content-Type': 'application/json'},
        "method": "POST",
        "body": JSON.stringify({"token": token["token"]})
      })
        .then(response => response.json())
        .then(result => {
          setConfirmed(result);
          const countryList = []
          result.map(item =>{
            !countryList.includes(item["country_region"]) ? countryList.push(item["country_region"]) : null
          })
          setCountries(countryList)
        })
    }
    if(deaths === undefined && token !== undefined){
      await fetch('/api/getDeaths', {
        "headers": {'Content-Type': 'application/json'},
        "method": "POST",
        "body": JSON.stringify({"token": token["token"]})
      })
        .then(response => response.json())
        .then(result => {
          setDeaths(result);
        })
    }
    if(recovered === undefined && token !== undefined){
      await fetch('/api/getRecovered', {
        "headers": {'Content-Type': 'application/json'},
        "method": "POST",
        "body": JSON.stringify({"token": token["token"]})
      })
        .then(response => response.json())
        .then(result => {
          setRecovered(result);
        })
    }
  })
  return (
    <div>
      <CustomAppBar />
      {loading ? <LinearProgress /> : null }
      <Container maxWidth="md" className={ classes.content }>
        <Search token={token} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} countries={countries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        <Content month={selectedMonth.toLowerCase()} country={selectedCountry} confirmed={confirmed} deaths={deaths} recovered={recovered}/> 
      </Container>
    </div>
  )
}
