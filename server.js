const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');

const server = http.createServer(function (req, res) {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if (page == '/') {
        fs.readFile('index.html', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    else if (page == '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
       
        // grab the word, default to '' if missing, trim accidental spaces
        const word = (params.word || '').trim(); 
        
        // res.end is ALWAYS required it finishes the response
        //res.Write is optional

        let message // == the same as let message = '' or undefined

        // vvv originally had this in my main.js
        if (word === '') {
            message = 'Please enter a word';

        } else {
            // deal with case sensativity
            const lower = word.toLowerCase();
            //figure out if its a palindrome
            const reversed = lower.split('').reverse().join('')

            if (lower === reversed) {
                message = 'Its a Palindrome'
            } else {
                message = 'Not a Palindrome'
            }
        }
        res.end(JSON.stringify({ message }));
    }
    else if (page == '/css/style.css') {
        fs.readFile('css/style.css', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write(data);
            res.end();
        });
    } else if (page == '/js/main.js') {
        fs.readFile('js/main.js', function (err, data) {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            res.write(data);
            res.end();
        });
    }
});

server.listen(8000);
// does not have to be 8000 but must be between 1-65535
