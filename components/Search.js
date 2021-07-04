import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import { useEffect, useState } from 'react';
import { FormControl, makeStyles, MenuItem, InputLabel, TextField } from '@material-ui/core';
import moment from 'moment'


const Search = (props) => {
  const [countryList, setCountryList] = useState([]);

  useEffect(()=>{
    
  })

  return ( 
    <Grid 
      container
      direction="row"
      justify="space-around"
      alignItems="center" >
      <Grid item xs={4} >
        <MonthSelect {...props}/>
      </Grid>
      <Grid item xs={6}>
      {<CountrySelect {...props} countryList={countryList}/>}
      </Grid>
    </Grid>
  );
}
 
export default Search;

const CountrySelect = (props) => {  
  const handleSelect = (e)=>{
    props.setSelectedCountry(e.target.value)
  }


  useEffect(()=>{

  })
  // Native Select to improve performance
  return ( 
    <TextField
      id="country-select"
      select
      label="Country"
      fullWidth
      SelectProps={{
        native: true,
      }}
      value={props.selectedCountry ? props.selectedCountry : ''}
      onChange={handleSelect}
    >
      <option disabled value=''></option>
      {props.countries ? props.countries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      )) : null}
    </TextField>
   );
}

const MonthSelect = (props) => {
  const months = moment.months();
  const shortMonths = moment.monthsShort();
  const handleSelect = (e)=>{
    if(props.selectedMonth!==e.target.value) props.setSelectedMonth(e.target.value);
  }
  return ( 

    <TextField
      id="month-select"
      select
      label="Month"
      fullWidth
      SelectProps={{
        native: true,
      }}
      value={props.selectedMonth ? props.selectedMonth : ''}
      onChange={handleSelect}
    >
      <option disabled value=''></option>
      {months ? months.map((month, index) => (
        <option key={shortMonths[index]} value={shortMonths[index]}>
          {month}
        </option>
      )) : null}
    </TextField>
   );
}
 
