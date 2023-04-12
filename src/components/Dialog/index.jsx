import {
	AlertDialog,
	AlertDialogOverlay,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginDialog from "./types/LoginDialog";
import { toggleModal } from "../../redux/actions/common";

export default function Dialog() {
	const dispatch = useDispatch();
	const cancelRef = useRef();
	const { isOpen, onOpen, onClose: onDialogClose } = useDisclosure();
	const { modal = "" } = useSelector((state) => state.common);

	useEffect(() => {
		// console.log({ modal });
		if (modal !== "") onOpen();
		if (modal === "") onClose();
	}, [modal]);

	const onClose = () => {
		dispatch(toggleModal());
		onDialogClose();
	};

	return (
		<AlertDialog
			motionPreset="slideInBottom"
			leastDestructiveRef={cancelRef}
			onClose={onClose}
			closeOnOverlayClick={modal !== dialogTypes.login}
			closeOnEsc={modal !== dialogTypes.login}
			isOpen={isOpen}
			isCentered
		>
			<AlertDialogOverlay />
			<DialogContent
				dialog={modal}
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
