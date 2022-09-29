export default (event, setSlideIndex) => {
	event.stopImmediatePropagation();

	const { key } = event;
	console.log("keying");

	if (key === "ArrowLeft")
		setSlideIndex((slideIndex) =>
			slideIndex > 0 ? slideIndex - 1 : slideIndex
		);

	if (key === "ArrowRight") setSlideIndex((slideIndex) => slideIndex + 1);
};
