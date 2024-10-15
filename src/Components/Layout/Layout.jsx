import { Outlet } from "react-router-dom";
import Navbar from "./../Navbar/Navbar";
import Container from "@mui/material/Container";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ my: 10 }}>
        <Outlet />
      </Container>
    </>
  );
}
