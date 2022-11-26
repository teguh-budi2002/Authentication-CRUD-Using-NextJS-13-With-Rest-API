import {
  Box,
  Container,
  Flex,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Alert,
  AlertIcon,
  Icon,
  Button,
  useDisclosure,
  Input,
  Tooltip,
} from "@chakra-ui/react";
import RegisterComponent from "../components/modal/auth/register";
import LoginComponent from "../components/modal/auth/login";
import CreateComponent from "../components/modal/post/create";
import ModalDeleteComponent from "../components/modal/post/delete";
import myCookies from "next-cookies";
import React, { useEffect, useState } from "react";
import { VscTrash, VscEdit, VscCheckAll, VscClose } from "react-icons/vsc";
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Home({ token, posts }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [fieldDeleted, setFieldDeleted] = useState();
  const [isFieldUpdated, setIsFieldUpdated] = useState(false);
  const [fieldUpdated, setFieldUpdated] = useState({});
  const [isLoadingUpdated, setIsLoadingUpdated] = useState(false);
  const [alertUpdated, setAlertUpdated] = useState(false);
  const router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure();

  useEffect(() => {}, [fieldDeleted]);

  const handleLogout = () => {
    Cookies.remove("token", token);
    router.push("/");
  };

  const handleSubmitUpdate = async (id) => {
    setIsLoadingUpdated(true);
    setAlertUpdated(false);
    const res = await fetch(`http://localhost:3000/api/post/update?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fieldUpdated),
    });

    const updatedDataResponse = await res.json();

    if (updatedDataResponse.status === 200) {
      setIsLoadingUpdated(false);
      setIsFieldUpdated(false);
      setAlertUpdated(updatedDataResponse.message, true);
      router.push("/", { shallow: true });
    }
  };

  const handleFieldUpdate = (e) => {
    const name = e.currentTarget.name;
    setFieldUpdated({
      ...fieldUpdated,
      [name]: e.currentTarget.value,
    });
  };

  return (
    <>
      <Container bg="blackAlpha.400" maxW="100%" h={"100vh"}>
        {isSuccess && (
          <Box className={"alert_box"} w={"30%"}>
            <Alert status="success" variant={"left-accent"}>
              <AlertIcon />
              {isSuccess}
            </Alert>
          </Box>
        )}
        {alertUpdated && (
          <Box className={"alert_box"} w={"30%"}>
            <Alert status="success" variant={"left-accent"}>
              <AlertIcon />
              {alertUpdated}
            </Alert>
          </Box>
        )}
        <Flex flexDirection="column" justify="center" align="center">
          <Box w={"100%"} mt={10}>
            {!token ? (
              <Flex justify="center" align="center">
                <Box mt={8} mb={8} mr={5}>
                  <RegisterComponent />
                </Box>
                <Box>
                  <LoginComponent />
                </Box>
              </Flex>
            ) : (
              <>
                <Flex justify="center" align="center">
                  <Box mt={5} mb={2} mr={5}>
                    <CreateComponent setSuccess={setIsSuccess} />
                  </Box>
                </Flex>
                <Flex justify={"center"}>
                  <Box
                    mb={5}
                    padding={3}
                    borderRadius={5}
                    bg={"white"}
                    w={"50%"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Text fontSize={"xl"} fontWeight={"semibold"}>
                      Hello dear, welcome to my NEXT Auth+CRUD Project
                    </Text>
                    <Button
                      label="Logout???"
                      bg={"red.400"}
                      color={"white"}
                      onClick={handleLogout}
                    >
                      <Icon as={IoMdLogOut} />
                    </Button>
                  </Box>
                </Flex>
              </>
            )}
          </Box>
        </Flex>
        <Stack maxW="968px" mx="auto">
          <Box boxShadow="1px 1px 10px grey" mb={10}>
            <Tabs isFitted isLazy variant="unstyled" bg="white">
              <TabList>
                <Tab
                  _selected={{ color: "white", bg: "blue.400" }}
                  borderBottom="2px solid #ECEBEB"
                >
                  Posts
                </Tab>
                <Tab
                  _selected={{ color: "white", bg: "teal.400" }}
                  borderBottom="2px solid #ECEBEB"
                >
                  Users
                </Tab>
              </TabList>
              {token ? (
                <TabPanels overflowY={"scroll"} maxHeight={400}>
                  <TabPanel>
                    <Flex w={"100%"} justify={"center"}>
                      <Stack w={"80%"}>
                        {posts?.map((post) => (
                          <React.Fragment key={post.id}>
                            <Box
                              borderBottom={"1px solid grey"}
                              textAlign={"center"}
                              pb={2}
                              pt={2}
                            >
                              {isFieldUpdated === post.id ? (
                                <>
                                  <Box w={"80%"} textAlign={"right"}>
                                    <Icon
                                      bgColor={"red.400"}
                                      w={6}
                                      h={6}
                                      borderRadius={5}
                                      cursor={"pointer"}
                                      color={"white"}
                                      onClick={() => {
                                        setIsFieldUpdated(false);
                                      }}
                                      as={VscClose}
                                    />
                                  </Box>
                                  <Box w={"40%"} mx={"auto"} textAlign={"left"}>
                                    <Text
                                      fontWeight={"semibold"}
                                      color={"blackAlpha.600"}
                                    >
                                      TITLE
                                    </Text>
                                    <Input
                                      defaultValue={post.title}
                                      variant={"outline"}
                                      mb={5}
                                      name="title"
                                      onChange={(e) => {
                                        handleFieldUpdate(e);
                                      }}
                                    />
                                    <Text
                                      fontWeight={"semibold"}
                                      color={"blackAlpha.600"}
                                    >
                                      DESCRIPTION
                                    </Text>
                                    <Input
                                      defaultValue={post.description}
                                      variant={"outline"}
                                      name="description"
                                      onChange={(e) => {
                                        handleFieldUpdate(e);
                                      }}
                                    />
                                  </Box>
                                </>
                              ) : (
                                <Box>
                                  <Text
                                    fontSize={"xl"}
                                    color={"gray.600"}
                                    fontWeight={"semibold"}
                                    textTransform={"capitalize"}
                                  >
                                    {post.title}
                                  </Text>
                                  <Text fontSize={"sm"}>
                                    {post.description}
                                  </Text>
                                </Box>
                              )}
                              <Button
                                leftIcon={<Icon as={VscTrash} />}
                                colorScheme={"red"}
                                mt={5}
                                mb={2}
                                mr={4}
                                isDisabled={isFieldUpdated === post.id}
                                onClick={() => {
                                  onOpen();
                                  setFieldDeleted(post.id);
                                }}
                                id={`DeleteModal${post.id}`}
                              >
                                DELETE
                              </Button>
                              {isFieldUpdated === post.id ? (
                                <>
                                  {isLoadingUpdated ? (
                                    <Button
                                      isLoading
                                      loadingText="Loading"
                                      colorScheme="green"
                                      variant="outline"
                                      mt={5}
                                      mb={2}
                                      spinnerPlacement="start"
                                    >
                                      Update Submit
                                    </Button>
                                  ) : (
                                    <Button
                                      colorScheme={"green"}
                                      mt={5}
                                      mb={2}
                                      rightIcon={<Icon as={VscCheckAll} />}
                                      onClick={() => {
                                        handleSubmitUpdate(post.id);
                                      }}
                                    >
                                      Update Now
                                    </Button>
                                  )}
                                </>
                              ) : (
                                <Button
                                  leftIcon={<Icon as={VscEdit} />}
                                  colorScheme={"orange"}
                                  mt={5}
                                  mb={2}
                                  onClick={() => {
                                    setIsFieldUpdated(post.id, true);
                                  }}
                                >
                                  UPDATE
                                </Button>
                              )}
                            </Box>
                          </React.Fragment>
                        ))}
                      </Stack>
                    </Flex>
                  </TabPanel>
                  <TabPanel>Users List</TabPanel>
                </TabPanels>
              ) : (
                <TabPanels>
                  <TabPanel>
                    <Box textAlign={"center"}>
                      <Text
                        fontSize={"2xl"}
                        fontWeight={"semibold"}
                        color={"red.400"}
                      >
                        Please Login To Access This Website
                      </Text>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box textAlign={"center"}>
                      <Text
                        fontSize={"2xl"}
                        fontWeight={"semibold"}
                        color={"red.400"}
                      >
                        Please Login To Access This Website
                      </Text>
                    </Box>
                  </TabPanel>
                </TabPanels>
              )}
            </Tabs>
          </Box>
        </Stack>
      </Container>
      <ModalDeleteComponent
        isOpen={isOpen}
        onClose={onClose}
        dataId={fieldDeleted}
      />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const getCookies = myCookies(ctx);
  const token = getCookies.token;
  const getPost = await fetch(`${process.env.NEXT_API_URL}/api/post`);

  const res = await getPost.json();
  if (token)
    return {
      props: {
        token,
        posts: res.posts,
      },
    };

  return { props: {} };
}
