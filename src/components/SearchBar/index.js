import { Input, Lyric, Suggestions, Wrapper } from "./styles";

import { ListGroupItem } from "react-bootstrap";
import React from "react";

export default ({ songs, onSongSelected }) => {
	const [inputValue, setInputValue] = React.useState("");
	const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
		React.useState(-1);
	const [suggestions, setSuggestions] = React.useState([]);

	React.useEffect(() => {
		if (!inputValue) {
			setSuggestions([]);
			return;
		}

		const list = [];

		songs.forEach(({ title, sections, id }) => {
			if (title.toLowerCase().includes(inputValue.toLowerCase())) {
				list.push({ title, id });
				return;
			}

			const lyricSearch = sections.find(({ content }) =>
				content.toLowerCase().includes(inputValue.toLowerCase())
			);

			if (lyricSearch) {
				list.push({
					title,
					content: lyricSearch.content,
					lyric: lyricSearch.content
						.split("\n") // Single-line
						.find((v) =>
							v.toLowerCase().includes(inputValue.toLowerCase())
						),
				});
			}
		});

		setSuggestions(list);
	}, [inputValue]);

	const handleSongSelected = (index) => {
		onSongSelected(suggestions[index]);
		setInputValue("");
	};

	const handleInputKeydown = (e) => {
		if (["ArrowDown", "ArrowUp"].includes(e.key)) {
			e.preventDefault();

			switch (e.key) {
				case "ArrowDown":
					setSelectedSuggestionIndex((i) =>
						i < suggestions.length - 1 ? i + 1 : i
					);
					break;
				case "ArrowUp":
					setSelectedSuggestionIndex((i) => (i >= 0 ? i - 1 : i));
					break;
			}
		} else if (e.key === "Enter" && selectedSuggestionIndex > -1) {
			handleSongSelected(selectedSuggestionIndex);
		} else {
			setSelectedSuggestionIndex(-1);
		}
	};

	console.log({ selectedSuggestionIndex });

	return (
		<Wrapper>
			<Input
				value={inputValue}
				onChange={({ target: { value } }) => setInputValue(value)}
				onKeyDown={handleInputKeydown}
			/>
			<Suggestions show={suggestions.length}>
				{suggestions.map(({ title, lyric, content }, index) => (
					<ListGroupItem
						title={content}
						key={`lg-${index}`}
						variant={
							selectedSuggestionIndex === index ? "primary" : ""
						}
						action
						onClick={() => handleSongSelected(index)}
					>
						{title}
						<Lyric>{lyric}</Lyric>
					</ListGroupItem>
				))}
			</Suggestions>
		</Wrapper>
	);
};
