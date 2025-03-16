var express = require("express")
const path = require('path');
var app = express()
var port = process.env.port || 3000;

// Middleware to parse JSON bodies (for POST requests)
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

let calculationResults = [];

app.get('/add', (req, res) => {
    // Extract the 'num' query parameter from the request and convert it to a floating point number.
    const number1 = parseFloat(req.query.num1);
    const number2 = parseFloat(req.query.num2);
    // Check if 'num' is not a valid number. If it's not, send an error message as the response.
    if (isNaN(number1) || isNaN(number2)) {
        return res.status(400).json({ error: "Error: Please provide valid numbers for 'num1' and 'num2'." });
    }
    // Calculate
    const result = number1 + number2;
    res.json({ myresult: `The result of ${number1} + ${number2} is: ${result}` });
});

app.get('/sub', (req, res) => {
    // Extract the 'num' query parameter from the request and convert it to a floating point number.
    const number1 = parseFloat(req.query.num1);
    const number2 = parseFloat(req.query.num2);
    // Check if 'num' is not a valid number. If it's not, send an error message as the response.
    if (isNaN(number1) || isNaN(number2)) {
        return res.status(400).json({ error: "Error: Please provide valid numbers for 'num1' and 'num2'." });
    }
    // Calculate
    const result = number1 - number2;
    res.json({ myresult: `The result of ${number1} - ${number2} is: ${result}` });
});

app.get('/mul', (req, res) => {
    // Extract the 'num' query parameter from the request and convert it to a floating point number.
    const number1 = parseFloat(req.query.num1);
    const number2 = parseFloat(req.query.num2);
    // Check if 'num' is not a valid number. If it's not, send an error message as the response.
    if (isNaN(number1) || isNaN(number2)) {
        return res.status(400).json({ error: "Error: Please provide valid numbers for 'num1' and 'num2'." });
    }
    // Calculate
    const result = number1 * number2;
    res.json({ myresult: `The result of ${number1} * ${number2} is: ${result}` });
});

app.get('/div', (req, res) => {
    // Extract the 'num' query parameter from the request and convert it to a floating point number.
    const number1 = parseFloat(req.query.num1);
    const number2 = parseFloat(req.query.num2);
    // Check if 'num' is not a valid number. If it's not, send an error message as the response.
    if (isNaN(number1) || isNaN(number2)) {
        return res.status(400).json({ error: "Error: Please provide valid numbers for 'num1' and 'num2'." });
    }
    // Calculate
    const result = number1 / number2;
    res.json({ myresult: `The result of ${number1} / ${number2} is: ${result}` });
});


// POST endpoint to save calculation result
app.post('/save', (req, res) => {
    const { myCalculation } = req.body;
    if (!myCalculation || typeof myCalculation !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid values.' });
    }
    calculationResults.push(myCalculation);
    res.json({ message: 'Calculation Result added successfully.', calculationResults });
  });
  

app.listen(port,()=>{
    console.log("App listening to: "+port);
});