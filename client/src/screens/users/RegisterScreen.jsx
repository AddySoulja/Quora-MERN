import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Loader from "../../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/slices/usersApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import "./users.css";
const handleMouseDownPassword = (event) => {
  event.preventDefault();
};
const RegisterScreen = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          username: user.username,
          email: user.email,
          password: user.password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleInput = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="user-page-layout">
      <div className="login-signup-layout">
        <h1>Register</h1>
        <h3>Quora clone by Aditya Kumar</h3>
        <form onSubmit={submitHandler}>
          <FormControl sx={{ m: 1, width: "40ch" }} variant="standard">
            <TextField
              error={error.username !== ""}
              id="filled-error-helper-text"
              label="Username"
              helperText={error.username}
              variant="standard"
              autoFocus={true}
              color="secondary"
              value={user.username}
              name="username"
              onChange={handleInput}
            />
            <TextField
              error={error.email !== ""}
              id="filled-error-helper-text"
              label="E-Mail"
              helperText={error.email}
              variant="standard"
              required
              name="email"
              color="secondary"
              value={user.email}
              onChange={handleInput}
              type="email"
              sx={{ marginTop: "12px" }}
            />
            <Input
              id="standard-adornment-password"
              color="secondary"
              error={error.password !== ""}
              value={user.password}
              helperText={error.password}
              onChange={handleInput}
              sx={{ marginTop: "18px" }}
              name="password"
              label="Password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment
                  position="end"
                  style={{
                    height: "100%",
                    float: "right",
                  }}
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
            <Input
              id="standard-adornment-password"
              color="secondary"
              error={error.password !== ""}
              value={user.confirmPassword}
              helperText={error.password}
              onChange={handleInput}
              placeholder="Confirm your password"
              sx={{ marginTop: "18px" }}
              name="confirmPassword"
              label="Confirm password"
              type={showPassword2 ? "text" : "password"}
              endAdornment={
                <InputAdornment
                  position="end"
                  style={{
                    height: "100%",
                    float: "right",
                  }}
                >
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword2}
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
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
              SIGN UP
            </Button>
          </FormControl>
          {isLoading && <Loader />}
        </form>
        <h4 style={{ marginTop: "5%" }}>
          Already have an account? <Link to="/login">Log in</Link>
        </h4>
      </div>
    </div>
  );
};

export default RegisterScreen;
