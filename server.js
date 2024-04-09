const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000; // تعديل للسماح بتحديد المنفذ من قبل البيئة السحابية أو استخدام 3000 كافتراضي

// إعدادات CORS للسماح بالطلبات من مواقع مختلفة
// يمكنك تعديل 'origin' لتقييد الطلبات من مواقع محددة فقط إذا لزم الأمر
const corsOptions = {
  origin: '*', // هذا يسمح بجميع الطلبات. لتقييد الطلبات، استبدل '*' بعناوين URL المسموح بها
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(bodyParser.json());
app.use(cors(corsOptions)); // استخدام إعدادات CORS

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true للمنفذ 465, false للمنافذ الأخرى مثل 587
  auth: {
    user: 'homos.kitsaway@gmail.com',
    pass: 'mnmf skua gzfl nmln'
  }
});

app.post('/send-email', (req, res) => {
  const { userName, userNumber, userEmail, userMessage } = req.body;

  const mailOptions = {
    from: 'homos.kitsaway@gmail.com',
    to: 'm.gamal.zaid1@gmail.com',
    subject: 'بيانات المستخدم',
    text: `الاسم: ${userName}\nالرقم: ${userNumber}\nالبريد الإلكتروني: ${userEmail}\nالتعليقات/الأسئلة: ${userMessage}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Error', error: error.toString() });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Success' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
