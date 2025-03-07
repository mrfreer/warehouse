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
  HStack,
  Alert,
  AlertIcon,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Badge,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { MdCheckCircle } from 'react-icons/md';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to sign in');
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign in',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError(error.message || 'Failed to sign in with Google');
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign in with Google',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTestLogin = () => {
    const testEmail = 'test@example.com';
    const testPassword = 'password123';
    
    setEmail(testEmail);
    setPassword(testPassword);
    
    toast({
      title: 'Test Credentials Set',
      description: 'Click "Sign In" to log in with the test account',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  // Stock warehouse images - fixed the third image URL
  const warehouseImages = [
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  ];

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.xl" py={6}>
        {/* Top section - Login Form */}
        <Box p={6} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="white" mb={8}>
          <Flex direction={{ base: 'column', md: 'row' }} gap={6} align="center">
            <Box flex="1">
              <Heading as="h1" size="xl" color="blue.700" mb={2}>
                Freer Crossings Commerce Center
              </Heading>
              <Text fontSize="md" color="gray.600">
                Warehouse Management Portal - Tenant Access
              </Text>
            </Box>
            
            <Box width={{ base: "100%", md: "auto" }} minW={{ md: "400px" }}>
              <Flex as="form" onSubmit={handleSubmit} direction={{ base: 'column', sm: 'row' }} gap={4} align="flex-end">
                <FormControl isRequired flex="1">
                  <FormLabel fontSize="sm">Email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg="white"
                    size="md"
                  />
                </FormControl>

                <FormControl isRequired flex="1">
                  <FormLabel fontSize="sm">Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    bg="white"
                    size="md"
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={loading}
                  size="md"
                >
                  Sign In
                </Button>
              </Flex>
              
              {error && (
                <Alert status="error" mt={2} size="sm">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
              
              <Flex mt={2} justify="space-between" align="center">
                <Text fontSize="sm">
                  <Link as={RouterLink} to="/signup" color="blue.500">
                    Create Account
                  </Link>
                </Text>
                
                <HStack spacing={2}>
                  <Button
                    size="sm"
                    onClick={handleTestLogin}
                    variant="ghost"
                    colorScheme="teal"
                  >
                    Test Login
                  </Button>
                  
                  <Button
                    size="sm"
                    onClick={handleGoogleSignIn}
                    isLoading={loading}
                    leftIcon={<FcGoogle />}
                    variant="ghost"
                    colorScheme="blue"
                  >
                    Google
                  </Button>
                </HStack>
              </Flex>
            </Box>
          </Flex>
        </Box>
        
        {/* Main content */}
        <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
          <Heading as="h2" size="lg" mb={6} color="blue.600" textAlign="center">
            Premier Warehouse/Office Bays For Lease in upscale Kendall
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
            {warehouseImages.map((img, index) => (
              <Box key={index} borderRadius="md" overflow="hidden" boxShadow="md">
                <Image 
                  src={img}
                  alt={`Warehouse image ${index + 1}`}
                  objectFit="cover"
                  height="250px"
                  width="100%"
                  transition="transform 0.3s ease"
                  _hover={{ transform: 'scale(1.05)' }}
                />
              </Box>
            ))}
          </SimpleGrid>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              <Heading as="h3" size="md" mb={4} color="blue.500" pb={2} borderBottom="2px" borderColor="blue.100">
                Property Features
              </Heading>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Safe, secure Kendall area
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Deluxe office / warehouse suites
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  24' high ceilings
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  2,000 sq. ft bays
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  LARGE bay overhead doors (12' x 14')
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Newly tiled offices
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Twin-T concrete roof
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  CBS walls
                </ListItem>
              </List>
            </Box>
            
            <Box>
              <Heading as="h3" size="md" mb={4} color="blue.500" pb={2} borderBottom="2px" borderColor="blue.100">
                Location Benefits
              </Heading>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  A mile east of Executive Int. Airport
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  A mile west of 874/ Turnpike
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  The safest, most upscale warehouse district in South FL
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Zoned IU-C for business-industrial use
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Street level with excellent access
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  128 Street has six lanes and sidewalks
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Security cameras, lockable gates, and barbed wire fences
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Offices with windows overlooking landscaped campus
                </ListItem>
              </List>
            </Box>
          </SimpleGrid>
          
          <Divider my={8} />
          
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Text fontSize="sm" color="gray.600">
              For more information, visit <Link href="https://freerccc.com" isExternal color="blue.500">freerccc.com</Link> or contact us at <Link href="mailto:FreerCrossingsCommerceCenter@gmail.com" color="blue.500">FreerCrossingsCommerceCenter@gmail.com</Link>
            </Text>
            
            <Badge colorScheme="blue" p={2} borderRadius="md">
              Tenant Portal - Authorized Access Only
            </Badge>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}; 