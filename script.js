const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []


// to show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// to hide loading 
// to show loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
// show new quote
function newQuote() {
    loading()
    // pick random quote
    setTimeout(() => {
        // pick random quote
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
        // check if author field is blank and replace it with 
        if (!quote.author) {
            authorText.textContent = 'Unknown';
        }
        else {
            // Remove 'type.fit' from the author's name, if present
            const cleanAuthor = quote.author.replace(/type\.fit/i, '').replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '').trim();
            authorText.textContent = cleanAuthor;
        }

        // check code length for styling
        if (quote.text.length > 120) {
            quoteText.classList.add('long-quote')
        }
        else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.textContent = quote.text;
        complete(); // Hide loading spinner once the quote is displayed
    }, 500);
}
//Get Quotes From Api
async function getQuotes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch (error) {
        // Catch Error Here
    }
}

// tweet quote 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// event listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// on load
getQuotes();