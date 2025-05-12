import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import axios from "axios";
import { REACT_APP_API_ORIGIN } from "../common/Config";
import { useUser } from "../components/UserContext";
import Sidebar from "../components/Sidebar";

interface DataItem {
    name: string;
    unit: string;
    label: string;
}

const CustomFields: React.FC = () => {
    const [data, setData] = useState<DataItem[]>([
    ]);
    const { token, setToken, clearToken } = useUser();

    useEffect(() => {
        if (token) {

            // setIsLoading(true);
            axios
                .get(REACT_APP_API_ORIGIN + "/customFieldsKeys", {
                    headers: { Authorization: token },
                })
                .then((customFieldsKeysResponse) => {
                    console.log(customFieldsKeysResponse);
                    const responseData = customFieldsKeysResponse.data.customFields;
                    setData(responseData);
                }).catch((reject) => {
                    console.log(reject);
                    //setIsLoading(false);
                });
        }
    }, [token]);



    const [newItem, setNewItem] = useState<DataItem>({ name: "", unit: "", label: "" });
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        setData([...data, newItem]);
        setNewItem({ name: "", unit: "", label: "" });
    };

    const handleEdit = (index: number) => {
        setNewItem(data[index]);
        setEditingIndex(index);
    };

    const handleSave = () => {
        if (editingIndex !== null) {
            const updated = [...data];
            updated[editingIndex] = newItem;
            setData(updated);
            setEditingIndex(null);
            setNewItem({ name: "", unit: "", label: "" });
        }
    };

    const handleDelete = (index: number) => {
        setData(data.filter((_, i) => i !== index));
    };

    return (
        <div>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ p: 4 }}>
                    <h2>Custom Fields</h2>

                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <TextField
                            label="Name"
                            name="name"
                            value={newItem.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Unit"
                            name="unit"
                            value={newItem.unit}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Label"
                            name="label"
                            value={newItem.label}
                            onChange={handleChange}
                        />
                        {editingIndex !== null ? (
                            <Button variant="contained" color="primary" onClick={handleSave}>
                                Save
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={handleAdd}>
                                Add
                            </Button>
                        )}
                    </Box>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Unit</TableCell>
                                    <TableCell>Label</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.unit}</TableCell>
                                        <TableCell>{item.label}</TableCell>
                                        <TableCell align="right">
                                            <Button size="small" onClick={() => handleEdit(index)}>
                                                Edit
                                            </Button>
                                            <Button size="small" color="error" onClick={() => handleDelete(index)}>
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>
            </Box>
        </div>
    );
};

export default CustomFields;