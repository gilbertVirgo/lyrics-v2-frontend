import { Section, Title } from "../styles";

import React from "react";
import SearchBar from "../../../components/SearchBar";
import SongSlideGrid from "../components/SongSlideGrid";
import fetchSongs from "../../../scripts/fetchSongs";
import handleKeydown from "../helpers/handleKeydown";
import { useParams } from "react-router-dom";

export default ({ songs }) => {
	const params = useParams();

	const songIds = params.songIds.split("+");

	const [selectedSongs, setSelectedSongs] = React.useState(
		songIds.map((id) => songs.find((song) => song.id === id))
	);

	const [selectedSlide, setSelectedSlide] = React.useState({
		songId: undefined,
		sectionIndex: undefined,
	});

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

		const boundHandleKeyDownFunction = handleKeydown.bind(
			null,
			selectedSlide,
			selectedSongs,
			setSelectedSlide
		);

		window.addEventListener("keydown", boundHandleKeyDownFunction);

		return () => {
			window.removeEventListener("keydown", boundHandleKeyDownFunction);
		};
	}, [selectedSlide]);

	return (
		<React.Fragment>
			<SongSlideGrid
				selectedSongs={selectedSongs}
				selectedSlide={selectedSlide}
				setSelectedSlide={setSelectedSlide}
			/>

			<Section>
				<Title>Add another song</Title>
				<SearchBar
					songs={songs}
					onSongSelected={(song) =>
						setSelectedSongs((songs) => [...songs, song])
					}
				/>
			</Section>
		</React.Fragment>
	);
};
