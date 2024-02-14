import { Modal, Nav } from "react-bootstrap";
import { Section, Title, Wrapper } from "./styles";

import Notices from "./tabs/Notices";
import OpenScreenModal from "./components/OpenScreenModal";
import React from "react";
import SearchBar from "../../components/SearchBar";
import SongSlideGrid from "./components/SongSlideGrid";
import Songs from "./tabs/Songs";
import { Suspense } from "react";
import Tabs from "./components/Tabs";
import fetchNoticesSlides from "../../scripts/fetchNoticesSlides";
import fetchSongs from "../../scripts/fetchSongs";
import handleKeydown from "./helpers/handleKeydown";
import { useParams } from "react-router-dom";

export default () => {
	const [selectedTab, setSelectedTab] = React.useState("songs");
	const [songs, setSongs] = React.useState();

	const [notices, setNotices] = React.useState();
	const [error, setError] = React.useState();

	React.useEffect(() => {
		fetchNoticesSlides().then(setNotices).catch(setError);
		fetchSongs().then(setSongs).catch(setError);
	}, []);

	if (error)
		return (
			<Modal onExit={setError.bind(null, undefined)}>
				<Modal.Body>
					<h1>Error</h1>
					<p>{error.stack}</p>
				</Modal.Body>
			</Modal>
		);

	if (!songs || !notices) return "Loading ...";

	return (
		<Wrapper>
			<Tabs value={selectedTab} onChange={setSelectedTab} />

			<OpenScreenModal />

			{selectedTab === "songs" && <Songs songs={songs} />}
			{selectedTab === "notices" && <Notices notices={notices} />}
		</Wrapper>
	);
};
