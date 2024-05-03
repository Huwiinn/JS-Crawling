"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.send = void 0;

var nodemailer = require("nodemailer");

var email = {
  "host": "sandbox.smtp.mailtrap.io",
  "Port": "2525",
  "secure": false,
  "auth": {
    "user": "17ca3c0690f645",
    "pass": "8116069fc6492f"
  }
};

var send = function send(data) {
  return regeneratorRuntime.async(function send$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          nodemailer.createTransport(email).sendMail(data, function (err, info) {
            if (err) {
              console.log(err);
            } else {
              console.log(info);
              return info.response;
            }
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.send = send;
//# sourceMappingURL=node-mailer.dev.js.map
