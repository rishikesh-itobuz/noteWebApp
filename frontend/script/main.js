const mainPage = document.getElementById('main-page');
const newNotePage = document.getElementById('add-notes-page');
const confirmationPage = document.getElementById('confirmation-page');
const alertMessage = document.getElementById('alert-area');
const inputTitle = document.getElementById('input-title');
const inputDiscription = document.getElementById('input-discription');
const messageCheckbox = document.getElementsByClassName('messageCheckbox');
const notesContainer = document.getElementById("notes-container");
const deleteButton = document.getElementsByClassName("delete-button");
const updateButton = document.getElementsByClassName("update-button");
const confirmUpdate = document.getElementById("confirm-update");
const confirmDelete = document.getElementById('confirm-delete');
const crossButton = document.getElementById('cross-button');
const addButton = document.getElementById('add-button');
const newNote = document.getElementsByClassName('new-note');
const dot = document.getElementsByClassName('dot');
const confirmationMessage = document.getElementById('confirmation-message');
const zoomPage = document.getElementById('zoom-view-page');

let noteType;
let ids;
let j;


function updateNote(id,title,discription,i) {
  alertMessage.innerHTML = `<span>Update the Note </span>  `;
  alertMessage.style.color='green';
  newNotePage.classList.remove('hide');
  mainPage.classList.add('hide');
  confirmationPage.classList.add('d-none')
  addButton.classList.add('hide');
  crossButton.classList.remove('hide');
  confirmDelete.classList.add('hide')
  confirmUpdate.classList.remove('hide');
  inputTitle.value = title;
  inputDiscription.value = discription;
  ids=id;
  j=i;
}

