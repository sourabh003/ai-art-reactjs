import "../styles/profile.scss";
import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import RenderImagesList from "../components/ImagesList";
import { useEffect } from "react";
import { getUserImages } from "../redux/actions/images";
import { toggleModal } from "../redux/actions/common";
import { dialogTypes } from "../components/Dialog";
import { getUserMetrics } from "../redux/actions/auth";

export default function Profile() {
	const dispatch = useDispatch();

	const { user = null } = useSelector((state) => state.auth);
	const { isLoading = true, images = [] } = useSelector(
		(state) => state.images
	);

	const handleLogout = () => {
		dispatch(toggleModal({ modal: dialogTypes.logout }));
	};

	useEffect(() => {
		if (!user) return;
		dispatch(getUserImages({ email: user?.email }));
	}, [user]);

	useEffect(() => {
		if (!user) return;
		dispatch(getUserMetrics({ email: user?.email }));
	}, []);

	return (
		<Box className="profile-page">
			<Box className="profile-details">
				<Box className="profile-img">
					<Avatar
						size={{ base: "xl" }}
						name={user?.name}
						src={user?.photo}
						bg="purple.500"
					/>
				</Box>
				<Text fontSize="xl">{user?.name}</Text>
				<Text fontSize="md" color="gray">
					{user?.email}
				</Text>
				<Button mt={2} colorScheme="red" variant="ghost" onClick={handleLogout}>
					Logout
				</Button>
			</Box>
			<Box className="request-metrics">
				<Box className="metrics-container">
					<Box className="metrics-sections">
						<Text fontSize="sm">Total generated Images</Text>
						<Text fontSize={{ base: "3xl", md: "6xl", sm: "4xl" }}>
							{user?.photosCount || 0}
						</Text>
					</Box>
					<Box className="metrics-sections">
						<Text fontSize="sm">Requests remaining for today</Text>
						<Text fontSize={{ base: "3xl", md: "6xl", sm: "4xl" }}>
							{user?.remainingRequests || 0}
						</Text>
					</Box>
				</Box>
			</Box>

			<RenderImagesList allowImageEdit isLoading={isLoading} images={images} />
		</Box>
	);
}
