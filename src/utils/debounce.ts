const debounce = (func: (val: string) => void, delay: number): Function => {
	let timer: any;
	return function () {
		let args = arguments;
		clearTimeout(timer);
		timer = setTimeout(() => {
			console.log(args);
			func(args[0]);
		}, delay);
	};
};
export default debounce;
