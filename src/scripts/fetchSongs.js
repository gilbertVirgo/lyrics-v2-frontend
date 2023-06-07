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

	const query = await api.query("", { pageSize: 100 });
	const { results } = query;

	// Accounting for > 100 songs
	let pagesLeft = query.total_pages - 1;
	while (--pagesLeft >= 0) {
		let nextPage = await api.query("", {
			pageSize: 100,
			page: query.total_pages - pagesLeft,
		});
		results.push(...nextPage.results);
	}

	return parse(results);
};
