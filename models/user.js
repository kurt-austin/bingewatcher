module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [8, 30]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 30]
        }
      },
      timeAvailable: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
        allowNull: false,
        validate: {
            min: 0,
            max: 168
        }
      }
    });
  
    User.associate = function(models) {
      User.hasMany(models.Tv_show, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };