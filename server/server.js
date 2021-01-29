const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const utils = require('./utils');
require('dotenv').config();
const router = require('express').Router();

const { createUser, getUsers, comparePassword } = require('./dbfunctions');

// mongoose.connect('mongodb://localhost/loginout', {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// });
// mongoose.connection.once('open', () => {
//     console.log('Database connected successfully');
// }).on('error', (err) => {
//     console.log('Error', err);
// })

router.post('/signup',async function (req, res){
    const user = req.body.username;
    const pass = req.body.password;
  
     const ans =  await createUser(user, pass);
     if(ans){
       const data = {
         username: user,
         password: pass
       };
       const token = utils.generateToken(data);
        // get basic user details
        const userObj = utils.getCleanUser(data);
        // return the token along with user details
        return res.json({ user: userObj, token });
     } else {
          return res.status(401).json({
            error: true,
            message: "Please try to Login."
          });
     }
  });
  

  router.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue
  
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      } else {
        req.user = user; //set the user to req so other routes can use it
        next();
      }
    });
  });
  

  router.get('/', (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
    res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
  });


  router.post('/users/signin', function (req, res) {
    const user = req.body.username;
    const pwd = req.body.password;
    console.log("lllllllllllllllllllllllllllllllllllll", user, pwd);
    // return 400 status if username/password is not exist
    if (!user || !pwd) {
      return res.status(400).json({
        error: true,
        message: "Username or Password required."
      });
    }
  
    const users = getUsers(user, pwd);
    // console.log("++++++++++++++++", data);
    users.then(data=>{
      console.log(data)
      if(data.length != 0){
                 const pass = comparePassword(pwd, data[0].password);
                  if(!pass){
                      return res.status(401).json({
                        error: true,
                        message: "Password Wrong"
                      });
                  }
          //     }
        // generate token
        console.log("PPPPPPPPPPPP-----",data[0]);
        const token = utils.generateToken(data[0]);
        // get basic user details
        const userObj = utils.getCleanUser(data[0]);
        // return the token along with user details
        return res.json({ user: userObj, token });
      } else {
        return res.status(401).json({
              error: true,
              message: "Username is Wrong."
            });
      }
    })
  });

  router.get('/verifyToken', function (req, res) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token;
    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Token is required."
      });
    }
    // check token that was passed by decoding token using secret
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) return res.status(401).json({
        error: true,
        message: "Invalid token."
      });
  
      // return 401 status if the userId does not match.
      if (user.userId !== userData.userId) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      }
      // get basic user details
      var userObj = utils.getCleanUser(userData);
      return res.json({ user: userObj, token });
    });
  });

  module.exports = router;