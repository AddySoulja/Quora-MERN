// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { useLogoutMutation } from "../../redux/slices/usersApiSlice";
// import { logout } from "../../redux/slices/authSlice";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    // try {
    //   await logoutApiCall().unwrap();
    //   dispatch(logout());
    //   navigate("/login");
    // } catch (err) {
    //   console.error(err);
    // }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
            {userInfo ? (
              <>
                <NavDropdown
                  id="navbarScrollingDropdown"
                  title={userInfo.username}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                  <Link to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Nav.Link>Sign In</Nav.Link>
                </Link>
                <Link to="/register">
                  <Nav.Link>Sign Up</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
