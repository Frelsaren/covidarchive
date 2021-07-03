import { useEffect, useState } from 'react'
import CustomAppBar from '../components/CustomAppBar';
import Search from '../components/Search'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'



export default function App() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  return (
    <>
      <CustomAppBar />
      <Container maxWidth="md">
        <Search selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
      </Container>
    </>
  )
}