import { Grid, Section, Slide, Title } from "../styles";

import Canvas from "../../../components/Canvas";

export default ({ selectedSongs, selectedSlide, setSelectedSlide }) => {
	return selectedSongs
		? selectedSongs.map(({ title, id: songId, ...song }, index) => {
				return (
					<Section key={`section-${index}`}>
						<Title>{title}</Title>
						<Grid>
							{song.sections.map(
								({ content, type }, sectionIndex) => {
									return (
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
									);
								}
							)}
						</Grid>
					</Section>
				);
		  })
		: "Loading...";
};
