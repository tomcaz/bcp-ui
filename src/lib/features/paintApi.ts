import { ColorType, LaneType, OrderStatus, OrderType, PaintType } from "@/app/common";

const backendUrl = 'http://localhost:3001'

// TODO
export const fetchPaints = async (): Promise<PaintType[]> => {
    // const response = await fetch(`${backendUrl}/paint`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ amount }),
    // });
    // const result: { data: number } = await response.json();
    // TODO
    return [
        { color: ColorType.WHITE, paintQty: 200, lane: LaneType.available },
        { color: ColorType.BLUE, paintQty: 50, lane: LaneType.runningLow },
        { color: ColorType.GREY, paintQty: 10, lane: LaneType.runningLow },
        { color: ColorType.PURPLE, paintQty: 300, lane: LaneType.available },
        { color: ColorType.BLACK, paintQty: 250, lane: LaneType.available }
    ] as PaintType[]
};

// TODO
export const fetchOrderedPaints = async (): Promise<OrderType[]> => {
    return [
    ] as OrderType[]
}
// TODO
// db to save
export const setPaintLane = async (paint: PaintType, lane: LaneType): Promise<{ color: ColorType, lane: LaneType }> => {
    return { color: paint.color, lane }
}
// TODO
// painterUuid for logging purpose, future use
// call backend to update
export const changePaintQty = async (painterUuid: number, paint: PaintType, amount: number): Promise<{ color: ColorType, amount: number }> => {
    return { color: paint.color, amount }
}

// TODO
// update the status of the order
export const changeOrderedPaintStatus = async (orderId: string, status: OrderStatus): Promise<{ orderId: string, status: OrderStatus }> => {
    // call backend to update
    return { orderId, status }
}
// TODO
export const addOrderedPaint = async (order: OrderType): Promise<OrderType> => {
    // call backend to create an order
    return {
        ...order, id: 'dummy id'
    }
}
