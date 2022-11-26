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
import { useRouter } from "next/router";
import Cookie from "js-cookie";

export default function LoginComponent() {
  const router = useRouter();
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
      setExists(false);
      return setError(true);
    }
    setError(false);
    setLoading(true);
    const res = await fetch("/api/auth/login", {
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
      Cookie.set("token", dataResponse.token);
      e.target.reset();
      router.push("/");
    } else if (dataResponse.status === 404 || 401) {
      setLoading(false);
      setSuccess(false);
      setExists(dataResponse.message, true);
    }
  };

  const handleFields = async (e) => {
    const name = e.name;
    setFields({
      ...fields,
      [name]: e.value,
    });
  };

  return (
    <>
      <Button onClick={onOpen} variant={"solid"} colorScheme="teal">
        LOGIN
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
            <ModalHeader>Login with your account</ModalHeader>
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
                  size="md"
                  focusBorderColor="pink.300"
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
                  size="md"
                  focusBorderColor="pink.300"
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
