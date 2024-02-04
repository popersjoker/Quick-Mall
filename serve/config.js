// const mysql=import("mysql");
import mysql from 'mysql'
const client = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'ego'
})
const sqlClient =(sql,arr,callback)=>{
    console.log("正在连接");
client.query(sql,arr,(error,result)=>{
    console.log("正在query");
    if(error){
        console.log(error);
        return ;
    }
    callback(result)
})

}
export default sqlClient