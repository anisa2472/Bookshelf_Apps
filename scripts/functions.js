/*               Import               */
import { STORAGE_KEY } from "../data/data.js";

function isStorage() {
    return typeof (Storage) !== undefined;
}

function isStorageKey() {
    return localStorage.getItem(STORAGE_KEY) === null;
}

function generateID() {
    return +new Date();
}

function savedData(book) {
    if (isStorage()) {
        const books = getBooks();
        books.push(book);

        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);

        return true;
    } else {
        return false;
    }
}

function savedBooks(books) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
}

function getBooks() {
    let books = [];
    if (isStorage() && isStorageKey()) {
        return books;
    } else {
        books = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return books;
    }
}

function showBook(book) {
    const title = document.createElement('div');
    title.classList.add('books__card--title');
    title.innerHTML = book.title;

    const author = document.createElement('div');
    author.classList.add('books__card--author');
    author.innerHTML = book.author;

    const divImg = document.createElement('div');
    divImg.classList.add('books__card--cover');
    const img = document.createElement('img');
    const cover = book.cover;
    if (cover.substring(cover.length - 3) === 'jpg' ||
        cover.substring(cover.length - 3) === 'png' ||
        cover.substring(cover.length - 3) === 'gif') {
        img.src = cover;
    } else {
        img.src = 'images/cover_default.png';
    }
    img.alt = 'Book Cover';
    divImg.append(img);

    const detailBtn = document.createElement('button');
    detailBtn.classList.add('books_card--more');
    detailBtn.id = book.id;
    detailBtn.innerHTML = 'More';

    const container = document.createElement('div');
    container.classList.add('container-left--books__card');
    container.id = book.id;

    container.append(divImg, title, author, detailBtn);

    return container;
}

function searchBookById(id){
    const books = getBooks();
    let result = []
    for (const book of books) {
        if(book.id === parseInt(id)){
            result = book;
        }
    }
    return result;
}

function loadBook(books, bookshelf) {
    const containerBooks = document.getElementById('containerBooks');
    for (const book of books) {
        if (book.bookshelf === bookshelf) {
            const bookElement = showBook(book);
            containerBooks.append(bookElement);
        } else if (bookshelf === 'All') {
            const bookElement = showBook(book);
            containerBooks.append(bookElement);
        }
    }
}

function searchBooks(keyword, category, bookshelfSelected) {
    const books = getBooks();
    let resultBooks = [];

    if (category === 'title') {
        for (const book of books) {
            if(((book.title).toLowerCase()).includes(keyword.toLowerCase())) {
                resultBooks.push(book);
            }
        }
        loadBook(resultBooks, bookshelfSelected);
    }
    if (category === 'author') {
        for (const book of books) {
            if(((book.author).toLowerCase()).includes(keyword.toLowerCase())) {
                resultBooks.push(book);
            }
        }
        loadBook(resultBooks, bookshelfSelected);
    }
}

function deleteBook(id) {
    const alertMessage = document.getElementById('alert');
    alertMessage.style.display = 'block';

    const cancelBtn = document.getElementById('alertCancel');
    cancelBtn.addEventListener('click', () => {
        alertMessage.style.display = 'none';
    });

    const deleteBtn = document.getElementById('alertDelete');
    deleteBtn.addEventListener('click', () => {
        const books = getBooks();
        const newBooks = books.filter(book => book.id !== parseInt(id));
        savedBooks(newBooks);
        alertMessage.style.display = 'none';
        
        const modalBook = document.getElementById('containerModal');
        modalBook.style.display = 'none';
        location.reload();
    });
}

function editBook(book){
    let books = getBooks();
    const bookId = book.id;
    const indexBook = books.findIndex(item => item.id === parseInt(bookId));

    books[indexBook] = book;
    savedBooks(books);
}

function refreshBookself() {
    const containerBooks = document.getElementById('containerBooks');
    while (containerBooks.firstChild) {
        containerBooks.firstChild.remove();
    }
}

export { generateID, getBooks, savedData, refreshBookself, loadBook, searchBooks, searchBookById, deleteBook, editBook };