import { Group, Section, Wrapper } from "./styles";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import React from "react";
import Row from "react-bootstrap/Row";
import fetchSongs from "../../scripts/fetchSongs";
import { useHistory } from "react-router-dom";

export default ({ onAddSong }) => {
	const history = useHistory();

	const [songTitle, setSongTitle] = React.useState("");
	const [songList, setSongList] = React.useState([]);
	const [songs, setSongs] = React.useState([]);

	React.useEffect(() => {
		(async function () {
			let songs = await fetchSongs();

			setSongs(songs);
		})();
	}, []);

	const handleAddSong = () => {
		const song = songs.find(({ title }) => title === songTitle);

		if (song) onAddSong(song);

		setSongTitle("");
	};

	return (
		<Group>
			{songs.length ? (
				<Row>
					<Col>
						<Form.Control
							list="songTitles"
							value={songTitle}
							onChange={({ target }) =>
								setSongTitle(target.value)
							}
							onKeyPress={({ key }) =>
								key === "Enter" && handleAddSong()
							}
							datalist={songs.map(({ title }) => title)}
							placeholder="Pick a song"
						/>
						<datalist id="songTitles">
							{songs.map(({ title }, key) => (
								<option key={key} value={title} />
							))}
						</datalist>
					</Col>
					<Col>
						<Button onClick={handleAddSong} variant="light">
							+
						</Button>
					</Col>
				</Row>
			) : (
				"Loading..."
			)}
		</Group>
	);
};
