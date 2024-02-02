import { Background, Layout, Lyrics, Title } from "./styles";

import Canvas from "../../components/Canvas";
import React from "react";
import baseURL from "../../baseURL";
import defaultSettings from "../../components/Canvas/defaultSettings";

export default () => {
	const [slide, setSlide] = React.useState({
		image: undefined,
		content: undefined,
		type: undefined,
	});

	const onStorageChange = ({ key, newValue }) => {
		if (key === "slide") {
			// Slide has changed!

			setSlide(JSON.parse(newValue));
		}
	};

	React.useEffect(() => {
		window.addEventListener("storage", onStorageChange);
		return () => window.removeEventListener("storage", onStorageChange);
	}, []);

	// could use { content, type } but didn't need 'type' for anything
	const { content, image } = slide;

	if (!content && !image)
		return (
			<div
				style={{
					display: "flex",
					width: "100vw",
					height: "100vh",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					rowGap: "15px",
				}}
			>
				<h3>Move me to the projector screen</h3>
				<p>Then, select a slide</p>
			</div>
		);

	if (image) {
		return <Canvas image={image} />;
	}

	if (content) {
		return (
			<Background
				style={{ backgroundColor: defaultSettings.backgroundColor }}
			>
				<Canvas content={content} settings={{ textColor: "#1a1a1a" }} />
			</Background>
		);
	}
};
