let board = loadBoard();

let editingCardId = null;
let editingStatus = null;
let addingToStatus = null;

let selectedPriority = "medium";

const columns = [
  "todo",
  "inprogress",
  "done"
];


// ===============================
// RENDER BOARD
// ===============================

function render() {

  columns.forEach((status) => {

    const list = document.getElementById(
      `list-${status}`
    );

    const count = document.getElementById(
      `count-${status}`
    );

    if (!list || !count) return;

    list.innerHTML = "";

    board[status].forEach((card) => {

      const cardElement =
        createCardElement(card, status);

      list.appendChild(cardElement);

    });

    count.textContent =
      board[status].length;

  });


  updateSidebarCounts();

  saveBoard(board);

}


// ===============================
// CREATE CARD
// ===============================

function createCardElement(card, status) {

  const element =
    document.createElement("div");

  element.className = "task-card";

  element.draggable = true;

  element.dataset.id = card.id;

  element.dataset.status = status;


  element.innerHTML = `

    <div class="task-top">

      <span class="priority ${card.priority}">
        ${escapeHtml(card.priority)}
      </span>

      <div class="card-actions">

        <button
          class="edit-btn"
          title="Edit task"
          type="button"
        >
          ✏️
        </button>

        <button
          class="delete-btn"
          title="Delete task"
          type="button"
        >
          🗑️
        </button>

      </div>

    </div>


    <h3 class="task-title">
      ${escapeHtml(card.title)}
    </h3>


    ${
      card.desc
        ? `<p class="task-description">
             ${escapeHtml(card.desc)}
           </p>`
        : ""
    }

  `;


  // Edit
  element
    .querySelector(".edit-btn")
    .addEventListener("click", (event) => {

      event.stopPropagation();

      openEditModal(card, status);

    });


  // Delete
  element
    .querySelector(".delete-btn")
    .addEventListener("click", (event) => {

      event.stopPropagation();

      deleteCard(card.id, status);

    });


  return element;

}


// ===============================
// ADD TASK BUTTONS
// ===============================

document
  .querySelectorAll(".add-card-btn")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const status =
        button.dataset.status;

      openAddModal(status);

    });

  });


// ===============================
// OPEN ADD MODAL
// ===============================

function openAddModal(status) {

  editingCardId = null;
  editingStatus = null;

  addingToStatus = status;

  selectedPriority = "medium";

  document.getElementById(
    "modal-heading"
  ).textContent = "Add Task";

  document.getElementById(
    "modal-title"
  ).value = "";

  document.getElementById(
    "modal-desc"
  ).value = "";

  updatePriorityButtons();

  openModal();

  document.getElementById(
    "modal-title"
  ).focus();

}


// ===============================
// OPEN EDIT MODAL
// ===============================

function openEditModal(card, status) {

  editingCardId = card.id;

  editingStatus = status;

  addingToStatus = null;

  selectedPriority =
    card.priority || "medium";


  document.getElementById(
    "modal-heading"
  ).textContent = "Edit Task";


  document.getElementById(
    "modal-title"
  ).value = card.title;


  document.getElementById(
    "modal-desc"
  ).value = card.desc || "";


  updatePriorityButtons();

  openModal();

}


// ===============================
// OPEN / CLOSE MODAL
// ===============================

function openModal() {

  document
    .getElementById("modal-overlay")
    .classList.add("show");

}


function closeModal() {

  document
    .getElementById("modal-overlay")
    .classList.remove("show");

}


// ===============================
// SAVE BUTTON
// ===============================

document
  .getElementById("modal-save")
  .addEventListener("click", saveTask);


function saveTask() {

  const title =
    document
      .getElementById("modal-title")
      .value
      .trim();


  const desc =
    document
      .getElementById("modal-desc")
      .value
      .trim();


  if (!title) {

    alert("Please enter a task title.");

    document
      .getElementById("modal-title")
      .focus();

    return;

  }


  // EDIT EXISTING TASK
  if (editingCardId) {

    const card =
      board[editingStatus]
        .find(
          (item) =>
            item.id === editingCardId
        );


    if (card) {

      card.title = title;

      card.desc = desc;

      card.priority =
        selectedPriority;

    }

  }


  // ADD NEW TASK
  else if (addingToStatus) {

    const newCard = {

      id: generateId(),

      title: title,

      desc: desc,

      priority: selectedPriority

    };


    board[addingToStatus]
      .push(newCard);

  }


  closeModal();

  render();

}


// ===============================
// CANCEL
// ===============================

