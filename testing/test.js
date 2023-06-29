const fs = require('fs');
const XLSX = require('xlsx');

// User input: Provide the file path here
const filePath = '/Users/bramschork/Documents/cocktails/src/data/donations.xlsx';

// Function to convert Excel to JSON
function excelToJson(filePath) {
  const fileContent = fs.readFileSync(filePath);
  const workbook = XLSX.read(fileContent, { type: 'buffer' });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  const headers = jsonData.shift();
  const jsonResult = [];

  jsonData.forEach(function(row) {
    const obj = {};
    row.forEach(function(value, index) {
      obj[headers[index]] = value;
    });
    jsonResult.push(obj);
  });

  generateHTML(jsonResult);
}

// Function to generate HTML file
function generateHTML(jsonData) {
  let htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Excel to HTML</title>
      </head>
      <body>
        <div id="data-container">
  `;

  jsonData.forEach(function(row) {
    Object.keys(row).forEach(function(key) {
      htmlContent += `<p>${key}: ${row[key]}</p>`;
    });

    htmlContent += '<hr />';
  });

  htmlContent += `
        </div>
      </body>
    </html>
  `;

  fs.writeFileSync('output.html', htmlContent, 'utf8');
  console.log('HTML file generated successfully!');
}

// Invoke the function with the provided file path
excelToJson(filePath);
