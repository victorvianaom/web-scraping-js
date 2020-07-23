const Sequelize = require("sequelize")
const sequelize = new Sequelize('questoes', 'root', 'MyDB#627#363', {
    host: "localhost",
    dialect: "mysql"
})


tabelasArray = ["quimica2", "fisica2", "matematica2", "historia2", "portugues2", "ingles", "biologia", "geografia"]

sequelize.authenticate().then(function() {
    console.log("Deu pa conectar, irruuu")

    const Tabela = sequelize.define('portugues2', {
        id_questao: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        pagina: {
            type: Sequelize.INTEGER
        },
        ano: {
            type: Sequelize.STRING
        },
        tipo: {
            type: Sequelize.STRING
        },
        vestibular: {
            type: Sequelize.STRING
        },
        assunto: {
            type: Sequelize.STRING
        },
        subAssunto: {
            type: Sequelize.STRING
        },
        enunciado: {
            type: Sequelize.TEXT
        },
        enunciadoCorrigido: {
            type: Sequelize.TEXT
        },
        alternativas: {
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
        temSubAssunto: {
            type: Sequelize.INTEGER
        },
    },
    {
        freezeTableName: true // Model tableName will be the same as the model name
    })

    const tabela = await Tabela.findAll({
        attributes: ['imagens']
    })
    console.log(tabela.every(user => user instanceof User)) // true
    console.log("All users:", JSON.stringify(tabela, null, 2))

}).catch(function(error) {
    console.log("Deu pa conectar nao:", error)
})
