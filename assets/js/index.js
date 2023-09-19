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
      `<div class="no-notes">No notes</div>`
  }
`;
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






