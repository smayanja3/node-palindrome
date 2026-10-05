// user types a word and clicks the button
//main.js sends the word to the erver using fetch
//server.js checks if its a palindrome and sends back an answer
//main.js shows the answer in the "h2 result"

const input = document.querySelector('#word')
const result = document.querySelector('#result')

const button = document.querySelector('#check')
button.addEventListener('click', paliChecker)

function paliChecker() {
    const word = input.value
    // now to fetch the data from the server
    // encodeURIComponent = fixes any spaces or random characters the user may add to the url!!!
    fetch(`/api?word=${encodeURIComponent(word)}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            result.textContent = data.message
        })
}
 
 