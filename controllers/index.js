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
  }
}