const http = require('http')
const PORT = 3000

/// DB
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

/// creating the Quimica Table Model
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
    images: {
        type: Sequelize.TEXT
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

// this way of working with axios is the recomended, because the promise way is still in level three of formal acceptance
const axios = require('axios')    
async function getQuestions() {
    var errorArray = []
    for (var i = 611; i <= 611; i++) {
        try {
            const response = await axios.get(
                `http://professor.bio.br/quimica/lista.all.asp?curpage=`+i.toString()
            )
            const cheerio = require('cheerio')
            const $ = cheerio.load(response.data)
            
            ROOT_SELECTOR_QUIMICA = "body > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(8) > td > table > tbody > "

            for (var n = 1; n <= 15; n++) {
                selectorQuestion = ROOT_SELECTOR_QUIMICA + `tr:nth-child(${n + 1}) > `

                id = 100000 + ( 15*(i-1) + n )
                vestibular = $(selectorQuestion + "td:nth-child(1) > font:nth-child(1) > a").text()
                questaoDe = $(selectorQuestion + "td:nth-child(1) > font:nth-child(1)").text()
                subGrupo = $(selectorQuestion + "td:nth-child(1) > font:nth-child(3)").text()
                enunciadoEResposta = $(selectorQuestion + "td:nth-child(2) > font").text()
                images = $(selectorQuestion + "td:nth-child(2) > font > font").children('img').map(function(){
                    return $(this).attr('src')
                }).get().toString()

                /// filtering with regular expressions
                classificada = questaoDe.match(/o classificada/) == null ? 1 : 0
                questaoDe = questaoDe.match(/quest(.*)es de(.*)/)[2]
                subGrupo = subGrupo.match(/sub-grupo:(.*)/)[1]
                temSubGrupo = subGrupo.length == 0 ? 0 : 1
                enunciado = enunciadoEResposta.substring(9+enunciadoEResposta.indexOf("pergunta:"),enunciadoEResposta.lastIndexOf("resposta:")).trim()
                resposta = enunciadoEResposta.substring(enunciadoEResposta.lastIndexOf("resposta:")+9).trim()
                
                // console.log("id: ", id)
                // console.log("vestibular: ", vestibular)
                // console.log("questao de: ", questaoDe)
                // console.log("sub grupo: ", subGrupo)
                // console.log("enunciado: ", enunciado)
                // console.log("resposta: ", resposta)
                // console.log("images: ", images)
                // console.log("classificada: ", classificada)
                // console.log("tem sub grupo: ", temSubGrupo)

                ///---Criando uma nova linha no banco `questoes` na tabela `quimica`
                Quimica.create({
                    id: id,
                    vestibular: vestibular,
                    questaoDe: questaoDe,
                    subGrupo: subGrupo,
                    enunciado: enunciado,
                    resposta: resposta,
                    images: images,
                    classificada: classificada,
                    temSubGrupo: temSubGrupo 
                })




                // console.log("enunciado e resposta: " + enunciadoEResposta)
                // console.log("--------------------------")
                //console.log('peguei: ', i)
            }
        } catch (error) {
            console.error("deu ruim: ", i)
            errorArray.push(i)
        }
    }
    console.log("- errorArray:", errorArray)
}
getQuestions()





const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World....................');
  });

server.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}/`);
});