const bookForm = document.getElementById("book-form");
const bookNameInput = document.getElementById("book-name");
const issuedToInput = document.getElementById("issued-to");
const issueBookBtn = document.getElementById("issue-book-btn");
const issuedBooksTable = document.getElementById("issued-books-table");
const issuedBooksBody = document.getElementById("issued-books-body");

const issuedBooks = [];

function updateTable() {
  issuedBooksBody.innerHTML = "";

  for (let i = 0; i < issuedBooks.length; i++) {
    const book = issuedBooks[i];

    const row = document.createElement("tr");

    const idCol = document.createElement("td");
    idCol.textContent = book.id;
    row.appendChild(idCol);

    const nameCol = document.createElement("td");
    nameCol.textContent = book.bookName;
    row.appendChild(nameCol);

    const issuedToCol = document.createElement("td");
    issuedToCol.textContent = book.issuedTo;
    row.appendChild(issuedToCol);

    const issuedTimeCol = document.createElement("td");
    issuedTimeCol.textContent = book.issuedTime;
    row.appendChild(issuedTimeCol);

    const statusCol = document.createElement("td");
    statusCol.classList.add("status");
    statusCol.textContent = book.status;
    row.appendChild(statusCol);

    const editCol = document.createElement("td");
    const editIcon = document.createElement("i");
    editIcon.classList.add("fas", "fa-edit", "icon");
    editIcon.dataset.id = book.id;
    editCol.appendChild(editIcon);
    row.appendChild(editCol);

    issuedBooksBody.appendChild(row);
  }
}

function issueBook(e) {
  e.preventDefault();

  const bookName = bookNameInput.value;
  const issuedTo = issuedToInput.value;

  const issuedTime =
    new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString(navigator.language, {hour: "2-digit", minute: "2-digit",
    });
  const id = issuedBooks.length + 1;
  const status = "not returned";
  const book = { id, bookName, issuedTo, issuedTime, status };
  issuedBooks.push(book);
  updateTable();
  // bookForm.reset();
}

function editStatus(e) {
  if (e.target.classList.contains("icon")) {
    const id = Number(e.target.dataset.id);
    const book = issuedBooks.find((book) => book.id === id);
    book.status = book.status === "not returned" ? "returned" : "not returned";

    const statusCol = e.target.parentNode.previousSibling;
    statusCol.textContent = book.status;
    statusCol.style.color = book.status === "returned" ? "#9FFF24" : "red";
  }
}

bookForm.addEventListener("submit", issueBook);
issuedBooksTable.addEventListener("click", editStatus);

updateTable();
