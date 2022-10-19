import {
	Content,
	Grid,
	QRImage,
	Section,
	Slide,
	Title,
	Wrapper,
} from "./styles";

import Button from "react-bootstrap/esm/Button";
import Canvas from "../../components/Canvas";
import Modal from "react-bootstrap/Modal";
import React from "react";
import SongChooser from "../../components/SongChooser";
import baseURL from "../../baseURL";
import fetchSongs from "../../scripts/fetchSongs";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

export default () => {
	const params = useParams();
	const songIds = params.songIds.split("+");

	const [socketConnected, setSocketConnected] = React.useState(false);
	const [selectedSlide, setSelectedSlide] = React.useState({
		songId: undefined,
		sectionIndex: undefined,
	});
	const [songs, setSongs] = React.useState([]);
	const { current: socket } = React.useRef(io(baseURL));

	React.useEffect(() => {
		socket.on("connect", () => setSocketConnected(true));

		fetchSongs().then((songs) => {
			setSongs(
				songIds.map((exampleID) =>
					songs.find((song) => song.id === exampleID)
				)
			);
		});
	}, []);

	const handleKeydown = ({ key }) => {
		const { songId, sectionIndex } = selectedSlide,
			matchId = ({ id }) => songId === id,
			song = songs.find(matchId),
			songIndex = songs.findIndex(matchId);

		console.log({ song, songIndex });

		if (song) {
			switch (key) {
				case "ArrowLeft":
					(function decrement() {
						if (sectionIndex - 1 >= 0) {
							setSelectedSlide({
								songId,
								sectionIndex: sectionIndex - 1,
							});
						} else if (songIndex - 1 >= 0) {
							setSelectedSlide({
								songId: songs[songIndex - 1].id,
								sectionIndex:
									songs[songIndex - 1].sections.length - 1,
							});
						}
					})();
					break;
				case "ArrowRight":
					(function increment() {
						if (sectionIndex + 1 < song.sections.length) {
							setSelectedSlide({
								songId,
								sectionIndex: sectionIndex + 1,
							});
						} else if (songIndex + 1 < songs.length) {
							setSelectedSlide({
								songId: songs[songIndex + 1].id,
								sectionIndex: 0,
							});
						}
					})();
					break;
			}
		}
	};

	React.useEffect(() => {
		const { songId, sectionIndex } = selectedSlide;
		if (
			socketConnected &&
			songId !== undefined &&
			sectionIndex !== undefined
		) {
			socket.emit(
				"change",
				songs.find(({ id }) => songId === id).sections[sectionIndex]
			);

			localStorage.setItem(
				"slide",
				JSON.stringify(
					songs.find(({ id }) => songId === id).sections[sectionIndex]
				)
			);
		}

		window.addEventListener("keydown", handleKeydown);

		return () => {
			socket.removeAllListeners("change");
			window.removeEventListener("keydown", handleKeydown);
		};
	}, [socketConnected, selectedSlide]);

	const [showModal, setShowModal] = React.useState(true);
	const handleModalClose = () => setShowModal(false);
	const handleScreenOpen = () => {
		window.open("/local-screen", "_blank", "popup=1");

		handleModalClose();
	};

	return (
		<Wrapper>
			<Modal show={showModal} onClose={handleModalClose}>
				<Modal.Body>
					Would you like to open the screen as well?
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleScreenOpen}>Yes</Button>
					<Button onClick={handleModalClose} variant="secondary">
						No
					</Button>
				</Modal.Footer>
			</Modal>
			{songs
				? songs.map(({ title, id: songId, ...song }, index) => (
						<Section key={`section-${index}`}>
							<Title>{title}</Title>
							<Grid>
								{song.sections.map(
									({ content, type }, sectionIndex) => (
										<Slide
											key={`song-section-${sectionIndex}`}
											type={type}
											// Just doing selected style
											selected={
												songId ===
													selectedSlide.songId &&
												sectionIndex ===
													selectedSlide.sectionIndex
											}
											onClick={() =>
												setSelectedSlide({
													songId,
													sectionIndex,
												})
											}
										>
											<Canvas content={content} />
											<Slide.Caption type={type}>
												{type}
											</Slide.Caption>
										</Slide>
									)
								)}
							</Grid>
						</Section>
				  ))
				: "Loading..."}

			<Section>
				<Title>Add a new song</Title>
				<SongChooser
					onAddSong={(song) => setSongs((songs) => [...songs, song])}
				/>
			</Section>

			<Section>
				<Title>QR Code</Title>
				<p>
					If someone would like to read the lyrics from a mobile
					device, they can scan the QR code below.
				</p>
				<QRImage />
			</Section>
		</Wrapper>
	);
};
