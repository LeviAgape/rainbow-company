import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { UserDashboard } from "../user/interfaceUser";

const API_URL = import.meta.env.VITE_API_URL;

export const UserView = () => {
  const [users, setUsers] = useState<UserDashboard[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/user`)
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: 800,
        margin: "auto",
        marginTop: 4,
        borderRadius: 3,
        boxShadow: 3,
        maxHeight: 350,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          padding: 2,
          backgroundColor: "#1976d2",
          color: "white",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          textAlign: "center",
        }}
      >
        Lista de Cadastrados
      </Typography>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1565c0" }}>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>
              Nome
            </TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>
              Email
            </TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>
              Cor
            </TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>
              Observações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              key={index}
              sx={{ backgroundColor: index % 2 === 0 ? "#e3f2fd" : "white" }}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.color}</TableCell>
              <TableCell>{user.note}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
