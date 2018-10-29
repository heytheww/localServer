var express = require('express');
var router = express.Router();
var Mock = require('mockjs')
var mysql      = require('mysql');
var URL = require('url');

//创建连接
var connection = mysql.createConnection({
host     : 'localhost',
user     : 'admin1',
password : 'Admin12304516',
database : 'mock'
});
//执行创建连接 
connection.connect();
//SQL语句
var  sql = 'SELECT * FROM user';
var  addSql = 'INSERT INTO user(id,name,sex,phone,mail) VALUES(?,?,?,?,?)';

router.get('/getFromSql', function(req, res, next) {
  //解析请求参数
  var params = URL.parse(req.url, true).query;
    
      

    //查
    connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        console.log(params.id);
        
        //把搜索值输出
       res.send(result);
    });
});



router.post('/setFromSql', function(req, res, next) {
  //解析请求参数
  var params = URL.parse(req.url, true).query;
    var addSqlParams = [params.id, params.name, params.sex,params.phone,params.mail];
    
    //增
  connection.query(addSql,addSqlParams,function (err, result) {
      if(err){
       console.log('[INSERT ERROR] - ',err.message);
       res.send("添加失败")
       return;
      }else{
        res.send("添加成功")
      }             
  });

  
  

});



/* GET home page. */
router.get('/getFromMock', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  res.header('Cache-Control','no-store')
 

  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
      'id|+1': 1,
      'email': '@EMAIL', //邮箱
      'name': '@name', //名字
      'time':'@now'    //当前时间
  }]
})
// 输出结果
res.send(JSON.stringify(data, null, 4))

});

router.post('/postFromMock', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  res.header('Cache-Control','no-store') 
 

  var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
      'id|+1': 1,
      'email': '@EMAIL', //邮箱
      'name': '@name', //名字
      'time':'@now'    //当前时间
  }]
})
// 输出结果
res.send(JSON.stringify(data, null, 4))

});




module.exports = router;
