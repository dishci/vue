var express = require('express');
var router = express.Router();
// 加密模块 
var crypto = require('crypto');
var url=require('url')
var query=require('../mysql/sql')
var path = require('path');
var fs=require('fs');
var formidable=require('formidable')
var date=require('../util/util.js')
var mysql= require('mysql');
// 随机id
var uuid= require('node-uuid');








router.get('/api/reg',(req,res)=>{
	var reg=req.query
	var uuids="'"+uuid.v1().replace(/\-/g,'')+"'";	
	try{
		sql ='INSERT INTO scoket(userid,login,pass) VALUES('+uuids+','+mysql.escape(reg.login)+','+mysql.escape(reg.pass)+');'	
		query(sql,(qerr,vals,fields)=>{
			if(!qerr){
				res.send({code:1,userid:uuids})
			}
		})
	}
	catch(err){
		res.send(err)
	}
})
router.get('/api/login',(req,res)=>{
	var reg=req.query

	try{
		sql ='SELECT * FROM scoket WHERE userid='+mysql.escape(reg.userid)+';'	
		
		query(sql,(qerr,vals,fields)=>{
			if(vals){
					res.send({code:1,status:'登陆成功'})
			
			}
		})
	}
	catch(err){
		res.send(err)
	}
})




















// v1根据时间戳来生成v4随机生成
// 查询列表
router.get('/api/list',(req,res)=>{

	var parms=req.query;
	var home= parms.home
    try{
    	 var page=mysql.escape(Number(parms.page-1))
            var limit=mysql.escape(Number(parms.limit))	 
        if(parms.home){
        sql='select * FROM arctile ORDER BY time DESC LIMIT 0,10 ;'
        query(sql, function (qerr,vals,fields) {
            if(qerr) throw '获取失败'
                res.send(vals)
            })
        }else if(parms.category=='tag'){
           
        	
        		let tagid=mysql.escape(Number(parms.tagid))
        		sql1='SELECT * FROM arctile LEFT JOIN arc_tag ON arctile.arctile_id=arc_tag.arcid WHERE arc_tag.tagid='+tagid+' LIMIT '+page+','+limit+';'
        		sql2='SELECT COUNT(1) AS count  FROM arctile LEFT JOIN arc_tag ON arctile.arctile_id=arc_tag.arcid WHERE arc_tag.tagid='+tagid+';'
        		query(sql1+sql2, function (qerr,vals,fields) {
            	if(qerr) throw '标签列表获取失败'

                var pages=Math.ceil(vals[1][0].count/limit)
                // count总数 total总共多少页  current_page当前页多少条数据 per_page当前页  data数据
                var per=Number(parms.page)
                var valss= {'count':vals[1][0].count,'total':pages,'current_page':Number(limit),'per_page':per,'data':vals[0]}
                res.send(valss)
                })
        	}else if(parms.category=='class'){
        		let classid=mysql.escape(Number(parms.class))
        		sql3='SELECT * FROM arctile LEFT JOIN arc_class ON arctile.arctile_id=arc_class.arcid WHERE arc_class.classid='+classid+' LIMIT '+page+','+limit+';'
        		sql4='SELECT COUNT(1) AS count  FROM arctile LEFT JOIN arc_class ON arctile.arctile_id=arc_class.arcid WHERE arc_class.classid='+classid+';'
        		query(sql3+sql4, function (qerr,vals,fields) {
            	if(qerr) throw '分类列表获取失败'
                var pages=Math.ceil(vals[1][0].count/limit)
                // count总数 total总共多少页  current_page当前页多少条数据 per_page当前页  data数据
                var per=Number(parms.page)
                var valss= {'count':vals[1][0].count,'total':pages,'current_page':Number(limit),'per_page':per,'data':vals[0]}
                res.send(valss)
                })
        	}
            // sql='select * from arctile  limit '+page+','+limit+';SELECT count(1) as count FROM arctile;'
            // query(sql, function (qerr,vals,fields) {
            // if(qerr) throw '获取失败'
            //     var pages=Math.ceil(vals[1][0].count/limit)
            //     // count总数 total总共多少页  current_page当前页多少条数据 per_page当前页  data数据
            //     var per=Number(parms.page)
            //     var valss= {'count':vals[1][0].count,'total':pages,'current_page':Number(limit),'per_page':per,'data':vals[0]}
            //     res.send(valss)
            //      })
        
    }
    catch(err){
        res.send(err)
    }

					
})
// 查询
router.get('/api/media',(req,res,next)=>{
	var parms=req.query;
	try{
		if(parms.media=='user'){
			sql='select * FROM users;'
		query(sql,function(qerr,vals,fields){
				if(qerr){
					res.send({code:0,errmsg:'查询用户信息失败'})
				} else{
					res.send({code:1,data:vals})
				}
		})
		}
		if(parms.media=='tag'){
			sql='select * FROM tag;'
		query(sql,function(qerr,vals,fields){
				if(qerr){
					res.send({code:0,errmsg:'查询标签信息失败'})
				} else{
					res.send({code:1,data:vals})
				}
		})
		}
		if(parms.media=='class'){
			sql='select * FROM class;'
		query(sql,function(qerr,vals,fields){
				if(qerr){
					res.send({code:0,errmsg:'查询分类信息失败'})
				} else{
					res.send({code:1,data:vals})
				}
		})
		}
		if(parms.media=='deail'){
			let id= mysql.escape(parms.ids)
			sql='select * FROM arctile WHERE arctile_id='+id+';'
		query(sql,function(qerr,vals,fields){
				if(qerr){
					res.send({code:0,errmsg:'查询文章详情失败'})
				} else{
					res.send({code:1,data:vals})
				}
		})
		}
		
		
		
	}
	catch(err){
		res.send(err)
	}
})
// 点击埋点
 router.post('/api/write',(req,res,next)=>{
 		try{
 			 let parms=req.body
         if  (parms.ids==undefined||parms.ids=='')  throw '文章标识不能为空'
 			let clicks=mysql.escape(Number(parms.clicks)) || 0
 			let id=mysql.escape(parms.ids)
 			sql='UPDATE arctile SET  ciicks='+clicks+' WHERE arctile_id='+id+';'
 			query(sql,function(qerr,vals,fields){
 				if(qerr){	
					res.send({code:0,errmsg:qerr})
					}else{
					res.send({code:1,msg:'点击成功'})
				 }
 			})
 		}
 		catch(err){
 			res.send(err)
 		}
 })
 router.post('/api/actrie',(req,res,next)=>{  
      try{
    	var parms=req.body 	         
      	if (parms.titles==undefined||parms.titles=='')  throw '标题不能为空'
        if (parms.contents==undefined||parms.contents=='')  throw '内容不能为空'	
        if (parms.classid==undefined||parms.classid=='')  throw '分类必选'	
        var classid= parms.classid.split(',')
 		let dates=Date.parse(new Date());
 		var uuids="'"+uuid.v1().replace(/\-/g,'')+"'";	 	
 		sql="INSERT INTO arctile (arctile_id,title,content,author,time,contentjj,tags,class) VALUES ("+uuids+','+mysql.escape(String(parms.titles))+','+mysql.escape(String(parms.contents))+','+mysql.escape(parms.author)+','+dates+','+mysql.escape(parms.contentjj)+','+mysql.escape(parms.tag)+','+mysql.escape(parms.class)+");"
        query(sql, function (qerr,vals,fields) {if(qerr) throw '文章写入失败'})    	
 		classid.forEach((item,index)=>{	
			sqls='INSERT INTO arc_class(classid,arcid) VALUES ('+mysql.escape(item)+','+uuids+')'
			query(sqls,(qerr,vals,fields)=>{if(qerr) throw '分类写入失败';})																
		})		
		if(parms.tag){
			let tag=[...new Set(parms.tag.split(','))]
			tag.forEach((item,index)=>{	
				//查重
				cx='select * from tag where tag_name='+mysql.escape(item)+';'
				query(cx,(qerr,vals,fields)=>{
					if (qerr) throw '标签重复'
					if(vals.length==0){	
						// 不重复插库
						tagsql='INSERT INTO tag(tag_name) VALUES ('+mysql.escape(item)+');'
		     			query(tagsql,(qerr,vals,fields)=>{
		     				if(qerr) throw '标签写入失败';
		     				selest='select tagid from tag where tag_name='+mysql.escape(item)+';'	
							query(selest,(qerr,vals,fields)=>{
								if(qerr) throw '标签查询失败'			
								table='INSERT INTO arc_tag(tagid,arcid) VALUES('+vals[0].tagid+','+uuids+');'
								query(table,(qerr,vals,fields)=>{if(qerr) throw '标签中间写入失败'})
							  				
							})
		     			})				    
					}else{
							// 重复与不重复都需要写入中间表因为标签表id为只增需要查一遍库
						selest='select tagid from tag where tag_name='+mysql.escape(item)+';'	
						query(selest,(qerr,vals,fields)=>{
							if(qerr) throw '标签查询失败'			
							table='INSERT INTO arc_tag(tagid,arcid) VALUES('+vals[0].tagid+','+uuids+');'
							query(table,(qerr,vals,fields)=>{if(qerr) throw '标签中间写入失败'})
						  				
						})
					}						
				})	
			
			})
			
			classa1='UPDATE class SET class_num=(SELECT COUNT(1) AS count FROM arc_class WHERE classid=1) WHERE class_id=1;UPDATE class SET class_num=(SELECT COUNT(1) AS count FROM arc_class WHERE classid=2) WHERE class_id=2;UPDATE class SET class_num=(SELECT COUNT(1) AS count FROM arc_class WHERE classid=3) WHERE class_id=3;UPDATE class SET class_num=(SELECT COUNT(1) AS count FROM arc_class WHERE classid=4) WHERE class_id=4;UPDATE class SET class_num=(SELECT COUNT(1) AS count FROM arc_class WHERE classid=5) WHERE class_id=5;'
			query(classa1,(qerr,vals,fields)=>{if(qerr) throw '更新分类表失败'})		
			update='UPDATE users SET article_num=(SELECT class_num FROM class WHERE class_id=1) WHERE user_id=1;UPDATE users SET tag_num=(SELECT COUNT(1) FROM tag ) WHERE user_id=1;'
			query(update,(qerr,vals,fields)=>{if(qerr) throw '更新用户数据表失败'})
			res.send({code:0,msg:'true'})
		}								
            
      }
  catch(err){
  
  	res.send(err)
  }
 
 })
 
