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

// creating models, each model corresponds to a table...
const Quimica = sequelize.define('quimica', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    vestibular: {
        type: Sequelize.STRING
    },
    questaoDe: {
        type: Sequelize.STRING
    },
    subGrupo: {
        type: Sequelize.STRING
    },
    enunciado: {
        type: Sequelize.TEXT
    },
    resposta: {
        type: Sequelize.TEXT
    },
    img: {
        type: Sequelize.STRING
    },
    classificada: {
        type: Sequelize.INTEGER
    },
    temSubGrupo: {
        type: Sequelize.INTEGER
    },
})

////syncronize o meu sequilize model com o MySQL
Quimica.sync({force: true}) // force: true will drop the table if it already exists