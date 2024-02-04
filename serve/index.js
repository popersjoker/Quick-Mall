//后端
import express from "express";

// import bodyParser from "body-parser";
import cors from 'cors';
import  router  from './router.js';

const app = express();//创建服务器
app.use(cors());//跨域资源共享
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(express.json()); //解析request.body to req.body
app.use(express.urlencoded({ extended: true })); // 解析 Get url to req.body
app.use('/api', router);

app.listen(3000, () => {
    console.log(3000);
});