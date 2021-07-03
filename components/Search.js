import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { useEffect, useState } from 'react';
import { FormControl, makeStyles, FormHelperText, InputLabel } from '@material-ui/core';
import moment from 'moment'
import { flushSync } from 'react-dom';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
}));

const Search = (props) => {
  const [countryList, setCountryList] = useState([]);

  useEffect(()=>{
    fetch('/api/getCountries')
      .then(response => response.json())
      .then(result => setCountryList(result["countries"]))
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
  const classes = useStyles();

  const handleSelect = (e)=>{
    console.log(e.target.value)
  }

  // Native Select to improve performance
  return ( 
    
    <FormControl className={classes.formControl}>
      <InputLabel id="country-select-label">Country</InputLabel>
      <Select
        native
        labelId="country-select-label"
        id="country-select"
        value={props.selectedShortCountry}
        onChange={handleSelect}
      >
        <option disabled value=''></option>
        {props.countryList.map(country=><option key={country} value={country}>{country}</option>)}
      </Select>
    </FormControl>
   );
}

const MonthSelect = (props) => {
  const months = moment.months();
  const monthsShort = moment.monthsShort();

  const classes = useStyles();

  const handleSelect = (e)=>{
    props.setSelectedMonth(e.target.value);
  }
  return ( 
    
    <FormControl className={classes.formControl}>
      <InputLabel id="month-select-label">Month</InputLabel>
      <Select
        native
        labelId="month-select-label"
        id="month-select"
        value={props.selectedMonth ? props.selectedMonth : ''}
        onChange={handleSelect}
      >
        <option disabled value=''></option>
        {months.map((month, index)=>{
          return <option key={monthsShort[index]} value={monthsShort[index]}>{month}</option>
          })}
      </Select>
    </FormControl>
   );
}
 
