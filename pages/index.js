import { useEffect, useState } from 'react'
import CustomAppBar from '../components/CustomAppBar';
import Search from '../components/Search'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'



export default function App() {
  const [token, setToken] = useState()
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  useEffect(()=>{
    if(!token || new Date(token["expiration"]) < new Date()) {
      fetch('/api/getToken')
        .then(response => response.json())
        .then(result => setToken(result))
    }
  })
  return (
    <>
      <CustomAppBar />
      <Container maxWidth="md">
        <Search selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} token={token}/>
      </Container>
    </>
  )
}
