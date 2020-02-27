const User = require('../models').User
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const CronJob = require('cron').CornJob

class ControllerUser {
  static registerAdminTesting(req, res, next) {
    console.log(req.body)
    let {name, email, password, phone_number, address} = req.body
    let role = "admin"
    console.log(role)
    User.create({name, email, password, phone_number, address, role})
    .then(user => {
      res.status(201).json(user)
      // res.status(201).send("berhasil")
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }
  static registerAdmin(req, res, next) {
    let {name, email, password, phone_number, address} = req.body
    let role = "admin"
    User.create({name, email, password, phone_number, address, role})
    .then(user => {
      res.status(201).json(user)
      // res.status(201).send("berhasil")
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static register(req, res, next) {
    let {name, email, password, phone_number, address, role} = req.body
    role = "consument"
    User.create({name, email, password, phone_number, address, role})
    .then(user => {
      res.status(201).json(user)
      // res.status(201).send("berhasil")
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static login(req, res, next) {
    console.log(req.body)
    User.findOne({where: {email:req.body.email}})
    .then(user => {
      if(!user) {
        next({code: 404, message: "invalid name or email"})
      } else {
        if(!bcrypt.compareSync(req.body.password, user.password)){
          console.log("masuk if")
          next({code: 404, message: "invalid name or email"})
        } else {
          let token = jwt.sign(user.id, process.env.DATA_SECRET)
          req.headers.token = token
          // res.status(201).send("berhasil")
          res.status(201).json({token, user})
        }
      }
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
  }

  static sendReminding(req, res, next) {
    console.log(req.body)
     let email = req.body.email
     let textInput = req.body.inputText
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: 'skincare.pairproject@gmail.com',
        pass: 'skincare12345'
      }
    });
    let mailOptions = {
      from: 'skincare.pairproject@gmail.com', 
      to: email, 
      subject: "Reciept from SkinType", 
      text: "Hello world?", 
      html: textInput
    }
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log(err);
          next(err)
        }
        else {
          console.log('email sent');
          res.send(200).json("email sent")
        }
      })
    }

    static editProfil(req, res, next) {
      let {name, email,  phone_number, address} = req.body
      console.log(req.body)
      User.update({name, email,  phone_number, address}, {where:{id:req.user}, returning:true, plain:true})
      .then(data => {
        console.log("masuk bener edit <<<<<")
        res.status(200).json(data)
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
    }
}

module.exports = ControllerUser