import { Group, Section, Wrapper } from "./styles";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import React from "react";
import Row from "react-bootstrap/Row";
import fetchSongs from "../../scripts/fetchSongs";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Home = () => {
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

		if (song) {
			const temp = [...songList, song];

			setSongList(temp);
		}

		setSongTitle("");
	};

	const handleRemoveSong = (key) => {
		const temp = songList.filter((value, index) => index !== key);

		setSongList(temp);
	};

	const handleStartSession = () => {
		history.push(`/remote/${songList.map(({ id }) => id).join("+")}`);
	};

	return (
		<Wrapper>
			<Section>
				<h1>Create a new session</h1>
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
				<Group>
					{songList.map(({ title }, key) => (
						<Alert
							variant="info"
							key={key}
							onClose={handleRemoveSong.bind(null, key)}
							dismissible
						>
							{title}
						</Alert>
					))}
				</Group>
			</Section>
			<Section>
				<Button onClick={handleStartSession} variant="light">
					Start session
				</Button>
			</Section>
		</Wrapper>
	);
};

export default Home;
