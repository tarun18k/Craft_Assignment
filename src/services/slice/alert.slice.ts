import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface IAlertState {
	show: boolean;
	message: string;
}

const initialState: IAlertState = {
	show: false,
	message: "",
};

export const alertSlice = createSlice({
	name: "alert",
	initialState,
	reducers: {
		toggleAlert: (state, action: PayloadAction<IAlertState>) => {
			state.show = action.payload.show;
			state.message = action.payload.message;
		},
	},
});

export const { toggleAlert } = alertSlice.actions;

export const getAlertState = (state: RootState) => state.alert;

export const alertReducer = alertSlice.reducer;
