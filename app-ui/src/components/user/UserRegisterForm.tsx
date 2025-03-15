import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { UserRegister } from "./interfaceUser";

const API_URL = import.meta.env.VITE_API_URL;

export const UserRegisterForm = () => {
  const [formData, setFormData] = useState<UserRegister>({
    name: "",
    email: "",
    color: "",
    note: "",
    cpf: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post(`${API_URL}/user`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSnackbarMessage("Usuário cadastrado com sucesso!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setFormData({ name: "", email: "", color: "", note: "", cpf: "" });
    } catch (error) {
      setSnackbarMessage(
        "O usuário não foi cadastrado, verifique suas informações."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Paper sx={{ padding: 3, maxWidth: 400, margin: "auto", marginTop: 4 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Cadastre um novo usuário
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Cor"
          name="color"
          value={formData.color}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Observações"
          name="note"
          value={formData.note}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="CPF"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Registrar
        </Button>
      </form>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: "350px", fontSize: "1.1rem", padding: "12px" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
