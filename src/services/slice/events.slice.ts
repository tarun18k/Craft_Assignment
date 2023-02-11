import type { AnyAction, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
// Define a type for the slice state
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
}

// Define the initial state using that type
const initialState: IEventState = {
	allEvents: [],
	selectedEvents: [],
	noDataFound: false,
	isLoading: false,
};

export const eventsSlice = createSlice({
	name: "events",
	// `createSlice` will infer the state type from the `initialState` argument
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
	},
});

export const { eventsReceived, selectEvents, deSelectEvents } =
	eventsSlice.actions;

// Constants
export const getEventsList = () => (dispatch: Dispatch<AnyAction>) => {
	const url = "https://run.mocky.io/v3/2744c231-8991-4ae8-bc45-1f645437585a";
	fetch(url, { method: "GET" })
		.then((res) => res.json())
		.then((res: IEvent[]) => {
			dispatch(eventsReceived(res));
		});
};

// Other code such as selectors can use the imported `RootState` type
export const getEvents = (state: RootState) => state.events.allEvents;

export const getSelectedEvents = (state: RootState) =>
	state.events.selectedEvents;

export const getDataState = (state: RootState) => state.events.noDataFound;

export const getLoadingState = (state: RootState) => state.events.isLoading;

export const eventsReducer = eventsSlice.reducer;
