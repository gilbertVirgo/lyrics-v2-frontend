import Prismic from "prismic-javascript";

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
	const api = await Prismic.api(
		"https://worship-lyrics.cdn.prismic.io/api/v2"
	);
	const { results } = await api.query("", { pageSize: 200 });

	return parse(results);
};
