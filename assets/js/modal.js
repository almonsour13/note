
function setupEventListeners(){
    const addNote = document.querySelector(".add-note-btn");
  
    addNote.addEventListener("click", function (event) {
        const body = document.body;
  
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
  
        modalContainer.innerHTML = `
            <div class="modal-content add-note">
                <div class="modal-main">
                    <div class="modal-header">
                        <input type="text" placeholder="Title">
                        <button class="pin-btn add-note" onclick="pin(this)" >
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">><path d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"/></svg>
                          <span></span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <textarea id="autoresize" placeholder="Note"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="footer-btn">
                    <!-- Reminder Button -->
                    <a href="#" title="Reminder" class="reminder" onclick="reminder(this)">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q18 5 35 11.5t32 16.5q-13 16-22.5 33.5T567-694q-19-12-41-19t-46-7q-66 0-113 47t-47 113v280h320v-123q17 15 37 27.5t43 20.5v75h80v80H160Zm320-300Zm280 60v-120H640v-80h120v-120h80v120h120v80H840v120h-80Z"/></svg>
                        
                    </a>
                    <ul class="reminder">
                      <li><p>Date:</p><input type="date" id="dateInput"></li>
                      <li><p>Time:</p><input type="time" id="timeInput"></li>
                    </ul>

                    <!-- Background Options Button -->
                    <a href="#" title="Background options" class="background" onclick="backgroundColor(this)">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 32.5-156t88-127Q256-817 330-848.5T488-880q80 0 151 27.5t124.5 76q53.5 48.5 85 115T880-518q0 115-70 176.5T640-280h-74q-9 0-12.5 5t-3.5 11q0 12 15 34.5t15 51.5q0 50-27.5 74T480-80Zm0-400Zm-220 40q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120-160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm200 0q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm120 160q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17ZM480-160q9 0 14.5-5t5.5-13q0-14-15-33t-15-57q0-42 29-67t71-25h70q66 0 113-38.5T800-518q0-121-92.5-201.5T488-800q-136 0-232 93t-96 227q0 133 93.5 226.5T480-160Z"/>
                      </svg>
                        <div class="background">
                            ${colorPalette()}
                            ${backgroundImage()} 
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
                    <div class="close-btn" onclick="closeModal(event)">
                        close
                    </div>
                </div>
            </div>
        `;
        body.appendChild(modalContainer);
    });
}
setupEventListeners()  
window.addEventListener("hashchange", setupEventListeners);
function colorPalette() {
      const lightColors = [
          'white',
          '#F0E68C',
          '#ADD8E6', 
          '#FFD700', 
          '#FFA07A',
          '#FFC0CB'
      ];
      let palette = '';
      let liClass = 'active'; // Start with 'active' class for the first element

      lightColors.forEach(color => {
        palette += `<li class="${liClass} color" style="background-color: ${color};" color="${color}" onclick="selectBackground(this)"></li>`;
        liClass = liClass === 'odd' ? 'even' : 'odd';
      });

      const colorPalette = `<ul class="color-palette">${palette}</ul>`;

      return colorPalette;

}    
function backgroundImage(){
      const backgroundImages = [ 
          'assets/images/background-image-1.png', 
          'assets/images/background-image-2.png',
          'assets/images/background-image-3.png', 
          'assets/images/background-image-4.png', 
          'assets/images/background-image-5.png',
          'assets/images/background-image-6.png'
      ];
      let background = '';
      backgroundImages.forEach(image => {
          background += `<li class="backgroundImage" style="background-image: url(${image});" path="${image}" onclick="selectBackground(this)"></li>`;
      });
      return `<ul class="background-image">${background}</ul>`
}
function pin(element){
  if(element.classList.contains("pin")){
    element.classList.remove("pin");
    element.setAttribute("show", false);
  }else{
    element.classList.add("pin");
    element.setAttribute("show", true);
  }
}
function reminder(element){
    const reminder = document.querySelector('.footer-btn ul.reminder');
    if(reminder.classList.contains("active")){
      reminder.classList.remove("active")
    }else{
      reminder.classList.add("active")
    }
}
function backgroundColor(element){
    const buttons = document.querySelectorAll('.footer-btn a');
    buttons.forEach(button => {
      if (button !== element) {
        button.classList.remove('active');
      }
    });
    element.classList.toggle('active');
}
function archive(element){
    const buttons = document.querySelectorAll('.footer-btn a');
    buttons.forEach(button => {
      if (button !== element) {
        button.classList.remove('active');
      }
    });
    element.classList.toggle('active');
}
function deleteBtn(element){
    const buttons = document.querySelectorAll('.footer-btn a');
    buttons.forEach(button => {
      if (button !== element) {
        button.classList.remove('active');
      }
    });
    element.classList.toggle('active');
}
function selectBackground(element) {
  
    const items = document.querySelectorAll('.color, .backgroundImage');
    
    items.forEach(item => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        console.log(item.classList);
      }
    });
    element.classList.add('active');
  
    const computedStyle = window.getComputedStyle(element);
    const backgroundColor = computedStyle.getPropertyValue('background-color');
    const backgroundImage = computedStyle.getPropertyValue('background-image');
    const background = document.querySelector(".modal-content");
    background.style.backgroundColor = '';
    background.style.backgroundImage = '';
    background.style.background = 'none';
  
    if (element.classList.contains('color')) {
      background.style.backgroundColor = backgroundColor;
      background.setAttribute("color", element.getAttribute("color"));
    } else if (element.classList.contains('backgroundImage')) {
      background.style.backgroundImage = backgroundImage;
      background.setAttribute("path", element.getAttribute("path"));
    }
}
  
