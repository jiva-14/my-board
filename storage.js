const STORAGE_KEY = "kanbanBoard";

function loadBoard() {

  const savedBoard = localStorage.getItem(STORAGE_KEY);

  if (savedBoard) {

    try {
      return JSON.parse(savedBoard);
    } catch (error) {
      console.error("Could not load saved board:", error);
    }

  }

  return {
    todo: [],
    inprogress: [],
    done: []
  };
}


function saveBoard(board) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(board)
  );

}