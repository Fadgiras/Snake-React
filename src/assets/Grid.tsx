import React from 'react';
import Cell from '../core/cell/CellCore';
import { CellType } from '../core/cell/CellType';

interface GridProps {
    gridData: Cell[][];
}

const Grid: React.FC<GridProps> = (GridProps) => {

    const { gridData } = GridProps;

    const getCellDirection = (cell: Cell) => {
    //     UP,
    // DOWN,
    // LEFT,
    // RIGHT,
        switch (cell.getDirection()) {
            case 0:
                return '⬆️';
            case 1:
                return '⬇️';
            case 2:
                return '⬅️';
            case 3:
                return '➡️';
            default:
                return '';
        }
                
    }

    const getCellContent = (cell: Cell) => {
        switch (cell.getType()) {
            case CellType.HEAD:
                return '👾';
            case CellType.NORMAL:
                return '🧱';
            case CellType.TAIL:
                return '🏁';
            case CellType.APPLE:
                return '🍎'
            case CellType.EMPTY:
            default:
                return '';
        }
    }

    return (
        <div className="grid grid-cols-10 border border-red-700">
            {gridData.map((row, rowIndex) => (
                row.map((cell, cellIndex) => (
                    <div className="w-24 h-24 bg-gray-300 border border-solid border-black text-4xl flex items-center justify-center" 
                         key={rowIndex + "-"+ cellIndex}>
                        {getCellContent(cell)}
                        {getCellDirection(cell)}
                    </div>
                ))
            ))}
        </div>
    );
};

export default Grid;