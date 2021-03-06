const http = require('http');
const PORT = 3000;

// this way of working with axios is the recomended, because the above is still in level three of formal acceptance
const axios = require('axios')    
async function getQuestions() {
    try {
        const response = await axios.get(
            'http://professor.bio.br/quimica/lista.all.asp?curpage=4'
        )
        //console.log(response)
        const cheerio = require('cheerio')
        const $ = cheerio.load(response.data)
        tbody3 = $('body > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(8) > td > table > tbody')
        tbody3Children = tbody3['0'].children
        tbody3Children.forEach(function(item1/**mudar o nome para trQuestion */, index1) {
            if (item1.name === "tr" && index1/*change to !==0*/ === 2) { //capturando as 15 tr das questoes, eliminando o primeiro tr pq e inutil
                trQuestionChildren = tbody3Children[2].children
                trQuestionChildren.forEach(function(item2, index2) { //capturando as 2 td de cada questao
                    if (item2.name === "td") { // cada questao tem 2 td
                       // cada uma das tds tem que ser tratada de forma diferente... a primeira e a descricao e a segunda a questao em si
                       console.log("td", index2 ,"children", item2.children)
                    }
                })
            }
        })
        //console.log(tbody3['0'].children[2].children)//children da primeira tr que importa
    } catch (error) {
        console.error(error)
    }
}
getQuestions()

// cheerio

// $('h2.title').text('Hello there!')
// $('h2').addClass('welcome')
// $.html()

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World....................');
  });

server.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}/`);
});