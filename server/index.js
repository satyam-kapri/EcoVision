const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User=require('./model/userModel');
const cors=require('cors')
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Connect to MongoDB
// Middleware
app.use(bodyParser.json());

mongoose
  .connect('mongodb://0.0.0.0:27017/EcoVision', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });




app.post('/register', async(req, res) => {
  console.log("ok");
  try {
    const { username, email, password } = req.body;
    
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck)
      {return res.json({ msg: "Username already used", status: false });}
    const emailCheck = await User.findOne({ email });
   
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
   
    res.json({ status: true });
  } catch (ex) {
    console.log(ex);
   
  }
  });
  
// Login route
app.post('/login', async(req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email});
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });

    // const token=jwt.sign({userid:user._id},"Satyamkapriproject-ecovision");
    // res.cookie('token',token,{httpOnly:true,secure:true,
    //   expires: new Date(Date.now() + 900000000),
    //   sameSite:'None'
    //   });
      res.json({name:user.username,status:true});
   
  
  } catch (ex) {
    console.log(ex);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
