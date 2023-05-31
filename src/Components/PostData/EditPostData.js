import { Button, Container, TextField, Box, Typography, Stack } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, } from 'react-router-dom';

const EditPostData = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [editPostData, setEditPostData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        title: "",
        picture: "",
    });

    const handleInputs = (e) => {
        setEditPostData({ ...editPostData, [e.target.name]: e.target.value })
    }

    // add new user
    const PUT_URL = `https://dummyapi.io/data/v1/post/${id}`;
    const header = { "app-id": "64775092d20d55fd27d48a99" };
    const headers_ = { headers: header };

    const updatePostData = async () => {
        try {
            const response = await axios.put(PUT_URL, editPostData, headers_)
            if (response.status === 200) {
                navigate('/', { replace: true })
            }
        } catch (err) {
            console.log(err)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        updatePostData()
    }

    // get api call 
    useEffect(() => {
        const getPreviousData = async () => {
            const GET_URL = `https://dummyapi.io/data/v1/post/${id}`;
            const header = { "app-id": "64775092d20d55fd27d48a99" };
            const headers_ = { headers: header };
            try {
                const response = await axios.get(GET_URL, headers_)
                setEditPostData(response.data)
                console.log(response.data)
            } catch (err) {
                console.log(err)
            }
        };
        getPreviousData()
    }, []);

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="center" ml={1} mt={10}>
                    <Typography variant="h4" gutterBottom>
                        Update Post Data
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
                            value={editPostData.firstName || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Last Name"
                            name="lastName"
                            id="lastName"
                            onChange={handleInputs}
                            value={editPostData.lastName || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Email"
                            name="email"
                            id="email"
                            onChange={handleInputs}
                            value={editPostData.email || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Title (mr/ms, mrs)"
                            name="title"
                            id="title"
                            onChange={handleInputs}
                            value={editPostData.title || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Picture"
                            name="picture"
                            id="picture"
                            onChange={handleInputs}
                            value={editPostData.picture || ""}
                        />
                    </div>
                    <Button variant='contained' style={{ marginLeft: "10px" }}
                        onClick={handleSubmit} >Update</Button>
                </Box>
            </Container>
        </>
    )
}

export default EditPostData;