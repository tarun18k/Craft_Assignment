import { toggleAlert } from "../services/slice/alert.slice";
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
			dispatch(
				toggleAlert({
					show: true,
					message: "You cannot select more than 3 events. Please remove an event to add some other.",
				})
			);
		} else if (isOverlappingEvent(selectedEventsList, selectedEvent)) {
			dispatch(
				toggleAlert({
					show: true,
					message: "You have overlapping events with the selected event time. Please remove overlapping events from the selected events list.",
				})
			);
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
			return prevDateEvent.end_time > futureDateEvent.start_time;
		});
	};

	return { selectEvent, deSelectEvent };
};

export default useValidateSelection;
