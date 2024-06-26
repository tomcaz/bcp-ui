'use server'
import { ColorType, LaneType, OrderStatus, OrderType, PaintType } from "@/app/common";

const backendUrl = process.env.BACKEND_URL

export const fetchPaints = async (): Promise<PaintType[]> => {
    const response = await fetch(`${backendUrl}/paints`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const result: PaintType[] = await response.json();
    return result
};

export const fetchOrderedPaints = async (): Promise<OrderType[]> => {
    const response = await fetch(`${backendUrl}/paints/orders`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const result: OrderType[] = await response.json();
    const paints = await fetchPaints()
    return result.map(order => ({
        ...order,
        paint: paints.filter((p: any) => p['_id'] === order.paint)[0]
    }) as OrderType)
}
// db to save
export const setPaintLane = async (paint: PaintType, lane: LaneType): Promise<{ color: ColorType, lane: LaneType }> => {
    const response = await fetch(`${backendUrl}/paints`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            paint, lane
        })
    });
    const result: OrderType[] = await response.json();
    return { color: paint.color, lane }
}
// painterUuid for logging purpose, future use
// call backend to update
export const changePaintQty = async (painterUuid: string, paint: PaintType, amount: number): Promise<{ color: ColorType, amount: number }> => {
    const response = await fetch(`${backendUrl}/paints/amount`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            amount, paint
        })
    });
    const result: OrderType[] = await response.json();
    return { color: paint.color, amount }
}

// update the status of the order
export const changeOrderedPaintStatus = async (orderId: string, status: OrderStatus): Promise<{ orderId: string, status: OrderStatus }> => {
    // call backend to update
    const response = await fetch(`${backendUrl}/paints/orders`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            orderId, status
        })
    });
    const result: OrderType[] = await response.json();
    return { orderId, status }
}
export const addOrderedPaint = async (order: OrderType): Promise<OrderType> => {
    // call backend to create an order
    const response = await fetch(`${backendUrl}/paints/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)

    });
    const result = await response.json();
    console.log(result)
    return {
        ...order, id: result.id
    }
}
