const bcrypt = require("bcryptjs");
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
  
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password,this.password)
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.addHook("beforeCreate", user => {
      user.password = bcrypt.hashSync(
        user.password,
        bcrypt.genSaltSync(10),
        null
      );
    });

    return User;
  };
