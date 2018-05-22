module.exports = (sequelize, DataTypes) => {
  const Output = sequelize.define('outputs', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    response_id: {
      type: DataTypes.UUIDV4
    },

    formal_id: {
      type: DataTypes.UUIDV4
    },

    context: {
      type: DataTypes.STRING
    },

    participle: {
      type: DataTypes.JSONB
    },

    filter: {
      type: DataTypes.JSONB
    }

  }, {
      timestamps: false
    })

  return Output
}