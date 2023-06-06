import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/slices/usersApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import "./users.css";
const handleMouseDownPassword = (event) => {
  event.preventDefault();
};
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error] = useState({ username: "", email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="user-page-layout">
      <div className="login-signup-layout">
        <h1>Log In</h1>
        <h3>Quora clone by Aditya Kumar</h3>
        <form onSubmit={submitHandler}>
          <FormControl sx={{ m: 1, minWidth: "40ch" }} variant="standard">
            <TextField
              error={error.email !== ""}
              id="filled-error-helper-text"
              label="E-Mail"
              helperText={error.email}
              variant="standard"
              required
              color="secondary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              sx={{ marginTop: "12px" }}
            />
            <Input
              id="standard-adornment-password"
              color="secondary"
              error={error.password !== ""}
              value={password}
              helperText={error.password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginTop: "15px" }}
              label="Password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment
                  position="end"
                  style={{ height: "100%", float: "right" }}
                >
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <Button
              sx={{ width: "120px", margin: "auto", marginTop: "30px" }}
              color="secondary"
              variant="contained"
              type="submit"
            >
              Log in
            </Button>
          </FormControl>
          {isLoading && <Loader />}
        </form>
        <h4>
          Don&sbquo;t have an account? <Link to="/register">Sign up here!</Link>
        </h4>
        <br />
        <p>Or</p>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>INSTANT ACCESS ID</p>
          <br />
          <p>E-mail:&nbsp;public@quora.com</p>
          <p>Password:&nbsp;abc123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
