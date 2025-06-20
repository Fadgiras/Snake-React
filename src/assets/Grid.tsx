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
            {Array.from({ length: 10 }, (_, y) => (
                Array.from({ length: 10 }, (_, x) => {
                    const cell = gridData[x]?.[y];
                    return (
                        <div className="w-24 h-24 bg-gray-300 border border-solid border-black text-4xl flex items-center justify-center"
                            key={y + "-" + x}>
                            {cell && getCellContent(cell)}
                            {cell && getCellDirection(cell)}
                            {/* <p className="text-xs text-black">
                                {cell ? `{ x:${cell.getX()}, y:${cell.getY()} }` : ''}
                            </p> */}
                        </div>
                    );
                })
            ))}
        </div>
    );
};

export default Grid;