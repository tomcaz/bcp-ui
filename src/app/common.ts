
export type PaintType = {
    id?: string,
    updatedBy?: string,
    updatedAt?: Date,
    color: ColorType,
    paintQty: number,
    lane: LaneType
}

export enum LaneType {
    available = 'available',
    runningLow = 'runningLow',
    outOfStock = 'outOfStock'
}

// future feature
// address?: string,
// createdBy: string,
// createdAt: Date,
// painter?: string,

export enum ColorType {
    BLACK = 'black',
    BLUE = 'blue-500',
    GREY = 'gray-500',
    PURPLE = 'purple-500',
    WHITE = 'white'
}