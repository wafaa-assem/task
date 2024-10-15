import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { gql, useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { authContext } from "../../Context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const LOGIN_USER = gql`
  mutation ($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      token
    }
  }
`;

export default function Login() {
  const [isError, setIsError] = useState(false);
  const { setToken } = useContext(authContext);
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      console.log("data", data.login.token);
      localStorage.setItem("token", data.login.token);
      setToken(data.login.token);
      navigate("/");
    },
    onError: (error) => {
      console.log("error", error);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    },
  });

  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: (values) => {
      console.log("done", values);
      // hakalem api hena
      loginUser({
        variables: {
          username: values.username,
          password: values.password,
        },
      });
    },
  });

  return (
    <>
      <Typography
        variant="h4"
        color="initial"
        sx={{ textAlign: "center", mb: 3 }}
      >
        Login Now
      </Typography>
      <Box
        component="form"
        onSubmit={loginFormik.handleSubmit}
        sx={{
          width: 500,
          maxWidth: "100%",
          boxShadow: 1,
          p: 5,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {isError && <Alert severity="error">Error occurs</Alert>}

        <TextField
          value={loginFormik.values.username}
          onChange={loginFormik.handleChange}
          fullWidth
          label="username"
          name="username"
          id="username"
        />
        <TextField
          value={loginFormik.values.password}
          onChange={loginFormik.handleChange}
          fullWidth
          label="password"
          name="password"
          id="password"
        />
        <Box>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Box>
      </Box>
    </>
  );
}
