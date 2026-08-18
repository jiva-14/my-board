// ===============================
// DRAG AND DROP
// ===============================

let draggedCardId = null;

// Start dragging a card
document.addEventListener("dragstart", (event) => {

  const card = event.target.closest(".task-card");

  if (!card) return;

  draggedCardId = card.dataset.id;

  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", draggedCardId);

  card.classList.add("dragging");
});


// Stop dragging
document.addEventListener("dragend", (event) => {

  const card = event.target.closest(".task-card");

  if (card) {
    card.classList.remove("dragging");
  }

  draggedCardId = null;

  document.querySelectorAll(".column").forEach((column) => {
    column.classList.remove("drag-over");
  });
});


// Allow dropping on columns
document.addEventListener("dragover", (event) => {

  const column = event.target.closest(".column");

  if (!column) return;

  event.preventDefault();

  column.classList.add("drag-over");

  event.dataTransfer.dropEffect = "move";
});


// Remove drag-over effect
document.addEventListener("dragleave", (event) => {

  const column = event.target.closest(".column");

  if (!column) return;

  // Only remove when actually leaving the column
  if (!column.contains(event.relatedTarget)) {
    column.classList.remove("drag-over");
  }
});


// Drop card into column
document.addEventListener("drop", (event) => {

  const column = event.target.closest(".column");

  if (!column) return;

  event.preventDefault();

  column.classList.remove("drag-over");

  const cardId =
    event.dataTransfer.getData("text/plain") ||
    draggedCardId;

  const newStatus = column.dataset.status;

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

    const index = board[status].findIndex(
      (item) => String(item.id) === String(id)
    );

    if (index !== -1) {

      card = board[status][index];

      oldStatus = status;

      board[status].splice(index, 1);
    }
  });


  // Card not found
  if (!card) {
    console.log("Card not found:", id);
    return;
  }


  // Put card into new column
  board[newStatus].push(card);


  // Save and display updated board
  saveBoard(board);

  render();
}
