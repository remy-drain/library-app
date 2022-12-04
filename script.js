let myLibrary = [];

// constructor function
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// initial books
const houseCeruleanSea = new Book("The House in the Cerulean Sea", "TJ Klune", 398, true);

myLibrary.push(houseCeruleanSea);

const amariNightBrothers = new Book("Amari and the Night Brothers", "B. B. Alston", 408, true);

myLibrary.push(amariNightBrothers);

// display form to add new book
const newBookButton = document.querySelector("#new-book");
newBookButton.addEventListener("click", () => {
    const form = document.querySelector("form");
    form.style.visibility = "visible";
});

// get form data
const submit = document.querySelector("#submit");
submit.addEventListener("click", addBook);

// add to array from form input
function addBook(e) {
const title = document.querySelector("#title").value;
const author = document.querySelector("#author").value;
const pages = document.querySelector("#length").value;
const read = document.querySelector("#read").checked;

e.preventDefault();
let newBook = new Book(title, author, pages, read);
myLibrary.push(newBook);
showBooks();
document.querySelector("form").reset();
document.querySelector("#title").focus();
}

// close form
const close = document.querySelector(".close");
close.addEventListener("click", () => {
    const form = document.querySelector("form");
    form.style.visibility = "hidden";
});

// display library
const viewLibrary = document.querySelector("#view-library");
viewLibrary.addEventListener("click", showBooks);

function showBooks() {
    let bookshelf = document.querySelector("#bookshelf");

    if (bookshelf.hasChildNodes()) {
        bookshelf.innerHTML = "";
    }

    for (let volume of myLibrary) {
        let bookCard = document.createElement('div');
        let bookTitle = document.createElement('p');
        let bookAuthor = document.createElement('p');
        let bookPages = document.createElement('p');
        let bookRead = document.createElement('div');
        let readInput = document.createElement('input');
        let readLabel = document.createElement('label');
        let bookIndex = myLibrary.indexOf(volume);

        bookTitle.textContent = volume.title;
        bookTitle.classList = "book-title"
        bookAuthor.textContent = volume.author;
        bookTitle.classList = "author-name"
        bookPages.textContent = volume.pages;
        readInput.type = 'checkbox';
        readLabel.textContent = "Read"

        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookRead.appendChild(readInput);
        bookRead.appendChild(readLabel);
        bookCard.appendChild(bookRead);


        if (volume.read) {
            readInput.checked = true;
        } else {
            readInput.checked = false;
        }

        bookCard.classList = "book"
        bookCard.dataset.key = bookIndex;
        bookshelf.appendChild(bookCard);
    }
}