import { LaneType, OrderStatus, OrderType, PaintType, UserType } from "@/app/common";
import { createAppSlice } from "@/lib/createAppSlice";
import { addUserBackend, getUsers, updateStatusBackend, updateUser } from "./userApi";


export interface paintSliceState {
    currentUser?: UserType,
    users: UserType[],
    status: "idle" | "loading" | "failed",
    editingUser?: UserType
}

const initialState: paintSliceState = {
    status: "idle",
    users: []
};

const defaultResponses = {
    pending: (state: any) => {
        state.status = "loading";
    },
    rejected: (state: any) => {
        state.status = "failed";
    },
}

export const sessionSlice = createAppSlice({
    name: "session",
    initialState,
    reducers: (create) => ({
        // loading paints from db
        loginSession: create.reducer((state, action: { payload: { username: string, role: string, status: string } }) => {
            state.currentUser = {
                username: action.payload.username,
                role: action.payload.role,
                status: action.payload.status
            }
        }),
        // loading paints from db
        logoutSession: create.reducer((state) => {
            state.currentUser = undefined
        }),
        editUser: create.reducer((state, action: { payload: UserType }) => {
            state.editingUser = action.payload
        }),
        cancelEditUser: create.reducer((state) => {
            state.editingUser = undefined
        }),
        // loading ordered paints from db
        updateRole: create.asyncThunk(
            async ({ username, role }) => {
                await updateUser({ username, role });
                return { username, role };
            },
            {
                ...defaultResponses,
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.users = [
                        ...state.users.map(user => ({
                            ...user,
                            role: user.username === action.payload.username ? action.payload.role : user.role
                        } as UserType))
                    ]
                },
            },
        ),
        updateStatus: create.asyncThunk(
            async (username: string) => {
                await updateStatusBackend(username);
                return username;
            },
            {
                ...defaultResponses,
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.users = [
                        ...state.users.map(user => ({
                            ...user,
                            status: user.username === action.payload ? (user.status === 'active' ? 'disabled' : 'active') : user.status
                        } as UserType))
                    ]
                },
            },
        ),
        addUser: create.asyncThunk(
            async ({ username, role, password }) => {
                await addUser({ username, role, password });
                return { username, role, password };
            },
            {
                ...defaultResponses,
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.users = [
                        ...state.users,
                        { ...action.payload, status: 'active' }
                    ]
                },
            },
        ),
        loadAllUser: create.asyncThunk(
            async () => {
                const response = await getUsers();
                return response;
            },
            {
                ...defaultResponses,
                fulfilled: (state, action) => {
                    state.status = "idle";
                    state.users = action.payload
                },
            },
        ),
    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        selectCurrentUser: (userSlice) => userSlice.currentUser,
        selectUsers: (userSlice) => userSlice.users,
        selectEditingUser: (userSlice) => userSlice.editingUser,
    },
});

export const { loginSession, logoutSession, updateRole, loadAllUser, addUser, updateStatus, editUser, cancelEditUser } = sessionSlice.actions;

export const { selectCurrentUser, selectUsers, selectEditingUser } = sessionSlice.selectors;
