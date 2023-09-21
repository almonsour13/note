function isMobileDevice() {
  const mobileKeywords = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|iOS/i;
  const userAgent = navigator.userAgent;

  if (mobileKeywords.test(userAgent)) {
    document.body.classList.add("mobile");
  } else {
    document.body.classList.remove("mobile");
  }
}

isMobileDevice();
window.addEventListener("resize", isMobileDevice);

function menuButton(element) {
  if (element.classList.contains("active")) {
    element.classList.remove("active");
    document.querySelector('aside').classList.remove("active");
  } else {
    element.classList.add("active");
    document.querySelector('aside').classList.add("active");
  }
}

function closeMenuButton() {
  const aside = document.querySelector('aside');
  if (aside.classList.contains("active")) {
    aside.classList.remove("active");
    document.querySelector('.menu-button').classList.remove("active");
  } else {
    aside.classList.add("active");
    document.querySelector('.menu-button').classList.remove("active")
  }
}

function asideClick(event) {
  const target = event.target;
  if (target.tagName === 'ASIDE') {
    const aside = event.currentTarget;
    if (aside.classList.contains("active")) {
      aside.classList.remove("active");
      document.querySelector('.menu-button').classList.remove("active");
    } else {
      aside.classList.add("active");
      document.querySelector('.menu-button').classList.remove("active")
    }
  }
}

