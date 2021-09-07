module.exports =(sequelize, type) =>{
    return sequelize.define('usuarios',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: DataTypes.STRING,
        email: type.STRING,
        password:type.STRING(150),
    })
}
