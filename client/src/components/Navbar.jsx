// client/src/components/Navbar.jsx

import { useContext } from 'react';
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { BoxArrowRight, PersonCircle, ColumnsGap } from 'react-bootstrap-icons'; // Import icons

const AppNavbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm py-2 sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2 text-primary">
          <ColumnsGap width="28" height="28" />
          <span className="fs-4">TaskMaster</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center mt-3 mt-lg-0">
            {/* Dark/Light Mode Toggle Button */}
            <ThemeToggle />

            {user ? (
              <NavDropdown 
                title={
                  <div className="d-flex align-items-center gap-2">
                    <PersonCircle size="20" />
                    <span>Welcome, {user.name}</span>
                  </div>
                } 
                id="basic-nav-dropdown" 
                align="end" 
                className="custom-dropdown ms-lg-3"
              >
                <NavDropdown.Item href="#profile" className="d-flex align-items-center gap-2">
                  <PersonCircle />
                  <span>Profile</span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="text-danger d-flex align-items-center gap-2">
                  <BoxArrowRight />
                  <span>Logout</span>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;