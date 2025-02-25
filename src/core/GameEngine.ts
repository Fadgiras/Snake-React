import Cell from "./cell/CellCore";
import { CellType } from "./cell/CellType";
import { CellDirection } from "./cell/CellDirection";

class GameEngine {

    constructor() {
        this.initializeGame();
    }

    headPosition = { x: 0, y: 0 };
    tailPosition = { x: 0, y: 0 };
    applePosition = { x: 0, y: 0 };
    appleEaten = true;

    gameGrid: Cell[][] = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => new Cell(CellType.Empty, CellDirection.None, 0, 0)));

    public initializeGame() {
        this.headPosition = { x: 5, y: 5 };
        this.tailPosition = { x: 6, y: 5 };
        // this.applePosition = { x: 0, y: 0 };
        this.appleEaten = true

        this.gameGrid[this.headPosition.x][this.headPosition.y].setType(CellType.Head);
        this.gameGrid[this.tailPosition.x][this.tailPosition.y].setType(CellType.Tail);
    }

    public makeMove(gridData: Cell[][], direction: CellDirection) {
        let newHeadPosition = { x: this.headPosition.x, y: this.headPosition.y };
        console.log('newHeadPosition', newHeadPosition);
        switch (direction) {
            case CellDirection.Up:
                newHeadPosition.x -= 1;
                break;
            case CellDirection.Down:
                newHeadPosition.x += 1;
                break;
            case CellDirection.Left:
                newHeadPosition.y -= 1;
                break;
            case CellDirection.Right:
                newHeadPosition.y += 1;
                break;
        }
        if (this.isOutOfBounds(newHeadPosition)) {
            return;
        }
        if (this.isApple(newHeadPosition)) {
            this.appleEaten = true;
        }
        if (this.isTail(newHeadPosition)) {
            return;
        }
        this.updateGridData(gridData, newHeadPosition);
    }

    getHeadPosition(gridData: string[][]) : { x: number; y: number; } {
        let position = { x: 0, y: 0 };
        gridData.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell === '@') {
                    console.log('found at', rowIndex, cellIndex);
                    position = { x: rowIndex, y: cellIndex };
                }
            });
        });
        return position;
    }

    getTailPosition(gridData: string[][]) : { x: number; y: number; } {
        let position = { x: 0, y: 0 };
        gridData.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (cell === '-') {
                    position = { x: rowIndex, y: cellIndex };
                }
            });
        });
        return position;
    }

    isOutOfBounds(position: { x: number; y: number; }) {
        return position.x < 0 || position.x >= 10 || position.y < 0 || position.y >= 10;
    }

    isApple(position: { x: number; y: number; }) {
        return this.gameGrid[position.x][position.y].getType() === CellType.Apple;
    }

    isTail(position: { x: number; y: number; }) {
        return this.gameGrid[position.x][position.y].getType() === CellType.Tail;
    }

    updateGridData(gridData: Cell[][], newHeadPosition: { x: number; y: number; }) {
        this.gameGrid[this.headPosition.x][this.headPosition.y].setType(CellType.Normal);
        this.gameGrid[newHeadPosition.x][newHeadPosition.y].setType(CellType.Head);
        this.headPosition = newHeadPosition;
    }

    getGridData() {
        return this.gameGrid;
    }

}

export default GameEngine;