//function to change the active class-----------------------------------------------------------
function changeMenuListActive(activeClass) {
  const menuItems = document.querySelectorAll('.menu-list');
  menuItems.forEach(item => {
    if ("#" + activeClass === item.getAttribute('href')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  const pageTitle = document.querySelector('.logo-container');
  pageTitle.classList.remove("home");
  if (activeClass === "/") {
    pageTitle.textContent = "MemoMagic";
    pageTitle.classList.add("home");
  } else if (activeClass === "/tasks") {
    pageTitle.textContent = "Tasks";
  } else if (activeClass === "/reminder") {
    pageTitle.textContent = "Reminder";
  } else if (activeClass === "/archive") {
    pageTitle.textContent = "Archive";
  } else if (activeClass === "/trash") {
    pageTitle.textContent = "Trash";
  }

}

function handleRoute(route) {
  const contentDiv = document.querySelector('.content-container');

  const pageMapping = {
    '/': notes(),
    '/reminder': reminderNotes(),
    '/archive':archiveNotes(),
    '/trash': trashNotes(),
  };

  if (pageMapping[route]) {
    contentDiv.innerHTML = pageMapping[route];
    changeMenuListActive(route);
  } else {
    contentDiv.innerHTML = '<h1>Page Not Found</h1>';
  }
  document.querySelector('.menu-button').classList.remove("active")
  document.querySelector('aside').classList.remove("active")
}
window.addEventListener('hashchange', function(){
  const route = window.location.hash.slice(1) || '/';
  handleRoute(route)
});
handleRoute("/");

function notes() {
  let pinnedNotes = '';
  let unpinNotes = '';
  if(content()){
    content().forEach(item => {
      if (!item.archive && !item.delete) {
        
        const reminderString = item.reminder;
        const reminderDate = new Date(reminderString);

        const options = {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        };
        console.log
        let formattedReminder = reminderDate.toLocaleDateString('en-US', options);
        const currentDate = new Date();
        if (item.pin) {
          pinnedNotes += `
                <div class="note-card" 
                    style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
                    onclick="clickCard(this)"
                    noteID="${item.id}">
                    ${item.title ? `<div class="note-title">${item.title}</div>` : ''}
                    <div class="note-content">
                        <p>${item.content ? item.content : "Empty Note"}</p>
                    </div>
                    ${item.reminder ?`
                      <div class="note-reminder ${currentDate > reminderDate?`active`:``
                      }">
                        <svg class="menu-svg" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" fill="black"/>
                        </svg>
                        <span>${formattedReminder}</span>
                      </div>`
                      :
                      ""
                    }
                </div>
              `
        } else {     
          unpinNotes += `
              <div class="note-card" 
                  style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
                  onclick="clickCard(this)"
                  noteID="${item.id}">
                  ${item.title ? `<div class="note-title">${item.title}</div>` : ''}
                  <div class="note-content">
                      ${item.content ? `<p>${item.content}</p>` : `<p class="empty-note">Empty Note</p>`}
                  </div>
                  ${item.reminder ?`
                  <div class="note-reminder ${currentDate > reminderDate?`active`:``                       }">
                      <svg class="menu-svg" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                          <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" fill="black"/>
                      </svg>
                      <span>${formattedReminder}</span>
                    </div>`
                    :
                    ""
                  }
              </div>
            `
        }
      }
    });
  }
  return `
          ${pinnedNotes && !unpinNotes || !pinnedNotes && unpinNotes || !pinnedNotes && unpinNotes? (
            (pinnedNotes ? `
              <p class="label">Pinned</p>
              <div class="pin-notes">
                <div class="note-card-container" id="pinNotes">
                  ${pinnedNotes}
                </div>
              </div>`
              : ''
            ) +
            (unpinNotes ? (
              (pinnedNotes ? `<p class="label">Others</p>` : '') +
              `<div class="unpin-notes">
                <div class="note-card-container" id="pinNotes">
                  ${unpinNotes}
                </div>
              </div>`
            ) : "")
          ) : '<div class="no-notes">No note</>'}
          <div class="add-note-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
            </svg>
          </div>
        `;
}
function reminderNotes() {
  let htmlContent = '';
  const notes = content();

  if (notes) {
    // Sort the notes array by reminder date (ascending order)
    notes.sort((a, b) => {
      const reminderDateA = new Date(a.reminder);
      const reminderDateB = new Date(b.reminder);
      return reminderDateA - reminderDateB;
    });

    notes.forEach(item => {
      if (item.reminder && !item.archive && !item.delete) {
        const reminderString = item.reminder;
        const reminderDate = new Date(reminderString);

        const options = {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        };

        let formattedReminder = reminderDate.toLocaleDateString('en-US', options);
        const currentDate = new Date();

        const differenceInMilliseconds = reminderDate - currentDate;

        const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

        htmlContent += `
          <div class="note-card" 
            style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
            onclick="clickCard(this)"
            noteID="${item.id}">
            ${item.title ? `<div class="note-title">${item.title}</div>` : ''}
            <div class="note-content">
                <p>${item.content ? item.content : "Empty Note"}</p>
            </div>
            ${item.reminder ?
              `<div class="note-reminder-container">
                  <div class="note-reminder ${currentDate > reminderDate ? 'active' : ''}">
                    <svg class="menu-svg" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                      <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" fill="black"/>
                    </svg>
                    <span>${formattedReminder}</span>
                  </div> 
                  <div class="days-left">
                    ${currentDate < reminderDate ?
                      `<p>${daysDifference} ${daysDifference == 1 ? "day" : "days"} left<p/>`
                      :
                      `<p class="markAsDone()">Mark as done</p>`
                    }
                  </div>
                </div>`
              :
              ""
            }
          </div>
        `;
      }
    });
  }

  return `
    ${htmlContent ?
      `<div class="pin-notes">
        <div class="note-card-container">
          ${htmlContent}
        </div>
      </div>
      <div class="add-note-btn">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
        </svg>
      </div>`
      :
      `<div class="no-notes">No Reminder Note</div>`
    }
  `;
}
function archiveNotes() {
  let htmlContent = '';
  if(content()){
    content().forEach(item => {
      if (item.archive && !item.delete) { // Check if the 'archive' property is not true
        htmlContent += `
              <div class="note-card" 
                  style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
                  onclick="clickCard(this)"
                  noteID="${item.id}"
              >
                  ${item.title? `<div class="note-title">${item.title}</div>` : ''}
                  <div class="note-content">
                      <p>${item.content ? item.content : "Empty Note"}</p>
                  </div>
              </div>
          `;
      }
    });
  }
return `
  ${htmlContent?`
    <div class="pin-notes">
      <div class="note-card-container">
          ${htmlContent}
      </div>
    </div>`
    :
    `<div class="no-notes">No Archive Note</div>`
  }
`;

}
function trashNotes() {
  let htmlContent = '';
  if(content()){
    content().forEach(item => {
      if (item.delete) { 
        const reminderString = item.deleteDate;
        const reminderDate = new Date(reminderString);

        const options = {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        };

        let formattedReminder = reminderDate.toLocaleDateString('en-US', options);
        const currentDate = new Date();

        const differenceInMilliseconds = reminderDate - currentDate;

        const daysDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

        const monthsDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30.44));
        htmlContent += `
              <div class="note-card" 
                  style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
                  onclick="clickCardTrash(this)"
                  noteID="${item.id}"
              >
                  ${item.title ? `<div class="note-title">${item.title}</div>` : ''}
                  <div class="note-content">
                      <p>${item.content ? item.content : "Empty Note"}</p>
                  </div>
                  <div class="days-left">
                    <p>${daysDifference} ${daysDifference == 1?"day":"days"} left</p>
                  </div> 
              </div>
          `;
      }
    });
  }
  return `
    ${htmlContent?`
      <p class="label">Delete after 7 days</p>
      <div class="pin-notes">
        <div class="note-card-container">
            ${htmlContent}
        </div>
      </div>
      `
      :
      `<div class="no-notes">No Trash Note</div>`
  }
`;
}

