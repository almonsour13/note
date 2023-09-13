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

  const pageTitle = document.getElementsByClassName('logo-container')[0];
  if (activeClass === "/") {
    pageTitle.textContent = "Note";
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
    '/archive': archiveNotes(),
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


      
    const body = document.body;

    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    modalContainer.innerHTML = `
          <div class="modal-content" 
              style="${matchingItem.backgroundImage ? `background-image: url('${matchingItem.backgroundImage}');` : `background-color: ${matchingItem.color};`}">
              <!-- Modal Header with Title and Pin Button -->
              <div class="modal-main">
                  <div class="modal-header">
                      <input type="text" placeholder="Title" value="${matchingItem.author}">
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
                 <div class="note-reminder ${currentDate > reminderDate?`active`:``                       }">

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
              
              
              <!-- Modal Footer with Action Buttons -->
              <div class="modal-footer">
                  <div class="footer-btn">
                      <!-- Reminder Button -->
                      <a href="#" title="Reminder" class="reminder" onclick="reminder(this)">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                      <path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q18 5 35 11.5t32 16.5q-13 16-22.5 33.5T567-694q-19-12-41-19t-46-7q-66 0-113 47t-47 113v280h320v-123q17 15 37 27.5t43 20.5v75h80v80H160Zm320-300Zm280 60v-120H640v-80h120v-120h80v120h120v80H840v120h-80Z"/></svg>
                          <ul class="reminder">
                              <li>Time</li>
                              <li>Repeat</li>
                          </ul>
                      </a>
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
                  <div class="close-btn" onclick="closeModal(event)">
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
                  ${item.author ? `<div class="note-title">${item.author}</div>` : ''}
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
                 noteID="${item.id}"
            >
                ${item.author ? `<div class="note-title">${item.author}</div>` : ''}
                <div class="note-content">
                    <p>${item.content ? item.content : "Empty Note"}</p>
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

  return `
      ${pinnedNotes?`
          <p class="label">Pinned</p>
          <div class="pin-notes">
            <div class="note-card-container" id="pinNotes">
              ${pinnedNotes}
            </div>
          </div>`
          :""
      }
      ${pinnedNotes && unpinNotes?`
          <p class="label">Others</p>
          <div class="unpin-notes">
            <div class="note-card-container" id="pinNotes">
              ${unpinNotes}
            </div>
          </div>`
        :""
     }
      <div class="add-note-btn">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
        </svg>
      </div>
    `;
}

function reminderNotes() {
  let htmlContent = '';
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

      console.log(`Formatted Reminder Date: ${formattedReminder}`);
      console.log(`Days left: ${daysDifference}`);
      console.log(`Months left: ${monthsDifference}`);


      htmlContent +=
        `<div class="note-card" 
                   style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
                   onclick="clickCard(this)"
                   noteID="${item.id}">
                  ${item.author ? `<div class="note-title">${item.author}</div>` : ''}
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

  return `
    <div class="pin-notes">
      <div class="note-card-container">
          ${htmlContent}
      </div>
    </div>
    <div class="add-note-btn">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
      </svg>
    </div>
`;
}

function archiveNotes() {
  let htmlContent = '';
  content().forEach(item => {
    if (item.archive) { // Check if the 'archive' property is not true
      htmlContent += `
            <div class="note-card" 
                 style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
                 onclick="clickCard(this)"
                 noteID="${item.id}"
            >
                ${item.author ? `<div class="note-title">${item.author}</div>` : ''}
                <div class="note-content">
                    <p>${item.content ? item.content : "Empty Note"}</p>
                </div>
            </div>
        `;
    }
  });

  return `
    <div class="pin-notes">
      <div class="note-card-container">
          ${htmlContent}
      </div>
    </div>
`;

}

function trashNotes() {
  let htmlContent = '';
  content().forEach(item => {
    if (item.delete) { // Check if the 'archive' property is not true
      htmlContent += `
            <div class="note-card" 
                 style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
                 onclick="clickCard(this)"
                 noteID="${item.id}"
            >
                ${item.author ? `<div class="note-title">${item.author}</div>` : ''}
                <div class="note-content">
                    <p>${item.content ? item.content : "Empty Note"}</p>
                </div>
            </div>
        `;
    }
  });

  return `
    <p class="label">Delete after 7 days</p>
    <div class="pin-notes">
      <div class="note-card-container">
          ${htmlContent}
      </div>
    </div>
`;
}

function content() {
  const content = [
    {
      "id": 1,
      "author": "Albert Einstein",
      "content": "Imagination is more important than knowledge.",
      "color": "",
      "backgroundImage": "assets/images/background-image-5.png",
      "archive": true,
      "delete": false,
      "reminder": "2023-09-15T08:00:00",
      "pin": true
    },
    {
      "id": 2,
      "author": "Mahatma Gandhi",
      "content": "Be the change that you wish to see in the world.",
      "color": "#87CEEB",
      "backgroundImage": "assets/images/background-image-1.png",
      "archive": false,
      "delete": false,
      "reminder": "2023-09-12T14:30:00",
      "pin": true
    },
    {
      "id": 3,
      "author": "Maya Angelou",
      "content": "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
      "color": "#98FB98",
      "backgroundImage": "assets/images/background-image-4.png",
      "archive": false,
      "delete": false,
      "reminder": "2023-09-25T10:00:00",
      "pin": false
    },
    {
      "id": 4,
      "author": "Martin Luther King Jr.",
      "content": "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
      "color": "#FFB6C1",
      "backgroundImage": "",
      "archive": false,
      "delete": true,
      "reminder": "2023-09-30T15:45:00",
      "pin": false
    },
    {
      "id": 5,
      "author": "Nelson Mandela",
      "content": "Education is the most powerful weapon which you can use to change the world.",
      "color": "#FFA07A",
      "backgroundImage": "assets/images/background-image-2.png",
      "archive": false,
      "delete": false,
      "reminder": "2023-10-05T12:30:00",
      "pin": false
    },
    {
      "id": 6,
      "author": "Steve Jobs",
      "content": "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
      "color": "#F0E68C",
      "backgroundImage": "assets/images/background-image-6.png",
      "archive": false,
      "delete": false,
      "reminder": "2023-10-10T09:15:00",
      "pin": false
    },
    {
      "id": 7,
      "author": "Winston Churchill",
      "content": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "color": "#FFD700",
      "backgroundImage": "assets/images/background-image-3.png",
      "archive": false,
      "delete": false,
      "reminder": "2023-10-15T17:30:00",
      "pin": false
    },
    {
      "id": 8,
      "author": "Marie Curie",
      "content": "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
      "color": "#87CEEB",
      "backgroundImage": "assets/images/background-image-6.png",
      "archive": false,
      "delete": false,
      "reminder": "2023-10-20T11:00:00",
      "pin": false
    },
    {
      "id": 9,
      "author": "Mark Twain",
      "content": "The two most important days in your life are the day you are born and the day you find out why.",
      "color": "#98FB98",
      "backgroundImage": "assets/images/background-image-2.png",
      "archive": false,
      "delete": false,
      "reminder": "",
      "pin": false
    },
    {
      "id": 10,
      "author": "Eleanor Roosevelt",
      "content": "The future belongs to those who believe in the beauty of their dreams.",
      "color": "white",
      "archive": false,
      "delete": false,
      "reminder": "2023-11-01T16:20:00",
      "pin": false
    }
  ];
  return content;
}