const Sequelize = require("sequelize")
const sequelize = new Sequelize('questoes', 'root', 'MyDB#627#363', {
    host: "localhost",
    dialect: "mysql"
}) //banco, usuario, senha, objeto-json

sequelize.authenticate().then(function() {
    console.log("Deu pa conectar, irruuu")
}).catch(function(error) {
    console.log("Deu pa conectar nao:", error)
})

const Postagens = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING
    },
    texto: {
        type: Sequelize.TEXT
    },
    teste: {
        type: Sequelize.STRING
    }
}, {freezeTableName: true})

//Postagens.sync({force: true})

Postagens.create({
    titulo: "Hoje em dia",
    texto: "num sei que de num sei que la, paranaue parana, tupanagua tipamigueta, guaratingueta",
    teste: 1
})