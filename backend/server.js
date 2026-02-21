import  express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/CartRoute.js'
import orderRouter from './routes/orderRoute.js'
import nodemailer from "nodemailer";
// api config
const app = express();
const port = process.env.Port ||4000;
connectDB();
connectCloudinary()




// middlwares
app.use(express.json())
app.use(cors())

// api endpoint
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
// app.use("/api/user", userRouter);
app.post('/visit', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,       // إيميلك
        pass: process.env.EMAIL_PASS,  // App Password
      },
    });

    await transporter.sendMail({
      from: `"Shams Store" <${process.env.EMAIL}>`,
      to: process.env.MY_EMAIL,        // الإيميل اللي هيجي عليه التنبيه
      subject: "👀 زيارة جديدة للموقع",
      html: `
        <h2>في حد دخل الموقع</h2>
        <p> التاريخ: ${new Date().toLocaleString()}</p>
        <p>🌍 IP الزائر: ${req.ip}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
app.get('/', (req, res) => {
    res.send('api working')
    
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))