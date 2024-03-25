
export type PaintType = {
    updatedBy?: string,
    updatedAt?: Date,
    color: ColorType,
    paintQty: number,
    lane: LaneType
}

export type OrderType = {
    id?: string, // uuid, will be generate from backend, null is for new before save
    address?: string, // pickup location
    createdBy: string, // painter name // should be uuid but may be in the future
    createdAt: string,
    paint?: PaintType,
    amount: number,
    status: OrderStatus
}

export enum LaneType {
    available = 'available',
    runningLow = 'runningLow',
    outOfStock = 'outOfStock',
    readyToPickup = 'readyToPickup'
}

export enum ColorType {
    BLACK = 'black',
    BLUE = 'blue-500',
    GREY = 'gray-500',
    PURPLE = 'purple-500',
    WHITE = 'white'
}
export enum OrderStatus {
    ORDERED = 'ordered',
    READY_TO_PICKUP = 'ready to pickup',
    PICK_UP = 'pick up'
}