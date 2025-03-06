import {
  Box,
  Container,
  Flex,
  Heading,
  Button,
  Text,
  useToast,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Stack,
  Spacer,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPackage, FiShoppingCart, FiBarChart2, FiUsers } from 'react-icons/fi';

const MotionBox = motion(Box);

interface FeatureCardProps {
  title: string;
  icon: React.ElementType;
  description: string;
}

const FeatureCard = ({ title, icon, description }: FeatureCardProps) => {
  const bg = useColorModeValue('white', 'gray.700');
  
  return (
    <MotionBox
      bg={bg}
      p={6}
      rounded="xl"
      shadow="md"
      whileHover={{ y: -4, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
      whileTap={{ y: 0 }}
      cursor="pointer"
    >
      <Icon as={icon} w={10} h={10} color="blue.500" mb={4} />
      <Heading size="md" mb={2}>
        {title}
      </Heading>
      <Text color="gray.600">{description}</Text>
    </MotionBox>
  );
};

export const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const headerBg = useColorModeValue('white', 'gray.800');

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to log out',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const features = [
    {
      title: 'Inventory Management',
      icon: FiPackage,
      description: 'Track and manage your warehouse inventory in real-time.',
    },
    {
      title: 'Order Processing',
      icon: FiShoppingCart,
      description: 'Process and fulfill orders efficiently.',
    },
    {
      title: 'Analytics',
      icon: FiBarChart2,
      description: 'Monitor warehouse performance and track key metrics.',
    },
    {
      title: 'Employee Management',
      icon: FiUsers,
      description: 'Manage staff schedules and assignments.',
    },
  ];

  return (
    <Box minH="100vh" bg="gray.50">
      <Box bg={headerBg} shadow="sm" position="sticky" top={0} zIndex={1}>
        <Container maxW="container.xl" py={4}>
          <Flex alignItems="center">
            <MotionBox
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Heading size="lg">Warehouse Dashboard</Heading>
            </MotionBox>
            <Spacer />
            <Stack direction="row" spacing={4}>
              <Text color="gray.600">
                {currentUser?.email}
              </Text>
              <Button
                onClick={handleLogout}
                variant="ghost"
                _hover={{ bg: 'gray.100' }}
              >
                Logout
              </Button>
            </Stack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <MotionBox
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            {features.map((feature, index) => (
              <MotionBox
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </MotionBox>
            ))}
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
}; 