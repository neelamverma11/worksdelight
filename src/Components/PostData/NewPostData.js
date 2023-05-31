import { Button, Container, TextField, Box, Typography, Stack } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, } from 'react-router-dom';

const NewPostData = () => {
    const navigate = useNavigate();
    const [newPostData, setNewPostData] = useState({
        likes: "",
        tags: "",
        text: "",
        owner: "",
        image: "",
    });

    const handleInputs = (e) => {
        setNewPostData({ ...newPostData, [e.target.name]: e.target.value })
    }

    // add new user
    const POST_URL = `https://dummyapi.io/data/v1/post/create`;
    const header = { "app-id": "64775092d20d55fd27d48a99" };
    const headers_ = { headers: header };

    const postNewPostData = async () => {
        try {
            const response = await axios.post(POST_URL, newPostData, headers_)
            if (response.status === 200) {
                navigate('/', { replace: true })
            }
            alert(`The Response is: ${response.data.id},${response.data.likes},${response.data.tags}`);
        } catch (err) {
            console.log(err)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        postNewPostData()
    }

    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="center" ml={1} mt={10}>
                    <Typography variant="h4" gutterBottom>
                        New Post Data
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
                            label="Likes"
                            name="likes"
                            id="likes"
                            type={parseInt() === 'number'}
                            onChange={handleInputs}
                            value={newPostData.likes || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Tags"
                            name="tags"
                            id="tags"
                            onChange={handleInputs}
                            value={newPostData.tags || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Text"
                            name="text"
                            id="text"
                            onChange={handleInputs}
                            value={newPostData.text || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Owner ID "
                            name="owner"
                            id="owner"
                            onChange={handleInputs}
                            value={newPostData.owner || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Image"
                            name="image"
                            id="image"
                            onChange={handleInputs}
                            value={newPostData.image || ""}
                        />
                    </div>
                    <Button variant='contained' style={{ marginLeft: "8px" }}
                        onClick={handleSubmit} >Submit</Button>
                </Box>
            </Container>
        </>
    )
}

export default NewPostData;