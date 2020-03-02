const fs = require('fs');

let rawdata = fs.readFileSync('countries.json');
let student = JSON.parse(rawdata);
let dataNEw = student.map(item => {
  return {
    name: item.name.common,
    code: item.cca2
  };
});

let re = fs.writeFileSync('newJSON.json', JSON.stringify(dataNEw));
