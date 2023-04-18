import { useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	Button,
} from "@chakra-ui/react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const provider = new GoogleAuthProvider();
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userLogin, userLogout } from "../../../redux/actions/auth";
import { toggleModal } from "../../../redux/actions/common";
import { useNavigate } from "react-router-dom";

export default function LogoutDialog({ onClose, cancelRef }) {
	const navigate = useNavigate()
	const dispatch = useDispatch();

	const handleLogout = () => {
        dispatch(userLogout());
        navigate("/")
		closeModal();
	};

	const closeModal = () => dispatch(toggleModal());

	return (
		<AlertDialogContent>
			<AlertDialogHeader>Login to your account</AlertDialogHeader>
			<AlertDialogCloseButton />
			<AlertDialogBody>
				Confirm Logout
			</AlertDialogBody>
			<AlertDialogFooter>
				<Button
					width="100%"
					colorScheme="gray"
					onClick={closeModal}
				>
					Cancel
				</Button>
                <Button
                    ml={3}
					width="100%"
					colorScheme="red"
					variant="solid"
					onClick={handleLogout}
				>
					Logout
				</Button>
			</AlertDialogFooter>
		</AlertDialogContent>
	);
}
