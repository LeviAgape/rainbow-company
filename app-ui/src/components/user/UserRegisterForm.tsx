import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  InputAdornment,
} from "@mui/material";
import { UserRegister } from "./interfaceUser";
import { ColorData } from "../color/color-utills";
import { FormatCpfRegisterUser } from "./UserMasksInfo";
import { Person, Email, Palette, Badge } from "@mui/icons-material";

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
  const [cpfError, setCpfError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target as { name: string; value: string };
    setFormData({ ...formData, [name]: value });
  };

  const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawCpf = event.target.value.replace(/\D/g, "");
    setFormData({
      ...formData,
      cpf: FormatCpfRegisterUser(event.target.value),
    });

    if (rawCpf.length < 11) {
      setCpfError("CPF deve ter 11 dígitos.");
    } else {
      setCpfError("");
    }
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
      setSnackbarMessage("CPF ou EMAIL já cadastrados na base de dados.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Paper
      sx={{
        padding: 4,
        maxWidth: 500,
        margin: "auto",
        marginTop: 6,
        backgroundColor: "#f5f5f5",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "16px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: 3,
          fontWeight: "bold",
          textAlign: "center",
          color: "#1976D2",
        }}
      >
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: "#1976D2 !important" }} />
              </InputAdornment>
            ),
          }}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email sx={{ color: "#1976D2 !important" }} />
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Cor Preferida</InputLabel>
          <Select
            name="color"
            value={formData.color}
            onChange={handleChange}
            label="Cor Preferida"
            startAdornment={
              <InputAdornment position="start">
                <Palette sx={{ color: "#1976D2 !important" }} />
              </InputAdornment>
            }
          >
            {ColorData.map((color) => (
              <MenuItem key={color.name} value={color.name}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: color.colorBackground,
                      borderRadius: 1,
                      border: "1px solid #ccc",
                    }}
                  />
                  {color.name}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label="Observações"
          name="note"
          value={formData.note}
          onChange={(event) => {
            if (event.target.value.length <= 630) {
              handleChange(event);
            }
          }}
          margin="normal"
          multiline
          minRows={4}
          inputProps={{ maxLength: 630 }}
          helperText={`${formData.note.length}/630 caracteres`}
        />

        <TextField
          fullWidth
          label="CPF"
          name="cpf"
          value={formData.cpf}
          onChange={handleCPFChange}
          margin="normal"
          placeholder="___.___.___-__"
          required
          error={!!cpfError}
          helperText={cpfError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Badge sx={{ color: "#1976D2 !important" }} />
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            marginTop: 3,
            padding: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
          disabled={
            cpfError !== "" || formData.cpf.replace(/\D/g, "").length < 11
          }
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
