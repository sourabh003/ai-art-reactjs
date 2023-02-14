import { randomPrompts } from "./constants";

export const getRandomPrompt = () => {
	const randomValue = Math.floor(
		Math.random() * (randomPrompts.length - 1 - 0) + 0
    );
    return randomPrompts[randomValue]
};

