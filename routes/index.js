const Router = require('koa-router')
const nlpController = require('../controllers/index')
const router = new Router()

router.get('/a',async (ctx)=>{
  ctx.body = 111111
})
router.post('/tag', nlpController.tag)
router.post('/ner', nlpController.ner)
router.post('/keywords', nlpController.keywords)
router.post('/sentiment/:id', nlpController.sentiment)
router.post('/depparser', nlpController.depparser)
router.post('/classify', nlpController.classify)
router.post('/suggest', nlpController.suggest)
router.post('/summary',nlpController.summary)

module.exports = router