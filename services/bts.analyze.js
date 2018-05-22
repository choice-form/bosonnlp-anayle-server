const db = require('../modules/index')
const sequelize = require('sequelize')
const BosonNLP = require('./index')
const config = require('../config')

const bosonNlp = new BosonNLP(config.apiToken)

module.exports = {
  async fondOne() {
    const obj = await db.responses.findOne();
    return obj.id
  },

  async getContext(id = '', ntitle = '') {
    const str = `{ "NTitle": "${ntitle}" }`

    const sql = `select id as response_id,survey_id,formal_id,payload->>'Context' as context from (select id,survey_id,formal_id,jsonb_array_elements(formal_result) as payload from responses where survey_id = ?) t1 where payload @> ?;`
    const list = await db.sequelize.query(sql, {
      replacements: [id, str],
      type: sequelize.QueryTypes.SELECT
    })

    return list
  },

  async participle(list) {
    const arr = [];
    const len = list.length
    let num = 0
    for (const iterator of list) {
      num++
      const res = await bosonNlp.tag(iterator.context)
      console.log(`Analyze tag by index: ${num} of cont: ${len}`);
      arr.push({
        ...iterator,
        participle: res
      })
    }
    console.log(`Analyze finished`);
    return arr;
  },

  async filter(list) {
    const result = []
    const reg = /^(n|v|a|b|z)/g
    for (const l of list) {
      const { tag, word } = l.participle[0]
      const resTag = []
      const resWord = []
      for (let i = 0; i < tag.length; i++) {
        if (reg.test(tag[i]) && word[i] !== '' && word[i].length > 1) {
          resTag.push(tag[i]);
          resWord.push(word[i]);
        }
      }

      const arr = [{
        tag: resTag,
        word: resWord,
      }];

      result.push({
        ...l,
        filter: arr,
      })
    }
    return result
  },

  async saveToOutput(list) {
    // return db.outputs.upsert(list)
    const arr = []
    for (const row of list) {
      const obj = await db.outputs.findOne({
        where: {
          formal_id: row.formal_id
        }
      })

      if (obj) {
        obj.filter = row.filter;
        const res = await obj.save()
        arr.push({
          id: res.id
        })
      } else {
        const res = await db.outputs.create(row)
        arr.push({
          id: res.id
        })
      }
    }
    return arr;
  },

  // async analyze(list) {
  //   const result = []
  //   const reg = /^(n|v|a|b|z)/g
  //   for (const l of list) {
  //     const { tag, word } = l.participle[0];
  //     const resTag = [];
  //     const resWord = [];
  //     for (let i = 0; i < tag.length; i++) {
  //       if (reg.test(tag[i]) && word[i] !== '' && word[i].length > 1) {
  //         resTag.push(tag[i]);
  //         resWord.push(word[i]);
  //       }
  //     }

  //     const arr = [{
  //       tag: resTag,
  //       word: resWord,
  //     }];

  //     const where = {
  //       formal_id: l.formal_id,
  //     };
  //     const obj = await this.outputRepository.findOne({ where: { ...where } });
  //     if (obj) {
  //       obj.filter = arr;
  //       this.outputRepository.save(obj);
  //     } else {
  //       this.outputRepository.insert({
  //         ...l,
  //         filter: arr,
  //       });
  //     }
  //   }
  // }
}