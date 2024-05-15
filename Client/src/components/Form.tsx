import {
  Box,
  Button,
  Dialog,
  FormLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { dom, Data } from "../types/Types";

interface Props {
  type: string;
  setRender: Dispatch<SetStateAction<dom>>;
  render: dom;
  handle: (data: Data) => void; // Function type definition
  response: [];
}

const labelStyle = { mt: 1 };
const Form = ({ type, render, setRender, handle, response }: Props) => {
  const [inputs, setInputs] = useState({
    image: "",
    name: "",
    DateOfBirth: "",
    email: "",
    number: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handle({ inputs });
  };
  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <IconButton
        onClick={() => setRender({ ...render, form: false })}
        sx={{ marginLeft: "auto" }}
      >
        <CloseRoundedIcon />
      </IconButton>

      <form onSubmit={handleSubmit}>
        <Box
          p={2}
          pr={6}
          pl={6}
          pb={2}
          display={"flex"}
          justifyContent={"center"}
          flexDirection="column"
          width={400}
          margin="auto"
          alignContent={"center"}
        >
          <FormLabel sx={labelStyle}>Image</FormLabel>
          <TextField
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"text"}
            name="image"
          />

          <FormLabel sx={labelStyle}>Name</FormLabel>
          <TextField
            value={inputs.name}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"text"}
            name="name"
          />

          <FormLabel sx={labelStyle}>Date Of Birth</FormLabel>
          <TextField
            value={inputs.DateOfBirth}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"text"}
            name="DateOfBirth"
            placeholder="YYYY-MM-DD"
          />
          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"email"}
            name="email"
          />

          <FormLabel sx={labelStyle}>Phone</FormLabel>

          <TextField
            value={inputs.number}
            onChange={handleChange}
            margin="normal"
            variant="standard"
            type={"text"}
            name="number"
          />

          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "primary" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {type}
          </Button>

          {response.length > 0 && (response.map((e)=>(
            <Typography variant="h6" textAlign={"center"} color="error">
              {e}
            </Typography>)
          ))}
        </Box>
      </form>
    </Dialog>
  );
};

export default Form;
