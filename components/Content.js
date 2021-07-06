import { Grid, makeStyles, Typography, Box } from "@material-ui/core";
import { useEffect, useState } from "react";
import DataChart from '../components/DataChart' 

const useStyles = makeStyles({
  root: {
    marginTop: 5
  }
})

const Content = (props) => {  
  const classes = useStyles()
  return ( 
    <Grid
      className={ classes.root }
      container
      direction="column"
      justify="space-between"
      alignItems="center"
    >
      <DataChart {...props}/>
      <Numbers {...props} />
    </Grid>
    
  
  );
}
 
export default Content;

const Numbers = (props) => {

  return ( 
    <>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Value label="Confirmed" data={props.confirmed} month={props.month}/>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Value label="Deaths" data={props.deaths} month={props.month}/>
        <Value label="Recovered" data={props.recovered} month={props.month}/>
      </Grid>
    </>
   );
}
 
const Value = (props) => {
  const [value, setValue] = useState(0)

  useEffect(()=>{
    var newValue = 0;
    props.data.map(item => {
      let countOnMonthStart;
      let count;
      Object.keys(item).map((key,index)=>{
        if(key.match(new RegExp(props.month.toLowerCase() + "\\d{2}2020"))){
          if(!countOnMonthStart && Object.keys(item)[index-1].match(new RegExp("(?<!"+props.month.toLowerCase()+")\\d{2}2020"))) countOnMonthStart = item[Object.keys(item)[index-1]]
          count = item[Object.keys(item)[index]]
        }
      })
      if(!countOnMonthStart) countOnMonthStart = 0
      newValue += count-countOnMonthStart;
    })
    setValue(newValue)
  })

  return ( 
    <Grid item>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
      <Grid item><Typography variant="h6" color="initial">{props.label}</Typography></Grid>
      <Grid item><Typography variant="h2" color="initial">{value}</Typography></Grid>

      </Grid>
    </Grid>
   );
}