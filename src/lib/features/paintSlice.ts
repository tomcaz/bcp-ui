import { LaneType, OrderStatus, OrderType, PaintType } from "@/app/common";
import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { addOrderedPaint, changeOrderedPaintStatus, changePaintQty, fetchOrderedPaints, fetchPaints, setPaintLane } from "./paintApi";

export interface paintSliceState {
    paints: PaintType[];
    orderedPaints: OrderType[];
    status: "idle" | "loading" | "failed";
}

const initialState: paintSliceState = {
    paints: [],
    orderedPaints: [],
    status: "idle",
};

const defaultResponses = {
    pending: (state: any) => {
        state.status = "loading";
    },
    rejected: (state: any) => {
        state.status = "failed";
    },
}

export const paintSlice = createAppSlice({
    name: "Paint",
    initialState,
    reducers: (create) => ({
        // loading paints from db
        loadPaintAsync: create.asyncThunk(
            async () => {
                const response = await fetchPaints();
                return response;
            },
            {
                ...defaultResponses,
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.paints = [
                        ...action.payload
                    ];
                },
            },
        ),
        // loading ordered paints from db
        loadOrderedPaintAsync: create.asyncThunk(
            async () => {
                const response = await fetchOrderedPaints();
                return response;
            },
            {
                ...defaultResponses,
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.orderedPaints = [
                        ...action.payload
                    ];
                },
            },
        ),
        // change lanes of paints then save to db
        changeLaneAsync: create.asyncThunk(
            async ({ paint, lane }: { paint: PaintType, lane: LaneType }) => {
                const response = await setPaintLane(paint, lane);
                return response;
            },
            {
                ...defaultResponses,
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.paints = [
                        ...state.paints.filter(p => p.color !== action.payload.color),
                        {
                            ...state.paints.filter(p => p.color === action.payload.color)[0],
                            lane: action.payload.lane
                        }
                    ];
                },
            },
        ),
        // change status of paints then save to db 
        //e.g. reduce paints qty or correction of paints qty
        adjustPaintsAsync: create.asyncThunk(
            async ({ painterUuid, paint, amount }: { painterUuid: string, paint: PaintType, amount: number }) => {
                const response = await changePaintQty(painterUuid, paint, amount);
                return response;
            },
            {
                ...defaultResponses,
                fulfilled: (state, action) => {
                    console.log(action.payload)
                    state.status = "idle";
                    state.paints = [
                        ...state.paints.filter(p => p.color !== action.payload.color),
                        {
                            ...state.paints.filter(p => p.color === action.payload.color)[0],
                            paintQty: action.payload.amount
                        }
                    ];
                },
            },
        ),
        // change status of ordered paints e.g. pickup
        pickupPaintAsync: create.asyncThunk(
            async ({ order, status }: { order: string, status: OrderStatus }) => {
                const response = await changeOrderedPaintStatus(order, status);
                return response;
            },
            {
                ...defaultResponses,
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.orderedPaints = [
                        ...state.orderedPaints.filter(p => p.id !== action.payload.orderId),
                        {
                            ...state.orderedPaints.filter(p => p.id === action.payload.orderId)[0],
                            status: action.payload.status
                        }
                    ];
                },
            },
        ),
        // addordered paints 
        addOrderedPaintAsync: create.asyncThunk(
            async (order) => {
                const response = await addOrderedPaint(order);
                return response;
            },
            {
                ...defaultResponses,
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.orderedPaints = [
                        ...state.orderedPaints,
                        { ...action.payload }
                    ];
                },
            },
        ),
    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        selectPaints: (paintSlice) => paintSlice.paints,
        selectOrderedPaints: (paintSlice) => paintSlice.orderedPaints,
        selectStatus: (paintSlice) => paintSlice.status,
    },
});

export const { loadPaintAsync, loadOrderedPaintAsync, changeLaneAsync, adjustPaintsAsync, pickupPaintAsync, addOrderedPaintAsync } =
    paintSlice.actions;

export const { selectPaints, selectOrderedPaints, selectStatus } = paintSlice.selectors;
