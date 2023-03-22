export default function (rows, columns) {

    // Créer une grille vide
    const grid = new Array(rows).fill(null).map(() => new Array(columns).fill(null));

    // Remplir aléatoirement les cases de la grille
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (Math.random() < 0.5) {
                grid[i][j] = 1;
            } else {
                grid[i][j] = 0;
            }
        }
    }

    // Calculer les indices des lignes
    const rowIndices = [];
    for (let i = 0; i < rows; i++) {
        let currentRun = 0;
        const rowIndicesForRow = [];
        for (let j = 0; j < columns; j++) {
            if (grid[i][j] === 1) {
                currentRun++;
            } else if (currentRun > 0) {
                rowIndicesForRow.push(currentRun);
                currentRun = 0;
            }
        }
        if (currentRun > 0) {
            rowIndicesForRow.push(currentRun);
        }
        rowIndices.push(rowIndicesForRow);
    }

    // Calculer les indices des colonnes
    const columnIndices = [];
    for (let j = 0; j < columns; j++) {
        let currentRun = 0;
        const columnIndicesForColumn = [];
        for (let i = 0; i < rows; i++) {
            if (grid[i][j] === 1) {
                currentRun++;
            } else if (currentRun > 0) {
                columnIndicesForColumn.push(currentRun);
                currentRun = 0;
            }
        }
        if (currentRun > 0) {
            columnIndicesForColumn.push(currentRun);
        }
        columnIndices.push(columnIndicesForColumn);
    }

    // Retourner la grille et les indices
    return grid;
}