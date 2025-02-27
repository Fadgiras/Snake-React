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
    appleEaten = false;
    currentDirection = CellDirection.UP;

    gameGrid: Cell[][] = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => new Cell(CellType.EMPTY, CellDirection.NONE, 0, 0)));

    public initializeGame() {
        this.headPosition = { x: 5, y: 5 };
        this.tailPosition = { x: 6, y: 5 };
        this.applePosition = { x: 1, y: 2 };

        this.appleEaten = false;

        this.gameGrid[this.headPosition.x][this.headPosition.y].setType(CellType.HEAD).setDirection(CellDirection.DOWN);
        this.gameGrid[this.tailPosition.x][this.tailPosition.y].setType(CellType.TAIL).setDirection(CellDirection.DOWN);
    }

    public testMove() {
        this.makeMove(this.getHeadCell(), this.getTailCell());
        
        const randomDirection = Math.floor(Math.random() * 4);
        this.currentDirection = randomDirection;

        console.log('head', this.headPosition);
        console.log('tail', this.tailPosition);
    }


    getCellDirectionStr = (cell: Cell) => {
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

    public makeMove(headCell : Cell, tailCell : Cell) {

        if (this.isNextDirectionOldDirection(this.currentDirection)) {
            console.log('Invalid Move');
            return;
        }

        if (this.updateHeadPosition(headCell)) {
            if (!this.appleEaten) {
                this.updateTailPosition(tailCell);
            }else{
                this.appleEaten = false;
            }
        }else{
            console.log('Game Over');
            console.log('head GO', this.headPosition);
            console.log('tail GO', this.tailPosition);

        }

    console.log(this.getCellDirectionStr(this.getHeadCell()));
        
    }

    getHeadCell() {
        return this.gameGrid[this.headPosition.x][this.headPosition.y];
    }

    getTailCell() {
        return this.gameGrid[this.tailPosition.x][this.tailPosition.y];
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
        return this.gameGrid[position.x][position.y].getType() === CellType.APPLE;
    }

    isTail(position: { x: number; y: number; }) {
        return this.gameGrid[position.x][position.y].getType() === CellType.TAIL;
    }

    isBody(position: { x: number; y: number; }) {
        return this.gameGrid[position.x][position.y].getType() === CellType.NORMAL;
    }

    updateHeadPosition(headCell : Cell) {
        let newHeadPosition = { x: this.headPosition.x, y: this.headPosition.y };

        switch (this.currentDirection) {
            case CellDirection.UP:
                newHeadPosition.x -= 1;
                break;
            case CellDirection.DOWN:
                newHeadPosition.x += 1;
                break;
            case CellDirection.LEFT:
                newHeadPosition.y -= 1;
                break;
            case CellDirection.RIGHT:
                newHeadPosition.y += 1;
                break;
        }
        if (this.isOutOfBounds(newHeadPosition)) {
            return false;
        }
        if (this.isApple(newHeadPosition)) {
            this.appleEaten = true;
        }
        if (this.isTail(newHeadPosition)) {
            return false;
        }
        if (this.isBody(newHeadPosition)) {
            return false;
        }

        this.gameGrid[newHeadPosition.x][newHeadPosition.y].setType(CellType.HEAD).setDirection(this.getDirectionReversed(headCell.getDirection()));
        this.gameGrid[this.headPosition.x][this.headPosition.y].setType(CellType.NORMAL);
        this.headPosition = newHeadPosition;
        return true
    }

    updateTailPosition(tailCell : Cell) {
        let newTailPosition = { x: this.tailPosition.x, y: this.tailPosition.y };

        switch (this.getDirectionReversed(tailCell.getDirection())) {
            case CellDirection.UP:
                newTailPosition.x -= 1;
                break;
            case CellDirection.DOWN:
                newTailPosition.x += 1;
                break;
            case CellDirection.LEFT:
                newTailPosition.y -= 1;
                break;
            case CellDirection.RIGHT:
                newTailPosition.y += 1;
                break;
        }

        this.gameGrid[newTailPosition.x][newTailPosition.y].setType(CellType.TAIL);
        this.gameGrid[this.tailPosition.x][this.tailPosition.y].setType(CellType.EMPTY).setDirection(CellDirection.NONE);
        this.tailPosition = newTailPosition;
    }

    getGridData() {
        return this.gameGrid;
    }

    setApplePosition(applePosition: { x: number; y: number; }) {
        this.gameGrid[this.applePosition.x][this.applePosition.y].setType(CellType.EMPTY);
        this.gameGrid[applePosition.x][applePosition.y].setType(CellType.APPLE);
        this.applePosition = applePosition;
    }

    getDirectionReversed(direction: CellDirection) {
        switch (direction) {
            case CellDirection.UP:
                return CellDirection.DOWN;
            case CellDirection.DOWN:
                return CellDirection.UP;
            case CellDirection.LEFT:
                return CellDirection.RIGHT;
            case CellDirection.RIGHT:
                return CellDirection.LEFT;
            default:
                return CellDirection.NONE;
        }
    }

    isNextDirectionOldDirection(direction: CellDirection) {
        return this.getHeadCell().getDirection() === this.getDirectionReversed(direction);
    }

}

export default GameEngine;