import styled from "styled-components";

export const Wrapper = styled.main`
	box-sizing: border-box;
	padding: 15px;
`;
export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	row-gap: 15px;
	column-gap: 15px;
`;
export const Slide = styled.div`
	box-sizing: border-box;
	border-style: solid;
	border-width: 4px;
	border-radius: 4px;
	border-color: ${({ selected }) => (selected ? `red` : `transparent`)};
	position: relative;
	cursor: pointer;

	canvas {
		display: block;
	}

	p {
		margin: 0;
	}

	&:hover {
		.slide-caption {
			display: none;
		}
	}
`;
Slide.Caption = styled.span.attrs({ className: "slide-caption" })`
	display: block;
	position: absolute;
	left: 0;
	bottom: 0;
	font-size: 14px;
	padding: 5px;
	box-sizing: border-box;
	color: white;
	width: 100%;

	background-color: ${({ type }) => {
		switch (type) {
			case "Chorus":
				return "darkblue";
			case "Verse":
				return "darkgreen";
			case "Bridge":
				return "darkred";
		}
	}};
`;
export const Content = styled.p`
	white-space: pre; // or pre-wrap
`;
export const Section = styled.section`
	margin-bottom: 30px;
`;
export const Title = styled.h3`
	font-weight: 500;
	margin-bottom: 5px;
`;
export const QRImage = styled.img.attrs({
	src: require("../../assets/global-screen-qr.png"),
})`
	display: block;
	width: 100%;
	max-width: 300px;
	max-height: 80vh;
	margin: 15px auto;
`;
