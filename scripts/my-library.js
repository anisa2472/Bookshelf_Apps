/*               Import               */
import { errorNotification, successNotification } from "./notification.js";
import { getBooks, refreshBookself, loadBook, searchBooks, searchBookById, deleteBook, editBook } from "./functions.js";

/*             Variables             */
const bookshelfs = document.querySelectorAll('.container-left--menu__bookshelf');
const search = document.getElementById('searchBook');
const searchKeyword = document.getElementById('keyword');
const deleteSearchKeyword = document.getElementById('deleteKeyword');
let bookshelfSelected = 'All';

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const books = getBooks();
    loadBook(books, 'All');

    bookshelfs.forEach((bookshelf) => {
        bookshelf.addEventListener('click', () => {
            refreshBookself();
            bookshelfs.forEach((bs) => {
                bs.classList.remove('selected');
            })
            bookshelf.classList.add('selected');
            bookshelfSelected = bookshelf.innerHTML;
            loadBook(books, bookshelf.innerHTML);
        });
    });

    // Open book modal
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('books_card--more')) {
            const modalBook = document.getElementById('containerModal');
            const bookId = e.target.id;

            modalBook.style.display = "block";
            const book = searchBookById(bookId);

            const coverDisplay = document.getElementById('modalBookCover');
            if (book.cover.substring(book.cover.length - 3) === 'jpg' ||
                book.cover.substring(book.cover.length - 3) === 'png' ||
                book.cover.substring(book.cover.length - 3) === 'gif') {
                coverDisplay.src = book.cover;
            } else {
                coverDisplay.src = 'images/cover_default.png';
            }

            const title = document.getElementById('title');
            title.value = book.title;

            const author = document.getElementById('author');
            author.value = book.author;

            const year = document.getElementById('year');
            year.value = book.year;

            const cover = document.getElementById('cover');
            cover.value = book.cover;

            const bookshelf = document.getElementById('selectedLabel');
            bookshelf.innerHTML = book.bookshelf;

            //delete book
            const deleteBtn = document.getElementById('delete');
            deleteBtn.addEventListener('click', () => {
                deleteBook(bookId);
            });

            //edit book
            const editBtn = document.getElementById('edit');
            const saveBtn = document.getElementById('save');
            const bookshelfInput = document.querySelector('.input-select--selected');
            editBtn.addEventListener('click', () => {
                deleteBtn.style.display = 'none';
                editBtn.style.display = 'none';
                saveBtn.style.display = 'block';

                title.readOnly = false;
                author.readOnly = false;
                year.readOnly = false;
                cover.readOnly = false;
                bookshelfInput.classList.remove('read-only');
            });

            // save book
            saveBtn.addEventListener('click', () => {
                
                e.preventDefault();
                const book = {
                    id: parseInt(bookId),
                    title: title.value,
                    author: author.value,
                    year: year.value,
                    cover: cover.value,
                    bookshelf: bookshelf.innerHTML
                };
                editBook(book);
                modalBook.style.display = 'none';
            });

            // close modal
            const cancelBtn = document.getElementById('cancel');
            cancelBtn.addEventListener('click', () => {
                modalBook.style.display = "none";
                deleteBtn.style.display = 'block';
                editBtn.style.display = 'block';
                saveBtn.style.display = 'none';

                title.readOnly = true;
                author.readOnly = true;
                year.readOnly = true;
                cover.readOnly = true;
                bookshelfInput.classList.add('read-only');

                const selectBox = document.querySelector('.input-select--options');
                const dropdownIcon = document.getElementById('selectedIcon');
                selectBox.classList.remove('active');
                dropdownIcon.style.transform = "rotate(180deg)";
            });
        }
    })
});

searchKeyword.addEventListener('input', () => {
    deleteSearchKeyword.style.display = 'block';
});

deleteSearchKeyword.addEventListener('click', () => {
    searchKeyword.value = '';
    deleteSearchKeyword.style.display = 'none';
});

search.addEventListener('submit', (e) => {
    e.preventDefault();

    const keyword = document.getElementById('keyword').value;
    const category = document.querySelector('input[name="category"]:checked').value;

    refreshBookself();
    searchBooks(keyword, category, bookshelfSelected);
});