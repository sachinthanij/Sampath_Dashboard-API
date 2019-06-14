'user strict';
var sql = require('../db.js');

//Task object constructor
var Task = function(task){
    this.task = task.task;
    this.status = task.status;
    this.created_at = new Date();
};
Task.createTask = function createUser(newTask, result) {
    sql.query("INSERT INTO tasks set ?", newTask, function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Task.getTaskById = function createUser(taskId, result) {
    sql.query("Select task from tasks where id = ? ", taskId, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            result(null, res);

        }
    });
};
Task.getAllTask = function getAllTask(result) {
    sql.query("SELECT COUNT(IF(rating='Excellent',1, NULL)) 'Excellent', COUNT(IF(rating='Very Good',1, NULL)) 'VeryGood', COUNT(IF(rating='Good',1, NULL)) 'Good', COUNT(IF(rating='Satisfactory',1, NULL)) 'Satisfactory', COUNT(IF(rating='Poor',1, NULL)) 'Poor' FROM records;SELECT COUNT(IF(rating='Excellent' and timestamp between curdate() - dayofmonth(curdate()) + 1 and curdate(),1, NULL)) 'Excellent',COUNT(IF(rating='Very Good' and timestamp between curdate() - dayofmonth(curdate()) + 1 and curdate(),1, NULL)) 'VeryGood', COUNT(IF(rating='Good' and timestamp between curdate() - dayofmonth(curdate()) + 1 and curdate(),1, NULL)) 'Good', COUNT(IF(rating='Satisfactory' and timestamp between curdate() - dayofmonth(curdate()) + 1 and curdate(),1, NULL)) 'Satisfactory', COUNT(IF(rating='Poor' and timestamp between curdate() - dayofmonth(curdate()) + 1 and curdate(),1, NULL)) 'Poor' FROM records;  SELECT COUNT(IF(rating='Excellent' and yearweek(DATE(timestamp), 1) = yearweek(curdate(), 1),1, NULL)) 'Excellent',COUNT(IF(rating='Very Good' and yearweek(DATE(timestamp), 1) = yearweek(curdate(), 1),1, NULL)) 'VeryGood', COUNT(IF(rating='Good' and yearweek(DATE(timestamp), 1) = yearweek(curdate(), 1),1, NULL)) 'Good', COUNT(IF(rating='Satisfactory' and yearweek(DATE(timestamp), 1) = yearweek(curdate(), 1),1, NULL)) 'Satisfactory',COUNT(IF(rating='Poor' and yearweek(DATE(timestamp), 1) = yearweek(curdate(), 1),1, NULL)) 'Poor' FROM records", function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            var tot = res[0][0].Excellent+res[0][0].VeryGood+res[0][0].Good+res[0][0].Satisfactory+res[0][0].Poor;
            var exper = Math.floor(((res[0][0].Excellent/tot)*100)* 100) / 100;
            var vgper = Math.floor(((res[0][0].VeryGood/tot)*100)* 100) / 100;
            var gdper = Math.floor(((res[0][0].Good/tot)*100)* 100) / 100;
            var satper = Math.floor(((res[0][0].Satisfactory/tot)*100)* 100) / 100;
            var poper = Math.floor(((res[0][0].Poor/tot)*100)* 100) / 100;

            console.log(res[1][0].Excellent);
            var totmonthly = res[1][0].Excellent+res[1][0].VeryGood+res[1][0].Good+res[1][0].Satisfactory+res[1][0].Poor;
            var expermonthly = Math.floor(((res[1][0].Excellent/totmonthly)*100)* 100) / 100;
            var vgpermonthly = Math.floor(((res[1][0].VeryGood/totmonthly)*100)* 100) / 100;
            var gdpermonthly = Math.floor(((res[1][0].Good/totmonthly)*100)* 100) / 100;
            var satpermonthly = Math.floor(((res[1][0].Satisfactory/totmonthly)*100)* 100) / 100;
            var popermonthly = Math.floor(((res[1][0].Poor/totmonthly)*100)* 100) / 100;


            console.log(res[1][0].Excellent);
            var totweekly = res[2][0].Excellent+res[2][0].VeryGood+res[2][0].Good+res[2][0].Satisfactory+res[2][0].Poor;
            var experweekly = Math.floor(((res[2][0].Excellent/totweekly)*100)* 100) / 100;
            var vgperweekly = Math.floor(((res[2][0].VeryGood/totweekly)*100)* 100) / 100;
            var gdperweekly = Math.floor(((res[2][0].Good/totweekly)*100)* 100) / 100;
            var satperweekly = Math.floor(((res[2][0].Satisfactory/totweekly)*100)* 100) / 100;
            var poperweekly = Math.floor(((res[2][0].Poor/totweekly)*100)* 100) / 100;

            var  array = [];
            array.push(exper);
            array.push(vgper);
            array.push(gdper);
            array.push(satper);
            array.push(poper);

            array.push(expermonthly);
            array.push(vgpermonthly);
            array.push(gdpermonthly);
            array.push(satpermonthly);
            array.push(popermonthly);

            array.push(experweekly);
            array.push(vgperweekly);
            array.push(gdperweekly);
            array.push(satperweekly);
            array.push(poperweekly);
            result(null, array);

        }
    });
};
Task.updateById = function(id, task, result){
    sql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
Task.remove = function(id, result){
    sql.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {

        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{

            result(null, res);
        }
    });
};

module.exports= Task;