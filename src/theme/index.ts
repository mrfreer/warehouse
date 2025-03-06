import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          bg: 'blue.500',
          color: 'white',
          _hover: {
            bg: 'blue.600',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          _active: {
            bg: 'blue.700',
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s',
        },
        ghost: {
          _hover: {
            bg: 'gray.100',
            transform: 'translateY(-2px)',
          },
          _active: {
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s',
        },
      },
    },
    Box: {
      baseStyle: {
        transition: 'all 0.2s',
      },
    },
  },
});

export default theme; 