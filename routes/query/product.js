'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var roland_img_query = async function(roland_product){
    var result=[];
	
    await sql('SELECT * FROM roland_p_img WHERE roland_pid=$1 ORDER BY roland_pid asc , img_id asc', [roland_product])
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}
var promodel_p_query = async function(promodel_product){
    var result=[];
	
    await sql('SELECT * FROM promodel_product as a, promodel_p_img as b WHERE a.promodel_pid=b.promodel_pid and a.promodel_pid=$1 ORDER BY a.promodel_pid asc , b.img_id asc', [promodel_product])
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}
var robot_class_all_query = async function(){
    var result=[];
	
    await sql('SELECT * FROM mrobot_class as a, mrobot_group as b WHERE a.mrobot_cid=b.mrobot_cid ORDER BY a.mrobot_cid asc, b.mrobot_gid asc')
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}
var robot_class_query = async function(robot_class){
    var result=[];
	
    await sql('SELECT * FROM mrobot_class as a, mrobot_group as b, mrobot_product as c WHERE a.mrobot_cid=b.mrobot_cid and b.mrobot_gid=c.mrobot_gid and a.mrobot_cid = $1 ORDER BY b.mrobot_gid asc, c.mrobot_pid', [robot_class])
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}
var robot_p_query = async function(robot_pid){
    var result=[];
	
    await sql('SELECT * FROM mrobot_product as p, m_p_in_title as t, m_p_in_desc as d where p.mrobot_pid=t.mrobot_pid and t.intitle_id=d.intitle_id and p.mrobot_pid=$1 ORDER BY t.intitle_id asc, d.indesc_id asc', [robot_pid])
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            result = null;
        });
		
    return result;
}
//匯出
module.exports = {roland_img_query, promodel_p_query, robot_class_all_query, robot_class_query, robot_p_query};