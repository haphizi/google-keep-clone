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
 */

class App {
  constructor() {
    this.notes = []; // create an empty array to store submitted note objects

    // differentiate queries with $ sign means html elements
    // whereas no $ means data
    // references to elements
    this.$formCloseButton = document.querySelector("#form-close-button");
    this.$notes = document.querySelector("#notes");
    this.$placeholder = document.querySelector("#placeholder");
    this.$form = document.querySelector("#form");
    this.$noteTitle = document.querySelector("#note-title");
    this.$noteText = document.querySelector("#note-text");
    this.$formButtons = document.querySelector("#form-buttons");
    // run this method when the app starts up
    this.addEventListeners();
  }

  addEventListeners() {
    // list for click event on the body
    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
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

  // add note functionality, destructure prop
  addNote({ title, text }) {
    const newNote = {
      title,
      text,
      color: "white",
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id : 1,
    };

    //
    this.notes = [...this.notes, newNote];
    this.displayNotes();
    this.closeForm();
  }

  displayNotes() {
    // check if notes array has el
    const hasNotes = this.notes.length > 0;
    this.$placeholder.style.display = hasNotes ? "none" : "flex";

    this.$notes.innerHTML = this.notes
      .map(
        (note) =>
          `
      <div style="background: ${note.color};" class="note">
        <div class="${note.title && "note-title"}">${note.title}</div>
        <div class="note-text">${note.text}</div>
        <div class="toolbar-container">
          <div class="toolbar">
            <img class="toolbar-color" src="https://icon.now.sh/palette">
            <img class="toolbar-delete" src="https://icon.now.sh/delete">
          </div>
        </div>
      </div>
      `
      )
      .join("");
  }
}

new App();
