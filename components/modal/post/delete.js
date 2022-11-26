import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function ModalDeleteComponent({ dataId, isOpen, onClose }) {
  const cancelRef = useRef();
  const router = useRouter();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    setIsDeleted(false);
    const res = await fetch(
      `http://localhost:3000/api/post/delete?id=${dataId}`,
      {
        method: "DELETE",
      }
    );
    const dataDeletedResponse = await res.json();

    if (dataDeletedResponse.status === 200) {
      onClose();
      setIsDeleted(dataDeletedResponse.message, true);
      router.push("/");
    }
  };

  return (
    <>
      {isDeleted && (
        <Box className={"alert_box"} w={"30%"}>
          <Alert status={"error"} variant={"left-accent"}>
            <AlertIcon />
            {isDeleted}
          </Alert>
        </Box>
      )}
      <AlertDialog
        isOpen={isOpen}
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure want delete this post?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
