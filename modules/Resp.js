module.exports = (sequelize, DataTypes) => {
  const Responses = sequelize.define('responses', {
    id: {
      type: DataTypes.BIGINT,
      // defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    survey_id: {
      type: DataTypes.UUIDV4,
    },
    tran_id: {
      type: DataTypes.UUIDV4,
    },
    screening_id: {
      type: DataTypes.UUIDV4,
    },
    screening_result: {
      type: DataTypes.JSONB,
    },
    formal_id: {
      type: DataTypes.UUIDV4,
    },
    formal_result: {
      type: DataTypes.JSONB,
    },

    account_id: {
      type: DataTypes.UUIDV4,
    },
    company_id: {
      type: DataTypes.UUIDV4,
    },
    wechat_open_id: {
      type: DataTypes.STRING,
    },
    nick_name: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.INTEGER,
    },
    formal_create_time: {
      type: DataTypes.DATE
    }
  }, {
      timestamps: false
    })

  return Responses
}