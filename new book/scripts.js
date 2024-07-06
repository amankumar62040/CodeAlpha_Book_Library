document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = e.target.getAttribute('data-page');
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById(targetPage).classList.add('active');
        });
    });

    document.getElementById('home').classList.add('active');

    const books = [];
    const history = [];

    document.getElementById('addBook').addEventListener('click', () => {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const category = document.getElementById('category').value;

        if (title && author && category) {
            books.push({ title, author, category, borrowed: false });
            renderBooks();
        }
    });

    document.getElementById('search-input').addEventListener('input', (e) => {
        renderBooks(e.target.value);
    });

    function renderBooks(search = '') {
        const bookList = document.getElementById('book-list');
        const searchResults = document.getElementById('search-results');
        bookList.innerHTML = '';
        searchResults.innerHTML = '';

        books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()))
            .forEach((book, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${book.title} by ${book.author} (${book.category})</span>
                    <button onclick="borrowBook(${index})">${book.borrowed ? 'Return' : 'Borrow'}</button>
                `;
                if (search) {
                    searchResults.appendChild(li);
                } else {
                    bookList.appendChild(li);
                }
            });
    }

    window.borrowBook = function(index) {
        const book = books[index];
        book.borrowed = !book.borrowed;

        if (book.borrowed) {
            history.push(`Borrowed: ${book.title} by ${book.author}`);
        } else {
            history.push(`Returned: ${book.title} by ${book.author}`);
        }

        renderBooks();
        renderHistory();
    };

    function renderHistory() {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';

        history.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            historyList.appendChild(li);
        });
    }

    renderBooks();
    renderHistory();
});
