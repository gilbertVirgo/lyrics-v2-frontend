import { Nav } from "react-bootstrap";

export default ({ value, onChange }) => {
	return (
		<Nav fill variant="pills">
			<Nav.Item>
				<Nav.Link
					active={value === "songs"}
					onClick={onChange.bind(null, "songs")}
				>
					Songs
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link
					active={value === "notices"}
					onClick={onChange.bind(null, "notices")}
				>
					Notices
				</Nav.Link>
			</Nav.Item>
		</Nav>
	);
};
