const http = require('http');
const PORT = 3000;

const request = require('request')
request('https://www.reddit.com/r/programming.json', function (
  error,
  response,
  body
) {
  console.error('error:', error)
  console.log('body:', body)
})

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World....................');
  });

server.listen(PORT, () => {
  console.log(`Server running at PORT:${PORT}/`);
});