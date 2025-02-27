import { CellType } from './CellType';
import { CellDirection } from './CellDirection';

class Cell {
    private type: CellType = 0;
    private direction: CellDirection = 0;
    private x!: number;
    private y!: number;


    constructor(type?: CellType, direction?: CellDirection, x?: number, y?: number) {
        this.type = type || CellType.EMPTY;
        this.direction = direction || CellDirection.NONE;
        this.x = x || 0;
        this.y = y || 0;
    }

    public getType() {
        return this.type;
    }

    public setType(type: CellType) {
        this.type = type;
        return this;
    }

    public getDirection() {
        return this.direction;
    }

    public setDirection(direction: CellDirection) {
        this.direction = direction;
        return this;
    }

    public getX() {
        return this.x;
    }

    public setX(x: number) {
        this.x = x;
        return this;
    }

    public getY() {
        return this.y;
    }

    public setY(y: number) {
        this.y = y;
        return this;
    }

    public isHead() {
        return this.type === CellType.HEAD;
    }

    public isTail() {
        return this.type === CellType.TAIL;
    }

    public isNormal() {
        return this.type === CellType.NORMAL;
    }

    public isEmpty() {
        return this.type === CellType.EMPTY;
    }

    public isSnake() {
        return this.type === CellType.HEAD || this.type === CellType.TAIL || this.type === CellType.NORMAL;
    }

    public isApple() {
        return this.type === CellType.APPLE;
    }


}

export default Cell;