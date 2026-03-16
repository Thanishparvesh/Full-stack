const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

let feedbacks = [];

app.get("/", (req, res) => {

res.send(`

<!DOCTYPE html>
<html>
<head>
<title>Retail Customer Survey</title>

<style>

*{
box-sizing:border-box;
font-family:'Segoe UI',sans-serif;
}

body{
margin:0;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:linear-gradient(135deg,#667eea,#764ba2);
}

/* Glass Card */

.container{
width:500px;
padding:30px;
border-radius:20px;
background:rgba(255,255,255,0.15);
backdrop-filter:blur(15px);
box-shadow:0 10px 30px rgba(0,0,0,0.3);
color:white;
animation:fade 1s ease-in-out;
}

@keyframes fade{
from{opacity:0; transform:translateY(20px);}
to{opacity:1; transform:translateY(0);}
}

h1{
text-align:center;
margin-bottom:10px;
}

input,textarea{
width:100%;
padding:10px;
margin:8px 0;
border:none;
border-radius:8px;
}

textarea{
height:60px;
resize:none;
}

/* Product Cards */

.products{
display:grid;
grid-template-columns:1fr 1fr;
gap:10px;
margin:10px 0;
}

.product{
background:rgba(255,255,255,0.2);
padding:10px;
border-radius:10px;
text-align:center;
cursor:pointer;
transition:0.3s;
}

.product:hover{
transform:scale(1.05);
background:rgba(255,255,255,0.35);
}

.product img{
width:70px;
}

/* Star Rating */

.rating{
display:flex;
justify-content:center;
flex-direction:row-reverse;
margin:10px 0;
}

.rating input{
display:none;
}

.rating label{
font-size:28px;
color:#ccc;
cursor:pointer;
}

.rating input:checked ~ label{
color:gold;
}

/* Button */

button{
width:100%;
padding:12px;
border:none;
border-radius:10px;
background:linear-gradient(135deg,#36d1dc,#5b86e5);
color:white;
font-size:16px;
cursor:pointer;
transition:0.3s;
}

button:hover{
transform:scale(1.05);
}

</style>

</head>

<body>

<div class="container">

<h1>Customer Survey</h1>

<form action="/submit" method="POST">

<input type="text" name="name" placeholder="Your Name" required>

<input type="email" name="email" placeholder="Your Email" required>

<h3>Select Product</h3>

<div class="products">

<label class="product">
<input type="radio" name="product" value="Laptop" required>
<img src="https://www.asus.com/media/Odin/Websites/global/ProductLine/20250425022746.png">
<p>Laptop</p>
</label>

<label class="product">
<input type="radio" name="product" value="Mobile">
<img src="https://cdn-icons-png.flaticon.com/512/15/15874.png">
<p>Mobile</p>
</label>

<label class="product">
<input type="radio" name="product" value="music">
<img src="https://cdn-icons-png.flaticon.com/512/727/727245.png">
<p>music</p>
</label>

<label class="product">
<input type="radio" name="product" value="Calender">
<img src="https://cdn-icons-png.flaticon.com/512/747/747310.png">
<p>Calender</p>
</label>

</div>

<h3>Rate Our Service</h3>

<div class="rating">

<input type="radio" name="rating" value="5" id="star5">
<label for="star5">★</label>

<input type="radio" name="rating" value="4" id="star4">
<label for="star4">★</label>

<input type="radio" name="rating" value="3" id="star3">
<label for="star3">★</label>

<input type="radio" name="rating" value="2" id="star2">
<label for="star2">★</label>

<input type="radio" name="rating" value="1" id="star1">
<label for="star1">★</label>

</div>

<textarea name="feedback" placeholder="Write your feedback"></textarea>

<button type="submit">Submit Feedback</button>

</form>

</div>

</body>
</html>

`);
});


app.post("/submit",(req,res)=>{

const data=req.body;
feedbacks.push(data);

res.send(`

<!DOCTYPE html>
<html>
<head>

<title>Thank You</title>

<style>

body{
margin:0;
height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:linear-gradient(135deg,#43cea2,#185a9d);
font-family:'Segoe UI';
}

.box{
background:rgba(255,255,255,0.2);
backdrop-filter:blur(15px);
padding:40px;
border-radius:20px;
text-align:center;
color:white;
width:400px;
animation:fade 1s ease-in-out;
}

@keyframes fade{
from{opacity:0; transform:scale(0.9);}
to{opacity:1; transform:scale(1);}
}

h1{
font-size:36px;
margin-bottom:10px;
}

.details{
text-align:left;
margin-top:20px;
background:rgba(255,255,255,0.15);
padding:15px;
border-radius:10px;
}

</style>

</head>

<body>

<div class="box">

<h1>🙏 Thank You!</h1>

<p>Your feedback has been received.</p>

<div class="details">

<p><b>Name:</b> ${data.name}</p>
<p><b>Email:</b> ${data.email}</p>
<p><b>Product:</b> ${data.product}</p>
<p><b>Rating:</b> ⭐ ${data.rating}</p>
<p><b>Feedback:</b> ${data.feedback}</p>

</div>

</div>

</body>
</html>

`);

});

app.listen(3000,()=>{
console.log("Server running at http://localhost:3000");
});