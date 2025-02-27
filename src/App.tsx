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
			[new Cell(CellType.EMPTY, CellDirection.NONE, 0, 0), new Cell(CellType.EMPTY, CellDirection.NONE, 0, 1), new Cell(CellType.EMPTY, CellDirection.NONE, 0, 2), new Cell(CellType.EMPTY, CellDirection.NONE, 0, 3), new Cell(CellType.EMPTY, CellDirection.NONE, 0, 4), new Cell(CellType.EMPTY, CellDirection.NONE, 0, 5), new Cell(CellType.EMPTY, CellDirection.NONE, 0, 6), new Cell(CellType.EMPTY, CellDirection.NONE, 0, 7), new Cell(CellType.EMPTY, CellDirection.NONE, 0, 8), new Cell(CellType.EMPTY, CellDirection.NONE, 0, 9)],
			[new Cell(CellType.EMPTY, CellDirection.NONE, 1, 0), new Cell(CellType.EMPTY, CellDirection.NONE, 1, 1), new Cell(CellType.EMPTY, CellDirection.NONE, 1, 2), new Cell(CellType.HEAD, CellDirection.LEFT, 1, 3), new Cell(CellType.NORMAL, CellDirection.LEFT, 1, 4), new Cell(CellType.EMPTY, CellDirection.NONE, 1, 5), new Cell(CellType.EMPTY, CellDirection.NONE, 1, 6), new Cell(CellType.EMPTY, CellDirection.NONE, 1, 7), new Cell(CellType.EMPTY, CellDirection.NONE, 1, 8), new Cell(CellType.EMPTY, CellDirection.NONE, 1, 9)],
			[new Cell(CellType.EMPTY, CellDirection.NONE, 2, 0), new Cell(CellType.EMPTY, CellDirection.NONE, 2, 1), new Cell(CellType.EMPTY, CellDirection.NONE, 2, 2), new Cell(CellType.EMPTY, CellDirection.NONE, 2, 3), new Cell(CellType.NORMAL, CellDirection.UP, 2, 4), new Cell(CellType.EMPTY, CellDirection.NONE, 2, 5), new Cell(CellType.EMPTY, CellDirection.NONE, 2, 6), new Cell(CellType.EMPTY, CellDirection.NONE, 2, 7), new Cell(CellType.EMPTY, CellDirection.NONE, 2, 8), new Cell(CellType.EMPTY, CellDirection.NONE, 2, 9)],
			[new Cell(CellType.EMPTY, CellDirection.NONE, 3, 0), new Cell(CellType.EMPTY, CellDirection.NONE, 3, 1), new Cell(CellType.EMPTY, CellDirection.NONE, 3, 2), new Cell(CellType.EMPTY, CellDirection.NONE, 3, 3), new Cell(CellType.NORMAL, CellDirection.UP, 3, 4), new Cell(CellType.EMPTY, CellDirection.NONE, 3, 5), new Cell(CellType.EMPTY, CellDirection.NONE, 3, 6), new Cell(CellType.EMPTY, CellDirection.NONE, 3, 7), new Cell(CellType.EMPTY, CellDirection.NONE, 3, 8), new Cell(CellType.EMPTY, CellDirection.NONE, 3, 9)],
			[new Cell(CellType.EMPTY, CellDirection.NONE, 4, 0), new Cell(CellType.EMPTY, CellDirection.NONE, 4, 1), new Cell(CellType.EMPTY, CellDirection.NONE, 4, 2), new Cell(CellType.EMPTY, CellDirection.NONE, 4, 3), new Cell(CellType.NORMAL, CellDirection.UP, 4, 4), new Cell(CellType.NORMAL, CellDirection.LEFT, 4, 5), new Cell(CellType.NORMAL, CellDirection.LEFT, 4, 6), new Cell(CellType.TAIL, CellDirection.LEFT, 4, 7), new Cell(CellType.EMPTY, CellDirection.NONE, 4, 8), new Cell(CellType.EMPTY, CellDirection.NONE, 4, 9)],
			[new Cell(CellType.EMPTY, CellDirection.NONE, 5, 0), new Cell(CellType.EMPTY, CellDirection.NONE, 5, 1), new Cell(CellType.EMPTY, CellDirection.NONE, 5, 2), new Cell(CellType.EMPTY, CellDirection.NONE, 5, 3), new Cell(CellType.EMPTY, CellDirection.NONE, 5, 4), new Cell(CellType.EMPTY, CellDirection.NONE, 5, 5), new Cell(CellType.EMPTY, CellDirection.NONE, 5, 6), new Cell(CellType.EMPTY, CellDirection.NONE, 5, 7), new Cell(CellType.EMPTY, CellDirection.NONE, 5, 8), new Cell(CellType.EMPTY, CellDirection.NONE, 5, 9)],
			[new Cell(CellType.EMPTY, CellDirection.NONE, 6, 0), new Cell(CellType.EMPTY, CellDirection.NONE, 6, 1), new Cell(CellType.EMPTY, CellDirection.NONE, 6, 2), new Cell(CellType.EMPTY, CellDirection.NONE, 6, 3), new Cell(CellType.EMPTY, CellDirection.NONE, 6, 4), new Cell(CellType.EMPTY, CellDirection.NONE, 6, 5), new Cell(CellType.EMPTY, CellDirection.NONE, 6, 6), new Cell(CellType.EMPTY, CellDirection.NONE, 6, 7), new Cell(CellType.EMPTY, CellDirection.NONE, 6, 8), new Cell(CellType.EMPTY, CellDirection.NONE, 6, 9)],
			[new Cell(CellType.EMPTY, CellDirection.NONE, 7, 0), new Cell(CellType.APPLE, CellDirection.NONE, 7, 1), new Cell(CellType.EMPTY, CellDirection.NONE, 7, 2), new Cell(CellType.EMPTY, CellDirection.NONE, 7, 3), new Cell(CellType.EMPTY, CellDirection.NONE, 7, 4), new Cell(CellType.EMPTY, CellDirection.NONE, 7, 5), new Cell(CellType.EMPTY, CellDirection.NONE, 7, 6), new Cell(CellType.EMPTY, CellDirection.NONE, 7, 7), new Cell(CellType.EMPTY, CellDirection.NONE, 7, 8), new Cell(CellType.EMPTY, CellDirection.NONE, 7, 9)],
			[new Cell(CellType.EMPTY, CellDirection.NONE, 8, 0), new Cell(CellType.EMPTY, CellDirection.NONE, 8, 1), new Cell(CellType.EMPTY, CellDirection.NONE, 8, 2), new Cell(CellType.EMPTY, CellDirection.NONE, 8, 3), new Cell(CellType.EMPTY, CellDirection.NONE, 8, 4), new Cell(CellType.EMPTY, CellDirection.NONE, 8, 5), new Cell(CellType.EMPTY, CellDirection.NONE, 8, 6), new Cell(CellType.EMPTY, CellDirection.NONE, 8, 7), new Cell(CellType.EMPTY, CellDirection.NONE, 8, 8), new Cell(CellType.EMPTY, CellDirection.NONE, 8, 9)],
			[new Cell(CellType.EMPTY, CellDirection.NONE, 9, 0), new Cell(CellType.EMPTY, CellDirection.NONE, 9, 1), new Cell(CellType.EMPTY, CellDirection.NONE, 9, 2), new Cell(CellType.EMPTY, CellDirection.NONE, 9, 3), new Cell(CellType.EMPTY, CellDirection.NONE, 9, 4), new Cell(CellType.EMPTY, CellDirection.NONE, 9, 5), new Cell(CellType.EMPTY, CellDirection.NONE, 9, 6), new Cell(CellType.EMPTY, CellDirection.NONE, 9, 7), new Cell(CellType.EMPTY, CellDirection.NONE, 9, 8), new Cell(CellType.EMPTY, CellDirection.NONE, 9, 9)],
		];
        
        // setGridData(mockGridData2);

		// gameEngine.makeMove(gridData, gridData[1][3], gridData[4][7]);
		for (let i = 0; i < 3; i++) {
			setTimeout(() => {
				console.log('testMove ' + i);
				gameEngine.testMove();
                setGridData([...gameEngine.getGridData()]);
			}, i * 1000);
		}
		
		
    }, []);

	

	return (
		<>
			<Grid gridData={gridData} />
		</>
	);
}

export default App;
