var mysql= require('mysql');
// 地址池最大10个连接

var pool=mysql.createPool({
  host     : '47.93.24.155',
  user     : 'root',
  password : 'lvtianci123',
  database : 'myweb',
  // 执行都多条sql语句
  multipleStatements: true
})
var query=function(sql,callback){
  pool.getConnection(function(err,conn){
    if(err){
      // console.log(err)
    callback(err,null,null)
    }else{
     
      conn.query(sql,function(qerr,vals,fields){
      
        //释放连接不ok释放不掉
          // pool.release()
        // 事件驱动回调
         callback(qerr,vals,fields)
       
      })
    }
    // 释放连接
    pool.releaseConnection(conn);
  })
}
module.exports=query;





