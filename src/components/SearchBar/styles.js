import FormControl from "react-bootstrap/FormControl";
import { ListGroup } from "react-bootstrap";
import styled from "styled-components";

export const Wrapper = styled.div`
	position: relative;
	z-index: 9999;
`;

const inputHeight = 50;
export const Input = styled(FormControl).attrs({ type: "text" })`
	height: ${inputHeight}px;
`;

export const Suggestions = styled(ListGroup)`
	position: absolute;
	top: ${inputHeight + 5}px;
	display: ${({ show }) => (show ? "block" : "none")};
`;

export const Lyric = styled.span`
	display: block;
	color: grey;
	font-style: italic;
	font-size: 13px;
`;
