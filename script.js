const createBtn = document.querySelector(".create");
const popup = document.querySelector(".pop-up");
const authorInput = document.querySelector(".author");
const titleInput = document.querySelector(".title");
const pagesInput = document.querySelector(".pages");
const addBtn = document.querySelector(".btn");
const container = document.querySelector(".container");

let book;
let myLibrary = [];
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
createBtn.addEventListener("click", () => {
  if (popup.style.display === "block") {
    popup.style.display = "none";
  } else {
    popup.style.display = "block";
  }
});

addBtn.addEventListener("click", addBookToLibrary);

function addBookToLibrary() {
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pagesInput.value;
  let read = btnRead.className;
  book = new Book(title, author, pages, read);
  myLibrary.push(book);
  pushLocalStorage();
  render();
  popup.style.display = "none";
}
//renderlayarak dublicate olmasi engellenecek
function render() {
  const container = document.querySelector(".container");
  const books = document.querySelectorAll(".book");
  books.forEach((book) => container.removeChild(book));
  for (let i = 0; i < myLibrary.length; i++) {
    displayBooks(myLibrary[i]);
  }
}

function displayBooks(book) {
  const container = document.querySelector(".container");
  const bookCard = document.createElement("div");
  const bookTitle = document.createElement("div");
  const bookAuthor = document.createElement("div");
  const bookPages = document.createElement("div");
  const readBtn = document.createElement("button");
  const delBtn = document.createElement("button");

  bookCard.classList.add("book");
  bookCard.setAttribute("id", myLibrary.indexOf(book));
  if (book.read === "yes") {
    readBtn.textContent = "Read";
    readBtn.classList.add("yes");
  } else {
    readBtn.textContent = "Not read";
    readBtn.classList.add("no");
  }
  bookTitle.textContent = book.title;
  bookAuthor.textContent = book.author;
  bookPages.textContent = book.pages;
  delBtn.textContent = "Delete";
  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(delBtn);
  container.appendChild(bookCard);

  readBtn.addEventListener("click", function () {
    if (readBtn.className == "yes") {
      readBtn.className = "no";
      book.read = "no";
    } else {
      readBtn.className = "yes";
      book.read = "yes";
    }
    pushLocalStorage();
    render();
  });
  delBtn.addEventListener("click", function () {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    pushLocalStorage();
    render();
  });
}

btnRead.addEventListener("click", function () {
  const btnRead = document.querySelector("#btnRead");
  if (btnRead.className == "yes") {
    btnRead.className = "no";
    btnRead.value = "Not read";
  } else {
    btnRead.className = "yes";
    btnRead.value = "Read";
  }
});

function pushLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function pullLocalStorage() {
  if (!localStorage.myLibrary) {
    render();
  } else {
    let library = localStorage.getItem("myLibrary");
    library = JSON.parse(library);
    myLibrary = library;
    render();
  }
}
pullLocalStorage();
