import { Canvas } from "./styles";
import React from "react";
import defaultSettings from "./defaultSettings";
import drawMultilineText from "canvas-multiline-text";

export default ({ content, settings = {}, width = "100%" }) => {
	const canvasRef = React.useRef(null);

	Object.keys(defaultSettings).forEach((key) => {
		if (!settings.hasOwnProperty(key)) settings[key] = defaultSettings[key];
	});

	React.useEffect(() => {
		if (canvasRef.current) {
			const { current: canvas } = canvasRef;

			console.log({ settings });

			const { scale, aspectRatio } = settings,
				[arWidth, arHeight] = aspectRatio.split(":");

			canvas.width = arWidth * scale;
			canvas.height = arHeight * scale;

			const context = canvas.getContext("2d"),
				{ backgroundColor, textColor, font, lineHeight } = settings;

			context.fillStyle = backgroundColor;
			context.fillRect(0, 0, canvas.width, canvas.height);

			context.fillStyle = textColor;
			context.font = `${font.weight} ${font.size}px/${
				lineHeight * font.size
			}px ${font.family}`;
			context.fillStyle = textColor;
			context.textBaseline = "top";

			const margin = 30;

			content.split("\n").forEach((line, index) => {
				context.fillText(
					line,
					margin,
					margin + index * (lineHeight * font.size),
					canvas.width - margin * 2
				);
			});

			// drawMultilineText(context, content, {
			// 	lineHeight,
			// });
		}
	}, [content]);

	return <Canvas ref={canvasRef} style={{ width }} />;
};