async function confirmUpdates() {
  newNotePage.classList.add('hide');
  mainPage.classList.remove('hide');
  addButton.classList.remove('hide');
  confirmUpdate.classList.add('hide');
  confirmationMessage.innerHTML = "Your Notes have been Updated successfully";
  confirmationPage.classList.remove('d-none');
  for(let i = 0; i <messageCheckbox.length; i++) {
    if(messageCheckbox[i].checked) {
        noteType=messageCheckbox[i].value;
    }
}  
  await fetch(`http://localhost:8000/note/${ids}`, {
    method: "PUT",
    body: JSON.stringify({
      type: noteType,
      heading: inputTitle.value,
      discription: inputDiscription.value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  alertMessage.innerHTML = "Create a note";
  alertMessage.style.color = "#f0c808"
  inputTitle.value = "";
  inputDiscription.value = "";
  notesContainer.innerHTML = "";
  fetchAllNotes();
};

function addNewNote() {
    mainPage.classList.add('hide');
    newNotePage.classList.remove('hide')
}


function fetchAllNotes() {
  fetch("http://localhost:8000/note")
  .then((response) => response.json())
  .then((json) => {
    for (let i = 0; i < json.data.length; i++) {
      dateValidator(new Date(json.data[i].date));
     
      notesContainer.innerHTML += 
        ` <div class=" new-note shadow rounded gap-2 d-flex flex-column position-relative p-2 ps-4" style="width:23%">
          <div class="hide">${json.data[i].type}</div>
        <div class=" buttons m-0 pt-2 d-flex justify-content-end ">
            <i class="fa-solid fa-square-pen update-button mx-1" onclick="updateNote('${json.data[i]._id}','${json.data[i].heading}','${json.data[i].discription}','${i}' )"></i>
            <i class="fa-solid fa-trash  delete-button mx-1" onclick="deleteNote('${json.data[i]._id}','${json.data[i].heading}','${json.data[i].discription}','${i}')" ></i>
            <i class="fa-solid fa-maximize full-view  mx-1" onclick="viewFullNode('${json.data[i].type}','${json.data[i].date}','${json.data[i].heading}','${json.data[i].discription}')"></i>
        </div>
        <div class="d-flex">
            <div class="dot p-0 mt-2 me-1 "></div> 
            <h4 class="title p-0 m-0">${json.data[i].heading}</h4>
        </div>
        <p class=" discription overflow-hidden " style="height: 40%;"> ${json.data[i].discription}</p>
        <p class=" date p-0 m-0 ">${dateValue}</p>
     </div>`;
     typeValidator(json.data[i].type, i);
    }
    });
}


function dateValidator(date) {
  const dateNow = new Date();
  let day = dateNow.getDate() - date.getDate();
  if(day<0) {
    day = 30 + dateNow.getDate() -  date.getDate();
  }
  let hour = dateNow.getHours() - date.getHours();
  let min = dateNow.getMinutes() - date.getMinutes();
  if(min < 0) {
    min = 60 + dateNow.getMinutes() - date.getMinutes();
  }
  let second = dateNow.getSeconds() - date.getSeconds() ;
  if(second < 0) {
    second = 60 + dateNow.getMinutes() - date.getMinutes();
  }
  if(day>1) {
    dateValue = day + "days ago"
  }
  else if(min < 1) {
    dateValue = second + " second ago";
  }
  else if(hour < 1) {
    dateValue = min + " min ago";
  }
  else {
    dateValue = hour + " hours ago"
  }

}

function  typeValidator(type, i) {
  if(type === 'Project') {
     dot[i].style.backgroundColor = "#ebe539"; 
  }
  else if(type === 'Business') {
    dot[i].style.backgroundColor = "red";
  }
  else {
    dot[i].style.backgroundColor = "#3ec860";
  }
}

 async function confirmAdd() {
    for(let i = 0; i <messageCheckbox.length; i++) {
        if(messageCheckbox[i].checked) {
            noteType=messageCheckbox[i].value;
        }
    }
    
  
    if ( inputTitle.value.trim() === "" && inputDiscription.value.trim() === "" ) {
        alertMessage.innerHTML = `<span>Invalid Note </span> <i class="fa-solid fa-triangle-exclamation ms-3"></i> `;
        alertMessage.style.color='#8d0801';
        setTimeout(() => {
          alertMessage.innerHTML = "Create a note";
          alertMessage.style.color = "#f0c808"
        },2000)
      } 
      else if (inputTitle.value.trim() === "") {
        alertMessage.innerHTML = `<span>Please provide a valid title </span> <i class="fa-solid fa-triangle-exclamation ms-3"></i> `;
        alertMessage.style.color = '#8d0801';
        setTimeout(()=>{
          alertMessage.innerHTML = "Create a note";
          alertMessage.style.color = "#f0c808"
        },2000)
      }
       else if (inputDiscription.value.trim() === "") {
        alertMessage.innerHTML = `<span>Please add description </span> <i class="fa-solid fa-triangle-exclamation ms-3"></i> `;
        alertMessage.style.color = '#8d0801';
        setTimeout(() => {
          alertMessage.innerHTML = "Create a note";
          alertMessage.style.color = "#f0c808"
        },2000)
      } 
      else {

        await fetch("http://localhost:8000/note", {
          method: "POST",
          body: JSON.stringify({
            
            type:noteType,
            heading: inputTitle.value,
            discription: inputDiscription.value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        notesContainer.innerHTML = "";
        fetchAllNotes();
        inputTitle.value = "";
        confirmationMessage.innerHTML = "Your Notes have been Created successfully";
        inputDiscription.value = "";
        mainPage.classList.add('hide');
        confirmationPage.classList.remove('hide');
        newNotePage.classList.add('hide')
    
      
      }
}

function removeSuccessPage() {
        mainPage.classList.remove('hide');
        confirmationPage.classList.add('hide');
        newNotePage.classList.add('hide')
}

function cancelOperation() {
        inputTitle.innerHTML = "";
        inputDiscription.innerHTML = "";
        mainPage.classList.remove('hide');
        confirmationPage.classList.add('hide');
        newNotePage.classList.add('hide')
}

async function deleteNote(id, title, discription, i) {
 console.log(id)
  mainPage.classList.add('hide');
  newNotePage.classList.remove('hide');
  confirmationPage.classList.add('d-none')
  alertMessage.innerHTML = `<span>Confirm to delete </span>  `;
  alertMessage.style.color ='#8d0801';
  addButton.classList.add('hide');
  crossButton.classList.remove('hide');
  confirmUpdate.classList.add('hide');
  confirmDelete.classList.remove('hide');
  inputTitle.value = title;
  inputDiscription.value = discription;
  ids = id;
  j = i;
}




async function confirmDeletes() {
  newNotePage.classList.add('hide');
  mainPage.classList.remove('hide');
  confirmationPage.classList.remove('d-none');
  confirmationMessage.innerHTML = "Your Notes have been Deleted successfully";
  addButton.classList.remove('hide');
  confirmDelete.classList.add('hide');
  await fetch(`http://localhost:8000/note/${ids}`, {
    method: "DELETE",
  });
  alertMessage.innerHTML = "Create a note";
  alertMessage.style.color = "#f0c808"
  inputTitle.value = "";
  inputDiscription.value = "";
  notesContainer.innerHTML = "";
  fetchAllNotes();

};
function getAllProject() {
  for(let i = 0; i < newNote.length; i++) {
    if (newNote[i].firstElementChild.innerHTML === "Business" || newNote[i].firstElementChild.innerHTML === "Personal") {
      newNote[i].classList.add('d-none');
    }
    else {
      newNote[i].classList.remove('d-none');
    }
  }
}

function getAllBusiness() {
  for(let i = 0; i < newNote.length; i++) {
    if (newNote[i].firstElementChild.innerHTML === "Project" || newNote[i].firstElementChild.innerHTML === "Personal") {
      newNote[i].classList.add('d-none');
    }
    else {
      newNote[i].classList.remove('d-none');
    }
  }
}

function getAllPersonal() {
  for(let i = 0; i < newNote.length; i++) {
    if (newNote[i].firstElementChild.innerHTML === "Project" || newNote[i].firstElementChild.innerHTML === "Business") {
      newNote[i].classList.add('d-none');
    }
    else {
      newNote[i].classList.remove('d-none');
    }
  }
}

function getAllType(){
  for(let i = 0; i < newNote.length; i++) {
    newNote[i].classList.remove('d-none');
  }
}

function viewFullNode(type, date, title, discription) {
  mainPage.classList.add('hide');
  zoomPage.classList.remove('hide');
  notesContainer.classList.add('d-none');
  zoomPage.innerHTML = ` 
    <div class="col-10 offset-2  px-5 ">
        <img src="./imgs/error.webp" alt="cross-button" id="exit-full-screen" onclick="removeViewPage()">
        <h2 class="mt-5 pt-3  view-title ">${title}</h2>
        <p class="mt-5 view-discription">${discription} </p>
        <p class="view-type">Type :- ${type}</p>
        <p class="view-date">Created on :- ${date.slice(0,10)}</p>
    </div>`
}
function removeViewPage() {
  mainPage.classList.remove('hide');
  zoomPage.classList.add('hide');
  notesContainer.classList.remove('d-none');
}


fetchAllNotes();