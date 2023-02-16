import { DownloadIcon, AtSignIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Text } from "@chakra-ui/react";
import { capitalize } from "lodash";
import "../styles/postcard.scss";

export default function PostCard({ data, prompt, url, uploadedBy = {} }) {
	const { name } = uploadedBy;

	const onDownloadClick = () => {
		let a = document.createElement("a");
		a.href = "data:image/png;base64," + data;
		a.download = "image.png";
		a.click();
	};

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
			</Box>
		</Box>
	);
}
