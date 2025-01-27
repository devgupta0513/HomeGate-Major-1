import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightAddon, InputRightElement, Show, VStack, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import Cookies from "js-cookie";

const SignIn = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const endpoint = process.env.REACT_APP_BASE_URL;
    const [Show, setShow] = useState(false)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const handleCLick = () => setShow(!Show)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate()
    const submitHandler = async () => {
        setLoading(true);
        if (!email) {
            toast({
                title: "Please enter  the gmail",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        if (!emailRegex.test(email)) {
            toast({
                title: "Please enter a valid email address",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        if (!password) {
            toast({
                title: "Please enter  the password",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                `${endpoint}/api/user/login`,
                { email, password },
                config
            );

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            // localStorage.setItem("userInfo", JSON.stringify(data));
            // setLoading(false);
            // navigate('/home');
            Cookies.set("homegate-token", JSON.stringify(data), {
                expires: 1, // 1 day expiry
                // expires: 10/(24*60*60), // 10 seconds = 10/(24*60*60) days
                secure: true, // HTTPS only
                sameSite: "Strict", // Protect against CSRF hosted
                // sameSite: "Lax", // Cross-origin compatibility local
                path: "/"
            });
            setLoading(false);
            navigate('/home');
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };



    return (
        <VStack spacing="5px" color='black' >
            <FormControl id='email' isRequired >
                <FormLabel> Email </FormLabel>
                <Input

                    value={email}
                    placeholder='Enter your Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id='password' isRequired >
                <FormLabel> Password </FormLabel>
                <InputGroup>
                    <Input
                        type={Show ? "text" : "password"}
                        placeholder='Enter your password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleCLick} >
                            {Show ? "hide" : "show"}

                        </Button>


                    </InputRightElement>

                </InputGroup>





            </FormControl>





            <Button
                colorScheme='orange'
                width="100%"
                style={{ margin: 15 }}
                onClick={submitHandler}
                isLoading={loading}>

                Sign In

            </Button>
            <Button
                variant="solid"
                colorScheme='red'
                width="100%"
                onClick={() => {
                    setEmail("guest@example.com")
                    setPassword("12345678")

                    // toast({
                    //     title: "CREATE YOUR OWN ID ",
                    //     status: "error",
                    //     duration: 5000,
                    //     isClosable: true,
                    //     position: "top",
                    // });
                }}
            >

                Get Guest User Credentials

            </Button>



        </VStack>
    )
}
export default SignIn