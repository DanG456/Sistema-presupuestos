module.exports =(sequelize, type) =>{
    return sequelize.define('usuarios',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: DataTypes.STRING,
        email: {
            type: DataTypes.STRING(50),
            validate: {
                isEmail: true
            },
        },
        password: Datatypes.STRING(150),
    })
}
