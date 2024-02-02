import prismicClient from "../prismicClient";

const parse = (json) =>
	json.map(({ id, data }) => ({
		id,
		title: data.title,
		key: data.key,
		sections: data.sections.map(({ content, type }) => ({
			content: content.map(({ text }) => text).join("\n"),
			type,
		})),
	}));

export default async () => {
	const songs = await prismicClient.getAllByType("song");

	return parse(songs);
};
