/* 
 1. Expand and close notes(form)
 2. Storing notess in the app
 
 */

class App {
  constructor() {
    this.notes = []; // create an empty array to store submitted note objects
    // differentiate queries with $ sign means html elements
    // whereas no $ means data
    this.$form = document.querySelector("#form");
    this.$noteTitle = document.querySelector("#note-title");
    this.$noteText = document.querySelector("#note-text");
    this.$formButtons = document.querySelector("#form-buttons");
    // run this method when the app starts up
    this.addEventListeners();
  }

  /* 1. feat: Expand and close notes(form) */

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
  }

  handleFormClick(event) {
    const isFormClicked = this.$form.contains(event.target); // contains returns true/false
    if (isFormClicked) {
      this.openForm();
    } // open form
    else {
      this.closeForm();
    } // close form
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
  }


  // add note functionality
  addNote(note) {
    const newNote = {
      title: note.title,
      text: note.text,
      color: "white",
      id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id : 1,
    };

    //
    this.notes = [...this.notes, newNote];
    console.log(this.notes);
  }
}

new App();
