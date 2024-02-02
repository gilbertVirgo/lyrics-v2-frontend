import { Section, Title, Wrapper } from "./styles";

import { Nav } from "react-bootstrap";
import Notices from "./tabs/Notices";
import OpenScreenModal from "./components/OpenScreenModal";
import React from "react";
import SearchBar from "../../components/SearchBar";
import SongSlideGrid from "./components/SongSlideGrid";
import Songs from "./tabs/Songs";
import Tabs from "./components/Tabs";
import fetchSongs from "../../scripts/fetchSongs";
import handleKeydown from "./helpers/handleKeydown";
import { useParams } from "react-router-dom";

export default () => {
	const [selectedTab, setSelectedTab] = React.useState("songs");

	return (
		<Wrapper>
			<Tabs value={selectedTab} onChange={setSelectedTab} />

			<OpenScreenModal />

			{selectedTab === "songs" && <Songs />}
			{selectedTab === "notices" && <Notices />}
		</Wrapper>
	);
};
