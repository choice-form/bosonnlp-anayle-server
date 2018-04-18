const BosonNLP = require('../services/index')
const config = require('../config')

const bosonNlp = new BosonNLP(config.apiToken)

module.exports = {
  async tag(ctx) {
    const { text } = ctx.request.body
    const data = await bosonNlp.tag(text)
    ctx.body = data
  },
  async ner(ctx) {
    const { text } = ctx.request.body
    const { sensitivity } = ctx.query
    const data = await bosonNlp.ner(text, { sensitivity })
    ctx.body = data
  },
  async keywords(ctx) {
    const { text } = ctx.request.body
    const data = await bosonNlp.keywords(text)
    ctx.body = data
  },
  async sentiment(ctx) {
    const { text } = ctx.request.body
    const { id } = ctx.params
    const data = await bosonNlp.sentiment(text, id)
    ctx.body = data
  },
  async depparser(ctx) {
    const { text } = ctx.request.body
    const data = await bosonNlp.depparser(text)
    ctx.body = data
  },
  async classify(ctx) {
    const { text } = ctx.request.body
    const data = await bosonNlp.classify(text)
    ctx.body = data
  },
  async suggest(ctx) {
    const { text } = ctx.request.body
    const data = await bosonNlp.suggest(text)
    ctx.body = data
  },
  async summary(ctx) {
    const { text } = ctx.request.body
    const { percentage } = ctx.query
    const data = await bosonNlp.summary(text, { percentage })
    ctx.body = { 'word': data }
  },
  async clusterPush(ctx) {
    const { pi } = ctx.params
    const { text, id } = ctx.request.body
    const data = await bosonNlp.clusterPush({ text, id }, { 'taskId': pi })
    ctx.body = data
  },
  async cluster(ctx) {
    const { id } = ctx.params
    const { alpha, beta } = ctx.query
    const data = await bosonNlp.cluster(id, { alpha, beta })
    ctx.body = data
  },
  async clusterStatus(ctx) {
    const { id } = ctx.params
    const data = await bosonNlp.clusterStatus(id)
    ctx.body = data
  },
  async clusterResult(ctx) {
    const { id } = ctx.params
    const data = await bosonNlp.clusterResult(id)
    ctx.body = data
  },
  async commentsPush(ctx) {
    const { pi } = ctx.params
    const { text, id } = ctx.request.body
    const data = await bosonNlp.commentsPush({ text, id }, { taskId: pi })
    ctx.body = data
  },
  async comments(ctx) {
    const { id } = ctx.params
    const { alpha, beta } = ctx.query
    const data = await bosonNlp.comments(id, { alpha, beta })
    ctx.body = data
  },
  async commentsStatus(ctx) {
    const { id } = ctx.params
    const data = await bosonNlp.commentsStatus(id)
    ctx.body = data
  },
  async commentsResult(ctx) {
    const { id } = ctx.params
    const data = await bosonNlp.commentsResult(id)
    ctx.body = data
  }
}