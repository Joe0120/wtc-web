var express = require('express');
var axios = require('axios');
var router = express.Router();
var question = require('./query/question');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('connect', {});
});

router.post('/', function (req, res, next) {
  //取得使用者傳來的參數
  var name = req.param("name");
  var phone = req.param("phone");
  var email = req.param("email");
  var qqq = req.param("question");

  if (name.length != 0 && phone.length != 0 && email.length != 0 && qqq.length != 0) {
    console.log("11111")
    question.questionAdd(name, phone, email, qqq).then(data => {
      if (data == null) {
        res.render('error');  //導向錯誤頁面
      } else if (data.length > 0) {
        res.render('connect_add_success', {});  //將資料傳給顯示頁面
      } else {
        console.log("1--"+data.q_id)
        res.render('connect_add_success', {});  //將資料傳給顯示頁面
        axios.get('https://wtc888.herokuapp.com/connect_us?qid='+data.q_id)
      }
    })
  } else {
    console.log("00000")
    res.render('connect', {});  //將資料傳給顯示頁面
  }
});
module.exports = router;
