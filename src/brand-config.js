// SSC Brand Configuration
// Update these values with your actual brand guidelines

export const brandConfig = {
  // Brand Colors - The Scottish Shutter Company
  colors: {
    teal: '#007A87',         // Primary Teal (Pantone 7474C)
    deepTeal: '#00333B',     // Deep Teal (Pantone 546C)
    lightGrey: '#C6C6BC',    // Light Grey (Pantone 413C)
    black: '#1D1D1B',        // Black
    brightPink: '#C50084',   // Bright Pink (Pantone 233C)
    purple: '#752864',       // Purple (Pantone 249C)
    grassGreen: '#58A618',   // Grass Green (Pantone 369C)
    
    // Semantic colors using brand palette
    primary: '#007A87',      // Teal as primary
    secondary: '#00333B',    // Deep Teal as secondary
    accent: '#C50084',       // Bright Pink as accent
    success: '#58A618',      // Grass Green as success
    warning: '#C50084',      // Bright Pink as warning
    error: '#752864',        // Purple as error
    light: '#C6C6BC',        // Light Grey as light background
    dark: '#1D1D1B',         // Black as dark text
    white: '#ffffff',
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717'
    }
  },

  // Typography - The Scottish Shutter Company
  fonts: {
    heading: '"Open Sans", Helvetica, sans-serif',
    body: '"Open Sans", Helvetica, sans-serif',
    light: '"Open Sans Light", "Open Sans", Helvetica, sans-serif',
    semibold: '"Open Sans Semi Bold", "Open Sans", Helvetica, sans-serif',
    mono: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
  },

  // Font Sizes
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },

  // Border Radius
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },

  // Brand Information - The Scottish Shutter Company
  brand: {
    name: 'SSC',
    fullName: 'The Scottish Shutter Company',
    tagline: 'Professional Skylight Solutions',
    website: 'https://www.scottishshuttercompany.com', // Replace with actual website
    email: 'info@scottishshuttercompany.com' // Replace with actual email
  },

  // Logo Configuration
  logo: {
    src: '/logo.svg', // Path to your logo file
    alt: 'SSC Logo',
    width: 'auto',
    height: '40px'
  }
};

// Tailwind CSS configuration that matches your brand
export const tailwindConfig = {
  theme: {
    extend: {
      colors: brandConfig.colors,
      fontFamily: {
        sans: brandConfig.fonts.body.split(', '),
        heading: brandConfig.fonts.heading.split(', '),
        light: brandConfig.fonts.light.split(', '),
        semibold: brandConfig.fonts.semibold.split(', '),
        mono: brandConfig.fonts.mono.split(', ')
      },
      fontSize: brandConfig.fontSize,
      spacing: brandConfig.spacing,
      borderRadius: brandConfig.borderRadius,
      boxShadow: brandConfig.shadows
    }
  }
};

export default brandConfig; 