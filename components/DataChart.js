import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Title,
    Legend,
  } from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles({
  chart: {
    marginTop: 30,
    minWidth: "100%",
    maxWidth: "100%"
  }
})

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);


const DataChart = (props) => {
  const classes = useStyles();
  const [data,setData] = useState([]);
  const [topNumber, setTopNumber] = useState(0);

  useEffect(()=>{
    const newData = generateChartData(props.confirmed, props.deaths, props.recovered, props.month)
    if (data === undefined || newData === undefined) {
      setData(newData)
    } else if (data.length === newData.length) {
      var toUpdate = false
      data.map((day,index) => {
        Object.keys(day).map(key=>{
          if(day[key] !== newData[index][key]) {
            toUpdate=true
          }
        })
      })
      if(toUpdate)setData(newData)
    }
    else {
      setData(newData)
    }
    setTopNumber(getTopNumber(data)*1.25)
  })

  return ( <>
    {data ? <Paper className={ classes.chart }>
      <Chart data={data}>
        <Legend position="top" rootComponent={Root} labelComponent={Label} />
        <ArgumentAxis> {/* or ValueAxis, or CommonAxisSettings */}
          <Label template={<></>}/>
        </ArgumentAxis>
        <ValueAxis
          max={topNumber}
        />
        <BarSeries
          name="Confirmed"
          valueField="Confirmed"
          argumentField="Date"
        />
        <BarSeries
          name="Deaths"
          valueField="Deaths"
          argumentField="Date"
        />
        <BarSeries
          name="Recovered"
          valueField="Recovered"
          argumentField="Date"
        />
        <Animation />
        
      </Chart>
    </Paper> : null}
  </> );
}
 
export default DataChart;

const generateChartData = (confirmed, deaths, recovered, month)=>{
  const newData = [];
  let totalConfirmedCountOnMonthStart = 0;
  confirmed.map(item=>{
    let countOnMonthStart;
    Object.keys(item).map((key,index)=>{
      if(key.match(new RegExp(month.toLowerCase() + "\\d{2}2020"))){
        if(!countOnMonthStart && Object.keys(item)[index-1].match(new RegExp("(?<!"+month.toLowerCase()+")\\d{2}2020"))) countOnMonthStart = item[Object.keys(item)[index-1]]
        if(newData.filter(e=>e["Date"]===key).length === 0) {
          newData.push({"Date": key,
                        "Confirmed": item[key] ,
                        "Deaths": 0,
                        "Recovered": 0})
        } else {
          newData.filter(entry=>entry["Date"]===key)[0]["Confirmed"] += item[key] 
        }
      }
    })
    totalConfirmedCountOnMonthStart += countOnMonthStart ? countOnMonthStart : 0
  })

  let totalDeathCountOnMonthStart = 0;
  deaths.map(item=>{
    let countOnMonthStart;
    Object.keys(item).map((key,index)=>{
      if(key.match(new RegExp(month.toLowerCase() + "\\d{2}2020"))){
        if(!countOnMonthStart && Object.keys(item)[index-1].match(new RegExp("(?<!"+month.toLowerCase()+")\\d{2}2020"))) countOnMonthStart = item[Object.keys(item)[index-1]]
        if(newData.filter(e=>e["Date"]===key).length === 0) {
          newData.push({"Date": key,
                        "Confirmed": item[key],
                        "Deaths": 0,
                        "Recovered": 0})
        } else {
          newData.filter(entry=>entry["Date"]===key)[0]["Deaths"] += item[key] 
        }
      }
    })
    totalDeathCountOnMonthStart += countOnMonthStart ? countOnMonthStart : 0
  })
  let totalRecoveredCountOnMonthStart = 0;
  recovered.map(item=>{
    let countOnMonthStart;
    Object.keys(item).map((key,index)=>{
      if(key.match(new RegExp(month.toLowerCase() + "\\d{2}2020"))){
        if(!countOnMonthStart && Object.keys(item)[index-1].match(new RegExp("(?<!"+month.toLowerCase()+")\\d{2}2020"))) countOnMonthStart = item[Object.keys(item)[index-1]]
        if(newData.filter(e=>e["Date"]===key).length === 0) {
          newData.push({"Date": key,
                        "Confirmed": 0,
                        "Deaths": 0,
                        "Recovered": item[key]})
        } else {
          newData.filter(entry=>entry["Date"]===key)[0]["Recovered"] += item[key] 
        }
      }
    })
    totalRecoveredCountOnMonthStart += countOnMonthStart ? countOnMonthStart : 0
  })
  
  newData.reverse()
  newData.map((entry,index)=>{
    entry["Confirmed"] -= index < newData.length-1 ? entry["Confirmed"] > newData[index+1]["Confirmed"] ? newData[index+1]["Confirmed"] : entry["Confirmed"]  : entry["Confirmed"] > totalConfirmedCountOnMonthStart ? totalConfirmedCountOnMonthStart : entry["Confirmed"]
    entry["Deaths"] -= index < newData.length-1 ? entry["Deaths"] > newData[index+1]["Deaths"] ? newData[index+1]["Deaths"] : entry["Deaths"]  : entry["Deaths"] > totalDeathCountOnMonthStart ? totalDeathCountOnMonthStart : entry["Deaths"]
    entry["Recovered"] -= index < newData.length-1 ? entry["Recovered"] > newData[index+1]["Recovered"] ? newData[index+1]["Recovered"] : entry["Recovered"]  : entry["Recovered"] > totalRecoveredCountOnMonthStart ? totalRecoveredCountOnMonthStart : entry["Recovered"]
  })
  newData.reverse()
  
  return newData
}

const getTopNumber = (data)=>{
  var top = 0;
  data.map(item=>{
    if(item["Confirmed"] > top) top=item["Confirmed"]
    if(item["Deaths"] > top) top=item["Deaths"]
    if(item["Recovered"] > top) top=item["Recovered"]
  })
  return top
}