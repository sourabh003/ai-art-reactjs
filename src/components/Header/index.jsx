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
import { toggleModal } from "../../redux/actions/common";
import { userLogout } from "../../redux/actions/auth";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { user = null } = useSelector((state) => state.auth);

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

	return (
		<Box className="custom-header">
			<Box className="header-logo">
				<Link to="/">
					{location.pathname !== "/" && (
						<IconButton
							icon={<ArrowBackIcon />}
							onClick={() => navigate(-1)}
							mr={2}
                            fontSize='25px'
							variant="unstyled"
							color="white"
						/>
					)}
					<img className="logo" src="/images/logo.png" alt="Logo" />
					<Text fontSize="3xl">AI Art</Text>
				</Link>
			</Box>
			<Box className="user-icon">
				{user ? (
					<Menu>
						<MenuButton>
							<Avatar
								onClick={handleProfileClick}
								size={{ base: "sm", sm: "md" }}
								name={user?.name}
								src={user?.photo}
								bg="purple.500"
							/>
						</MenuButton>
						<MenuList>
							<MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
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
