import { Button, Container, TextField, Box, Typography, Stack } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, } from 'react-router-dom';

const EditPostData = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [editPostData, setEditPostData] = useState({
        likes: "",
        tags: "",
        text: "",
        owner: "",
        image: "",
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
                navigate('/postdata', { replace: true })
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
                            label="Likes"
                            name="likes"
                            id="likes"
                            type={parseInt() === 'number'}
                            onChange={handleInputs}
                            value={editPostData.likes || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Tags"
                            name="tags"
                            id="tags"
                            onChange={handleInputs}
                            value={editPostData.tags || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Text"
                            name="text"
                            id="text"
                            onChange={handleInputs}
                            value={editPostData.text || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Owner ID "
                            name="owner"
                            id="owner"
                            onChange={handleInputs}
                            value={editPostData.owner || ""}
                        />
                    </div>
                    <div >
                        <TextField
                            label="Image"
                            name="image"
                            id="image"
                            onChange={handleInputs}
                            value={editPostData.image || ""}
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