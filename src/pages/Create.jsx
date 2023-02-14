import { DownloadIcon, SettingsIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Input,
	Text,
	Grid,
	GridItem,
	CircularProgress,
	useToast,
	HStack,
	VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import "../styles/create.scss";
import { dummyImagesList } from "../utils/constants";
import { getRandomPrompt } from "../utils/methods";
export default function Create() {
	const toast = useToast();

	const [formValues, setFormValues] = useState({
		name: "",
		thought: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [generatedImage, setGeneratedImage] = useState(
		// "/images//dummy-image.jpg"
		""
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleGenerate = () => {
		setIsLoading(true);
		setTimeout(() => {
			toast({
				title: "Voila!",
				status: "success",
				duration: 2000,
				isClosable: true,
			});
			setGeneratedImage("/images//dummy-image.jpg");
			setIsLoading(false);
		}, 4000);
	};

	const handleSurpriseClick = () => {
		const randomThought = getRandomPrompt();
		setFormValues((prevState) => ({ ...prevState, thought: randomThought }));
	};

	return (
		<Box className="create-page">
			<Text fontSize="xl" as="b">
				Generate your own thought
			</Text>
			<Text fontSize="md" color="gray">
				Enter a thought and the DALL-E AI will generate that into an imaginative
				and visually stunning image.
			</Text>

			<VStack align="stretch" className="form" w={"100%"}>
				<Box w="40%" mb="10px">
					<Text fontSize="md" color="gray">
						Your Name
					</Text>
					<Input
						width={"100%"}
						className="search-input"
						onChange={handleChange}
						value={formValues.name || ""}
						name="name"
					/>
				</Box>
				<Box mb="10px">
					<Text fontSize="md" color="gray">
						Through your thought
					</Text>
					<HStack>
						<Input
							width={"100%"}
							mr="10px"
							className="search-input"
							onChange={handleChange}
							value={formValues.thought || ""}
							name="thought"
						/>
						<Button colorScheme="purple" onClick={handleSurpriseClick}>
							Surprise me!
						</Button>
					</HStack>
				</Box>
				<Button
					rightIcon={<SettingsIcon />}
					w="30%"
					mt="10px"
					colorScheme="teal"
					onClick={handleGenerate}
				>
					Generate
				</Button>
			</VStack>

			<Box className="images-list">
				<RenderImage isLoading={isLoading} generatedImage={generatedImage} />
			</Box>
		</Box>
	);
}

const RenderImage = ({ isLoading = false, generatedImage = "" }) => {
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
						src={
							generatedImage ? generatedImage : "/images/placeholder-image.png"
						}
						alt=""
					/>
				</Box>
			</Box>
			{generatedImage && (
				<VStack>
					<Button leftIcon={<DownloadIcon />} mt={2} colorScheme="teal">
						<a href={generatedImage} download>
							Download
						</a>
					</Button>
				</VStack>
			)}
		</VStack>
	);
};
