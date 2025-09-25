let notes = [];

function onload() {
  let notesAsText = localStorage.getItem('notes');
  if (notesAsText) {
    notes = JSON.parse(notesAsText);
    for (let i = 0; i < notes.length; i++) {
      createNoteContainer(notes[i]);
    }
  }
}

function deleteAllNotes() {
  if (notes.length === 0) {
    alert('Es sind keine Notizen vorhanden');
    return;
  }
  
  const confirmDelete = confirm('Wollen Sie alle Notizen wirklich löschen?');
  if (confirmDelete) {
    let noteElements = document.querySelectorAll('.creatContain');
    noteElements.forEach(element => {
      element.classList.add('suckIn');
    });

    setTimeout(() => {
      notes = [];
      localStorage.setItem('notes', JSON.stringify(notes));
      noteElements.forEach(element => element.remove());
    }, 1000);
  }
}

function addNote() {
  let newNote = {
    id: `note${notes.length}`,
    content: []
  };
  notes.push(newNote);
  localStorage.setItem('notes', JSON.stringify(notes));
  createNoteContainer(newNote);
}

function createDeleteContainer(note, newNoteContainer) {
  let deleteContainer = document.createElement('div');
  deleteContainer.classList.add('deleteContainer');

  let img = document.createElement('img');
  img.setAttribute('src', './img/minus.png');
  img.classList.add('deleteImg');

  img.addEventListener('click', function () {
    deleteNoteFromStorage(note.id);
    newNoteContainer.remove();
  });

  deleteContainer.appendChild(img);
  return deleteContainer;
}

function createNoteInput(note, noteContent) {
  let noteInput = document.createElement('input');
  noteInput.classList.add('noteinput');
  noteInput.setAttribute('type', 'text');
  noteInput.setAttribute('placeholder', 'Notiz eingeben');

  noteInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      let noteValue = noteInput.value.trim();
      if (noteValue !== '') {
        note.content.push(noteValue);
        noteContent.innerHTML += `- ${noteValue}<br>`;
        noteInput.value = '';
        localStorage.setItem('notes', JSON.stringify(notes));
      }
    }
  });
  return noteInput;
}

function createNoteContent(note) {
  let noteContent = document.createElement('div');
  noteContent.classList.add('secondNoteContainer');
  noteContent.setAttribute('id', 'noteContain');

  if (note.content) {
    note.content.forEach(line => {
      if (line.trim() !== '') {
        noteContent.innerHTML += `- ${line}<br>`;
      }
    });
  } else {
    note.content = [];
  }
  return noteContent;
}

function createButtonContainer(note, noteInput, noteContent) {
  let buttonContainer = document.createElement('div');
  buttonContainer.classList.add('buttonposition');

  let saveButton = document.createElement('button');
  saveButton.innerText = 'Speichern';
  saveButton.classList.add('buttonSafe');
  saveButton.addEventListener('click', function () {
    let noteValue = noteInput.value.trim();
    if (noteValue !== '') {
      note.content.push(noteValue);
      noteContent.innerHTML += `- ${noteValue}<br>`;
      noteInput.value = '';
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  });

  let deleteButton = document.createElement('button');
  deleteButton.innerText = 'Löschen';
  deleteButton.classList.add('trashButton');
  deleteButton.addEventListener('click', function () {
    noteInput.value = '';
    noteContent.innerHTML = '';
    note.content = [];
    localStorage.setItem('notes', JSON.stringify(notes));
  });

  buttonContainer.appendChild(saveButton);
  buttonContainer.appendChild(deleteButton);
  return buttonContainer;
}

function createNoteContainer(note) {
  let newNoteContainer = document.createElement('div');
  newNoteContainer.classList.add('creatContain');
  newNoteContainer.setAttribute('id', note.id);

  let deleteContainer = createDeleteContainer(note, newNoteContainer);
  let noteContent = createNoteContent(note);
  let noteInput = createNoteInput(note, noteContent);
  let buttonContainer = createButtonContainer(note, noteInput, noteContent);

  newNoteContainer.appendChild(deleteContainer);
  newNoteContainer.appendChild(noteInput);
  newNoteContainer.appendChild(noteContent);
  newNoteContainer.appendChild(buttonContainer);

  let secondContainer = document.getElementById('secondcontainer');
  secondContainer.appendChild(newNoteContainer);
}

function deleteNoteFromStorage(id) {
  let noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
  }
}

window.onload = onload;