import { DownloadIcon, SettingsIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Input,
	Text,
	CircularProgress,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "../styles/create.scss";
import { getRandomPrompt } from "../utils/methods";
import { generateValidator } from "../validators/imageValidators";
import { Switch } from "@chakra-ui/react";
import toast from "react-hot-toast";
import imageService from "../redux/services/image.service";
import { useSelector } from "react-redux";

export default function Create() {
	const { user } = useSelector((state) => state.auth);

	const [formValues, setFormValues] = useState({
		name: "",
		email: "",
		prompt: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [generatedImage, setGeneratedImage] = useState(null);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleGenerate = () => {
		setIsLoading(true);

		const values = { ...formValues };
		const { isValid } = generateValidator(values);
		if (!isValid) {
			toast.error("Fields Empty!");
			return setIsLoading(false);
		}
		imageService
			.generate({ ...formValues })
			.then((res) => {
				const { success, message, data } = res;
				toast[success ? "success" : "error"](message);
				if (!success) return;
				setGeneratedImage(data);
			})
			.catch((error) => {
				toast.error(error.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const handleSurpriseClick = () => {
		const randomThought = getRandomPrompt();
		setFormValues((prevState) => ({ ...prevState, prompt: randomThought }));
	};

	useEffect(() => {
		if (!user) return;
		setFormValues((prevState) => ({
			...prevState,
			name: user?.name,
			email: user?.email,
		}));
	}, [user]);

	return (
		<Box className="create-page">
			<Text className="heading" fontSize="xl" as="b">
				Generate an Image from your thought
			</Text>
			<Text className="description" fontSize="md" color="gray">
				Enter a thought and the DALL-E AI will generate that into an imaginative
				and visually stunning image.
			</Text>

			<Text className="beta-info" fontSize="md" color="gray">
				We are currently on beta version, so you only have 5 requests per day.
			</Text>

			<VStack align="stretch" className="form" w={"100%"}>
				<Box className="input-group" mb="10px">
					<Text fontSize="md" color="gray">
						Your Name
					</Text>
					<Input
						disabled={!!user}
						width={"100%"}
						className="search-input"
						onChange={handleChange}
						value={formValues.name || ""}
						type="text"
						name="name"
					/>
				</Box>
				<Box className="input-group" mb="10px">
					<Text fontSize="md" color="gray">
						Your Email
					</Text>
					<Input
						disabled={!!user}
						width={"100%"}
						className="search-input"
						type="email"
						onChange={handleChange}
						value={formValues.email || ""}
						name="email"
					/>
				</Box>
				<Box>
					<Text fontSize="md" color="gray">
						Through your thought
					</Text>
					<Box className="thought-section">
						<Input
							width={"100%"}
							mr="10px"
							className="search-input"
							onChange={handleChange}
							value={formValues.prompt || ""}
							name="prompt"
						/>
						<Button
							isDisabled={isLoading}
							colorScheme="purple"
							className="surprise-btn"
							type="button"
							onClick={handleSurpriseClick}
						>
							Get a random thought
						</Button>
					</Box>
				</Box>
				<Button
					rightIcon={<SettingsIcon />}
					className="generate-btn"
					colorScheme="teal"
					disabled={isLoading}
					isLoading={isLoading}
					onClick={handleGenerate}
				>
					Generate
				</Button>
			</VStack>

			<Box className="images-list">
				<RenderImage isLoading={isLoading} image={generatedImage} />
			</Box>
		</Box>
	);
}

const RenderImage = ({ isLoading = false, image = null }) => {
	const [loader, setLoader] = useState(false);

	const handleVisibilityChange = (e) => {
		const { checked } = e.target;
		imageService
			.updateVisibility({
				id: image._id,
				isPrivate: checked,
			})
			.then(() => {
				toast.success("Image visibility updated");
			})
			.catch((err) => {
				toast.error(err.message);
			})
			.finally(() => {
				setLoader(false);
			});
	};

	return (
		<VStack w="100%">
			<Box className="generated-image-container">
				{isLoading && (
					<Box className="overlay">
						<CircularProgress className="loader" isIndeterminate color="teal" />
					</Box>
				)}
				<Box w="100%">
					<img
						width="100%"
						src={image ? image.url : "/images/placeholder-image.png"}
						alt=""
					/>
				</Box>
			</Box>
			{image && (
				<Box className="image-actions">
					<Button
						className="download-btn"
						leftIcon={<DownloadIcon />}
						colorScheme="teal"
					>
						<a href="/images/dummy-image.jpg" download>
							Download
						</a>
					</Button>
					<Box className="image-visibility-control">
						<Text color="gray">
							Your Image is public by default. Do you want to make it private ?
						</Text>
						<Box className="image-control">
							<Text>Public</Text>
							{loader ? (
								<CircularProgress mx={5} size="20px" isIndeterminate />
							) : (
								<Switch mx={5} size="md" onChange={handleVisibilityChange} />
							)}
							<Text>Private</Text>
						</Box>
					</Box>
				</Box>
			)}
		</VStack>
	);
};
