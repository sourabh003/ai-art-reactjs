import { DownloadIcon, AtSignIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	CircularProgress,
	IconButton,
	Switch,
	Text,
} from "@chakra-ui/react";
import { capitalize } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateImageVisibility } from "../../redux/actions/images";
import { toast } from "react-hot-toast";
import "./postcard.scss";

export default function PostCard(image) {
	const dispatch = useDispatch();
	const { data, prompt, url, uploadedBy = {}, isPrivate = false } = image;
	const { name } = uploadedBy;

	const [checked, setChecked] = useState(isPrivate);
	const [loading, setLoading] = useState(false);

	const onDownloadClick = () => {
		let a = document.createElement("a");
		a.href = "data:image/png;base64," + data;
		a.download = "image.png";
		a.click();
	};

	const handleVisibilityChange = () => {
		setLoading(true);
		setTimeout(() => {
			dispatch(
				updateImageVisibility({
					id: image._id,
					isPrivate: !checked,
				})
			)
				.then((message) => {
					setChecked((prevState) => !prevState);
					toast.success(message);
				})
				.finally(() => setLoading(false));
		}, 1000);
	};

	useEffect(() => {
		setChecked(isPrivate);
	}, [isPrivate]);

	useEffect(() => {
		console.log({ image });
	}, [image]);

	return (
		<Box className="post-card">
			<img src={url} alt={prompt} />

			<Box className="post-details">
				<Text fontSize="lg">{capitalize(prompt)}</Text>
				<Box className="post-actions">
					<Button leftIcon={<AtSignIcon />} disabled colorScheme="gray">
						By {name}
					</Button>
					<IconButton colorScheme="teal" onClick={onDownloadClick}>
						<DownloadIcon />
					</IconButton>
				</Box>

				<Box className="image-visibility-control">
					<Text color="gray" textAlign="center">
						Change Image Visibility
					</Text>
					<Box className="image-control">
						<Text>Public</Text>
						{loading ? (
							<CircularProgress mx={5} size="20px" isIndeterminate />
						) : (
							<Switch
								isChecked={checked}
								mx={5}
								size="md"
								onChange={handleVisibilityChange}
							/>
						)}
						<Text>Private</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
