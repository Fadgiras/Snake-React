import { useEffect, useState } from 'react';
import './App.css';
import Grid from './assets/Grid';
import './core/GameEngine';
import GameEngine from './core/GameEngine';
import Cell from './core/cell/CellCore';
import { CellType } from './core/cell/CellType';
import { CellDirection } from './core/cell/CellDirection';

function App() {

	const [gridData, setGridData] = useState<Cell[][]>([]);
    const gameEngine = new GameEngine();

	useEffect(() => {
        const mockGridData2: Cell[][] = [
			[new Cell(CellType.Empty, CellDirection.None, 0, 0), new Cell(CellType.Empty, CellDirection.None, 0, 1), new Cell(CellType.Empty, CellDirection.None, 0, 2), new Cell(CellType.Empty, CellDirection.None, 0, 3), new Cell(CellType.Empty, CellDirection.None, 0, 4), new Cell(CellType.Empty, CellDirection.None, 0, 5), new Cell(CellType.Empty, CellDirection.None, 0, 6), new Cell(CellType.Empty, CellDirection.None, 0, 7), new Cell(CellType.Empty, CellDirection.None, 0, 8), new Cell(CellType.Empty, CellDirection.None, 0, 9)],
			[new Cell(CellType.Empty, CellDirection.None, 1, 0), new Cell(CellType.Empty, CellDirection.None, 1, 1), new Cell(CellType.Empty, CellDirection.None, 1, 2), new Cell(CellType.Head, CellDirection.Left, 1, 3), new Cell(CellType.Normal, CellDirection.Left, 1, 4), new Cell(CellType.Empty, CellDirection.None, 1, 5), new Cell(CellType.Empty, CellDirection.None, 1, 6), new Cell(CellType.Empty, CellDirection.None, 1, 7), new Cell(CellType.Empty, CellDirection.None, 1, 8), new Cell(CellType.Empty, CellDirection.None, 1, 9)],
			[new Cell(CellType.Empty, CellDirection.None, 2, 0), new Cell(CellType.Empty, CellDirection.None, 2, 1), new Cell(CellType.Empty, CellDirection.None, 2, 2), new Cell(CellType.Empty, CellDirection.None, 2, 3), new Cell(CellType.Normal, CellDirection.Up, 2, 4), new Cell(CellType.Empty, CellDirection.None, 2, 5), new Cell(CellType.Empty, CellDirection.None, 2, 6), new Cell(CellType.Empty, CellDirection.None, 2, 7), new Cell(CellType.Empty, CellDirection.None, 2, 8), new Cell(CellType.Empty, CellDirection.None, 2, 9)],
			[new Cell(CellType.Empty, CellDirection.None, 3, 0), new Cell(CellType.Empty, CellDirection.None, 3, 1), new Cell(CellType.Empty, CellDirection.None, 3, 2), new Cell(CellType.Empty, CellDirection.None, 3, 3), new Cell(CellType.Normal, CellDirection.Up, 3, 4), new Cell(CellType.Empty, CellDirection.None, 3, 5), new Cell(CellType.Empty, CellDirection.None, 3, 6), new Cell(CellType.Empty, CellDirection.None, 3, 7), new Cell(CellType.Empty, CellDirection.None, 3, 8), new Cell(CellType.Empty, CellDirection.None, 3, 9)],
			[new Cell(CellType.Empty, CellDirection.None, 4, 0), new Cell(CellType.Empty, CellDirection.None, 4, 1), new Cell(CellType.Empty, CellDirection.None, 4, 2), new Cell(CellType.Empty, CellDirection.None, 4, 3), new Cell(CellType.Normal, CellDirection.Up, 4, 4), new Cell(CellType.Normal, CellDirection.Left, 4, 5), new Cell(CellType.Normal, CellDirection.Left, 4, 6), new Cell(CellType.Tail, CellDirection.Left, 4, 7), new Cell(CellType.Empty, CellDirection.None, 4, 8), new Cell(CellType.Empty, CellDirection.None, 4, 9)],
			[new Cell(CellType.Empty, CellDirection.None, 5, 0), new Cell(CellType.Empty, CellDirection.None, 5, 1), new Cell(CellType.Empty, CellDirection.None, 5, 2), new Cell(CellType.Empty, CellDirection.None, 5, 3), new Cell(CellType.Empty, CellDirection.None, 5, 4), new Cell(CellType.Empty, CellDirection.None, 5, 5), new Cell(CellType.Empty, CellDirection.None, 5, 6), new Cell(CellType.Empty, CellDirection.None, 5, 7), new Cell(CellType.Empty, CellDirection.None, 5, 8), new Cell(CellType.Empty, CellDirection.None, 5, 9)],
			[new Cell(CellType.Empty, CellDirection.None, 6, 0), new Cell(CellType.Empty, CellDirection.None, 6, 1), new Cell(CellType.Empty, CellDirection.None, 6, 2), new Cell(CellType.Empty, CellDirection.None, 6, 3), new Cell(CellType.Empty, CellDirection.None, 6, 4), new Cell(CellType.Empty, CellDirection.None, 6, 5), new Cell(CellType.Empty, CellDirection.None, 6, 6), new Cell(CellType.Empty, CellDirection.None, 6, 7), new Cell(CellType.Empty, CellDirection.None, 6, 8), new Cell(CellType.Empty, CellDirection.None, 6, 9)],
			[new Cell(CellType.Empty, CellDirection.None, 7, 0), new Cell(CellType.Apple, CellDirection.None, 7, 1), new Cell(CellType.Empty, CellDirection.None, 7, 2), new Cell(CellType.Empty, CellDirection.None, 7, 3), new Cell(CellType.Empty, CellDirection.None, 7, 4), new Cell(CellType.Empty, CellDirection.None, 7, 5), new Cell(CellType.Empty, CellDirection.None, 7, 6), new Cell(CellType.Empty, CellDirection.None, 7, 7), new Cell(CellType.Empty, CellDirection.None, 7, 8), new Cell(CellType.Empty, CellDirection.None, 7, 9)],
			[new Cell(CellType.Empty, CellDirection.None, 8, 0), new Cell(CellType.Empty, CellDirection.None, 8, 1), new Cell(CellType.Empty, CellDirection.None, 8, 2), new Cell(CellType.Empty, CellDirection.None, 8, 3), new Cell(CellType.Empty, CellDirection.None, 8, 4), new Cell(CellType.Empty, CellDirection.None, 8, 5), new Cell(CellType.Empty, CellDirection.None, 8, 6), new Cell(CellType.Empty, CellDirection.None, 8, 7), new Cell(CellType.Empty, CellDirection.None, 8, 8), new Cell(CellType.Empty, CellDirection.None, 8, 9)],
			[new Cell(CellType.Empty, CellDirection.None, 9, 0), new Cell(CellType.Empty, CellDirection.None, 9, 1), new Cell(CellType.Empty, CellDirection.None, 9, 2), new Cell(CellType.Empty, CellDirection.None, 9, 3), new Cell(CellType.Empty, CellDirection.None, 9, 4), new Cell(CellType.Empty, CellDirection.None, 9, 5), new Cell(CellType.Empty, CellDirection.None, 9, 6), new Cell(CellType.Empty, CellDirection.None, 9, 7), new Cell(CellType.Empty, CellDirection.None, 9, 8), new Cell(CellType.Empty, CellDirection.None, 9, 9)],
		];
        
        setGridData(mockGridData2);

		// gameEngine.makeMove(gridData, CellDirection.Up);
		// setGridData(gameEngine.getGridData());
    }, []);

	

	return (
		<>
			<Grid gridData={gridData} />
		</>
	);
}

export default App;
