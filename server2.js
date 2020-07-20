const http = require('http');
const PORT = 3000;

// this way of working with axios is the recomended, because the above is still in level three of formal acceptance
const axios = require('axios')    
async function getQuestions() {
    try {
        const response = await axios.get(
            'http://professor.bio.br/quimica/lista.all.asp?curpage=614'
        )
        const cheerio = require('cheerio')
        const $ = cheerio.load(response.data)
        
        ROOT_SELECTOR_QUIMICA = "body > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(8) > td > table > tbody > "

        for (var n = 1; n <= 15; n++) {
            selectorQuestion = ROOT_SELECTOR_QUIMICA + `tr:nth-child(${n + 1}) > `

            vestibular = $(selectorQuestion + "td:nth-child(1) > font:nth-child(1) > a").text()
            questaoDe = $(selectorQuestion + "td:nth-child(1) > font:nth-child(1)").text()
            subGrupo = $(selectorQuestion + "td:nth-child(1) > font:nth-child(3)").text()
            perguntaEResposta = $(selectorQuestion + "td:nth-child(2) > font > font").text()

            /// filtering with regular expressions
            //questaoDe = questaoDe.match(/es de(.*)/)[1]
            //subGrupo = subGrupo.match(/sub-grupo:(.*)/)[1]

            console.log("vestibular: " + vestibular)
            console.log("questao de: " + questaoDe)
            console.log("sub grupo: " + subGrupo)
            //console.log("pergunta e resposta: " + perguntaEResposta)
            console.log("--------------------------")
        }

    } catch (error) {
        console.error("deu ruim: ", error)
    }
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