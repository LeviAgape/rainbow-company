import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { UserRegister } from "../user/interfaceUser";

const API_URL = import.meta.env.VITE_API_URL;

export const HomeView = () => {
  const [users, setUsers] = useState<UserRegister[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/user`)
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ padding: 2 }}>User List</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Cor</TableCell>
            <TableCell>Observações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}> 
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
