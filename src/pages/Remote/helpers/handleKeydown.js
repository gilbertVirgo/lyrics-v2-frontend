export default (selectedSlide, selectedSongs, setSelectedSlide, { key }) => {
	const { songId, sectionIndex } = selectedSlide,
		matchId = ({ id }) => songId === id,
		song = selectedSongs.find(matchId),
		songIndex = selectedSongs.findIndex(matchId);

	if (song) {
		switch (key) {
			case "ArrowLeft":
				if (sectionIndex - 1 >= 0) {
					setSelectedSlide({
						songId,
						sectionIndex: sectionIndex - 1,
					});
				} else if (songIndex - 1 >= 0) {
					setSelectedSlide({
						songId: selectedSongs[songIndex - 1].id,
						sectionIndex:
							selectedSongs[songIndex - 1].sections.length - 1,
					});
				}

				break;
			case "ArrowRight":
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

				break;
		}
	}
};
