import { configureStore } from "@reduxjs/toolkit";
import { alertReducer } from "../services/slice/alert.slice";
import { eventsReducer } from "../services/slice/events.slice";

export const store = configureStore({
	reducer: {
		events: eventsReducer,
		alert: alertReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
