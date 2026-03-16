

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;


  if (pathname === '/') {

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write(`
      <html>
      <head>
        <title> Eligibility Checker</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(to right, #4facfe, #00f2fe);
            text-align: center;
            padding-top: 40px;
          }

          .container {0
            background: white;
            width: 400px;
            margin: auto;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          }

          h1 {
            margin-bottom: 20px;
          }

          input, select {
            width: 90%;
            padding: 8px;
            margin: 8px 0;
            border-radius: 5px;
            border: 1px solid gray;
          }

          button {
            padding: 10px 15px;
            margin: 5px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            color: white;
            font-weight: bold;
          }

          .Army-btn {
            background-color: #28a745;
          }

          .police-btn {
            background-color: #007bff;
          }

        </style>
      </head>
      <body>

        <div class="container">
          <h1> Eligibility Checker</h1>

          <form action="/calculate" method="get">

            <input type="text" name="studentName" placeholder="Enter Student Name" required>

            <input type="number" name="weight" placeholder="Weight (kg)" required>

            <input type="number" name="height" placeholder="Height (cm)" required>

            <input type="number" name="age" placeholder="Age" required>

            <select name="gender">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <br>

            <button class="Army-btn" type="submit" name="type" value="Army">
              Check Army
            </button>

            <button class="police-btn" type="submit" name="type" value="police">
              Check Police
            </button>

          </form>
        </div>

      </body>
      </html>
    `);

    res.end();
  }

 
  else if (pathname === '/calculate') {

    const query = parsedUrl.query;

    const name = query.studentName;
    const weight = parseFloat(query.weight);
    const heightCm = parseFloat(query.height);
    const age = parseInt(query.age);
    const gender = query.gender;
    const type = query.type;

    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);

  
    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    let eligibility = "Not Eligible";

 
    if (type === "Army") {
      if (bmi >= 18.5 && bmi <= 27 && age >= 18 && age <= 30) {
        eligibility = "Eligible for Army Recruitment";
      }
    }

 
    if (type === "police") {
      let minHeight = gender === "male" ? 165 : 155;

      if (bmi >= 18.5 && bmi <= 25 &&
          age >= 18 && age <= 28 &&
          heightCm >= minHeight) {
        eligibility = "Eligible for Police Recruitment";
      }
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write(`
      <html>
      <head>
        <title>Result</title>
        <style>
          body {
            font-family: Arial;
            text-align: center;
            background-color: #f2f2f2;
            padding-top: 60px;
          }
          .result-box {
            background: white;
            width: 400px;
            margin: auto;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }
          h2 { color: #333; }
          a {
            text-decoration: none;
            background: #4facfe;
            color: white;
            padding: 8px 15px;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>

        <div class="result-box">
          <h2>Student Name: ${name}</h2>
          <h3>BMI: ${bmi.toFixed(2)}</h3>
          <h3>Category: ${category}</h3>
          <h3>${eligibility}</h3>

          <br>
          <a href="/">Go Back</a>
        </div>

      </body>
      </html>
    `);

    res.end();
  }

  // ---------------- 404 PAGE ----------------
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write("<h1>404 - Page Not Found</h1>");
    res.end();
  }

});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});