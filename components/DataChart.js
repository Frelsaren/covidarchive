import { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, Paper, Box } from '@material-ui/core';
import generateChartData from '../functions/prepareData'
import { Bar } from 'react-chartjs-2'
import moment from 'moment'
const useStyles = makeStyles({
  paper: {
    marginTop: 30,
    minWidth: "100%",
    maxWidth: "100%",
  },
})


const DataChart = (props) => {
  const classes = useStyles();
  const [dataSet, setDataSet] = useState()

  const options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
     }
 }

  useEffect(()=>{
    const newData = generateChartData(props.confirmed, props.deaths, props.recovered, props.month)
    var newDataSet = {
      labels: newData.map((el,index) =>{
        if(index===0 ||index === newData.length-1) {
          const shortmonths = moment.monthsShort().map((month)=>month.toLowerCase());
          const month = el["Date"].slice(0,3)
          var monthIndex = shortmonths.indexOf(month)+1
          monthIndex = monthIndex.toString().length === 1 ? "0" + monthIndex : monthIndex
          const date = new Date(2020, monthIndex, el["Date"].slice(3,5))

          return el["Date"].slice(3,5) + "." + monthIndex+ ".2020"
        } 
        return ""}),
      datasets: [
        {
          stack: 'stacked',
          label: 'Confirmed',
          data: newData.map(el =>el["Confirmed"]),
          backgroundColor: "#F85F73"
        }, 
        {
          stack: 'stacked',
          label: 'Deaths',
          data: newData.map(el =>el["Deaths"]),
          backgroundColor: "#000000" 
        },
        {
          stack: 'stacked',
          label: 'Recovered',
          data: newData.map(el =>el["Recovered"]),
          backgroundColor: "#42C5D5"
        },

      ]
    }
    setDataSet(newDataSet)
    }, [props.confirmed, props.deaths, props.recovered])

  return ( <>
    {dataSet ? <Paper className={ classes.paper }>
      <Box width={"100%"} height={"100%"} padding={"10px"}>
        <Bar data={dataSet} height={450} options={options} />
      </Box>
    </Paper> : null}
  </> );
}
 
export default DataChart;

const getTopNumber = (data)=>{
  var top = 0;
  data.map(item=>{
    if(item["Confirmed"] > top) top=item["Confirmed"]
    if(item["Deaths"] > top) top=item["Deaths"]
    if(item["Recovered"] > top) top=item["Recovered"]
  })
  return top
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}