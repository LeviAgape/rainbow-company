import { UserView } from "../user/UserView";
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
      }}
    >
      <UserView />
      <UserRegisterForm />
    </Box>
  );
};
