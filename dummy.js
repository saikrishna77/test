
const fs = require('fs');

let rawdata = fs.readFileSync('countries.json');
let student = JSON.parse(rawdata);
let dataNEw = student.map((item)=>{
    return item.name.common;
})

let r = fs.writeFileSync('newJSON.json',JSON.stringify(dataNEw));
