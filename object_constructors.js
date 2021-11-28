class Book{
  constructor(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

  }
  
}
const contain = document.querySelector("#container");
let myLibrary = [];
Book.prototype.info = function() {
     return `${title} by ${author}, ${pages} pages, ${read}`
}

function addBookToLibrary(title, author, pages, read){

  myLibrary.push(new Book(title, author, pages, read))
  addedBook = document.createElement('div')
  removeButton = document.createElement('button')
  removeButton.innerHTML = "Remove"
  contain.appendChild(addedBook)
  addedBook.setAttribute('style',`height: ${(100/3)}%; width: ${(100/4)}%`);
  addedBook.setAttribute('id',`${myLibrary.length-1}div`);
  addedBook.innerHTML = `${myLibrary[myLibrary.length - 1].title}<br>${myLibrary[myLibrary.length - 1].author}<br>${myLibrary[myLibrary.length - 1].pages} Pages<br>${myLibrary[myLibrary.length - 1].read}`
  addedBook.classList.add('bookEntry')
  addedBook.appendChild(removeButton)
  removeButton.setAttribute('id',`${myLibrary.length-1}`);
  removeButton.classList.add('removeButtons')
  removeButton.addEventListener('click', e => {
      removeBookFromLibrary(e.target.id)
   })
  if (myLibrary[myLibrary.length - 1].read !== "Read"){
    readButton = document.createElement('button')
    readButton.innerHTML = "Read"
    addedBook.appendChild(readButton)
    readButton.setAttribute('id',`${myLibrary.length-1}read`);
    readButton.classList.add('readButtons')
    readButton.addEventListener('click', e => {
        updateRead(e.target.id)
     })
  }
}

function removeBookFromLibrary(bookID){
  console.log(`removing book from library w ID: ${bookID}`)
  toRemoveDiv = document.getElementById(`${bookID}div`)
  if(toRemoveDiv === null){
    return
  }
  console.log(`to remove div: ${toRemoveDiv.id}`)
  bookID = parseInt(bookID)
  myLibrary.splice(`${bookID}`, 1)
  contain.removeChild(toRemoveDiv)
  bookID+=1
  for(bookID; bookID<(myLibrary.length+1); bookID++){
    changeID = document.getElementById(`${bookID}div`)
    changeID.setAttribute('id',`${bookID-1}div`);
    changeID = document.getElementById(`${bookID}`)
    changeID.setAttribute('id',`${bookID-1}`);
  }
}

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".bookButton");
const closeButton = document.querySelector(".close-button");

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

const form = document.getElementById("addBookForm")
form.addEventListener("submit", e =>{
  if (form.elements['author'].value === "" || form.elements['title'].value === "" || form.elements['pages'].value === ""){
    event.preventDefault()
    alert("please enter additional info")
    return
  }

  addBookToLibrary(form.elements['title'].value,form.elements['author'].value,form.elements['pages'].value,form.elements['readstatus'].value)
  form.elements['title'].value = ""
  form.elements['author'].value = ""
  form.elements['pages'].value = ""
  toggleModal()
})

function updateRead(readButtonID){
  console.log("updating read")
  id = parseInt(readButtonID.charAt(0))
  myLibrary[id].read = "Read"
  addedBook = document.getElementById(`${id}div`)
  addedBook.innerHTML = `${myLibrary[id].title}<br>${myLibrary[id].author}<br>${myLibrary[id].pages} Pages<br>${myLibrary[id].read}`
  removeButton = document.createElement('button')
  removeButton.innerHTML = "Remove"
  addedBook.appendChild(removeButton)
  removeButton.setAttribute('id',`${id}`);
  removeButton.classList.add('removeButtons')
  removeButton.addEventListener('click', e => {
      removeBookFromLibrary(e.target.id)
   })


}

addBookToLibrary("re","rare",444,"Not Read")
addBookToLibrary("rfere","rare",444,"Not Read")
addBookToLibrary("afdsre","rare",444,"Read")
addBookToLibrary("rrfafddde","rare",444,"Read")








