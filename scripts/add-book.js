/*               Import               */
import { errorNotification, successNotification } from "./notification.js";
import { generateID, savedData } from "./functions.js";

/*             Variables             */
const form = document.getElementById('addNewBook');
const REFRESH_EVENT = 'refresh-page';

/*          Event Handlers          */
document.addEventListener(REFRESH_EVENT, () => {
    const title = document.getElementById('title');
    title.value = '';

    const author = document.getElementById('author');
    author.value = '';

    const year = document.getElementById('year');
    year.value = '';

    const cover = document.getElementById('cover');
    cover.value = '';

    const bookshelf = document.getElementById('selectedLabel');
    bookshelf.innerHTML = 'Choose a bookshelf...';
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Check bookshelf input
    // if the user doesn't choose a bookshelf, it will get an error notification
    if (document.getElementById('selectedLabel').innerHTML === "Choose a bookshelf...") {
        errorNotification("Choose a bookshelf first.");
    } else {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = document.getElementById('year').value;
        const cover = document.getElementById('cover').value;
        const bookshelf = document.getElementById('selectedLabel').innerHTML;

        const book = {
            id: generateID(),
            title: title,
            author: author,
            year: year,
            cover: cover,
            bookshelf: bookshelf
        };

        // Save book to localStorage
        // or will get error notification if browser doesn't support
        const saved = savedData(book);
        if (saved) {
            successNotification("The book has been added");
            document.dispatchEvent(new Event(REFRESH_EVENT));
        } else {
            errorNotification("Sorry, your browser doesn't support Web Storage.");
        }
    }
});