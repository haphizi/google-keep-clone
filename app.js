/* 
 1. Expand and close notes(form)
    - toggle styling using openForm()/closeForm() functions
 2. Storing notes in the app
    - capture values during submission
    - prevent app from reloading
 3. Displaying notes in app
    - clear out notes when submitted, and display it out
    - call displayNotes() when submitted
    - map notes[] with styling
    - reset form title/text and invoke closeForm() after submitting
 4. Improving functionality
    - add functionality to close button
    - add functionality to submit via clicking outside form el when either note text/title is keyed in
 5. Editing notes
    - Steps to creating a modal to allow editing:
      - clicks on the specific note
      - able to select an existing note and display its values in modal 
      - modal allows input changes for title/text
      - able to edit the values in modal and save it to display
      - able to close the modal using close modal button
  6. Steps to changing note color
    - within note, there should be a .toolbar-color icon
    - mouseover it to open tooltip, mouseout to close tooltip
    - click tooltip to change color, clicking the color would  get the    data-id from dataset prop and feed the color value back to the respective note.color
  7. Deleting notes
    - create a click event listener for deleteNote()
    - within deleteNote(), filter the relevant data-id note out = deleting
    
 */

class App {
  constructor() {
    this.notes = []; // create an empty array to store submitted note objects
    
    this.title = "";
    this.text = "";
    this.id = "";

    // differentiate queries with $ sign means html elements
    // whereas no $ means data
    // references to elements

    this.$notes = document.querySelector("#notes");
    this.$placeholder = document.querySelector("#placeholder");
    this.$form = document.querySelector("#form");
    this.$noteTitle = document.querySelector("#note-title");
    this.$noteText = document.querySelector("#note-text");

    //form button els
    this.$formButtons = document.querySelector("#form-buttons");
    this.$formCloseButton = document.querySelector("#form-close-button");

    //modal els
    this.$modal = document.querySelector(".modal");
    this.$modalTitle = document.querySelector(".modal-title");
    this.$modalText = document.querySelector(".modal-text");
    this.$modalCloseButton = document.querySelector(".modal-close-button");

    //tooltip el
    this.$colorTooltip = document.querySelector("#color-tooltip");

    // run this method when the app starts up
    this.addEventListeners();
  }

