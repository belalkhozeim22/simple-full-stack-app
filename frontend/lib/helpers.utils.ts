'use server';

export const sleep = async (seconds = 2) => {
	await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};