document
  .getElementById("modal-cancel")
  .addEventListener(
    "click",
    closeModal
  );


document
  .getElementById("modal-close")
  .addEventListener(
    "click",
    closeModal
  );


// ===============================
// CLOSE MODAL BY CLICKING OUTSIDE
// ===============================

document
  .getElementById("modal-overlay")
  .addEventListener("click", (event) => {

    if (
      event.target.id ===
      "modal-overlay"
    ) {

      closeModal();

    }

  });


// ===============================
// PRIORITY BUTTONS
// ===============================

document
  .querySelectorAll(".priority-btn")
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        selectedPriority =
          button.dataset.priority;

        updatePriorityButtons();

      }
    );

  });


function updatePriorityButtons() {

  document
    .querySelectorAll(".priority-btn")
    .forEach((button) => {

      button.classList.toggle(
        "active",
        button.dataset.priority ===
        selectedPriority
      );

    });

}


// ===============================
// DELETE TASK
// ===============================

function deleteCard(id, status) {

  const confirmed =
    confirm(
      "Are you sure you want to delete this task?"
    );


  if (!confirmed) return;


  board[status] =
    board[status].filter(
      (card) =>
        card.id !== id
    );


  render();

}


// ===============================
// GENERATE ID
// ===============================

function generateId() {

  return (
    "c" +
    Date.now() +
    Math.floor(
      Math.random() * 1000
    )
  );

}


// ===============================
// SIDEBAR COUNTS
// ===============================

function updateSidebarCounts() {

  const todo =
    document.getElementById(
      "side-todo-count"
    );

  const progress =
    document.getElementById(
      "side-progress-count"
    );

  const done =
    document.getElementById(
      "side-done-count"
    );


  if (todo) {

    todo.textContent =
      `${board.todo.length} tasks`;

  }


  if (progress) {

    progress.textContent =
      `${board.inprogress.length} tasks`;

  }


  if (done) {

    done.textContent =
      `${board.done.length} tasks`;

  }

}


// ===============================
// ESCAPE HTML
// ===============================

function escapeHtml(value) {

  const div =
    document.createElement("div");

  div.textContent =
    value || "";

  return div.innerHTML;

}
// ===============================
// DRAG AND DROP
// ===============================

let draggedCardId = null;


// DRAG START
document.addEventListener("dragstart", (event) => {

  const card = event.target.closest(".task-card");

  if (!card) return;

  draggedCardId = card.dataset.id;

  event.dataTransfer.setData(
    "text/plain",
    draggedCardId
  );

  event.dataTransfer.effectAllowed = "move";

  card.classList.add("dragging");

});


// DRAG END
document.addEventListener("dragend", (event) => {

  const card = event.target.closest(".task-card");

  if (card) {
    card.classList.remove("dragging");
  }

  document
    .querySelectorAll(".column")
    .forEach((column) => {

      column.classList.remove("drag-over");

    });

  draggedCardId = null;

});


// DRAG OVER
document.addEventListener("dragover", (event) => {

  const column =
    event.target.closest(".column");

  if (!column) return;

  event.preventDefault();

  column.classList.add("drag-over");

  event.dataTransfer.dropEffect = "move";

});


// DRAG LEAVE
document.addEventListener("dragleave", (event) => {

  const column =
    event.target.closest(".column");

  if (!column) return;

  if (!column.contains(event.relatedTarget)) {

    column.classList.remove("drag-over");

  }

});


// DROP
document.addEventListener("drop", (event) => {

  const column =
    event.target.closest(".column");

  if (!column) return;

  event.preventDefault();

  column.classList.remove("drag-over");


  const cardId =
    event.dataTransfer.getData("text/plain") ||
    draggedCardId;


  const newStatus =
    column.dataset.status;


  if (!cardId || !newStatus) return;


  moveCard(cardId, newStatus);

});


// ===============================
// MOVE CARD
// ===============================

function moveCard(id, newStatus) {

  let card = null;

  let oldStatus = null;


  // Find the card
  columns.forEach((status) => {

    const index =
      board[status].findIndex(
        (item) =>
          String(item.id) === String(id)
      );


    if (index !== -1) {

      card =
        board[status][index];

      oldStatus = status;

      board[status].splice(
        index,
        1
      );

    }

  });


  // Card not found
  if (!card) {

    console.log(
      "Card not found:",
      id
    );

    return;

  }


  // Add card to new column
  board[newStatus].push(card);


  // Save changes
  saveBoard(board);


  // Re-render board
  render();

}


// ===============================
// INITIAL RENDER
// ===============================

render();