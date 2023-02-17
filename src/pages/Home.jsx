import {
	Box,
	Button,
	Input,
	Text,
	Grid,
	GridItem,
	CircularProgress,
	useToast,
	InputLeftElement,
	InputGroup,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import "../styles/home.scss";
import imageService from "../services/image.service";
import PostCard from "../components/PostCard";
import { PhoneIcon, Search2Icon } from "@chakra-ui/icons";

export default function Home() {
	const toast = useToast();

	const [searchText, setSearchText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [images, setImages] = useState([]);
	const imagesList = useMemo(() => {
		if (searchText === "") return [...images];
		return images.filter(({ prompt }) => prompt.includes(searchText));
	}, [images, searchText]);

	const handleChange = (e) => {
		const { value } = e.target;
		setSearchText(value);
	};

	useEffect(async () => {
		setIsLoading(true);

		try {
			const images = await imageService.getAllImages();
			console.log({ images });
			const { data = [], message = "", success = true } = images;
			const list = data.reverse();

			if (!success) {
				toast({
					title: message,
					status: "error",
					duration: 2000,
					isClosable: true,
				});
			}
			setImages([...list]);
		} catch (error) {
			toast({
				title: error?.message || error,
				status: "error",
				duration: 2000,
				isClosable: true,
			});
		} finally {
			setIsLoading(false);
		}
	}, []);

	return (
		<Box className="home-page">
			<Text fontSize="xl" as="b">
				Look what the people are up to.
			</Text>
			<Text fontSize="md" color="gray">
				Explore a collection of imaginative and visually stunning images
				generated by OpenAI's DALL-E AI
			</Text>

			<InputGroup mt={5}>
				<InputLeftElement children={<Search2Icon color="gray.300" />} />
				<Input
					className="search-input"
					placeholder="Search here..."
					onChange={handleChange}
					value={searchText}
				/>
			</InputGroup>

			<Box className="images-list">
				<RenderImages isLoading={isLoading} images={imagesList} />
			</Box>
			{/* <IconButton
				className="btn-back-to-top"
				aria-label="Search database"
				onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				icon={<TriangleUpIcon />}
			/> */}
		</Box>
	);
}

const RenderImages = ({ isLoading = false, images = [] }) => {
	if (isLoading)
		return (
			<Box
				w={"100%"}
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<CircularProgress isIndeterminate color="green.300" />
			</Box>
		);

	if (images.length === 0)
		return (
			<Box className="no-images-view">
				<img src="/images/no-images.png" alt="no images" />
				<Text fontSize="md" color="gray" as="b">
					No Images Found
				</Text>
			</Box>
		);
	return (
		<Box className="images-grid">
			{images.map((image) => {
				return (
					<Box className="single-img">
						<PostCard {...image} />
					</Box>
				);
			})}
		</Box>
	);
};
