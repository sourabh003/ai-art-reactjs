import "../styles/header.scss";
import {
	Avatar,
	Box,
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import types from "../redux/types";
import { setData } from "../utils/commonMethods";
import { USER } from "../utils/constants";
import { dialogTypes } from "./Dialog";
import { useEffect } from "react";

export default function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user = null } = useSelector((state) => state);

	const handleLoginClick = () => {
		dispatch({
			type: types.showDialog,
			payload: dialogTypes.login,
		});
	};

	const handleProfileClick = () => {};

	const handleLogoutClick = () => {
		dispatch({
			type: types.logout,
		});
		navigate("/");
	};

	return (
		<Box className="custom-header">
			<Box className="header-logo">
				<Link to="/">
					<img className="logo" src="/images/logo.png" alt="Logo" />
					<Text fontSize="3xl">AI Image Generation</Text>
				</Link>
			</Box>
			<Box className="user-icon">
				{user ? (
					<Menu>
						<MenuButton>
							<Avatar
								onClick={handleProfileClick}
								size="md"
								name={user?.name}
								src={user?.photo}
								bg="purple.500"
							/>
						</MenuButton>
						<MenuList>
							<MenuItem>Profile</MenuItem>
							<MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
						</MenuList>
					</Menu>
				) : (
					<Button colorScheme="purple" onClick={handleLoginClick}>
						Login
					</Button>
				)}
			</Box>
		</Box>
	);
}
