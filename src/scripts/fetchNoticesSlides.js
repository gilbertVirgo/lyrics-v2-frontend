import prismicClient from "../prismicClient";

const parse = ({ data }) => ({
	this_week: data.this_week,
	looped: data.looped,
});

export default async () => {
	const notices = await prismicClient.getSingle("notices_slides");

	return parse(notices);
};
