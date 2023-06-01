import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, TableBody, Container, Paper, TableHead, TableRow, TableContainer, Button, Stack, Typography, Avatar, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const columns = [
    { id: 'image', label: 'Image', minWidth: 170 },
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'like', label: 'Likes', minWidth: 100 },
    { id: 'text', label: 'Text', minWidth: 50 },
    { id: 'tags', label: 'Tags', minWidth: 110 },
    { id: '1' },
    { id: '2' },
    { id: '3' },
];

const ShowPostData = () => {
    const [userPostData, setUserPostData] = useState([]);
    const [idToDelete, setIdToDelete] = useState({});
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);

    // for style color added
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#ffb84d',
            color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(even)': {
            backgroundColor: ' #99ffff !important',
        },
        "&:hover": {
            backgroundColor: "transparent"
        }
    }));

    // get api call 
    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () => {
        const GET_URL = `https://dummyapi.io/data/v1/post`;
        const header = { "app-id": "64775092d20d55fd27d48a99" };
        const headers_ = { headers: header };
        try {
            const response = await axios.get(GET_URL, headers_)
            setUserPostData(response.data.data)
        } catch (err) {
            console.log(err)
        }
    };

    // tags mapping
    const getPostTags = (tag) => tag.map((data, index) => <ListItem key={index}>{index + 1}.{data} </ListItem>)

    // delete api call
    const handleDelete = async () => {
        const DELETE_URL = `https://dummyapi.io/data/v1/post/${idToDelete.id}`;
        const header = { "app-id": "64775092d20d55fd27d48a99" };
        const headers_ = { headers: header };
        try {
            const response = await axios.delete(DELETE_URL, headers_)
            getUser();
        } catch (err) {
            toggle();
            console.log(err)
        }
    }

    return (
        <>
            <Container sx={{ marginTop: 10 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        All Post Data
                    </Typography>
                    <Link to={`/newpostdata`}>
                        <Button variant="contained" >
                            New Post
                        </Button>
                    </Link>
                </Stack>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 650 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <StyledTableRow>
                                    {columns.map((column) => (
                                        <StyledTableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </StyledTableCell>
                                    ))}
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {userPostData.map((post, index) => {
                                    return (
                                        <StyledTableRow hover key={index} sx={{ hover: "none" }} >
                                            <StyledTableCell component="th" scope="row" padding="none">
                                                <Stack direction="row" alignItems="center">
                                                    <Avatar alt={post.name} src={post.image} sx={{ ml: 2 }} />
                                                </Stack>
                                            </StyledTableCell>
                                            <StyledTableCell align="left">{post.id}</StyledTableCell>
                                            <StyledTableCell align="left">{post.likes}</StyledTableCell>
                                            <StyledTableCell align="left">{post.text}</StyledTableCell>
                                            <StyledTableCell align="left">{getPostTags(post.tags)}</StyledTableCell>
                                            <StyledTableCell>
                                                <Link to={`/viewownerpostdata/${post.id}`}>
                                                    <Button variant='contained' sx={{ mt: 1 }}  >View Owner</Button>
                                                </Link>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Link to={`/editpostdata/${post.id}`}>
                                                    <Button variant='contained' sx={{ mt: 1 }}>Edit</Button>
                                                </Link>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Button variant='contained' sx={{ mt: 1 }} onClick={() => { setIdToDelete(post); toggle(); }}
                                                >Delete</Button>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container >

            {/* modal for delete item */}
            <Modal Modal isOpen={open} style={{ marginTop: '13rem' }} >
                <ModalHeader toggle={toggle}>Post : {idToDelete.id}</ModalHeader>
                <ModalBody>Sure, You want to Delete? </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>No</Button>
                    <Button color="primary" onClick={handleDelete}>Yes </Button>
                </ModalFooter>
            </Modal>

        </>
    );
}
export default ShowPostData;