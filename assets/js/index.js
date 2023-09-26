
const notifiedItems = new Set();

let modalCount = 0;
let zIndex = 2;
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
  const aside = document.querySelector('aside');
 // element.classList.toggle("active");
  aside.classList.toggle("active");
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
    pageTitle.innerHTML = '<img src="assets/images/logo/logo-yellow.png" alt="logo">MemoMagic';
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

function handleRoute() {
  const route = window.location.hash.slice(1) || '/';
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
  //setupEventListeners();
}
window.addEventListener('hashchange', function(){
  handleRoute()
  initializeAllMasonry()
});
handleRoute();

function notes() {
  //notifSound()
  let pinnedNotes = '';
  let unpinNotes = '';
  if(content()){
    content().forEach(item => {
      if (!item.archive && !item.delete && !item.done) {
        let itemContent ='';
        for (let index = 0; index < 500; index++) {
            itemContent += item.content.charAt(index);
        }
        itemContent += '...';
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
                        ${item.content ? `<p>${itemContent}</p>` : `<p class="empty-note">Empty Note</p>`}
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
                              ``
                              :
                              `<p class="mark-as-done" onclick="markAsDone(event, ${item.id}) ">Mark as done</p>`
                            }
                          </div>
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
                      ${item.content ? `<p>${itemContent}</p>` : `<p class="empty-note">Empty Note</p>`}
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
                            ``
                            :
                            `<p class="mark-as-done" onclick="markAsDone(event, ${item.id}) ">Mark as done</p>`
                          }
                        </div>
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
            ${pinnedNotes && unpinNotes || pinnedNotes && !unpinNotes? `
              <p class="label">Pinned</p>
              <div class="pin-notes">
                <div class="note-card-container" id="pinNotes">
                  ${pinnedNotes}
                </div>
              </div>`
              : ''
            } 
            ${pinnedNotes && unpinNotes || !pinnedNotes && unpinNotes?
              `
              ${pinnedNotes ? `<p class="label">Others</p>` : ''}
              <div class="unpin-notes">
                <div class="note-card-container" id="pinNotes">
                  ${unpinNotes}
                </div>
              </div>`
             : ""
            }
            
          ${!pinnedNotes && !unpinNotes?'<div class="no-notes">No note</>':''}
          <div class="add-note-btn" onclick="addNoteBtn(this)">
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
      if (item.reminder && !item.archive && !item.delete && !item.done) {
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
        let itemContent ='';
        for (let index = 0; index < 500; index++) {
            itemContent += item.content.charAt(index);
        }
        itemContent += '...';
        htmlContent += `
          <div class="note-card" 
            style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
            onclick="clickCard(this)"
            noteID="${item.id}">
            ${item.title ? `<div class="note-title">${item.title}</div>` : ''}
            <div class="note-content">
                ${item.content ? `<p>${itemContent}</p>` : `<p class="empty-note">Empty Note</p>`}
            </div>
            ${item.reminder ?
              `<div class="note-reminder-container">
                  <div class="reminder-days">
                    <div class="note-reminder ${currentDate > reminderDate ? 'active' : ''}">
                      <svg class="menu-svg" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" fill="black"/>
                      </svg>
                      <span>${formattedReminder}</span>
                    </div> 
                    ${currentDate < reminderDate?
                      `<p>${daysDifference} ${daysDifference > 1 ? "days" : "day"} left<p/>`:''
                    }
                  </div>
                  <div class="days-left">
                    ${currentDate < reminderDate ?
                      ``
                      :
                      `<p class="mark-as-done" onclick="markAsDone(event, ${item.id}) ">Mark as done</p>`
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
      if (item.archive && !item.delete && !item.done) {
        let itemContent ='';
        for (let index = 0; index < 500; index++) {
            itemContent += item.content.charAt(index);
        }
        itemContent += '...';
        htmlContent += `
              <div class="note-card" 
                  style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
                  onclick="clickCard(this)"
                  noteID="${item.id}"
              >
                  ${item.title? `<div class="note-title">${item.title}</div>` : ''}
                  <div class="note-content">
                      ${item.content ? `<p>${itemContent}</p>` : `<p class="empty-note">Empty Note</p>`}
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
      if (item.delete && !item.done) { 
        const reminderString = item.deleteDate;
        const parts = reminderString.split(/[\s,:]+/);

        const month = parts[0];
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        const hour = parseInt(parts[3], 10);
        const minute = parseInt(parts[4], 10);
        const amPm = parts[5];

        const monthIndex = new Date(Date.parse(month + " 1, 2000")).getMonth();

        // Create a new Date object
        const reminderDate = new Date(year, monthIndex, day, hour, minute);

        // Adjust for AM/PM
        if (amPm === "PM" && hour < 12) {
          reminderDate.setHours(reminderDate.getHours() + 12);
        }

        const currentDate = new Date();
        const differenceInMilliseconds = Math.abs(reminderDate - currentDate);

        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const millisecondsPerMonth = millisecondsPerDay * 30.44;

        const daysDifference = Math.floor(differenceInMilliseconds / millisecondsPerDay);
        let itemContent ='';
        for (let index = 0; index < 500; index++) {
            itemContent += item.content.charAt(index);
        }
        itemContent += '...';

        htmlContent += `
              <div class="note-card" 
                  style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
                  onclick="clickCardTrash(this)"
                  noteID="${item.id}"
              >
                  ${item.title ? `<div class="note-title">${item.title}</div>` : ''}
                  <div class="note-content">
                      ${item.content ? `<p>${itemContent}</p>` : `<p class="empty-note">Empty Note</p>`}
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
  handleRoute();
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
        pin: pinBtn.getAttribute("show")=="true"?true:false
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
      removeIDnotif(noteID);
      handleRoute()
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
      handleRoute()
    }
}
function closeTrashModal(event){
  event.preventDefault()
  const modalContainer = event.target.closest('.modal-container');
  modalContainer.remove();
  handleRoute()
}
function archive(event, noteID){
  var getNoteData = JSON.parse(localStorage.getItem('note-data'));
  
  getNoteData.forEach(data => {
    if (data.id === noteID) {
      data.archive = true;
    }
  });
  localStorage.setItem('note-data', JSON.stringify(getNoteData));
  event.target.closest('.modal-container').remove();
  handleRoute()
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
  handleRoute()
  setupEventListeners()
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
 // console.log(formattedDate)
  getNoteData.forEach(data => {
    if (parseInt(data.id) === noteID) {
      data.delete = true;
      data.deleteDate = formattedDate;
    }
  });
  
  modalPrompt("Note Move to Trash");
  localStorage.setItem('note-data', JSON.stringify(getNoteData));
  event.target.closest('.modal-container').remove();
  handleRoute()
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
  handleRoute()
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
  handleRoute()
}
function markAsDone(event, noteID){
  event.stopPropagation();
  var getNoteData = JSON.parse(localStorage.getItem('note-data'));
  getNoteData.forEach(data => {
    if (parseInt(data.id) === noteID) {
      data.delete = true;
      data.done = true;
    }
  });
  
  modalPrompt("Note mark as done");
  localStorage.setItem('note-data', JSON.stringify(getNoteData));
  if(event.target.closest('.modal-container')){
    event.target.closest('.modal-container').remove();
  }
  handleRoute()
}
function modalPrompt(message) {
  promptSound()
  zIndex++;
  const modalCountCurrent = ++modalCount; 
  const modalPromptM = `
    <div class="modal-prompt" id="modal-prompt-${modalCountCurrent}">
      <p>${message}</p>
      <div class="button" onclick="closePromptModal(${modalCountCurrent})">&#10005</div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalPromptM);
  document.querySelector(`#modal-prompt-${modalCountCurrent}`).style.zIndex = zIndex;
  setTimeout(() => {
    const modalPromptElement = document.querySelector(`#modal-prompt-${modalCountCurrent}`);
    modalPromptElement.classList.add('active');

    setTimeout(() => {
      setTimeout(() => {
        modalPromptElement.classList.remove('active');
        modalPromptElement.remove;
      }, 300);
    }, 5000);
  }, 100);
}
async function promptSound(){
  const sound = new Howl({
    src: ['assets/sounds/mixkit-doorbell-tone-2864.wav']
  });

  sound.play();
}
function closePromptModal(modalId) {
  const modalPromptElement = document.querySelector(`#modal-prompt-${modalId}`);
  if (modalPromptElement) {
    modalPromptElement.classList.remove('active');
    setTimeout(() => {
      modalPromptElement.remove();
    }, 300);
  }
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
function showNotification(message) {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(message);
  }
}
function removeIDnotif(noteID) {
  noteID = parseInt(noteID); 
  console.log(notifiedItems)
  console.log(noteID)
  if (Number.isInteger(noteID) && notifiedItems.has(noteID)) {
    notifiedItems.delete(noteID);
    console.log(`Removed note ID ${noteID} from notifiedItems`);
  } else {
    console.log(`Note ID ${noteID} not found in notifiedItems`);
  }
}

setInterval(() => {
  if (content()) {
    content().forEach(item => {
      if (item.reminder) {
        const reminderString = item.reminder;
        const reminderDate = new Date(reminderString);
        const currentDate = new Date();
        // Check if the absolute time difference is very small (e.g., within a few seconds)
        if (Math.abs(reminderDate - currentDate) < 5000 && !notifiedItems.has(item.id)) {
          showCardNotif(item.id, reminderString);
          console.log(`Item with a deadline right now: ${reminderString}`);
          showNotification(`Note with a deadline right now: ${reminderString}`);
          notifiedItems.add(item.id);
          console.log(item.id)
          console.log(notifiedItems)
        } else if (
          reminderDate.getTime() === currentDate.getTime() + 24 * 60 * 60 * 1000 &&
          !notifiedItems.has(item.id)
        ) {
          showCardNotif(item.id, reminderString);
          console.log(`Item with a deadline tomorrow at the same time: ${reminderString}`);
          showNotification(`Note with a deadline tomorrow at the same time: ${reminderString}`);
          notifiedItems.add(item.id);
        }
      }
    });
    handleRoute();
  }
}, 1000);
function showCardNotif(noteID, reminder) {
  notifSound();
  const dateString = reminder;
  const date = new Date(dateString);

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Set to true to display AM/PM
  };

  const timeString = date.toLocaleTimeString('en-US', options);

 
  const modalPromptM = document.querySelector(".modal-prompt-2"); 

  const clickNoteButton = `<p>${"today, " + timeString}</p><div class="button-open" onclick="openReminderNote(event, ${noteID})">Open note</div>`; // Create an HTML string for the button
  
  modalPromptM.innerHTML = clickNoteButton;
  
  modalPromptM.classList.add("active");

  setTimeout(() => {
    modalPromptM.classList.remove("active");
  }, 5000);
}
async function notifSound(){
  const sound = new Howl({
    src: ['assets/sounds/mixkit-clear-announce-tones-2861.wav']
  });
  sound.play();
}
function openReminderNote(event, noteID) {
  window.location.href = 'index.html#/reminder';
  setTimeout(() => {
      clickCard(noteID);
  }, 1000);
  event.target.closest(".modal-prompt-2").remove();
}














