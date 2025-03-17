import { UserRegisterForm } from "../user/UserRegisterForm";
import { Box } from "@mui/material";

export const HomeView = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        padding: 2,
        overflow: "hidden",
        background: "linear-gradient(135deg, #1E88E5, #42A5F5)",
      }}
    >
      <UserRegisterForm />
    </Box>
  );
};
