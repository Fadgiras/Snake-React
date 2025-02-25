import React from 'react';
import Cell from '../core/cell/CellCore';
import { CellType } from '../core/cell/CellType';

interface GridProps {
    gridData: Cell[][];
}

const Grid: React.FC<GridProps> = (GridProps) => {

    const { gridData } = GridProps;

    const getCellContent = (cell: Cell) => {
        switch (cell.getType()) {
            case CellType.Head:
                return '👾';
            case CellType.Normal:
                return '🧱';
            case CellType.Tail:
                return '🏁';
            case CellType.Apple:
                return '🍎'
            case CellType.Empty:
            default:
                return '';
        }
    }

    return (
        <div className="grid grid-cols-10 border border-red-700">
            {gridData.map((row, rowIndex) => (
                row.map((cell, cellIndex) => (
                    <div className="w-24 h-24 
                                    bg-gray-300 
                                    border border-solid border-black
                                    text-4xl 
                                    flex items-center justify-center
                                    " 
                         key={rowIndex + "-"+ cellIndex}>
                        {getCellContent(cell)}
                    </div>
                ))
            ))}
        </div>
    );
};

export default Grid;