import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, Container, Paper, TableHead, TableRow, TableContainer, Stack, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';

const columns = [
    { id: 'picture', label: 'Picture', minWidth: 170 },
    { id: 'id', label: 'ID', minWidth: 50 },
    { id: 'title', label: 'Title', minWidth: 100 },
    { id: 'firstName', label: 'FirstName', minWidth: 50 },
    { id: 'lastName', label: 'LastName', minWidth: 110 },
    { id: '1' },
];

const ViewOwnerPostData = () => {
    const { id } = useParams()
    const [userPostData, setUserPostData] = useState({});

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
        getUser();
    }, []);

    const getUser = async () => {
        const GET_URL = `https://dummyapi.io/data/v1/post/${id}`;
        const header = { "app-id": "64775092d20d55fd27d48a99" };
        const headers_ = { headers: header };
        try {
            const response = await axios.get(GET_URL, headers_)
            setUserPostData(response.data.owner)
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <>
            <Container sx={{ marginTop: 10 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        All Post Owner Data
                    </Typography>
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
                                <StyledTableRow hover sx={{ hover: "none" }} >
                                    <StyledTableCell component="th" scope="row" padding="none">
                                        <Stack direction="row" alignItems="center">
                                            <Avatar alt={userPostData.picture} src={userPostData.picture} sx={{ ml: 2 }} />
                                        </Stack>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{userPostData.id}</StyledTableCell>
                                    <StyledTableCell align="left">{userPostData.title}</StyledTableCell>
                                    <StyledTableCell align="left">{userPostData.firstName}</StyledTableCell>
                                    <StyledTableCell align="left">{userPostData.lastName}</StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container >

        </>
    );
}
export default ViewOwnerPostData;