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

module.exports = (generateChartData)