router.post("/saveimg",function (req,res) {
	
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join("public/images/booktitle");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    //处理图片
     form.parse(req, function (err, fields, files){ 	
        var filename = files.file.name
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        var date = new Date();
        var time = '_' + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        var avatarName = name + time + '.' + type;
        var newPath = form.uploadDir + "/" + avatarName;
        fs.renameSync(files.file.path, newPath);  //重命名
        res.send({
        		"code": 0, //0表示成功，其它失败
                "msg": "", //提示信息 //一般上传失败后返回
                "data": {
               "src": "https://www.ltcweb.top/images/booktitle/"+avatarName,
               "title": avatarName //可选
  				}			
        	})
    })
    
});

// find
router.get('/api/find',(req,res,next)=>{
	try{


	var parms=req.query;
	var find= mysql.escape(String(parms.finds))
	

	sql= 'select  * from arctile where LOCATE('+find+',arctile.title) >0 OR  LOCATE('+find+',arctile.content) >0;SELECT * FROM arctile WHERE LOCATE('+find+',arctile.author) > 0 OR LOCATE('+find+',arctile.contentjj)>0;'
	query(sql,(qerr,vals,fields)=>{
		if(qerr) throw '搜索失败'
		let arr=[]
		arr.push(...vals[0])
		arr.push(...vals[1])
		res.send({code:1,data:arr})
	})
}
catch(err){
	res.send(err)
}

})
// time line

router.get('/api/time',(req,res)=>{
	var parms=req.query
	try{
			if(parms.time){
				vals={code:1,data:[{year:2019,data:['2-1 服务器购买','3-14 啥都没干','4-9 前台第一版(垃圾的一批)','5-10 Node后台搭建完成','6-1 前台第二版(确实辣鸡)','7-1 后台重构','我要是有技术怎么还能这样！','待续...']}]}
				res.send(vals)
			}
	}
	catch(err){
		res.send(err)
	}
})





module.exports = router;
