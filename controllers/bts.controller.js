const config = require('../config')
const BosonNLP = require('../services/index')
const resService = require('../services/bts.analyze')

const bosonNlp = new BosonNLP(config.apiToken);

module.exports = {
  async analyze(ctx) {
    const { id, ntitle } = ctx.query
    const list = await resService.getContext(id, ntitle)
    const arr = await resService.participle(list)
    const filterArr = await resService.filter(arr);
    const res = await resService.saveToOutput(filterArr);
    ctx.body = res
  },
  async findOne(ctx) {
    const res = await resService.fondOne()
    ctx.body = res;
  },
  async getContext(ctx) {
    const { id, ntitle } = ctx.query
    const res = await resService.getContext(id, ntitle)
    ctx.body = res;
  }
}
