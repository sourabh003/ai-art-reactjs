import { Box, CircularProgress, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PostCard from "../PostCard";
import "./ImagesList.scss";

export default function RenderImagesList({
	isLoading = false,
	images = [],
	allowImageEdit = false,
}) {
	if (isLoading)
		return (
			<Box
				w={"100%"}
				mt={3}
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
		<Box className="images-list">
			<Box className="images-grid">
				{images.map((image) => {
					return (
						<Box key={image?._id} className="single-img">
							<PostCard allowImageEdit={allowImageEdit} image={image} />
						</Box>
					);
				})}
			</Box>
		</Box>
	);
}
