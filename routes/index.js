const Router = require('koa-router')
const nlpController = require('../controllers/index')
const router = new Router()

router.get('/a', async (ctx) => {
  ctx.body = 111111
})
router.post('/tag', nlpController.tag)
router.post('/ner', nlpController.ner)
router.post('/keywords', nlpController.keywords)
router.post('/sentiment/:id', nlpController.sentiment)
router.post('/depparser', nlpController.depparser)
router.post('/classify', nlpController.classify)
router.post('/suggest', nlpController.suggest)
router.post('/summary', nlpController.summary)

router.post('/cluster/push/:pi', nlpController.clusterPush)
router.get('/cluster/start/:id', nlpController.cluster)
router.get('/cluster/status/:id', nlpController.clusterStatus)
router.get('/cluster/result/:id', nlpController.clusterResult)
router.post('/comments/push/:pi', nlpController.commentsPush)
router.get('/comments/start/:id', nlpController.comments)
router.get('/comments/status/:id', nlpController.commentsStatus)
router.get('/comments/result/:id', nlpController.commentsResult)

module.exports = router