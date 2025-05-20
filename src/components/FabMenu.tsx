import React, { useState } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CustomFields from "../pages/CustomFields";
import axios from "axios";
import { REACT_APP_API_ORIGIN } from "../common/Config";
import { useUser } from "./UserContext";

const FabMenu = ({ customFields = [] }) => {
  const { token, setToken, clearToken } = useUser();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(
    customFields.reduce((acc, customField) => {
      return { ...acc, [customField.name]: "" };
    }, {})
  );
  const [date, setDate] = useState<string>();

  const handleChange = (field) => (event) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const handleSubmit = () => {
    console.log("Submitted values:", values);
    const formatedVaules = Object.entries(values).reduce(
      (acc, [key, value]) => {
        return {
          ...acc,
          [key]: {
            [date]: value,
          },
        };
      },
      {}
    );

    axios
      .post(REACT_APP_API_ORIGIN + "/customFieldsData", formatedVaules, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response);
        window.location.reload();
        setOpen(false);
      })
      .catch((reject) => {
        console.log(reject);
        window.location.reload();
        setOpen(false);
      });

    console.log(formatedVaules);
    // Add your saving logic here (e.g., API call, local state update)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Values</DialogTitle>
        <DialogContent>
          {Object.values(customFields).map((field) => (
            <TextField
              label={field.name}
              type="number"
              fullWidth
              margin="normal"
              value={values[field.name]}
              onChange={handleChange(field.name)}
            />
          ))}
          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FabMenu;
