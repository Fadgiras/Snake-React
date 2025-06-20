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
    gameGrid: Cell[][] = [];

    public initializeGame() {
        this.headPosition = { x: 6, y: 5 };
        this.tailPosition = { x: 6, y: 6 };
        this.applePosition = { x: 1, y: 2 };

        this.appleEaten = false;

        this.gameGrid = Array.from({ length: 10 }, (_, x) =>
            Array.from({ length: 10 }, (_, y) => new Cell(CellType.EMPTY, CellDirection.NONE, x, y))
        );
        this.gameGrid[this.headPosition.x][this.headPosition.y].setType(CellType.HEAD).setDirection(CellDirection.DOWN).setX(this.headPosition.x).setY(this.headPosition.y);
        this.gameGrid[this.tailPosition.x][this.tailPosition.y].setType(CellType.TAIL).setDirection(CellDirection.DOWN).setX(this.tailPosition.x).setY(this.tailPosition.y);
    }

    public testMove(dir : CellDirection) {
        this.currentDirection = dir;
        this.makeMove(this.getHeadCell(), this.getTailCell());
        

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
        console.log('Tail cell in makeMove', tailCell);

        console.log('Current Direction', this.getCellDirectionStr(headCell));
        console.log('Current Tail Direction', this.getCellDirectionStr(tailCell));


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
        console.log('tailPosition', this.tailPosition);
        console.log('tail cell in getTailCell', this.gameGrid[this.tailPosition.x][this.tailPosition.y]);
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

    isEmpty(position: { x: number; y: number; }) {
        return this.gameGrid[position.x][position.y].getType() === CellType.EMPTY;
    }
    isHeadCell(cell: Cell) {
        return cell.getType() === CellType.HEAD;
    }

    updateHeadPosition(headCell : Cell) {
        let newHeadPosition = { x: this.headPosition.x, y: this.headPosition.y };
        console.log('headCell in updateHeadPosition', headCell);

        switch (this.currentDirection) {
            case CellDirection.UP:
                console.log('moving up');
                newHeadPosition.y -= 1;
                break;
            case CellDirection.DOWN:
                console.log('moving down');
                newHeadPosition.y += 1;
                break;
            case CellDirection.LEFT:
                console.log('moving left');
                newHeadPosition.x -= 1;
                break;
            case CellDirection.RIGHT:
                console.log('moving right');
                newHeadPosition.x += 1;
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

        console.log('new head cell', this.gameGrid[newHeadPosition.x][newHeadPosition.y]);

        this.gameGrid[newHeadPosition.x][newHeadPosition.y].setType(CellType.HEAD).setDirection(this.getDirectionReversed(this.currentDirection));
        this.gameGrid[this.headPosition.x][this.headPosition.y].setType(CellType.NORMAL);
        this.headPosition = newHeadPosition;
        console.log('newHeadPosition', newHeadPosition);
        return true
    }

    updateTailPosition(tailCell : Cell) {
        console.log('tailCell in updatetail', tailCell);
        let newTailPosition = { x: this.tailPosition.x, y: this.tailPosition.y };
        let cellToGoTo = this.getCellPointingAtCurrentCell(tailCell);
        console.log('cellToGoTo', cellToGoTo);
        if (cellToGoTo) {
            newTailPosition = { x: cellToGoTo.getX(), y: cellToGoTo.getY() };
            this.gameGrid[newTailPosition.x][newTailPosition.y].setType(CellType.TAIL).setDirection(cellToGoTo.getDirection());
            this.gameGrid[this.tailPosition.x][this.tailPosition.y].setType(CellType.EMPTY).setDirection(CellDirection.NONE);
            this.tailPosition = newTailPosition;
        }
        return true;
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
        return this.getHeadCell().getDirection() === direction;
    }

    isSamePosition(pos1: { x: number; y: number; }, pos2: { x: number; y: number; }) {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    }

    makeMockMove(cell: Cell) {
        console.log('makeMockMove', cell);
        let newPosition = { x: cell.getX(), y: cell.getY() };

        switch (cell.getDirection()) {
            case CellDirection.UP:
                newPosition.y -= 1;
                break;
            case CellDirection.DOWN:
                newPosition.y += 1;
                break;
            case CellDirection.LEFT:
                newPosition.x -= 1;
                break;
            case CellDirection.RIGHT:
                newPosition.x += 1;
                break;
        }

        return newPosition;
    }

    getCellPointingAtCurrentCell(cell: Cell) {
        let cellPosition = { x: cell.getX(), y: cell.getY() };
        console.log('getCellPointingAtCurrentCell', cellPosition);
        // for each neighbor cell, check if it is pointing at the current cell
        let neighbors = [
            { x: cellPosition.x - 1, y: cellPosition.y }, // LEFT
            { x: cellPosition.x + 1, y: cellPosition.y }, // RIGHT
            { x: cellPosition.x, y: cellPosition.y - 1 }, // UP
            { x: cellPosition.x, y: cellPosition.y + 1 }  // DOWN
        ];

        console.log('neighbors', neighbors.length);
        for (let neighbor of neighbors) {
            if (this.isOutOfBounds(neighbor)) {
                console.log('neighbor out of bounds', neighbor);
                continue;
            }
            if (this.isEmpty(neighbor)) {
                console.log('neighbor is empty', neighbor);
                continue;
            }
            if (this.isHeadCell(this.gameGrid[neighbor.x][neighbor.y])) {
                console.log('neighbor is head cell', neighbor);
                continue;
            }

            console.log('neighbor is not empty nor out of bounds', neighbor);

            //TODO correct this condition, its broken for sure
            let neighborCell = this.gameGrid[neighbor.x][neighbor.y];
            console.log('neighborCell', neighborCell);

            
            // console.log('cell direction up', CellDirection.UP); // 0
            // console.log('cell direction down', CellDirection.DOWN); // 1
            // console.log('cell direction left', CellDirection.LEFT); // 2 
            // console.log('cell direction right', CellDirection.RIGHT); // 3
            // console.log('cell direction none', CellDirection.NONE); // 4

            // console.log('cell original direction', cell.getDirection());
            // console.log('getDirectionReversed', this.getDirectionReversed(cell.getDirection()));

            // console.log('neighborCell', neighborCell.getDirection());
            // console.log('cell', this.getDirectionReversed(cell.getDirection()));
            // console.log('neighborCell maybe pointing at current cell', this.makeMockMove(neighborCell));
            // console.log(this.makeMockMove(neighborCell), cellPosition, this.makeMockMove(neighborCell) == cellPosition);
            // console.log('is neighborCell pointing at current cell?', this.makeMockMove(neighborCell) == cellPosition);
            
            if (this.isSamePosition(this.makeMockMove(neighborCell), cellPosition)) {
                return neighborCell;
            }
        }
        return null;
    }

}

export default GameEngine;