function closeModal(event) {
    event.preventDefault()
    const modalContainer = event.target.closest('.modal-container');
    if (modalContainer) {
        addNote()
        modalContainer.remove();
    }
}
function addNote() {
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
  var getNoteData = JSON.parse(localStorage.getItem('note-data'));
  const notesArray = {
    id: getLastID(),
    title: titleInput.value,
    content: contentTextarea.value,
    color: colorValue?colorValue:"white",
    backgroundImage: imagePath,
    archive: false,
    delete: false,
    reminder: convertDateTime()?convertDateTime():"",
    pin: pinBtn.getAttribute("show")? true:false
  };

  var getNoteData = JSON.parse(localStorage.getItem('note-data'));
  if(getNoteData){
    getNoteData.push(notesArray);
  }else{
    getNoteData = [];
    getNoteData.push(notesArray);
  }
  localStorage.setItem("note-data", JSON.stringify(getNoteData));
 // localStorage.clear();
  console.log(notesArray);
  window.location.reload();
}
function getLastID(){
  var getNoteData = JSON.parse(localStorage.getItem('note-data'));
  let lastId = 0;
  if(getNoteData){
    getNoteData.forEach(data => {
      lastId = data.id;
    });
  }

  return lastId+1;
}
function convertDateTime() {
  var dateInput = document.getElementById("dateInput").value;
  var timeInput = document.getElementById("timeInput").value;

  if(dateInput !== ''){
    var date = new Date(dateInput);

    var year = date.getFullYear();
    var month = date.toLocaleString('default', { month: 'long' }); // Get the full month name
    var day = date.getDate();

    
    var hours, minutes, period;

    if (timeInput === "") {
      hours = 12;
      minutes = 00;
      period = "AM";
    } else {
      var timeParts = timeInput.split(":");
      hours = parseInt(timeParts[0]);
      minutes = timeParts[1];
      period = hours >= 12 ? "PM" : "AM";

      if (hours > 12) {
        hours -= 12;
      }
    }

    var formattedDateTime = `${month} ${day}, ${year}, ${hours}:${minutes} ${period}`;
    return formattedDateTime;
  }else{
    return null;
  }
}

function autoResizeTextarea() {
    const textarea = document.getElementById('autoresize');
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}
  
 
document.addEventListener('input', function (e) {
    if (e.target && e.target.id === 'autoresize') {
        autoResizeTextarea();
    }
});
  
autoResizeTextarea();