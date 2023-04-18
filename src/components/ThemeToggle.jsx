import { Switch, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../styles/theme-toggle.scss";
import { THEME_MODE } from "../utils/constants";

export default function ThemeToggle() {
	const [themeMode, setThemeMode] = useState("light");

	useEffect(() => {
		let mode = localStorage.getItem(THEME_MODE);
		if (mode) setThemeMode(mode.toLowerCase());
	}, []);

	const handleChange = (e) => {
		const { checked } = e.target;
		setThemeMode(checked ? "dark" : "light");
	};

	return (
		<Tooltip
			label={`Switch to ${themeMode === "dark" ? "light" : "dark"} mode`}
		>
			<div className="theme-toggle">
				<Switch onChange={handleChange} size="sm" />
			</div>
		</Tooltip>
	);
}
