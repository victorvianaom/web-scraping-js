const http = require('http');
const PORT = 3000;

////////////////////////////////////////////Request (HTTP Client):
// const request = require('request')
// request('http://professor.bio.br/quimica/lista.all.asp?curpage=4', function (
//   error,
//   response,
//   body
// ) {
//   console.error('error:', error)
//   console.log('body:', body)
// })
////////////////////////////////////////////Axios (HTTP Client):
// const axios = require('axios') ///the axios response is better....
// axios
// 	.get('http://professor.bio.br/quimica/lista.all.asp?curpage=4')
// 	.then((response) => {
// 		console.log(response)
// 	})
// 	.catch((error) => {
// 		console.error(error)
//     });
// this way of working with axios is the recomended, because the above is still in level three of formal acceptance    
async function getQuestions() {
    try {
        const response = await axios.get(
            'http://professor.bio.br/quimica/lista.all.asp?curpage=4'
        )
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
getQuestions()

////////////////////////////////////////////SuperAgent (HTTP Client):
const superagent = require("superagent")
const forumURL = "https://www.reddit.com/r/programming.json"

// callbacks
superagent
	.get(forumURL)
	.end((error, response) => {
		console.log(response)
	})

// promises
superagent
	.get(forumURL)
	.then((response) => {
		console.log(response)
	})
	.catch((error) => {
		console.error(error)
	})

// promises with async/await
async function getForum() {
	try {
		const response = await superagent.get(forumURL)
		console.log(response)
	} catch (error) {
		console.error(error)
	}
}


const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World....................');
  });

server.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}/`);
});