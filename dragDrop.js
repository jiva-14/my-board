// ===============================
// DRAG AND DROP
// ===============================

const boardColumns =
  document.querySelectorAll(".column");


// Make cards draggable
function enableDragForCards() {

  const cards =
    document.querySelectorAll(".task-card");


  cards.forEach((card) => {

    card.addEventListener(
      "dragstart",
      (event) => {

        event.dataTransfer.setData(
          "text/plain",
          card.dataset.id
        );

        card.classList.add(
          "dragging"
        );

      }
    );


    card.addEventListener(
      "dragend",
      () => {

        card.classList.remove(
          "dragging"
        );

      }
    );

  });

}


// Column drag events
boardColumns.forEach((column) => {

  column.addEventListener(
    "dragover",
    (event) => {

      event.preventDefault();

      column.classList.add(
        "drag-over"
      );

    }
  );


  column.addEventListener(
    "dragleave",
    () => {

      column.classList.remove(
        "drag-over"
      );

    }
  );


  column.addEventListener(
    "drop",
    (event) => {

      event.preventDefault();

      column.classList.remove(
        "drag-over"
      );


      const cardId =
        event.dataTransfer.getData(
          "text/plain"
        );


      const newStatus =
        column.dataset.status;


      moveCard(
        cardId,
        newStatus
      );

    }
  );

});


// ===============================
// MOVE CARD
// ===============================

function moveCard(id, newStatus) {

  let card = null;

  let oldStatus = null;


  columns.forEach((status) => {

    const index =
      board[status].findIndex(
        (item) =>
          item.id === id
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


  if (!card) return;


  board[newStatus].push(card);


  render();

}
