import type { AnyAction, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface IEvent {
	id: number;
	event_name: string;
	event_category: string;
	start_time: string;
	end_time: string;
}

interface IEventState {
	allEvents: IEvent[];
	selectedEvents: IEvent[];
	noDataFound: boolean;
	isLoading: boolean;
	showError: boolean;
}

const initialState: IEventState = {
	allEvents: [],
	selectedEvents: [],
	noDataFound: false,
	isLoading: false,
	showError: false,
};

export const eventsSlice = createSlice({
	name: "events",
	initialState,
	reducers: {
		eventsReceived: (state, action: PayloadAction<IEvent[]>) => {
			state.allEvents = action.payload;
			state.noDataFound = action.payload.length ? false : true;
		},

		selectEvents: (state, action: PayloadAction<IEvent>) => {
			state.selectedEvents = [...state.selectedEvents, action.payload];
			state.allEvents = state.allEvents.filter((event) => {
				return event.id !== action.payload.id;
			});
		},

		deSelectEvents: (state, action: PayloadAction<IEvent>) => {
			state.selectedEvents = state.selectedEvents.filter((event) => {
				return event.id !== action.payload.id;
			});
			state.allEvents = [...state.allEvents, action.payload];
		},

		setErrorState: (state, action: PayloadAction<boolean>) => {
			state.showError = action.payload;
		},

		setIsLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
	},
});

export const {
	eventsReceived,
	selectEvents,
	deSelectEvents,
	setErrorState,
	setIsLoading,
} = eventsSlice.actions;

// Constants
export const getEventsList = () => (dispatch: Dispatch<AnyAction>) => {
	dispatch(setIsLoading(true));

	const url = "https://run.mocky.io/v3/2744c231-8991-4ae8-bc45-1f645437585a";

	fetch(url, { method: "GET" })
		.then((res) => res.json())
		.then((res: IEvent[]) => {
			dispatch(setIsLoading(false));
			dispatch(eventsReceived(res));
		})
		.catch(() => {
			dispatch(setIsLoading(false));
			dispatch(setErrorState(true));
		});
};

export const getEvents = (state: RootState) => state.events.allEvents;

export const getSelectedEvents = (state: RootState) =>
	state.events.selectedEvents;

export const getDataState = (state: RootState) => state.events.noDataFound;

export const getLoadingState = (state: RootState) => state.events.isLoading;

export const getErrorState = (state: RootState) => state.events.showError;

export const eventsReducer = eventsSlice.reducer;
