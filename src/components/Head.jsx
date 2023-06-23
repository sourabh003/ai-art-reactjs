import React from "react";
import { Helmet } from "react-helmet";

export default function Head() {
	return (
		<Helmet>
			<meta
				property="og:url"
				content="https://ai-art-reactjs.vercel.app"
			/>
			<meta property="og:title" content="AI Art" />
			<meta
				property="og:description"
				content="Generate stunning art from your creative thinking!"
			/>
			<meta
				property="og:image"
				content="https://ai-art-reactjs.vercel.app/images/dummy-image.jpg"
			/>
		</Helmet>
	);
}
