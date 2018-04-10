// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

// Add book to list 
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = 
  `<td>${book.title}</td>
   <td>${book.author}</td>
   <td>${book.isbn}</td>
   <td><a href="#" class="delete">X</a></td>
   `;
  
  list.appendChild(row);

};

// Show alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#book-form');
  // Inster Alert
  container.insertBefore(div, form);

  // Timeout after 3 sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
    return true;
  }
  // Delete book from local storage
  let books,
      isbn;
  
  isbn = target.parentElement.previousElementSibling.textContent;
  
  if(localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  books.forEach(function(book, index) {
    if(book.isbn === isbn) {
      books.splice(index, 1);
    }
  });
  localStorage.setItem('books', JSON.stringify(books));
}

// Clear Fields
UI.prototype.clearFields = function()  {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// DOM load event
document.addEventListener('DOMContentLoaded', function() {
  // Load books from local storage
  let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }

      books.forEach(function(book) {
        const ui = new UI;
        
        ui.addBookToList(book);
      });
});


// Event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  // Instantiate book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error')
  } else {
      // Add book to list 
      ui.addBookToList(book);

      // Add book to local storage
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }

      books.push(book);

      localStorage.setItem('books', JSON.stringify(books));
    

      // Show success
      ui.showAlert('Book Added', 'success');

      // Clear Fields
      ui.clearFields();
      
  }


  e.preventDefault();
});



// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {

  // Instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);

  // Show message
  if(ui.deleteBook(e.target)) {
    ui.showAlert('Book removed', 'success');
  }
  e.preventDefault();
})