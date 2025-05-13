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
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { REACT_APP_API_ORIGIN } from "../common/Config";
import { useUser } from "../components/UserContext";
import Sidebar, { drawerWidth } from "../components/Sidebar";

interface DataItem {
  name: string;
  unit: string;
  label: string;
}

const CustomFields: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const { token, setToken, clearToken } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [newItem, setNewItem] = useState<DataItem>({
    name: "",
    unit: "",
    label: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [shouldReload, setShouldReload] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (token) {
      setIsLoading(true);
      axios
        .get(REACT_APP_API_ORIGIN + "/customFieldsKeys", {
          headers: { Authorization: token },
        })
        .then((customFieldsKeysResponse) => {
          console.log(customFieldsKeysResponse);
          const responseData = customFieldsKeysResponse.data.customFields;
          setData(responseData);
          setIsLoading(false);
          setShouldReload(false);
        })
        .catch((reject) => {
          console.log(reject);
          setIsLoading(false);
          setShouldReload(false);
        });
    }
  }, [token, shouldReload]);

  const handleAdd = () => {
    setIsLoading(true);
    axios
      .post(
        REACT_APP_API_ORIGIN + "/customFieldsKeys",
        {
          customFields: [newItem],
        },
        {
          headers: { Authorization: token },
        }
      )
      .then((customFieldsKeysResponse) => {
        console.log(customFieldsKeysResponse);
        setIsLoading(false);
      })
      .catch((reject) => {
        console.log(reject);
        setIsLoading(false);
      });
    //setData([...data, newItem]);
    setShouldReload(true);
    setNewItem({ name: "", unit: "", label: "" });
  };

  //   const handleEdit = (index: number) => {
  //     setNewItem(data[index]);
  //     setEditingIndex(index);
  //   };

  //   const handleSave = () => {
  //     if (editingIndex !== null) {
  //       setIsLoading(true);
  //       const updated = [...data];
  //       updated[editingIndex] = newItem;

  //       axios
  //         .post(
  //           REACT_APP_API_ORIGIN + "/customFieldsKeys",
  //           {
  //             customFields: [newItem],
  //           },
  //           {
  //             headers: { Authorization: token },
  //           }
  //         )
  //         .then((customFieldsKeysResponse) => {
  //           console.log(customFieldsKeysResponse);
  //           setIsLoading(false);
  //           setData(updated);
  //           setEditingIndex(null);
  //           setNewItem({ name: "", unit: "", label: "" });
  //           setShouldReload(true);
  //         })
  //         .catch((reject) => {
  //           console.log(reject);
  //           setIsLoading(false);
  //           setEditingIndex(null);
  //           setNewItem({ name: "", unit: "", label: "" });
  //           setShouldReload(true);
  //         });
  //     }
  //   };

  const handleDelete = (index: number) => {
    setIsLoading(true);
    const deletionData = data[index];
    console.log(deletionData);
    axios
      .delete(REACT_APP_API_ORIGIN + "/customFieldsKeys", {
        headers: { Authorization: token },
        data: {
          customFields: [deletionData],
        },
      })
      .then((customFieldsKeysResponse) => {
        console.log(customFieldsKeysResponse);
        setIsLoading(false);
        setShouldReload(true);
        // setData(updated);
        // setEditingIndex(null);
        // setNewItem({ name: "", unit: "", label: "" });
      })
      .catch((reject) => {
        console.log(reject);
        setIsLoading(false);
        setShouldReload(true);
        // setEditingIndex(null);
        // setNewItem({ name: "", unit: "", label: "" });
      });
    // setData(data.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} ml={"240px"}>
        <Box sx={{ p: 4 }}>
          <h2>Custom Fields</h2>

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              label="Label"
              name="label"
              value={newItem.label}
              onChange={handleChange}
            />
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

            <Button variant="contained" onClick={handleAdd}>
              Add
            </Button>
            {/* 
            {editingIndex !== null ? (
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            ) : (
            //   <Button variant="contained" onClick={handleAdd}>
            //     Add
            //   </Button>
            )} */}
          </Box>

          {isLoading ? (
            <Box>
              <Box
                sx={{
                  height: "80vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress size={100} />
              </Box>
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Label</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Unit</TableCell>

                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.label}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.unit}</TableCell>

                      <TableCell align="right">
                        {/* <Button size="small" onClick={() => handleEdit(index)}>
                          Edit
                        </Button> */}
                        <Button
                          size="small"
                          color="error"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default CustomFields;
