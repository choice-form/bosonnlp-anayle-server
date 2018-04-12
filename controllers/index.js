const bosonnlp = require('bosonnlp')
const nlp = new bosonnlp.BosonNLP('vGf-mR-S.24848.34H_c4JpLdsX')

module.exports = {
  async tag(ctx) {
    const { text } = ctx.request.body
    const data = await new Promise((reslov, reject) => {
      nlp.tag(text, data => {
        reslov(data)
      })
    })
    ctx.body = data
  },
  async ner(ctx) {
    const { text } = ctx.request.body
    const data = await new Promise((resolve, reject) => {
      nlp.ner(text, data => {
        resolve(data)
      })
    })
    ctx.body = data
  },
  async extractKeywords(ctx) {
    const { text } = ctx.request.body
    const data = await new Promise((resolve, reject) => {
      nlp.extractKeywords(text, data => {
        resolve(data)
      })
    })
    ctx.body = data
  },
  async sentiment(ctx) {
    const { text } = ctx.request.body
    const data = await new Promise((resolve, reject) => {
      nlp.sentiment(text, data => {
        resolve(data)
      })
    })
    ctx.body = data
  },
  async depparser(ctx) {
    const { text } = ctx.request.body
    const data = await new Promise((resolve, reject) => {
      nlp.depparser(text, data => {
        resolve(data)
      })
    })
    ctx.body = data
  },
  async classify(ctx) {
    const { text } = ctx.request.body
    const data = await new Promise((resolve, reject) => {
      nlp.classify(text, data => {
        resolve(data)
      })
    })
    ctx.body = data
  },
  async suggest(ctx) {
    const { text } = ctx.request.body
    const data = await new Promise((resolve, reject) => {
      nlp.suggest(text, data => {
        resolve(data)
      })
    })
    ctx.body = data
  }
}