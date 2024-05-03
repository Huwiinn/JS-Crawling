const nodemailer = require("nodemailer");

const email = {
    "host": "sandbox.smtp.mailtrap.io",
    "Port": "2525",
    "secure": false,
    "auth": {
        "user": "17ca3c0690f645",
        "pass":"8116069fc6492f"
    }
}

export const send = async (data) => {
    nodemailer.createTransport(email).sendMail(data, (err, info) => {
        if (err) {
    console.log(err)
        } else {
            console.log(info);
            return info.response;
}
    })
}
