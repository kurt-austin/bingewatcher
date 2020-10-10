// Creating our tv_show model
module.exports = function(sequelize, DataTypes) {
    const Tv_show = sequelize.define(
      "Tv_show",
      {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            defaultValue: "",
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        runtime: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false
        },
        numOfEpisodes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false
        },
        timeBudgeted: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
            allowNull: false,
            validate: {
                min: 0,
                max: 168
            }
        },
        timeLogged: {
            type: DataTypes.FLOAT,
            defaultValue: 0.0,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        tvShowID: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        }
      }
    );
  
    Tv_show.associate = function(models) {
        Tv_show.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        onDelete: "cascade"
      });
    };
  
    return Tv_show;
  };