import "./Header.scss";
import {
	Avatar,
	Box,
	Button,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { dialogTypes } from "../Dialog";
import { toggleModal, toggleTheme } from "../../redux/actions/common";
import { userLogout } from "../../redux/actions/auth";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useMemo } from "react";

export default function Header({ playAnimation }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { user = null } = useSelector((state) => state.auth);
	const { appTheme = "light" } = useSelector((state) => state.common);

	const handleLoginClick = () => {
		dispatch(toggleModal({ modal: dialogTypes.login }));
	};

	const handleProfileClick = () => {
		navigate("/profile");
	};

	const handleLogoutClick = () => {
		dispatch(userLogout());
		navigate("/");
	};

	const handleToggleTheme = () => {
		playAnimation();
		setTimeout(() => {
			dispatch(toggleTheme());
		}, 1000);
	};

	return (
		<Box className="custom-header">
			<Box className="header-logo">
				<Link to="/">
					{location.pathname !== "/" && (
						<IconButton
							icon={<ArrowBackIcon />}
							onClick={() => navigate(-1)}
							mr={2}
							fontSize="25px"
							variant="unstyled"
							color="white"
						/>
					)}
					<img className="logo" src="/images/logo.png" alt="Logo" />
					<Text fontSize="3xl">AI Art</Text>
				</Link>
			</Box>
			<Box className="user-icon">
				<img
					onClick={handleToggleTheme}
					width="30px"
					src={appTheme === "light" ? "/images/moon.png" : "/images/sun.png"}
				/>
				{user ? (
					location.pathname !== "/profile" ? (
						<Menu>
							<MenuButton>
								<Avatar
									ml={3}
									onClick={handleProfileClick}
									size={{ base: "sm", sm: "md" }}
									name={user?.name}
									src={user?.photo}
									bg="purple.500"
								/>
							</MenuButton>
							<MenuList>
								<MenuItem onClick={() => navigate("/profile")}>
									Profile
								</MenuItem>
								<MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
							</MenuList>
						</Menu>
					) : (
						""
					)
				) : (
					<Button ml={3} colorScheme="purple" onClick={handleLoginClick}>
						Login
					</Button>
				)}
			</Box>
		</Box>
	);
}
