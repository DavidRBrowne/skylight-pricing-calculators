# Contributing to Skylight Calculators

Thank you for your interest in contributing to the Sona Sky Series Calculator! This document provides guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and inclusive in all interactions.

## Security Guidelines

### Before Contributing

1. **Never commit sensitive data**: 
   - API keys
   - Passwords
   - Personal information
   - Database credentials
   - Environment variables

2. **Check your changes**: 
   - Review all files before committing
   - Ensure no sensitive information is included
   - Use `git status` and `git diff` to verify changes

3. **Environment variables**: 
   - Use `.env` files for local development
   - Never commit `.env` files (they're in `.gitignore`)
   - Document required environment variables in README.md

## Development Setup

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Test your changes: `npm test`
7. Build the project: `npm run build`
8. Commit your changes with a descriptive message

## Commit Message Guidelines

Use clear, descriptive commit messages:

```
feat: add new fabric color option
fix: correct pricing calculation for large dimensions
docs: update README with installation instructions
style: improve button styling consistency
refactor: simplify pricing table lookup logic
test: add unit tests for margin calculations
```

## Pull Request Process

1. **Update documentation**: If you add new features, update the README.md
2. **Add tests**: Include tests for new functionality
3. **Check security**: Ensure no sensitive data is included
4. **Test thoroughly**: Run the full test suite
5. **Update version**: If needed, update version in package.json
6. **Submit PR**: Create a pull request with a clear description

## Code Style

- Follow existing code style and formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use TypeScript-style prop validation where applicable

## Testing

- Write tests for new functionality
- Ensure all existing tests pass
- Test edge cases and error conditions
- Test on different browsers if UI changes are made

## Reporting Issues

When reporting issues, please include:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Any error messages

## Security Issues

If you discover a security vulnerability, please:

1. **Do not** create a public issue
2. Email the maintainers directly
3. Provide detailed information about the vulnerability
4. Allow time for assessment and fix

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to making this calculator better! 