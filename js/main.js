document.querySelector('button').addEventListener('click', getFetch)

let books = JSON.parse(localStorage.getItem('books'))

let list = document.getElementById('bookList')
books.forEach((book) =>{
    let li = document.createElement("li")
    li.innerText = book
    list.appendChild(li)
})
// document.querySelector('span').innerText = localStorage.getItem('books')

function getFetch(){
  const choice = document.querySelector('input').value
  const url = `https://openlibrary.org/isbn/${choice}.json`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        console.log(data.title)
        let title = data.title
        let prevBooks = []
		    document.querySelector('h2').innerText = title
        prevBooks.unshift(title)
        
        // if local storage is empty, put in the new book; else concatenate the next book
        if(!localStorage.getItem('books')){
          localStorage.setItem('books', JSON.stringify(prevBooks))
          list.appendChild(document.createElement('li')).innerText = title
        }else{
          books.unshift(title)
          localStorage.setItem('books', JSON.stringify(books))
          console.log(books)
          list.insertBefore(document.createElement('li'), list.firstChild).innerText = title
        }
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
	
	const url2 = `https://covers.openlibrary.org/b/isbn/${choice}.json`

  fetch(url2)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
		    document.querySelector('img').src = data.source_url
		    console.log(data.source_url)
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

	}

