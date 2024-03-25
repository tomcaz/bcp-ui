import { PaintType } from '@/app/common';
import { createAppSlice } from "@/lib/createAppSlice";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DragDropState {
    dragging: boolean,
    currentDraggingPaint: PaintType | null // null when dragging is false
}

const initialState: DragDropState = {
    dragging: false,
    currentDraggingPaint: null
};

export const DragDropSlice = createAppSlice({
    name: 'DragDrop',
    initialState,
    reducers: (create) => ({
        startedDragging: create.reducer((state, action: { payload: PaintType }) => {
            state.currentDraggingPaint = { ...action.payload }
            state.dragging = true
        }), cancelDragging: create.reducer((state) => {
            state.currentDraggingPaint = null,
                state.dragging = false
        }),
    }), selectors: {
        selectDragging: (slice) => slice.dragging,
        currentDraggingPaint: (slice) => slice.currentDraggingPaint,
    }
});

export const { startedDragging, cancelDragging } = DragDropSlice.actions;

export const { selectDragging, currentDraggingPaint } = DragDropSlice.selectors;
