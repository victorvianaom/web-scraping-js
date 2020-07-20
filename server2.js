const http = require('http')
const PORT = 3000

// this way of working with axios is the recomended, because the promise way is still in level three of formal acceptance
const axios = require('axios')    
async function getQuestions() {
    var errorArray = []
    for (var i = 11; i <= 30; i++) {
        try {
            const response = await axios.get(
                `http://professor.bio.br/quimica/lista.all.asp?curpage=`+i.toString()
            )
            const cheerio = require('cheerio')
            const $ = cheerio.load(response.data)
            
            ROOT_SELECTOR_QUIMICA = "body > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(8) > td > table > tbody > "

            for (var n = 1; n <= 15; n++) {
                selectorQuestion = ROOT_SELECTOR_QUIMICA + `tr:nth-child(${n + 1}) > `

                vestibular = $(selectorQuestion + "td:nth-child(1) > font:nth-child(1) > a").text()
                questaoDe = $(selectorQuestion + "td:nth-child(1) > font:nth-child(1)").text()
                subGrupo = $(selectorQuestion + "td:nth-child(1) > font:nth-child(3)").text()
                enunciadoEResposta = $(selectorQuestion + "td:nth-child(2) > font").text()

                /// filtering with regular expressions
                classificada = questaoDe.match(/o classificada/) == null ? 1 : 0
                questaoDe = questaoDe.match(/quest(.*)es de(.*)/)[2]
                subGrupo = subGrupo.match(/sub-grupo:(.*)/)[1]
                temSubGrupo = subGrupo.length == 0 ? 0 : 1
                enunciado = enunciadoEResposta.substring(9+enunciadoEResposta.indexOf("pergunta:"),enunciadoEResposta.lastIndexOf("resposta:")).trim()
                resposta = enunciadoEResposta.substring(enunciadoEResposta.lastIndexOf("resposta:")+9).trim()

                // console.log("classificada: " + classificada)
                // console.log("tem sub grupo: " + temSubGrupo)
                // console.log("vestibular: " + vestibular)
                // console.log("questao de: " + questaoDe)
                // console.log("sub grupo: " + subGrupo)
                // console.log("enunciado: " + enunciado)
                // console.log("resposta: " + resposta)
                // console.log("enunciado e resposta: " + enunciadoEResposta)
                // console.log("--------------------------")
                console.log('peguei: ', i)
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