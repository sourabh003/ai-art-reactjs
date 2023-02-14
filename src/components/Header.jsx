import React from "react";
import "../styles/header.scss";
import { Box, Button, Text } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
	const navigate = useNavigate();
	const location = useLocation();

	const handleClick = () => {
		navigate(location.pathname === "/" ? "/create" : "/");
	};

	return (
		<header className="custom-header">
			<Box className="header-logo">
				<Link to="/">
					<img className="logo" src="/images/logo.png" alt="Logo" />
					<Text fontSize="3xl">AI Image Generation</Text>
				</Link>
			</Box>
			<Button colorScheme="purple" onClick={handleClick}>
				{location.pathname === "/" ? "Create" : "Explore"}
			</Button>
		</header>
	);
}
