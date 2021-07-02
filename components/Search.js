import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Countries from '../countries';
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { useEffect, useState } from 'react';
import { FormControl, makeStyles, FormHelperText, InputLabel } from '@material-ui/core';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '100%',
  },
}));



const Search = (props) => {
  return ( 
    <Grid 
      container
      direction="row"
      justify="space-around"
      alignItems="center" >
      <Grid item xs={6}>
      {Countries ? <CountrySelect {...props}/>: null}
      </Grid>
      <Grid item xs={4} >
        {props.selectedCountry ? <MonthSelect {...props}/>: null}
      </Grid>
    </Grid>
  );
}
 
export default Search;

const CountrySelect = (props) => {
  const [value, setValue] = useState('');
  const classes = useStyles();

  const handleSelect = (e)=>{
    setValue(e.target.value);
  }
  useEffect(()=>{
    props.setSelectedCountry(value)
  })
  // Native Select to improve performance
  return ( 
    
    <FormControl className={classes.formControl}>
      <InputLabel id="country-select-label">Country</InputLabel>
      <Select
        native
        labelId="country-select-label"
        id="country-select"
        value={props.selectedCountry}
        onChange={handleSelect}
      >
        {Object.keys(Countries).map(key=>{
          return <option key={Countries[key]} value={Countries[key]}>{Countries[key]}</option>
        })}
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
        {months.map((month, index)=>{
          return <option key={monthsShort[index]} value={monthsShort[index]}>{month}</option>
          })}
      </Select>
    </FormControl>
   );
}
 
