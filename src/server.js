import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
// import cors from 'cors';

require('dotenv').config();

let app = express();
// app.use(cors({ origin: true }));
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // đường dẫn muốn conect. Chỉ cho phép tên miền của chúng ta kết nối và gọi API.
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request method
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // tiêu đề yêu cầu
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // set true nêu muốn website lấy cookies để gửi yêu cầu
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // hành động sau đó
    next();
});


//config app

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8080;
//Port === undefined => port = 8080

app.listen(port, () => {
    //callback
    console.log("Backend Nodejs is runing on the port : " + port)
})