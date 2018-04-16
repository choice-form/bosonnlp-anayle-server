const fetch = require('isomorphic-fetch')

class BosonNLP {
  constructor(token) {
    this.apiToken = token
    this.baseUrl = 'http://api.bosonnlp.com'
  }
  async post(url, body) {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Token': this.apiToken
      },
      method: 'POST',
      body: JSON.stringify(body)
    })
    const json = res.json()
    return json
  }
  /**
   * 命名实体识别
   * 
   * 将识别 时间(time)、地点(location)、人名(person_name)、组织名(org_name)、公司名(company_name)、产品名(production_name)、职位(job_title)
   * 
   * @param {string|array} text 需要处理的文本
   * @param {object} option 参数 { sensitivity: 3 }
   */
  async ner(text, option = { sensitivity: 3 }) {
    const url = `${this.baseUrl}/ner/analysis?sensitivity=${option.sensitivity}`
    const res = await this.post(url, text)
    return res
  }
  /**
   * 分词与词性标注
   * 
   * @param {string|array} text 需要处理的文本
   * @param {object} option 参数 { spaceMode: 0, oovLevel: 3, t2s: 0, specialCharConv: 0 }
   */
  async tag(text, option = { spaceMode: 0, oovLevel: 3, t2s: 0, specialCharConv: 0 }) {
    const options = {
      spaceMode: 0,
      oovLevel: 3,
      t2s: 0,
      specialCharConv: 0
    }
    const opt = Object.assign(options, option)
    const url = `${this.baseUrl}/tag/analysis?space_mode=${opt.spaceMode}&oov_level=${opt.oovLevel}&t2s=${opt.t2s}&special_char_conv=${opt.specialCharConv}`
    const res = await this.post(url, text)
    return res
  }
  /**
   * 
   * @param {string|array} text 需要处理的文本
   * @param {string} option 模型名称 ['general','auto','kitchen','food','news','weibo']
   */
  async sentiment(text, option = '') {
    let url = ''
    if (option === '' || option === 'general') {
      url = `${this.baseUrl}/sentiment/analysis`
    } else {
      url = `${this.baseUrl}/sentiment/analysis?${option}`
    }
    const res = await this.post(url, text)
    return res
  }
  /**
   * 依存文法分析
   * 
   * @param {string|array} text 需要处理的文本
   */
  async depparser(text) {
    let url = `${this.baseUrl}/depparser/analysis`
    const res = await this.post(url, text)
    return res
  }
  /**
   * 关键词提取
   * 
   * @param {string|array} text 需要处理的文本
   * @param {object} option {topK:100}
   */
  async keywords(text, option = { topK: 100 }) {
    const options = {
      topK: 100,
      segmented: false
    }
    const opt = Object.assign(options, option)
    let url = ''
    if (opt.segmented) {
      url = `${this.baseUrl}/keywords/analysis?top_k=${opt.topK}&segmented`
    } else {
      url = `${this.baseUrl}/keywords/analysis?top_k=${opt.topK}`
    }
    const res = await this.post(url, text)
    return res
  }
  /**
   * 新闻分类
   * 
   * @param {string|array} text 需要处理的文本
   */
  async classify(text) {
    const url = `${this.baseUrl}/classify/analysis`
    const res = await this.post(url, text)
    return res
  }
  /**
   * 语义联想
   * 
   * @param {string|array} text 需要处理的文本
   * @param {object} option 参数 { topK: 10 }
   */
  async suggest(text, option = { topK: 10 }) {
    const url = `${this.baseUrl}/suggest/analysis?top_k=${option.topK}`
    const res = await this.post(url, text)
    return res
  }
  /**
   * 新闻摘要
   * 
   * @param {string|array} text 需要处理的文本
   * @param {object} option 参数 { percentage: 0.3 }
   */
  async summary(text, option = { percentage: 0.3 }) {
    const options = {
      percentage: 0.3,
      notExceed: 0
    }
    const opt = Object.assign(options, option)

    const body = {
      'no_exceed': opt.notExceed,
      percentage: opt.percentage,
      title: '',
      content: text
    }
    body.percentage = parseFloat(body.percentage)
    // opt.percentage = parseFloat(opt.percentage)
    const url = `${this.baseUrl}/summary/analysis`
    const res = await this.post(url, body)
    return res
  }
}

module.exports = BosonNLP