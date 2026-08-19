// client/src/pages/Login.jsx

import { useState, useContext } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaFacebook, FaMicrosoft } from 'react-icons/fa';
import toast from 'react-hot-toast';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { signInWithPopup } from 'firebase/auth';
import { 
  auth, 
  googleProvider, 
  facebookProvider, 
  githubProvider, 
  microsoftProvider 
} from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      loginUser(res.data.user, res.data.token);
      toast.success(res.data.message);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Common OAuth response helper
  const handleSocialBackendSync = async (endpoint, name, email, fallbackEmail) => {
    const res = await API.post(endpoint, {
      name,
      email: email || fallbackEmail,
    });
    loginUser(res.data.user, res.data.token);
    toast.success(res.data.message);
    navigate('/');
  };

  // Google Handler
  const handleGoogleLogin = async () => {
    const loadingToast = toast.loading('Connecting to Google...');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await handleSocialBackendSync('/auth/google', result.user.displayName, result.user.email);
    } catch (err) {
      console.error('Google Auth Error:', err);
      toast.error('Google login failed');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  // Facebook Handler
  const handleFacebookLogin = async () => {
    const loadingToast = toast.loading('Connecting to Facebook...');
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      await handleSocialBackendSync('/auth/facebook', result.user.displayName, result.user.email, `${result.user.uid}@facebook.com`);
    } catch (err) {
      console.error('Facebook Auth Error:', err);
      toast.error('Facebook login failed');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  // GitHub Handler
  const handleGithubLogin = async () => {
    const loadingToast = toast.loading('Connecting to GitHub...');
    try {
      const result = await signInWithPopup(auth, githubProvider);
      await handleSocialBackendSync('/auth/github', result.user.displayName, result.user.email, `${result.user.uid}@github.com`);
    } catch (err) {
      console.error('GitHub Auth Error:', err);
      toast.error('GitHub login failed');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  // Microsoft Handler
  const handleMicrosoftLogin = async () => {
    const loadingToast = toast.loading('Connecting to Microsoft...');
    try {
      const result = await signInWithPopup(auth, microsoftProvider);
      await handleSocialBackendSync('/auth/microsoft', result.user.displayName, result.user.email, `${result.user.uid}@microsoft.com`);
    } catch (err) {
      console.error('Microsoft Auth Error:', err);
      toast.error('Microsoft login failed');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      {/* data-bs-theme="dark" যোগ করার ফলে কার্ড ও এর ভেতরে থাকা সব ইনপুট ফিল্ড পেজের লাইট/ডার্ক থিম নির্বিশেষে সবসময় ডার্ক প্রপার্টিতেই কাজ করবে */}
      <Card 
        data-bs-theme="dark"
        style={{ width: '420px', backgroundColor: '#1e293b', borderColor: '#334155' }} 
        className="shadow-lg p-4 rounded-4 text-white"
      >
        <Card.Body>
          <h3 className="text-center fw-bold mb-4">Sign In</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-light">Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#ffffff' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="text-light">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#ffffff' }}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-3 fw-semibold py-2"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>

          <div className="text-center text-secondary my-3 fs-7 fw-semibold">
            OR SIGN IN WITH
          </div>

          <Row className="g-2 mb-3">
            {/* Google Button */}
            <Col xs={3}>
              <Button 
                variant="outline-light" 
                className="w-100 d-flex justify-content-center align-items-center py-2" 
                onClick={handleGoogleLogin}
                style={{ borderColor: '#475569', backgroundColor: '#0f172a' }}
              >
                <FcGoogle size={22} />
              </Button>
            </Col>

            {/* GitHub Button - Fixed white icon & dark border */}
            <Col xs={3}>
              <Button 
                variant="outline-light" 
                className="w-100 d-flex justify-content-center align-items-center py-2 text-white" 
                onClick={handleGithubLogin}
                style={{ borderColor: '#475569', backgroundColor: '#0f172a' }}
              >
                <FaGithub size={22} color="#ffffff" />
              </Button>
            </Col>

            {/* Facebook Button */}
            <Col xs={3}>
              <Button 
                variant="outline-light" 
                className="w-100 d-flex justify-content-center align-items-center py-2" 
                onClick={handleFacebookLogin}
                style={{ borderColor: '#475569', backgroundColor: '#0f172a' }}
              >
                <FaFacebook size={22} color="#1877F2" />
              </Button>
            </Col>

            {/* Microsoft Button */}
            <Col xs={3}>
              <Button 
                variant="outline-light" 
                className="w-100 d-flex justify-content-center align-items-center py-2" 
                onClick={handleMicrosoftLogin}
                style={{ borderColor: '#475569', backgroundColor: '#0f172a' }}
              >
                <FaMicrosoft size={22} color="#00A4EF" />
              </Button>
            </Col>
          </Row>

          <p className="text-center mb-0 mt-3 text-secondary">
            Don't have an account?{' '}
            <Link to="/register" className="text-decoration-none fw-bold text-primary">
              Register
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;