import {
	AlertDialog,
	AlertDialogOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginDialog from "./types/LoginDialog";
import types from "../../redux/types";

export default function Dialog() {
	const dispatch = useDispatch();
	const cancelRef = useRef();
	const { isOpen, onOpen, onClose: onDialogClose } = useDisclosure();
	const { dialog = "" } = useSelector((state) => state);

	useEffect(() => {
		if (dialog !== "") onOpen();
		if (dialog === "") onClose();
	}, [dialog]);

	const onClose = () => {
		dispatch({ type: types.closeDialog });
		onDialogClose();
	};

	return (
		<AlertDialog
			motionPreset="slideInBottom"
			leastDestructiveRef={cancelRef}
			onClose={onClose}
			closeOnOverlayClick={dialog !== dialogTypes.login}
			closeOnEsc={dialog !== dialogTypes.login}
			isOpen={isOpen}
			isCentered
		>
			<AlertDialogOverlay />
			<DialogContent
				dialog={dialog}
				open={onOpen}
				cancelRef={cancelRef}
				onClose={onClose}
			/>
		</AlertDialog>
	);
}

const DialogContent = ({ dialog, open, cancelRef, onClose }) => {
	switch (dialog) {
		case dialogTypes.login:
			return (
				<LoginDialog cancelRef={cancelRef} open={open} onClose={onClose} />
			);

		default:
			return null;
	}
};

export const dialogTypes = {
	login: "DIALOG_LOGIN",
	logout: "DIALOG_LOGOUT",
};
