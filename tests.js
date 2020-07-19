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

// ////////////////////////////////////////////SuperAgent (HTTP Client):
// const superagent = require("superagent")
// const forumURL = "https://www.reddit.com/r/programming.json"
// // callbacks
// superagent
// 	.get(forumURL)
// 	.end((error, response) => {
// 		console.log(response)
// 	})
// // promises
// superagent
// 	.get(forumURL)
// 	.then((response) => {
// 		console.log(response)
// 	})
// 	.catch((error) => {
// 		console.error(error)
// 	})
// // promises with async/await
// async function getForum() {
// 	try {
// 		const response = await superagent.get(forumURL)
// 		console.log(response)
// 	} catch (error) {
// 		console.error(error)
// 	}
// }

////////////////////////////////////////////Axios (HTTP Client): the promise based way...
// const axios = require('axios') ///the axios response is better....
// axios
// 	.get('http://professor.bio.br/quimica/lista.all.asp?curpage=4')
// 	.then((response) => {
// 		console.log(response)
// 	})
// 	.catch((error) => {
// 		console.error(error)
//     });