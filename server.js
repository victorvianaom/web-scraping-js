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
        console.log($('body'))
        //return response
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