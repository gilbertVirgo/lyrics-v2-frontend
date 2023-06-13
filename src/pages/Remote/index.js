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
import SearchBar from "../../components/SearchBar";
import fetchSongs from "../../scripts/fetchSongs";
import { useParams } from "react-router-dom";

export default () => {
	const params = useParams();
	const songIds = params.songIds.split("+");

	const [selectedSlide, setSelectedSlide] = React.useState({
		songId: undefined,
		sectionIndex: undefined,
	});
	const [songs, setSongs] = React.useState([]);
	const [selectedSongs, setSelectedSongs] = React.useState([]);

	React.useEffect(() => {
		(async function () {
			let songs = await fetchSongs(),
				selectedSongs = songIds.map((id) =>
					songs.find((song) => song.id === id)
				);

			setSongs(songs);
			setSelectedSongs(selectedSongs);
		})();
	}, []);

	const handleKeydown = ({ key }) => {
		const { songId, sectionIndex } = selectedSlide,
			matchId = ({ id }) => songId === id,
			song = selectedSongs.find(matchId),
			songIndex = selectedSongs.findIndex(matchId);

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
								songId: selectedSongs[songIndex - 1].id,
								sectionIndex:
									selectedSongs[songIndex - 1].sections
										.length - 1,
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
						} else if (songIndex + 1 < selectedSongs.length) {
							setSelectedSlide({
								songId: selectedSongs[songIndex + 1].id,
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
		if (songId !== undefined && sectionIndex !== undefined) {
			localStorage.setItem(
				"slide",
				JSON.stringify(
					selectedSongs.find(({ id }) => songId === id).sections[
						sectionIndex
					]
				)
			);
		}

		window.addEventListener("keydown", handleKeydown);

		return () => {
			window.removeEventListener("keydown", handleKeydown);
		};
	}, [selectedSlide]);

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
			{selectedSongs
				? selectedSongs.map(({ title, id: songId, ...song }, index) => (
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
				<Title>Add another song</Title>
				<SearchBar
					songs={songs}
					onSongSelected={(song) =>
						setSelectedSongs((songs) => [...songs, song])
					}
				/>
			</Section>
		</Wrapper>
	);
};
