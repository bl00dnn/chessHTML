const chessboard = document.getElementById("chessboard");
const capturedWhite = document.getElementById("captured-white");
const capturedBlack = document.getElementById("captured-black");

// Массив для хранения позиций фигур
const initialSetup = [
    ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
    ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
    ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]
];

// Функция для отрисовки доски
function drawBoard() {
    chessboard.innerHTML = ""; // Очистка доски

    for (let row = 0; row < 8; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        rowDiv.dataset.row = row;

        for (let col = 0; col < 8; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            // Чередуем цвета: если сумма индексов чётная — белая клетка, иначе — чёрная
            if ((row + col) % 2 === 0) {
                cell.classList.add("white");
            } else {
                cell.classList.add("black");
            }

            cell.dataset.row = row;
            cell.dataset.col = col;

            // Проверяем, есть ли фигура на этой клетке
            const piece = initialSetup[row][col];
            if (piece) {
                const img = document.createElement("img");
                img.src = `shahmati/${piece}.png`;
                img.classList.add("piece");
                img.draggable = true; // Делаем фигуру перетаскиваемой
                cell.appendChild(img);
            }

            rowDiv.appendChild(cell);
        }

        chessboard.appendChild(rowDiv);
    }

    addDragAndDrop();
}



// Логика перетаскивания фигур
function addDragAndDrop() {
    const pieces = document.querySelectorAll(".piece");
    const cells = document.querySelectorAll(".cell");

    pieces.forEach(piece => {
        piece.addEventListener("dragstart", (e) => {
            const parentCell = e.target.parentElement;
            e.dataTransfer.setData("start-row", parentCell.dataset.row);
            e.dataTransfer.setData("start-col", parentCell.dataset.col);
        });
    });

    cells.forEach(cell => {
        cell.addEventListener("dragover", (e) => e.preventDefault());
        cell.addEventListener("drop", (e) => {
            e.preventDefault();
            const startRow = e.dataTransfer.getData("start-row");
            const startCol = e.dataTransfer.getData("start-col");
            const endRow = cell.dataset.row;
            const endCol = cell.dataset.col;

            const movingPiece = initialSetup[startRow][startCol];
            const targetPiece = initialSetup[endRow][endCol];

            if (targetPiece) {
                const targetZone = targetPiece.startsWith("w") ? capturedWhite : capturedBlack;
                const img = document.createElement("img");
                img.src = `figurespng/${targetPiece}.png`;
                img.classList.add("piece");
                targetZone.appendChild(img);
            }

            initialSetup[startRow][startCol] = null;
            initialSetup[endRow][endCol] = movingPiece;

            drawBoard();
        });
    });
}

// Инициализация игры
drawBoard();
