const router = require('koa-router')()
const user = require('../controller/user')
const article = require('../controller/articles')
const classes = require('../controller/class')
const labels = require('../controller/label')

router.prefix('/api')
router.post('/login',user.login)
router.get('/getArticleList',article.getArticlesList)
router.get('/getArticle',article.getArticle)
router.post('/addArticle',article.addArticle)
router.post('/delArticle',article.delArticle)
router.post('/updateArticle',article.updateArticle)
router.get('/getClassList',classes.getClassList)
router.post('/addClass',classes.addClass)
router.post('/delClass',classes.delClass)
router.post('/updateClass',classes.updateClass)
router.get('/getLabelList',labels.getLabelList)
router.post('/addLabel',labels.addLabel)
router.post('/delLabel',labels.delLabel)
router.post('/updateLabel',labels.updateLabel)



module.exports = router
