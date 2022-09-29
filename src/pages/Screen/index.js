// Will recieve from socket

import { Background, Layout, Lyrics, Title } from "./styles";

import Canvas from "../../components/Canvas";
import React from "react";
import baseURL from "../../baseURL";
import defaultSettings from "../../components/Canvas/defaultSettings";
import { io } from "socket.io-client";

export default () => {
	const [socketConnected, setSocketConnected] = React.useState(false);
	const [slide, setSlide] = React.useState({
		content: undefined,
		type: undefined,
	});

	// ws://localhost:5000
	const { current: socket } = React.useRef(io(baseURL));

	React.useEffect(() => {
		console.log("connected");

		socket.on("connect", () => {
			setSocketConnected(true);
		});

		return () => socket.removeAllListeners("change");
	}, []);

	React.useEffect(() => {
		if (socketConnected) {
			socket.on("change", setSlide);
		}
	}, [socketConnected]);

	const { content } = slide;

	if (content) {
		return (
			<Background
				style={{ backgroundColor: defaultSettings.backgroundColor }}
			>
				<Canvas content={content} settings={{ textColor: "#1a1a1a" }} />
			</Background>
		);
	} else
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
};
