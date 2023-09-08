
function setupEventListeners(){
    const addNote = document.querySelector(".add-note-btn");
  
    addNote.addEventListener("click", function (event) {
        const body = document.body;
  
        const modalContainer = document.createElement('div');
        modalContainer.classList.add('modal-container');
  
        modalContainer.innerHTML = `
            <div class="modal-content">
                <div class="modal-main">
                    <div class="modal-header">
                        <input type="text" placeholder="Title">
                        <button class="pin-btn"><i class="fa-solid fa-thumbtack"></i></button>
                    </div>
                    <div class="modal-body">
                        <textarea id="autoresize" placeholder="Note"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="footer-btn">
                        <a href="#" title="Reminder" class="reminder" onclick="reminder(this)">
                            <i class="fa-solid fa-bell"></i>
                            <ul class="reminder">
                                <li>Time</li>
                                <li>Repeat</li>
                            </ul>
                        </a>
                        <a href="#" title="Background options" class="background" onclick="backgroundColor(this)">
                            <i class="fa-solid fa-palette"></i>
                            <div class="background">
                                ${colorPalette()}
                                ${backgroundImage()}
                            </div>
                        </a>
                        <a href="#" class="archive" onclick="archive()"><i class="fa-solid fa-arrow-down-long"></i></a>
                        <a href="#" class="delete" onclick="deleteBtn()"><i class="fa-solid fa-trash"></i></a>
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
          '#F0E68C', // Khaki
          '#98FB98', // PaleGreen
          '#ADD8E6', // LightBlue
          '#FFD700', // Gold
          '#FFA07A', // LightSalmon
          '#FFC0CB', // Pink
          '#B0E0E6', // PowderBlue
          '#90EE90'  // LightGreen
      ];
      let palette = ''; // Initialize as an empty string
      lightColors.forEach(color => {
          palette += `<li style="background-color: ${color};"></li>`;
      });
      return `<ul class="color-palette">${palette}</ul>`
  }    
  function backgroundImage(){
      const backgroundImages = [
          '#F0E68C', // Khaki
          '#98FB98', // PaleGreen
          '#ADD8E6', // LightBlue
          '#FFD700', // Gold
          '#FFA07A', // LightSalmon
          '#FFC0CB', // Pink
          '#B0E0E6', // PowderBlue
          '#90EE90'  // LightGreen
      ];
      let background = ''; // Initialize as an empty string
      backgroundImages.forEach(color => {
          background += `<li style="background-color: ${color};"></li>`;
      });
      return `<ul class="background-image">${background}</ul>`
  }
  
  function reminder(element){
      if (element.classList.contains("active")) {
          element.classList.remove("active");
      } else {
          element.classList.add("active");
      }
  }
  function backgroundColor(element){
      if (element.classList.contains("active")) {
          element.classList.remove("active");
      } else {
          element.classList.add("active");
      }
  }function archive(){
      alert()
  }
  function deleteBtn(){
      alert()
  }
  function closeModal(event) {
      const modalContainer = event.target.closest('.modal-container');
      if (modalContainer) {
          modalContainer.remove();
      }
  }
  function autoResizeTextarea() {
      const textarea = document.getElementById('autoresize');
      textarea.style.height = 'auto';
      textarea.style.height = (textarea.scrollHeight) + 'px';
  }
  
  // Attach the auto-resize function to textarea input events
  document.addEventListener('input', function (e) {
      if (e.target && e.target.id === 'autoresize') {
          autoResizeTextarea();
      }
  });
  
  // Call the auto-resize function initially to set the textarea height
  autoResizeTextarea();