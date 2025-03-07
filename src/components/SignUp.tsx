import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  useToast,
  Divider,
  Container,
  Stack,
  Link,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    
    try {
      setLoading(true);
      await signup(email, password);
      navigate('/dashboard');
      toast({
        title: 'Account created',
        description: 'Your account has been created successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create an account',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to sign in with Google',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const createTestAccount = async () => {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    
    setEmail(testEmail);
    setPassword(testPassword);
    setConfirmPassword(testPassword);
    
    try {
      setLoading(true);
      await signup(testEmail, testPassword);
      toast({
        title: 'Test Account Created',
        description: 'Test account has been created successfully. You can now log in with test@example.com and password123.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error: any) {
      // Check if the error is because the account already exists
      if (error.code === 'auth/email-already-in-use') {
        toast({
          title: 'Account Already Exists',
          description: 'Test account already exists. You can log in with test@example.com and password123.',
          status: 'info',
          duration: 3000,
          isClosable: true,
        });
        navigate('/login');
      } else {
        toast({
          title: 'Error',
          description: 'Failed to create test account: ' + (error.message || 'Unknown error'),
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <Box p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Stack spacing={4} as="form" onSubmit={handleSubmit}>
          <Text fontSize="2xl" fontWeight="bold">
            Create an Account
          </Text>
          
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={loading}
          >
            Sign Up
          </Button>
          
          <Button
            colorScheme="teal"
            width="full"
            onClick={createTestAccount}
            isLoading={loading}
          >
            Create Test Account
          </Button>

          <Divider />

          <Button
            width="full"
            onClick={handleGoogleSignIn}
            isLoading={loading}
            leftIcon={<FcGoogle />}
            variant="outline"
          >
            Sign up with Google
          </Button>

          <Text textAlign="center">
            Already have an account?{' '}
            <Link as={RouterLink} to="/login" color="blue.500">
              Sign in
            </Link>
          </Text>
        </Stack>
      </Box>
    </Container>
  );
}; 