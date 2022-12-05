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
    document.querySelector("#title").focus();
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
        const bookCard = document.createElement('div');
        const titlePlate = document.createElement('div');
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');
        const bookRead = document.createElement('div');
        const readInput = document.createElement('input');
        const readLabel = document.createElement('label');
        const deleteBtn = document.createElement('img');
        const bookIndex = myLibrary.indexOf(volume);


        let pageCount = volume.pages + " pages";

        bookTitle.textContent = volume.title;
        titlePlate.classList = "book-title"
        bookAuthor.textContent = volume.author;
        bookAuthor.classList = "author-name"
        bookPages.textContent = pageCount;
        bookPages.classList = "page-count"
        readInput.type = 'checkbox';
        readInput.id = bookIndex;
        readLabel.textContent = " Read";
        readLabel.htmlFor = bookIndex;
        bookRead.classList = "read-div";
        deleteBtn.src = "./images/trash.svg";
        deleteBtn.classList = "delete-btn";
        deleteBtn.dataset.key = bookIndex;

        titlePlate.appendChild(bookTitle);
        bookCard.appendChild(titlePlate);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookRead.appendChild(readInput);
        bookRead.appendChild(readLabel);
        bookCard.appendChild(bookRead)
        bookCard.appendChild(deleteBtn);


        if (volume.read) {
            readInput.checked = true;
        } else {
            readInput.checked = false;
        }

        bookCard.classList = "book"
        bookCard.dataset.key = bookIndex;
        bookshelf.appendChild(bookCard);
    }
    const trashIcons = bookshelf.querySelectorAll(".delete-btn");
    const readCheckbox = bookshelf.querySelectorAll(".read-div input");

    trashIcons.forEach((icon) => icon.addEventListener("click", (e) => removeBook(e.path)));

    readCheckbox.forEach((box) => box.addEventListener("change", (e) => changeRead(e.target, e.path[2])));
}

function removeBook(e) {
    // I know there's a better way, but this works for now
    const bookIndex = e[0].attributes["data-key"].nodeValue;
    let selectedBook = myLibrary[bookIndex];

    if (window.confirm(`Are you sure you want to remove ${selectedBook.title}?`)) {
        myLibrary.splice(bookIndex, 1);
    }
    showBooks();
}

function changeRead(e, parent) {
    const bookIndex = parent.attributes["data-key"].value;
    const checked = e.checked;

    myLibrary[bookIndex].read = checked;
}