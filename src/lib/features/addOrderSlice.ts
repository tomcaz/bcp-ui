import { ColorType, OrderStatus, OrderType, PaintType } from '@/app/common';
import { createAppSlice } from "@/lib/createAppSlice";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DragDropState {
    formData: OrderType,
    showForm: boolean // null when dragging is false
}

type FormPayload =
    { createdBy: string } |
    { createdAt: string } |
    { address: string } |
    { paint?: PaintType } |
    { amount: number } |
    { status: OrderStatus.ORDERED }

const initialState: DragDropState = {
    showForm: false,
    formData: {
        createdBy: 'currentUser',// TODO
        createdAt: new Date().toString(),
        address: '',
        amount: 0,
        status: OrderStatus.ORDERED
    }
};

export const AddOrderSlice = createAppSlice({
    name: 'AddOrder',
    initialState,
    reducers: (create) => ({
        resetForm: create.reducer((state) => {
            state.formData = {
                createdBy: 'currentUser',// TODO
                createdAt: new Date().toString(),
                address: '',
                paint: undefined,
                amount: 0,
                status: OrderStatus.ORDERED
            }
        }), changeShowForm: create.reducer((state, action: { payload: boolean }) => {
            state.showForm = action.payload
        }), changeFormData: create.reducer((state, action: { payload: FormPayload }) => {
            console.log(action.payload)
            state.formData = {
                ...state.formData,
                ...action.payload
            }
        })
    }), selectors: {
        selectShowForm: (slice) => slice.showForm,
        selectFormData: (slice) => slice.formData,
    }
});

export const { resetForm, changeShowForm, changeFormData } = AddOrderSlice.actions;

export const { selectShowForm, selectFormData } = AddOrderSlice.selectors;
