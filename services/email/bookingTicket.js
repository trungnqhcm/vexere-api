const nodemailer = require("nodemailer");
const fs = require("fs"); // built-in NodeJS (Node API)
const hogan = require("hogan.js");
const Trip = require("../../models/Trip");
//const config = require("../../config/index");

const template = fs.readFileSync(
  "services/email/bookingTicketEmailTemplate.hjs",
  "utf-8"
);
const compiledTemplate = hogan.compile(template);

module.exports.sendBookTicketEmail = (user, trip, ticket) => {
  //ticket, trip, user) => {
  const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    requireSSL: true,
    auth: {
      user: "n27ung@gmail.com",
      pass: "c@TS5!5*UGKoCkBqJ7pcfyZrNFwuR",
    },
  };

  const transporter = nodemailer.createTransport(transport);

  const mailOptions = {
    from: "n27ung@gmail.com",
    to: "trungnqhcm@gmail.com",
    subject: "Xác nhận mua vé thành công",
    html: compiledTemplate.render({
      email: user.email, //lay tu user
      fromStation: trip.fromStationId.name,
      toStation: trip.toStationId.name,
      price: trip.price,
      amount: ticket.seats.lenght,
      total: ticket.totalPrice,
      seatCodes: ticket.seats.map((m) => m.code).join(" - "),
    }),
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) return console.log(err.message);
    console.log("Send email success");
  });
};
