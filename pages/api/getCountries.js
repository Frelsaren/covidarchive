import fs from 'fs'
export default async function handler(req,res){
  if (fs.existsSync('archive/countries.json')) {
    const countries = JSON.parse(fs.readFileSync('archive/countries.json', 'utf8'))
    return res.status(200).json({"countries": countries})    
  }   
  return res.status(200).json({"countries": []})    

}