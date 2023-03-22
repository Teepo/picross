export default function (rows, cols) {
    // créer un tableau vide pour stocker la grille
    const grid = [];

    // créer une boucle pour générer chaque ligne de la grille
    for (let i = 0; i < rows; i++) {
        // créer un tableau vide pour chaque ligne de la grille
        const row = [];
        // créer une boucle pour générer chaque case de la ligne
        for (let j = 0; j < cols; j++) {
            // générer une valeur aléatoire pour chaque case (0 ou 1)
            const cell = Math.round(Math.random());
            // ajouter la valeur à la ligne
            row.push(cell);
        }
        // ajouter la ligne complète à la grille
        grid.push(row);
    }

    // retourner la grille complète
    return grid;
};