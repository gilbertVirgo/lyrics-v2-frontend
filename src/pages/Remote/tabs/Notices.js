import { Button, Modal } from "react-bootstrap";
import { Grid, Section, Slide, Title } from "../styles";

import Canvas from "../../../components/Canvas";
import React from "react";
import fetchNoticesSlides from "../../../scripts/fetchNoticesSlides";

export default () => {
	const [notices, setNotices] = React.useState();
	const [error, setError] = React.useState();
	const [selectedKey, setSelectedKey] = React.useState({
		section: "this_week",
		index: 0,
	});

	React.useEffect(() => {
		fetchNoticesSlides().then(setNotices).catch(setError);
	}, []);

	const setSlide = (image) =>
		localStorage.setItem(
			"slide",
			JSON.stringify({
				image,
			})
		);

	if (!notices) return "Loading...";

	return (
		<React.Fragment>
			<Modal show={!!error} onExit={setError.bind(null, undefined)}>
				<Modal.Body>
					<h1>Error</h1>
					<p>{error}</p>
				</Modal.Body>
			</Modal>
			<Section>
				<Title>This week</Title>
				<Grid>
					{notices.this_week.map(({ image }, index) => {
						return (
							<Slide
								key={`this-week-notices-${index}`}
								selected={
									selectedKey.section === "this_week" &&
									selectedKey.index === index
								}
								onClick={() => {
									setSelectedKey({
										section: "this_week",
										index,
									});
									setSlide(image.url);
								}}
							>
								<Canvas image={image.url} />
							</Slide>
						);
					})}
				</Grid>
			</Section>
			{/* <Section>
				<Title>Looped</Title>
				<div>
					<Button>Start</Button>
				</div>
				<Grid>
					{notices.looped.map(({ image }, index) => {
						return (
							<Slide
								key={`looped-notices-${index}`}
								selected={
									selectedKey.section === "looped" &&
									selectedKey.index === index
								}
							>
								<Canvas image={image.url} />
							</Slide>
						);
					})}
				</Grid>
			</Section> */}
		</React.Fragment>
	);
};
