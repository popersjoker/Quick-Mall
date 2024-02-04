import express from 'express'
import sqlClinet from './config.js'
import jwt from 'jsonwebtoken'
// import { log } from 'console';
// const sqlClinet = import('./config')
import url from 'url'
// import { log } from 'console'
const router = express.Router()
/**
 *
 */
router.post('/register', (req, res) => {
  // alert("???")
  console.log('Received a request to /api/register POST')
  const { name, pass } = req.body //接受请求参数
  const sql = 'insert into user value(null,?,?)'
  const arr = [name, pass]
  sqlClinet(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({ status: 200, result })
    } else {
      res.send({
        status: 401,
        message: 'failure'
      })
    }
  })
})
router.post('/login', (req, res) => {
  const { name, pass } = req.body
  const sql = 'select * from user where name=? and pass=?'
  const arr = [name, pass]
  sqlClinet(sql, arr, (result) => {
    if (result.length > 0) {
      let token = jwt.sign(
        {
          name,
          id: result[0].id
        },
        'soomekeys'
      )
      res.send({
        status: 200,
        token,
        name
      })
    } else {
      res.send({
        status: 401,
        message: '登陆失败'
      })
    }
  })
})
router.get('/getpage', (req, res) => {
  const sql = 'select count(*) from product'
  sqlClinet(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        message: '查询成功',
        page: result[0]['count(*)']
      })
    } else {
      res.send({
        status: 401,
        message: '查询失败'
      })
    }
  })
})
router.get('/backend/item/selectAllItemByPage', (req, res) => {
  const query = url.parse(req.url).query
  console.log(query + '???' + query.replaceAll(/\D/g, ''))
  const page = Number(query.replaceAll(/\D/g, '')) || 0
  const sql = 'select * from product limit 10 offset ' + page * 10
  console.log(sql)
  sqlClinet(sql, null, (result) => {
    console.log('result')
    // console.log(result);
    if (result.length > 0) {
      res.send({
        status: 200,
        message: '分页成功',
        result: result
      })
    } else {
      res.send({
        status: 401,
        message: '分页失败'
      })
    }
  })
})
router.post('/search', (req, res) => {
  const { search } = req.body
  const sql =
    "select * from product where concat(IFNULL(`title`,''),IFNULL(`descs`,''),IFNULL(`sellPoint`,'')) like '%" +
    search +
    "%'"
  // const arr=[name,pass]
  console.log(sql)
  sqlClinet(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result: result
      })
    } else {
      res.send({
        status: 401,
        message: '查找失败'
      })
    }
  })
})
router.get('/getCategoryItem', (req, res) => {
  const query = url.parse(req.url).query || ''
  const id = Number(query.replaceAll(/\D/g, '')) || 1
  const sql = 'select * from category where id = ' + id
  console.log(sql)
  sqlClinet(sql, null, (result) => {
    // console.log("result");
    // console.log(result);
    if (result.length > 0) {
      res.send({
        status: 200,
        message: '分页成功',
        result: result
      })
    } else {
      res.send({
        status: 501,
        message: '分页失败'
      })
    }
  })
})
router.post('/insertToPro', (req, res) => {
  // alert("???")
  // console.log('Received a request to /api/register POST');
  const { image, price, title, num, sellPoint, descs, cid } = req.body //接受请求参数
  const sql =
    'insert into product(id,image,price,title,num,sellPoint,descs,cid) value(null,?,?,?,?,?,?,?)'
  const arr = [image, price, title, num, sellPoint, descs, cid]
  sqlClinet(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({ status: 200, result })
    } else {
      res.send({
        status: 500,
        message: 'failure'
      })
    }
  })
})
router.get('/delProById',(req,res)=>{
  
  const query=url.parse(req.url).query||'';
  const id=Number(query.replaceAll(/\D/g,''))||1;
  const sql="delete  from product where id = "+id ;
  // console.log(sql);
  sqlClinet(sql,null,result=>{
    // console.log("result");
    // console.log(result);
    if(result.length>0){
      res.send({
        status:200,
        message:'删除成功',
        result:result
    })
    }  else {
      res.send({
          status:501,
          message:'删除失败'
      })
  }
  })

})
router.get('/revisePre',(req,res)=>{
  
  const query=url.parse(req.url).query||'';
  const id=Number(query.replaceAll(/\D/g,''))||1;
  const sql="select * from  product where id = "+id ;
   console.log(sql);
  sqlClinet(sql,null,result=>{

    if(result.length>0){
      res.send({
        status:200,
        message:'查找成功',
        result:result
    })
    }  else {
      res.send({
          status:501,
          message:'找不到'
      })
  }
  })

})
router.post('/updatePro', (req, res) => {
 
  const { image, price, title, num, sellPoint, descs, cid,id} = req.body //接受请求参数
  const sql =
    'update product set image=? ,price=?,title=?,num=?,sellPoint=?,descs=?,cid=? where id=?'
  const arr = [image, price, title, num, sellPoint, descs, cid,id]
  console.log(sql);
  sqlClinet(sql, arr, (result) => {
    if (result.affectedRows > 0) {
      res.send({ status: 200, result })
    } else {
      res.send({
        status: 500,
        message: 'failure'
      })
    }
  })
})
router.post('/paramslike', (req, res) => {
  const { search } = req.body
  const sql =
    "select * from params where concat(IFNULL(`content`,'')) like '%" +
    search +
    "%'"
  // const arr=[name,pass]
  console.log(sql)
  sqlClinet(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result: result
      })
    } else {
      res.send({
        status: 401,
        message: '查找失败'
      })
    }
  })
})
router.get('/selectParamsByPage', (req, res) => {
  const query = url.parse(req.url).query
  console.log(query + '???' + query.replaceAll(/\D/g, ''))
  const page = Number(query.replaceAll(/\D/g, '')) || 0
  const sql = 'select * from params limit 10 offset ' + page * 10
  console.log(sql)
  sqlClinet(sql, null, (result) => {
    console.log('result')
    // console.log(result);
    if (result.length > 0) {
      res.send({
        status: 200,
        message: '分页成功',
        result: result
      })
    } else {
      res.send({
        status: 401,
        message: '分页失败'
      })
    }
  })
})
router.get('/getParamsPage', (req, res) => {
  const sql = 'select count(*) from params'
  sqlClinet(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        message: '查询成功',
        page: result[0]['count(*)']
      })
    } else {
      res.send({
        status: 401,
        message: '查询失败'
      })
    }
  })
})

export default router

