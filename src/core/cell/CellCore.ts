import { CellType } from './CellType';
import { CellDirection } from './CellDirection';

class Cell {
    private type: CellType = 0;
    private direction: CellDirection = 0;
    private x!: number;
    private y!: number;


    constructor(type?: CellType, direction?: CellDirection, x?: number, y?: number) {
        this.type = type || CellType.Empty;
        this.direction = direction || CellDirection.None;
        this.x = x || 0;
        this.y = y || 0;
    }

    public getType() {
        return this.type;
    }

    public setType(type: CellType) {
        this.type = type;
    }

    public getDirection() {
        return this.direction;
    }

    public setDirection(direction: CellDirection) {
        this.direction = direction;
    }

    public getX() {
        return this.x;
    }

    public setX(x: number) {
        this.x = x;
    }

    public getY() {
        return this.y;
    }

    public setY(y: number) {
        this.y = y;
    }

    public isHead() {
        return this.type === CellType.Head;
    }

    public isTail() {
        return this.type === CellType.Tail;
    }

    public isNormal() {
        return this.type === CellType.Normal;
    }

    public isEmpty() {
        return this.type === CellType.Empty;
    }

    public isSnake() {
        return this.type === CellType.Head || this.type === CellType.Tail || this.type === CellType.Normal;
    }

    public isApple() {
        return this.type === CellType.Apple;
    }


}

export default Cell;