function closeModal(event) {
  event.preventDefault()
  const modalContainer = event.target.closest('.modal-container');
  if (modalContainer) {
      addNote()
      modalContainer.remove();
      modalPrompt("Note Added")
  }
  callPage();
}
function closeNoteModal(event){
  event.preventDefault()
    const modalContainer = event.target.closest('.modal-container');
    if (modalContainer) {

      const titleInput = document.querySelector(".modal-header input");
      const contentTextarea = document.querySelector(".modal-body textarea");
      const background = document.querySelector(".modal-content");
      const pinBtn = document.querySelector(".modal-header button.pin-btn");
      let imagePath = '';
      let colorValue = '';
    
      if(background.getAttribute("path")){
        imagePath = background.getAttribute("path");
      }else if(background.getAttribute("color")){
        colorValue = background.getAttribute("color");
      }
      const noteID = document.querySelector(".modal-content").getAttribute("noteID");
      const notesArray = {
        id: parseInt(noteID),
        title: titleInput.value,
        content: contentTextarea.value,
        color: !imagePath?(colorValue?colorValue:"white"):"",
        backgroundImage: imagePath,
        archive: false,
        delete: false,
        reminder: convertDateTime()?convertDateTime():"",
        pin: pinBtn.getAttribute("show")? true:false
      };

      var getNoteData = JSON.parse(localStorage.getItem('note-data'));
      const newArray = [];
      getNoteData.forEach(data => {
        if(noteID == data.id){
          newArray.push(notesArray);
        }else{
          newArray.push(data);
        } 
      });
      modalPrompt("Note Updated")
      localStorage.setItem("note-data", JSON.stringify(newArray));
      modalContainer.remove();
      callPage();
    }
}
function closeArchiveModal(event){
  event.preventDefault()
    const modalContainer = event.target.closest('.modal-container');
    if (modalContainer) {

      const titleInput = document.querySelector(".modal-header input");
      const contentTextarea = document.querySelector(".modal-body textarea");
      const background = document.querySelector(".modal-content");
      const pinBtn = document.querySelector(".modal-header button.pin-btn");
      let imagePath = '';
      let colorValue = '';
    
      if(background.getAttribute("path")){
        imagePath = background.getAttribute("path");
      }else if(background.getAttribute("color")){
        colorValue = background.getAttribute("color");
      }
      const noteID = document.querySelector(".modal-content").getAttribute("noteID");
      const notesArray = {
        id: parseInt(noteID),
        title: titleInput.value,
        content: contentTextarea.value,
        color: !imagePath?(colorValue?colorValue:"white"):"",
        backgroundImage: imagePath,
        archive: true,
        delete: false,
        reminder: convertDateTime()?convertDateTime():"",
        pin: pinBtn.getAttribute("show")? true:false
      };

      var getNoteData = JSON.parse(localStorage.getItem('note-data'));
      const newArray = [];
      getNoteData.forEach(data => {
        if(noteID == data.id){
          newArray.push(notesArray);
        }else{
          newArray.push(data);
        } 
      });
      localStorage.setItem("note-data", JSON.stringify(newArray));
      modalContainer.remove();
      callPage();
    }
}
function closeTrashModal(event){
  event.preventDefault()
  const modalContainer = event.target.closest('.modal-container');
  modalContainer.remove();
  callPage();
}
function archive(event, noteID){
  var getNoteData = JSON.parse(localStorage.getItem('note-data'));
  
  getNoteData.forEach(data => {
    if (data.id === noteID) {
      data.archive = true;
    }
  });
  console.log(getNoteData)
  localStorage.setItem('note-data', JSON.stringify(getNoteData));
  event.target.closest('.modal-container').remove();
  callPage();
  modalPrompt("Note move to archived")
}
function unArchive(event, noteID){
  var getNoteData = JSON.parse(localStorage.getItem('note-data'));
  
  getNoteData.forEach(data => {
    if (data.id === noteID) {
      data.archive = false;
    }
  });
  modalPrompt("Note Unarchived")
  localStorage.setItem('note-data', JSON.stringify(getNoteData));
  event.target.closest('.modal-container').remove();
  callPage();
}
function deleteBtn(event, noteID) {
  var getNoteData = JSON.parse(localStorage.getItem('note-data'));
  
  const currentDate = new Date();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const amPm = ['AM', 'PM'];

  const year = currentDate.getFullYear();
  const monthIndex = currentDate.getMonth();
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const amOrPm = hours < 12 ? amPm[0] : amPm[1];
  
  const formattedDate = `${months[monthIndex]} ${day+7}, ${year}, ${hours % 12}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
  
  getNoteData.forEach(data => {
    if (parseInt(data.id) === noteID) {
      data.delete = true;
      data.deleteDate = formattedDate;
    }
  });
  
  modalPrompt("Note Move to Trash");
  localStorage.setItem('note-data', JSON.stringify(getNoteData));
  event.target.closest('.modal-container').remove();
  callPage();
}
function restoreBtn(event, noteID){
  var getNoteData = JSON.parse(localStorage.getItem('note-data'));
  getNoteData.forEach(data => {
    if (parseInt(data.id) === noteID) {
      data.delete = false;
      delete data.deleteDate;
    }
  });
  modalPrompt("Note Restored")
  localStorage.setItem('note-data', JSON.stringify(getNoteData));
  event.target.closest('.modal-container').remove();
  callPage();
}
function deletefvr(event, noteID){
  var getNoteData = JSON.parse(localStorage.getItem('note-data'));
  const newArray = [];
  getNoteData.forEach(data => {
    if (parseInt(data.id) != noteID) {
      newArray.push(data);
    }
  });
  
  modalPrompt("Note Deleted")
  localStorage.setItem('note-data', JSON.stringify(newArray));
  event.target.closest('.modal-container').remove();
  callPage();
}

function modalPrompt(message) {
  const modalPromptM = document.querySelector(".modal-prompt");
  const pTag = modalPromptM.querySelector("p");

  pTag.textContent = message;
  modalPromptM.classList.add("active");

  setTimeout(() => {
    modalPromptM.classList.remove("active");
  }, 5000); 
}

function closePromptModal(event){
  event.target.closest(".modal-prompt").remove();
}
function callPage(){
 notes()
 archiveNotes()
 reminderNotes();
 trashNotes()
 const route = window.location.hash.slice(1) || '/';
 handleRoute(route)
 setupEventListeners();
 initializeAllMasonry();
}

function content() {
  var getNoteData = JSON.parse(localStorage.getItem('note-data'));

  return getNoteData;
}
const bodyElement = document.body; 
window.addEventListener("mousemove", function(event) {
  if (event.target === bodyElement || bodyElement.contains(event.target)) {
    bodyElement.classList.add("mouse-inside");
  } else {
    bodyElement.classList.remove("mouse-inside");
  }
});


// Function to display a push notification
function showNotification(message) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(message);
  }
}

// Create a Set to keep track of items with notifications already shown
const notifiedItems = new Set();

setInterval(() => {
  if (content()) {
    content().forEach(item => {
      if (item.reminder) {
        const reminderString = item.reminder;
        const reminderDate = new Date(reminderString);
        const currentDate = new Date();

        // Check if the absolute time difference is very small (e.g., within a few seconds)
        if (Math.abs(reminderDate - currentDate) < 5000 && !notifiedItems.has(item.id)) {
          console.log(`Item with a deadline right now: ${reminderString}`);
          showNotification(`Item with a deadline right now: ${reminderString}`);
          showCardNotif(item.id, reminderString);
          notifiedItems.add(item.id);
        } else if (
          reminderDate.getTime() === currentDate.getTime() + 24 * 60 * 60 * 1000 &&
          !notifiedItems.has(item.id)
        ) {
          console.log(`Item with a deadline tomorrow at the same time: ${reminderString}`);
          showNotification(`Item with a deadline tomorrow at the same time: ${reminderString}`);

          notifiedItems.add(item.id);
        }
      }
    });
  }
}, 1000);

function showCardNotif(noteID, reminder) {
  const dateString = reminder;
  const date = new Date(dateString);

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Set to true to display AM/PM
  };

  const timeString = date.toLocaleTimeString('en-US', options);

  const modalPromptM = document.querySelector(".modal-prompt-2");
  const pTag = modalPromptM.querySelector("p");

  const clickNoteButton = document.createElement("div");
  clickNoteButton.classList.add("button", "open");
  clickNoteButton.textContent = "Open-Note";

  clickNoteButton.onclick = function () {
    openReminderNote(event, noteID);
  };

  modalPromptM.appendChild(clickNoteButton);

  pTag.textContent = "Today,"+timeString;
console.log(timeString)
  modalPromptM.classList.add("active");

  setTimeout(() => {
    modalPromptM.classList.remove("active");
  }, 5000);
}


function openReminderNote(event, noteID){
  handleRoute("/reminder");
  setTimeout(() => {
    clickCard(noteID)
  }, 1000);
  event.target.closest(".modal-prompt-2").remove();
}
setInterval(() => {
  
}, 1000);













