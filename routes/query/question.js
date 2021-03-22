'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var questionAdd = async function(name, phone, email, qqq){
    var result=[];
	
    await sql('INSERT INTO question (cus_name, cus_phone, cus_email, question) VALUES ($1, $2, $3,$4) RETURNING q_id;', [name, phone, email, qqq])
        .then((data) => {          
            console.log("2--"+data.rows[0].q_id)  
            result = data.rows[0];  
        }, (error) => {
            result = null;
        });
		
    return result;
}
//匯出
module.exports = {questionAdd};