// Security Configuration for SonaSky Pricing Calculator v1.2.8
// Project renamed from skylight-calculators to sona-sky-pricing-calculator

export const securityConfig = {
  // Version lock
  version: '1.3.1',
  locked: false,
  allowUpdates: true,
  
  // Security settings
  security: {
    // Input validation
    maxInputLength: 10,
    allowedCharacters: /^[0-9]+$/,
    maxDimensions: {
      width: 3000,
      length: 5000
    },
    minDimensions: {
      width: 500,
      length: 500
    },
    
    // Rate limiting (client-side)
    rateLimit: {
      maxRequests: 100,
      windowMs: 60000 // 1 minute
    },
    
    // Content Security
    allowedOrigins: [
      'https://skylight-pricing-calculators.vercel.app',
      'http://localhost:3000' // Development only
    ],
    
    // Feature flags
    features: {
      autoVersioning: false,
      autoDeployment: false,
      debugMode: false,
      analytics: false
    }
  },
  
  // Validation functions
  validateInput: (value, type) => {
    if (!value || value === '') return false;
    
    switch (type) {
      case 'number':
        return /^[0-9]+$/.test(value) && 
               parseInt(value) >= 0 && 
               parseInt(value) <= 999999;
      case 'dimension':
        return /^[0-9]+$/.test(value) && 
               parseInt(value) >= 500 && 
               parseInt(value) <= 5000;
      default:
        return false;
    }
  },
  
  // Sanitization
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>"'&]/g, '');
  },
  
  // Security headers
  securityHeaders: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()'
  }
};

// Security middleware
export const securityMiddleware = {
  // Rate limiting tracker
  requests: new Map(),
  
  // Check rate limit
  checkRateLimit: (identifier) => {
    const now = Date.now();
    const windowMs = securityConfig.security.rateLimit.windowMs;
    const maxRequests = securityConfig.security.rateLimit.maxRequests;
    
    if (!securityMiddleware.requests.has(identifier)) {
      securityMiddleware.requests.set(identifier, []);
    }
    
    const requests = securityMiddleware.requests.get(identifier);
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false; // Rate limited
    }
    
    validRequests.push(now);
    securityMiddleware.requests.set(identifier, validRequests);
    return true;
  },
  
  // Clean old requests
  cleanup: () => {
    const now = Date.now();
    const windowMs = securityConfig.security.rateLimit.windowMs;
    
    for (const [identifier, requests] of securityMiddleware.requests.entries()) {
      const validRequests = requests.filter(time => now - time < windowMs);
      if (validRequests.length === 0) {
        securityMiddleware.requests.delete(identifier);
      } else {
        securityMiddleware.requests.set(identifier, validRequests);
      }
    }
  }
};

// Cleanup old requests every minute
setInterval(securityMiddleware.cleanup, 60000);

export default securityConfig;
