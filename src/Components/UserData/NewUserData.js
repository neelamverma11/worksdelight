import { Button, Container, TextField, Box, Typography, Stack } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, } from 'react-router-dom';

const NewUserData = () => {
    const navigate = useNavigate();
    const [newUserData, setNewUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        title: "",
        picture: "",
    });

    const handleInputs = (e) => {
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value })
    }

    // add new user
    const POST_URL = `https://dummyapi.io/data/v1/user/create`;
    const header = { "app-id": "64775092d20d55fd27d48a99" };
    const headers_ = { headers: header };

    const postNewUserData = async () => {
        try {
            const response = await axios.post(POST_URL, newUserData, headers_)
            if (response.status === 200) {
                navigate('/', { replace: true })
            }
            alert(`The Response is: ${response.data.id},${response.data.firstName},${response.data.lastName}`);
        } catch (err) {
            console.log(err)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        postNewUserData()
    }

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="center" ml={1} mt={10}>
                    <Typography variant="h4" gutterBottom>
                        New User Data
                    </Typography>
                </Stack>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '45ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    display='grid'
                    alignItems="center" justifyContent="center"
                >
                    <div >
                        <TextField
                            label="First Name"
                            name="firstName"
                            id="firstName"
                            onChange={handleInputs}
                            value={newUserData.firstName || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Last Name"
                            name="lastName"
                            id="lastName"
                            onChange={handleInputs}
                            value={newUserData.lastName || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Email"
                            name="email"
                            id="email"
                            onChange={handleInputs}
                            value={newUserData.email || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Title (mr/ms, mrs)"
                            name="title"
                            id="title"
                            onChange={handleInputs}
                            value={newUserData.title || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Picture"
                            name="picture"
                            id="picture"
                            onChange={handleInputs}
                            value={newUserData.picture || ""}
                        />
                    </div>
                    <Button variant='contained' style={{ marginLeft: "8px" }}
                        onClick={handleSubmit} >Submit</Button>
                </Box>
            </Container>
        </>
    )
}

export default NewUserData;