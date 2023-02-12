import {
	deSelectEvents,
	getSelectedEvents,
	IEvent,
	selectEvents,
} from "../services/slice/events.slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const useValidateSelection = () => {
	const dispatch = useAppDispatch();
	const selectedEventsList = useAppSelector(getSelectedEvents);

	function selectEvent(selectedEvent: IEvent) {
		if (selectedEventsList.length === 3) {
			console.log("Cannot Select More than 3 events.");
		} else if (isOverlappingEvent(selectedEventsList, selectedEvent)) {
			console.log("Overlapping Events");
		} else {
			dispatch(selectEvents(selectedEvent));
		}
	}

	function deSelectEvent(deSelectedEvent: IEvent) {
		dispatch(deSelectEvents(deSelectedEvent));
	}

	const isOverlappingEvent = (
		eventList: IEvent[],
		selectedEvent: IEvent
	) => {
		let selectedStartDate = new Date(
			selectedEvent.start_time
		).toISOString();
		return eventList.some((event: IEvent) => {
			let currentDate = new Date(event.start_time).toISOString();
			let prevDateEvent =
				currentDate > selectedStartDate ? selectedEvent : event;
			let futureDateEvent =
				currentDate > selectedStartDate ? event : selectedEvent;
			return prevDateEvent.end_time >= futureDateEvent.start_time;
		});
	};

	return { selectEvent, deSelectEvent };
};

export default useValidateSelection;
