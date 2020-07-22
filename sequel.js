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
    ano: {
        type: Sequelize.INTEGER
    },
    tipo: {
        type: Sequelize.STRING
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
    imagens: {
        type: Sequelize.TEXT
    },
    nImagens: {
        type: Sequelize.INTEGER
    },
    classificada: {
        type: Sequelize.INTEGER
    },
    temSubGrupo: {
        type: Sequelize.INTEGER
    },
},
{
    freezeTableName: true // Model tableName will be the same as the model name
})

////syncronize o meu sequilize model com o MySQL
///////////Quimica.sync({/*force: true*/}) // force: true will drop the table if it already exists