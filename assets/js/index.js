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
        console.log(activeClass+"-------------"+item.getAttribute('href'))
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
}

function handleRoute() {
    const route = window.location.hash.slice(1) || '/';
    const contentDiv = document.querySelector('.content-container');

    const pageMapping = {
        '/': notes(),
        '/tasks': 'assets/page/task.html', 
        '/reminder': 'assets/page/task.html', 
        '/archive': 'assets/page/task.html', 
        '/trash': 'assets/page/task.html', 
        
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
function notes() {
    const content = [
        {
          author: "Albert Einstein",
          content: "Imagination is more important than knowledge.",
          color: "", // Light Gold
          backgroundImage:"assets/images/background-image-5.png"
        },
        {
          author: "Mahatma Gandhi",
          content: "Be the change that you wish to see in the world.",
          color: "#87CEEB", // Light Sky Blue
          backgroundImage:"assets/images/background-image-1.png"
        },
        {
          author: "Maya Angelou",
          content: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
          color: "#98FB98", // Pale Green
          backgroundImage:"assets/images/background-image-4.png"
        },
        {
          author: "Martin Luther King Jr.",
          content: "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
          color: "#FFB6C1", // Light Pink
          backgroundImage:"."
        },
        {
          author: "Nelson Mandela",
          content: "Education is the most powerful weapon which you can use to change the world.",
          color: "#FFA07A", // Light Salmon
          backgroundImage:"assets/images/background-image-2.png"
        },
        {
          author: "Steve Jobs",
          content: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
          color: "#F0E68C", // Khaki
          backgroundImage:"assets/images/background-image-6.png"
        },
        {
          author: "Winston Churchill",
          content: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
          color: "#FFD700", // Light Gold
          backgroundImage:"assets/images/background-image-3.png"
        },
        {
          author: "Marie Curie",
          content: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
          color: "#87CEEB", // Light Sky Blue
          backgroundImage:"assets/images/background-image-6.png"
        },
        {
          author: "Mark Twain",
          content: "The two most important days in your life are the day you are born and the day you find out why.",
          color: "#98FB98", // Pale Green
          backgroundImage:"assets/images/background-image-2.png"
        },
        {
          author: "Eleanor Roosevelt",
          content: "The future belongs to those who believe in the beauty of their dreams.",
          color: "white", // Light Pink
          
        },
      ];
    let htmlContent = '';
    content.forEach(item => {
        htmlContent += `
            <div class="note-card" style="${item.backgroundImage ? `background-image: url('${item.backgroundImage}');` : `background-color: ${item.color};`}">
                ${item.author ? `<div class="note-title">${item.author}</div>` : ''}
                <div class="note-content">
                    
                    <p>${item.content ? item.content : "Empty Note"}</p>
                    
                </div>
            </div>
        `;
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


function hasOverflow(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function checkBodyOverflow() {
  var bodyElement = document.body;
  var button = document.querySelector('.add-note-btn'); // Assuming .add-note-btn is your button class

  if (hasOverflow(bodyElement)) {
    button.classList.add('overflow'); // Corrected this line
  } else {
    console.log('Body does not have overflow.');
    button.classList.remove('overflow'); // Corrected this line
  }
}

// Check for body overflow
checkBodyOverflow();


















