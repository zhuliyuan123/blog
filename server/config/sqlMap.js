const sqlMap = {
    Article:{
        select:'select * from articles',
        selectList:'select id,title,time,classid,labelid from articles',
        selectTotle:'SELECT COUNT(*) FROM articles',
        del:'DELETE FROM articles',
        add:'insert into articles (classid, title, time, content, labelid) values (?,?,?,?,?)',
        update:'update articles set title= ? ,time= ? ,content= ? ,classid= ?,labelid= ? WHERE id = ?'
    },
    User:{
        select:'select * from users'
    },
    Class:{
        select:'select * from classes',
        add:'insert into classes (classname) values (?)',
        update:'update classes set classname= ? WHERE id = ?',
        del:'DELETE FROM classes',
    },
    Label:{
        select:'select * from labels',
        add:'insert into labels (labelname,classid) values (?,?)',
        update:'update labels set labelname= ? ,classid= ? WHERE id = ?',
        del:'DELETE FROM labels',
    }
}

module.exports = sqlMap