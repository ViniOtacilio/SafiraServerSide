const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require("../database.js");

const sgMail = require('@sendgrid/mail');

const passwordResetQuery = require("../model/passwordResetQuery");

const router = express.Router();
var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }));


// bring env variables into file
const sendGridKey = process.env.SENDGRID_KEY;
const resetSecret = process.env.RESET_SECRET;

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    let user;

    //if (!resetPassword) return;
    if (!email) {
        res.sendStatus(500).json({ message: "Preencha campo de email" });
    }

    try {
        user = await passwordResetQuery.getUser(email);
        console.log(user);
    }
    catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }

    const token = jwt
        .sign({ user: user.email }, resetSecret, { expiresIn: "59m" });
        

    console.log(token);

    await pool.query(`
                        UPDATE users
                        SET reset_token = $1
                        WHERE email = $2`,
        [token, email],
        (error, results) => {
            if (error) {
                console.log(error.message);
            }
        }
    );


    sendEmail(user, token);
    res.status(200).json({ message: "Check your email" });

};
          
const resetPassword =  async (req, res) => {
    const reset_link = req.params.token;
    let { newPassword } = req.body;

    if (!sendGridKey) return;
    if (!newPassword) {
        res.status(400).json({ message: "Digite a Senha" });
    }

   /* if (reset_link) {
        jwt.verify(reset_link, sendGridKey, (error, decodedToken) => {
            if (error) {
                res.send("Token inválido");
            }
        });
    }*/

    try {
         console.log("mudar senha " + reset_link);
         user = await passwordResetQuery.getUserIdByToken(reset_link);

            userId = user.user_id;

            const hashPassword = await  bcrypt.hash(newPassword, 10);
            newPassword = hashPassword;
            console.log("nova senha" + newPassword);
       
            pool.query(`
                      UPDATE users
                      SET password = $1
                      WHERE user_id = $2`,
                [newPassword, userId],
                (error, results) => {
                    if (error) {
                        throw error;
                    }
                }
            );
            res.status(200).json({ message: "Password updated successfully!." });
        }
         catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
    
};

function sendEmail(user, token) {
    sgMail.setApiKey(sendGridKey);
    console.log("dentro da função do email" + user.email);
    const msg = {
        to: user.email,
        from: "safiranoreply@gmail.com", // your email
        subject: "Recuperar Senha",
        html: `<p>Precisa mudar sua senha? Para concluir o processo clique no link abaixo:</p>
     <a href="http://localhost:3333/api/users/resetPassword/${token}">Mudar Senha</a>
   `
    };

    sgMail.send(msg)
        .then(() => {
            console.log("Email sent");
        }).catch((error) => {
            console.error(error);
            console.error(error.response.body)
        })
}


module.exports = {
    forgotPassword,
    resetPassword
}