  addEventListeners() {
    // list for click event on the body
    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
      this.selectNote(event);
      this.openModal(event);
      this.deleteNote(event);
    });

    // mouseover for opening palette color
    document.body.addEventListener("mouseover", (event) => {
      this.openTooltip(event);
    });

    // mouseout for closing palette color
    document.body.addEventListener("mouseout", (event) => {
      this.closeTooltip(event);
    });

    // a normal function of this keyword refers to the tooltip itself unlike arrow function
    this.$colorTooltip.addEventListener("mouseover", function () {
      this.style.display = "flex";
    });

    this.$colorTooltip.addEventListener("mouseout", function () {
      this.style.display = "none";
    });

    // create a click event for each color to allow editing
    this.$colorTooltip.addEventListener("click", (event) => {
      const color = event.target.dataset.color;
      console.log(color);
      if (color) {
        this.editNoteColor(color);
      }
    });

    this.$form.addEventListener("submit", (event) => {
      event.preventDefault(); // prevents the app from reloading during submission
      const title = this.$noteTitle.value;
      const text = this.$noteText.value;
      const hasNote = title || text;
      if (hasNote) {
        // add note
        this.addNote({ title, text });
      }
    });

    // add event handler  for close button
    this.$formCloseButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Stops the event from bubbling up or being captured further, prevent parent elements from executing an event when child el/ viceversa  event is executed
      this.closeForm();
    });

    // add event handler for close modal button
    this.$modalCloseButton.addEventListener("click", (event) => {
      this.closeModal(event);
    });
  }

  handleFormClick(event) {
    const isFormClicked = this.$form.contains(event.target); // contains returns true/false

    const title = this.$noteTitle.value;
    const text = this.$noteText.value;
    const hasNote = title || text;

    if (isFormClicked) {
      this.openForm();
    } else if (hasNote) {
      //when either title/text is true, addNote() will invoke
      this.addNote({ title, text });
    } else {
      this.closeForm();
    }
  }

  openForm() {
    this.$form.classList.add("form-open"); // adds box shadow
    this.$noteTitle.style.display = "block"; // make the el visible
    this.$formButtons.style.display = "block"; // make el visible
  }

  closeForm() {
    this.$form.classList.remove("form-open"); // removes box shadow
    this.$noteTitle.style.display = "none"; // make the el invisible
    this.$formButtons.style.display = "none"; // make el invisible
    // clear out values in title/text
    this.$noteTitle.value = "";
    this.$noteText.value = "";
  }

  openModal(event) {
    //to ensure the openModal doesnt open when delete note el is clicked
    if (event.target.matches(".toolbar-delete")) return;
    if (event.target.matches(".toolbar-color")) return;

    if (event.target.closest(".note")) {
      this.$modal.classList.toggle("open-modal");
      this.$modalTitle.value = this.title;
      this.$modalText.value = this.text;
    }
  }

  closeModal(event) {
    // to patch the new values to the specific el of notes array
    this.editNote();
    // toggle to close the modal
    this.$modal.classList.toggle("open-modal");
  }

  openTooltip(event) {
    // only to hover over toolbar-color class, else return nothing.
    if (!event.target.matches(".toolbar-color")) return;

    this.id = event.target.dataset.id;
    // get specific info about where the user will be hovering over
    const noteCoords = event.target.getBoundingClientRect();
    // take the left coordinates plus how much the user scroll in the x direction
    const horizontal = noteCoords.left + window.scrollX;
    //take the top coordinates plus how much the user scroll in the y direction
    const vertical = noteCoords.top + window.scrollY;

    this.$colorTooltip.style.transform = `translate(${horizontal}px, ${vertical}px)`;
    this.$colorTooltip.style.display = "flex";
  }

  closeTooltip(event) {
    if (!event.target.matches(".toolbar-color")) return;
    this.$colorTooltip.style.display = "none";
  }

  // add note functionality, destructure prop
  addNote({ title, text }) {
    const newNote = {
      title,
      text,
      color: "white",
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1 : 1,
    };

    this.notes = [...this.notes, newNote];
    this.displayNotes();
    console.log(this.notes);
    this.closeForm();
  }

  editNote() {
    const title = this.$modalTitle.value;
    const text = this.$modalText.value;
    this.notes = this.notes.map((note) =>
      note.id === Number(this.id) ? { ...note, title, text } : note
    );
    this.displayNotes();
  }

  // edit the color only and spread back all the other properties
  editNoteColor(color) {
    this.notes = this.notes.map((note) =>
      note.id === Number(this.id) ? { ...note, color } : note
    );
    this.displayNotes();
  }

  selectNote(event) {
    // closest method will get the nearest node matching the class
    const $selectedNote = event.target.closest(".note");
    if (!$selectedNote) return;

    // destructure
    const [$noteTitle, $noteText] = $selectedNote.children;
    this.title = $noteTitle.innerText;
    this.text = $noteText.innerText;
    this.id = $selectedNote.dataset.id;
  }

  deleteNote(event) {
    // stop bubbling up from executing other events
    event.stopPropagation();
    if (!event.target.matches(".toolbar-delete")) return;
    const id = event.target.dataset.id;
    console.log(id)
    this.notes = this.notes.filter((note) => note.id !== Number(id));
    this.displayNotes();
  }
 
  displayNotes() {
    const hasNotes = this.notes.length > 0;
    this.$placeholder.style.display = hasNotes ? "none" : "flex";

    this.$notes.innerHTML = this.notes
      .map(
        (note) => `
        <div style="background: ${note.color};" class="note" data-id="${
          note.id
        }">
          <div class="${note.title && "note-title"}">${note.title}</div>
          <div class="note-text">${note.text}</div>
          <div class="toolbar-container">
            <div class="toolbar">
              <img class="toolbar-color" data-id="${
                note.id
              }" src="https://icon.now.sh/palette">
              <img class="toolbar-delete" data-id="${
                note.id
              }" src="https://icon.now.sh/delete">
            </div>
          </div>
        </div>
     `
      )
      .join("");
  }
}

new App();
