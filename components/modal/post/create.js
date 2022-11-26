import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Icon,
} from "@chakra-ui/react";
import { VscAdd } from "react-icons/vsc";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

export default function CreatePostComponent({ setSuccess }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [fields, setFields] = useState({});
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    const res = await fetch("/api/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const dataResponse = await res.json();
    console.log(dataResponse);
    if (dataResponse.status === 201) {
      setLoading(false);
      onClose();
      setSuccess(dataResponse.message, true);
      router.replace("/");
    }
  };

  const handleFields = (e) => {
    const name = e.target.name;
    setFields({
      ...fields,
      [name]: e.target.value,
    });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        leftIcon={<Icon as={VscAdd} />}
        variant="outline"
        colorScheme="facebook"
      >
        CREATE POST
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader>Create your post</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  ref={initialRef}
                  name="title"
                  onChange={handleFields}
                  placeholder="Your Title..."
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Slug</FormLabel>
                <Input
                  placeholder="Your Slug..."
                  onChange={handleFields}
                  name="slug"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Your description...."
                  name="description"
                  size="sm"
                  onChange={handleFields}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              {isLoading ? (
                <Button
                  isLoading
                  loadingText="Loading"
                  colorScheme="facebook"
                  variant="outline"
                  spinnerPlacement="start"
                  mr={3}
                >
                  Save
                </Button>
              ) : (
                <Button type="submit" colorScheme="blue" mr={3}>
                  Save
                </Button>
              )}
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
