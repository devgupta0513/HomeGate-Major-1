import React, { useState } from 'react'
import { Button, Input, InputGroup, InputRightAddon, InputRightElement, FormControl, FormLabel, VStack, useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [otpe, setOtpe] = useState("")
    
    const [showButton, setShowButton] = useState(true);
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [pic, setPic] = useState()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClick = () => setShow(!show)
    const toast = useToast()
    const navigate = useNavigate()
    const otpHandle  = async() => {
        // setLoading(true);
        setShowButton(false)
        try {
            // const config = {
            //     headers: {
            //         "Content-type": "application/json",
            //     },
            // };

            // const { otp } = await axios.post(
            //     "https://linkus-lw9r.onrender.com/api/user/login",
            //     { email},
            //     config
            // );
                
            toast({
                title: "OTP SEND SUCCESSFULLY",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            
            // console.log(otp);
            
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            // setLoading(false);
        }



    }



    const otpSubmitHandle  = async() => {
        // setLoading(true);
        setShowButton(true);
        setOtpe('');
        try {
            // const config = {
            //     headers: {
            //         "Content-type": "application/json",
            //     },
            // };

            // const { otp } = await axios.post(
            //     "https://linkus-lw9r.onrender.com/api/user/login",
            //     { email},
            //     config
            // );
                
            toast({
                title: "OTP VERIFIED  SUCCESSFULLY",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            
            // console.log(otp);
            
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            // setLoading(false);
        }

    }



    const postDetails = (pics) => {
        setLoading(true)
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            return
        }
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData()
            data.append("file", pics)
            data.append("upload_preset", "LinkUs")
            data.append("cloud_name", "minor-linkus")
            fetch("https://api.cloudinary.com/v1_1/minor-linkus/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString())
                    setLoading(false)
                })
                .catch((err) => {
                    setLoading(false)
                })
        } else {
            toast({
                title: "Please Select a Valid Image!",
                status: "",
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            setLoading(false)
            return
        }
    }

    const submitHandler = async () => {
        setLoading(true)
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false)
            return
        }
        if (password !== confirmPassword) {
            toast({
                title: "Passwords do not match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false)
            return
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            const { data } = await axios.post(
                "https://linkus-lw9r.onrender.com/api/user",
                { name, email, password, pic },
                config
            )
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            localStorage.setItem("userInfo", JSON.stringify(data))
            setLoading(false)
            navigate('/home');
        } catch (error) {
            toast({
                title: "Error Occurred!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false)
        }
    }

    return (
        <VStack spacing="5px" color="black">
            
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder="Enter your Name"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>

            <FormControl id="email1" isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                <Input
                    placeholder="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    
                />
                 <InputRightElement width="5.6rem" >
                 {showButton && (
    <Button 
colorScheme="blue"
        h="1.75rem" 
        size="sm" 
        onClick={otpHandle} 
        
        display={showButton ? 'block' : 'none'}
    >
        GET OTP
    </Button>
)}
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="otp1" isRequired>
                <FormLabel>OTP</FormLabel>
                <InputGroup>
                <Input
                    placeholder="Enter your otp"
                    onChange={(e) => setOtpe(e.target.value)}
                    value={otpe}
                />
                 <InputRightElement width="6.3rem">
                 {!showButton && (
    <Button 
    colorScheme="green"
        marginRight="6px" 
        h="1.75rem" 
        size="sm" 
        onClick={otpSubmitHandle} 
        
        display={showButton ? 'none' : 'block'}
    >
        VERIFY OTP
    </Button>
)}
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="password1" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id="confirmPassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder="Confirm your password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

           

            <Button
                colorScheme="orange"
                width="100%"
                style={{ margin: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default SignUp
