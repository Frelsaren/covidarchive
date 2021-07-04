import { Grid, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

const Content = (props) => {
  useEffect(()=>{
    if(props.month && props.country)
    {
      
    }
  })
  return ( 
  <>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      {/* <Value label="Confirmed" value={total["Confirmed"]}/> */}
    </Grid>
  </> 
  );
}
 
export default Content;

const Value = (props) => {
  return ( 
    <Grid item>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
      <Grid item><Typography variant="h6" color="initial">{props.label}</Typography></Grid>
      <Grid item><Typography variant="h2" color="initial">{props.value}</Typography></Grid>

      </Grid>
    </Grid>
   );
}