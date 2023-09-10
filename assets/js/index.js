function menuButton(element) {
    if (element.classList.contains("active")) {
        element.classList.remove("active"); 
        document.querySelector('aside').classList.remove("active"); 
    } else {
        element.classList.add("active");
        document.querySelector('aside').classList.add("active"); 
    }
}
function closeMenuButton(){
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
        if ("#"+activeClass === item.getAttribute('href')) {
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
    }else if (activeClass === "/reminder") {
        pageTitle.textContent = "Reminder";
    }else if (activeClass === "/archive") {
        pageTitle.textContent = "Archive";
    }else if (activeClass === "/trash") {
        pageTitle.textContent = "Trash";
    }
    document.querySelector('.menu-button').classList.remove("active")
    document.querySelector('aside').classList.remove("active")
}

function handleRoute() {
    const route = window.location.hash.slice(1) || '/';
    const contentDiv = document.querySelector('.content-container');

    const pageMapping = {
        '/': notes(),
        '/reminder': 'still developing', 
        '/archive': archiveNotes(), 
        '/trash': 'still developing', 
        
    };

    if (pageMapping[route]) {
        contentDiv.innerHTML = pageMapping[route];
        changeMenuListActive(route);
    } else {
        contentDiv.innerHTML = '<h1>Page Not Found</h1>';
    }
}

window.addEventListener('hashchange', handleRoute);
handleRoute();

function clickCard(element) {

  const matchingItem = content().find(item => element.getAttribute("noteID") == item.id);

  if (matchingItem) {
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
                      <button class="pin-btn"><i class="fa-solid fa-thumbtack"></i></button>
                  </div>
                  <!-- Modal Body with Textarea for Note -->
                  <div class="modal-body">
                      <textarea id="autoresize" placeholder="Note">${matchingItem.content}</textarea>
                  </div>
              </div>
              <!-- Modal Footer with Action Buttons -->
              <div class="modal-footer">
                  <div class="footer-btn">
                      <!-- Reminder Button -->
                      <a href="#" title="Reminder" class="reminder" onclick="reminder(this)">
                          <i class="fa-solid fa-bell"></i>
                          <ul class="reminder">
                              <li>Time</li>
                              <li>Repeat</li>
                          </ul>
                      </a>
                      <!-- Background Options Button -->
                      <a href="#" title="Background options" class="background" onclick="backgroundColor(this)">
                          <i class="fa-solid fa-palette"></i>
                          <div class="background">
                              ${colorPalette()} <!-- Output of colorPalette function -->
                              ${backgroundImage()} <!-- Output of backgroundImage function -->
                          </div>
                      </a>
                      <!-- Archive Button -->
                      <a href="#" class="archive" onclick="archive()"><i class="fa-solid fa-arrow-down-long"></i></a>
                      <!-- Delete Button -->
                      <a href="#" class="delete" onclick="deleteBtn()"><i class="fa-solid fa-trash"></i></a>
                  </div>
                  <!-- Close Button -->
                  <div class="close-btn" onclick="closeModal(event)">
                      close
                  </div>
              </div>
          </div>
      `;
      body.appendChild(modalContainer);
  }
}
function notes() {
  let pinnedNotes  = '';
  let unpinNotes  = '';
  content().forEach(item => {
      if (!item.archive && !item.delete) {
          if(item.pin){
            pinnedNotes += `
              <div class="note-card" 
                   style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
                   onclick="clickCard(this)"
                   noteID="${item.id}">
                  ${item.author ? `<div class="note-title">${item.author}</div>` : ''}
                  <div class="note-content">
                      <p>${item.content ? item.content : "Empty Note"}</p>
                  </div>
              </div>
            `
          }else{
            unpinNotes += `
            <div class="note-card" 
                 style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}"
                 onclick="clickCard(this)"
                 noteID="${item.id}">
                ${item.author ? `<div class="note-title">${item.author}</div>` : ''}
                <div class="note-content">
                    <p>${item.content ? item.content : "Empty Note"}</p>
                </div>
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
function archiveNotes(){
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
    <div class="note-card-container">
        ${htmlContent}
    </div>
    <div class="add-note-btn">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
        <path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
      </svg>
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
      "reminder": "2023-09-20T14:30:00",
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
      "delete": false,
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
      "reminder": "2023-10-25T13:45:00",
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



















