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

function changeMenu(event) {
  const aside = document.querySelector('aside');
  if (aside.classList.contains("active")) {
    aside.classList.remove("active");
    document.querySelector('.menu-button').classList.remove("active");
  } else {
    aside.classList.add("active");
    document.querySelector('.menu-button').classList.remove("active")
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
}
window.addEventListener('hashchange', handleRoute);
handleRoute();

function clickCard(element) {

  const matchingItem = content().find(item => element.getAttribute("noteID") == item.id);

  if (matchingItem) {
    const reminderString = matchingItem.reminder;

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
    let dateOutput = ''
    let timeOutput = ''

    if (!isNaN(reminderDate)) {
      const year = reminderDate.getFullYear();
      const month = String(reminderDate.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-indexed
      const day = String(reminderDate.getDate()).padStart(2, '0');

      dateOutput = `${year}-${month}-${day}`;

      // Extract the time part from the reminderString
      const timeString = reminderString.split(', ')[2]; // Assuming time is the third part
      const time = new Date(`2000-01-01 ${timeString}`);
      const hours = time.getHours();
      const minutes = time.getMinutes();
      timeOutput = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    }
    const body = document.body;

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    modalContainer.innerHTML = `
          <div class="modal-content" 
              style="${matchingItem.backgroundImage ? `background-image: url('${matchingItem.backgroundImage}');` : `background-color: ${matchingItem.color};`}">
              <!-- Modal Header with Title and Pin Button -->
              <div class="modal-main">
                  <div class="modal-header">
                      <input type="text" placeholder="Title" value="${matchingItem.title}">
                      <button class="pin-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">><path d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"/></svg>
                        ${matchingItem.pin?
                          `<span></span>`
                          :""
                        }
                        </button>
                  </div>
                  <!-- Modal Body with Textarea for Note -->
                  <div class="modal-body">
                      <textarea id="autoresize" placeholder="Note">${matchingItem.content}</textarea>
                      
                  </div>
                  ${matchingItem.reminder ?`
                    <div class="note-reminder-container">
                      <div class="note-reminder ${currentDate > reminderDate?`active`:``}">
                        <svg class="menu-svg" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" fill="black"/>
                        </svg>
                        <span>${formattedReminder}</span>
                        </div>
                        <div class="days-left">
                        ${currentDate < reminderDate?``:
                         `<p class="markAsDone()">Mark as done</p>`
                        }
                      </div>
                    </div>`
                      :
                      ""
                   }
              </div>
              <!-- Modal Footer with Action Buttons -->
              <div class="modal-footer">
                  <div class="footer-btn">
                      <!-- Reminder Button -->
                      <a href="#" title="Reminder" class="reminder" onclick="reminder(this)">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                      <path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q18 5 35 11.5t32 16.5q-13 16-22.5 33.5T567-694q-19-12-41-19t-46-7q-66 0-113 47t-47 113v280h320v-123q17 15 37 27.5t43 20.5v75h80v80H160Zm320-300Zm280 60v-120H640v-80h120v-120h80v120h120v80H840v120h-80Z"/></svg>
                         
                      </a>
                      <ul class="reminder">
                        <li><p>Date:</p><input type="date" id="dateInput" value="${dateOutput}" ></li>
                        <li><p>Time:</p><input type="time" id="timeInput" value="${timeOutput}"></li>
                      </ul>

                      <!-- Background Options Button -->
                      <a href="#" title="Background options" class="background" onclick="backgroundColor(this)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                          <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/>
                        </svg>
                          <div class="background">
                              ${colorPalette()} <!-- Output of colorPalette function -->
                              ${backgroundImage()} <!-- Output of backgroundImage function -->
                          </div>
                      </a>
                      <!-- Archive Button -->
                      <a href="#" class="archive" onclick="archive()">
                        <svg class="menu-svg" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                          <path d="m480-240 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160ZM200-640v440h560v-440H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 300" fill="black"/>
                        </svg>
                      </a>
                      <!-- Delete Button -->
                      <a href="#" class="delete" onclick="deleteBtn()">
                        <svg class="menu-svg" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
                              fill="black"
                          />
                        </svg>
                      </a>
                  </div>
                  <!-- Close Button -->
                  <div class="close-btn" onclick="closeNoteModal(event)">
                      close
                  </div>
              </div>
          </div>
      `;
    body.appendChild(modalContainer);

    const textarea = modalContainer.querySelector('#autoresize');
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
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
          ${content() ? (
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
          ) : '<div class="no-notes">No notes</>'}
          <div class="add-note-btn">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
              <path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
            </svg>
          </div>
        `;
}
function reminderNotes() {
  let htmlContent = '';
  if(content()){
    content().forEach(item => {
      if (item.reminder && !item.archive) {
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

        const monthsDifference = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24 * 30.44));

        htmlContent +=
              `<div class="note-card" 
                    style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
                    onclick="clickCardReminder(this)"
                    noteID="${item.id}">

                    ${item.title ? `<div class="note-title">${item.title}</div>` : ''}
                    <div class="note-content">
                        <p>${item.content ? item.content : "Empty Note"}</p>
                    </div>
                    ${item.reminder ?`
                      <div class="note-reminder-container">
                            <div class="note-reminder ${currentDate > reminderDate?`active`:``
                      }">
                        <svg class="menu-svg" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                          <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" fill="black"/>
                        </svg>
                        <span>${formattedReminder}</span>
                        </div> 
                        <div class="days-left">
                        ${currentDate < reminderDate?`
                        <p>${daysDifference} ${daysDifference == 1?"day":"days"} left<p/>`
                        :
                        `<p class="markAsDone()">Mark as done</p>`
                        }
                        </div>
                      </div>`
                      :
                      ""
                    }
                </div>
              `
      }
  });
  }  
  return `
  ${htmlContent?
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
      `<div class="no-notes">No notes</div>`
  }
`;
}
function archiveNotes() {
  let htmlContent = '';
  if(content()){
    content().forEach(item => {
      if (item.archive) { // Check if the 'archive' property is not true
        htmlContent += `
              <div class="note-card" 
                  style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
                  onclick="clickCardArchive(this)"
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
    `<div class="no-notes">No notes</div>`
  }
`;

}
function trashNotes() {
  let htmlContent = '';
  if(content()){
    content().forEach(item => {
      if (item.delete) { // Check if the 'archive' property is not true
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
      `<div class="no-notes">No notes</div>`
  }
`;
}
function closeNoteModal(event){
  event.preventDefault()
    const modalContainer = event.target.closest('.modal-container');
    if (modalContainer) {
        modalContainer.remove();
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






