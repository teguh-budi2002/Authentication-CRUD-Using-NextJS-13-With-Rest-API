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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function RegisterComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isExists, setExists] = useState(false);
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (fields.email === "" || fields.password === "") {
      return setError(true);
    }
    setError(false);
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fields),
    });

    const dataResponse = await res.json();
    if (dataResponse.status === 200) {
      setLoading(false);
      setExists(false);
      setSuccess(dataResponse.message, true);
      e.target.reset();
    }
    if (dataResponse.status === 400) {
      setLoading(false);
      setSuccess(false);
      setExists(dataResponse.message, true);
    }
  };

  const handleFields = (e) => {
    const name = e.name;
    setFields({
      ...fields,
      [name]: e.value,
    });
  };

  return (
    <>
      <Button onClick={onOpen} variant="solid" colorScheme="messenger">
        REGISTER
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <form onSubmit={handleRegister}>
          <ModalContent>
            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              {isExists && (
                <Alert status="warning" mb={5} borderRadius={5}>
                  <AlertIcon />
                  <AlertDescription>{isExists}</AlertDescription>
                </Alert>
              )}
              {isError && (
                <Alert status="error" mb={5} borderRadius={5}>
                  <AlertIcon />
                  <AlertTitle>DANGER!</AlertTitle>
                  <AlertDescription>
                    Email & Password can't be null.
                  </AlertDescription>
                </Alert>
              )}
              {isSuccess && (
                <Alert
                  status="success"
                  variant="left-accent"
                  mb={5}
                  borderRadius={2}
                >
                  <AlertIcon />
                  {isSuccess}
                </Alert>
              )}
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  ref={initialRef}
                  onChange={(e) => handleFields(e.target)}
                  placeholder="Your Email...."
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={(e) => handleFields(e.target)}
                  placeholder="Your Password..."
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              {!isLoading ? (
                <Button type="submit" colorScheme="blue" mr={3}>
                  SUBMIT
                </Button>
              ) : (
                <Button isLoading colorScheme="blue" variant="solid" mr={3}>
                  Email
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
