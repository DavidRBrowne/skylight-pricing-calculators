# Security Checklist

This document outlines security best practices for the Skylight Calculators project.

## Pre-Commit Checklist

Before committing any changes, ensure:

- [ ] No API keys or secrets are included in the code
- [ ] No hardcoded passwords or credentials
- [ ] No personal information or sensitive data
- [ ] No database connection strings
- [ ] No environment variables with sensitive values
- [ ] All `.env` files are in `.gitignore`
- [ ] No temporary files or logs are included
- [ ] No IDE-specific files are committed

## Security Features

### Current Security Measures

✅ **Client-side only**: No server-side processing or data storage
✅ **No external APIs**: All calculations done locally
✅ **No user data collection**: No personal information gathered
✅ **Comprehensive .gitignore**: Prevents accidental commits of sensitive files
✅ **MIT License**: Clear licensing terms

### Security Best Practices

1. **Environment Variables**: Use `.env` files for any future configuration
2. **Dependencies**: Regularly update npm packages for security patches
3. **Code Review**: Always review code before committing
4. **No Secrets in Code**: Never hardcode sensitive information

## Vulnerability Reporting

If you discover a security vulnerability:

1. **Do NOT** create a public GitHub issue
2. Contact the maintainers directly
3. Provide detailed information about the vulnerability
4. Allow time for assessment and remediation

## Regular Security Tasks

- [ ] Monthly dependency updates: `npm audit` and `npm update`
- [ ] Quarterly security review of codebase
- [ ] Annual review of security practices

## Deployment Security

When deploying to production:

- [ ] Use HTTPS only
- [ ] Set appropriate security headers
- [ ] Enable Content Security Policy (CSP)
- [ ] Use secure hosting providers
- [ ] Regular security scans

## Data Protection

This application:
- Does not collect personal data
- Does not store user information
- Does not use cookies or tracking
- Performs all calculations client-side
- Does not transmit data to external services

## Compliance

The application is designed to be compliant with:
- GDPR (no personal data collection)
- CCPA (no personal data collection)
- General web security best practices

---

**Remember**: Security is everyone's responsibility. When in doubt, ask before committing! 