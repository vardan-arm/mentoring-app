require('./storageSetup');

const csv = require('csv-parser');
const fs = require('fs');
const express = require('express');
const app =express();

app.get('/api/users', (req, res) => {
  res.send(['user 1', 'user 2']);
});

app.get('/api/employees', async (req, res) => {
  /*fs.readFile('./mocks/employees cvs.csv', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send({ error: 'Something went wrong. Please try again later!' });
    }
    res.send({data})
    // console.log(data);
  })*/

  try {
    let employees = [];
    const cachedEmployees = localStorage.getItem('employees');

    if (cachedEmployees) {
      employees = JSON.parse(cachedEmployees);

      res.send({data: employees});
    } else { // no previously stored data, get from the file (or from DB in real environment)
      await fs.createReadStream('./mocks/employees cvs.csv')
        .pipe(csv())
        .on('data', (row) => {
          employees.push(row);
        })
        .on('end', () => {
          // Cache results locally
          localStorage.setItem('employees', JSON.stringify(employees));

          res.send({data: employees});
        });
    }
  } catch {
    return res.status(500).send({ error: 'Something went wrong. Please try again later!' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
