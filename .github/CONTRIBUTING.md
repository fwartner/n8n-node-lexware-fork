# Contributing to n8n-nodes-lexware

Thank you for your interest in contributing to n8n-nodes-lexware! This document provides guidelines and instructions for contributing.

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed and what you expected
- Include your environment details (n8n version, Node version, OS)
- Add screenshots if applicable

### Suggesting Features

Feature suggestions are tracked as GitHub issues. When creating a feature request:

- Use a clear and descriptive title
- Provide a detailed description of the suggested feature
- Explain why this feature would be useful
- Include examples of how it would be used
- Reference Lexware API documentation if applicable

### Pull Requests

1. **Fork the Repository**
   ```bash
   git clone https://github.com/fwartner/n8n-node-lexware-fork.git
   cd n8n-node-lexware-fork
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make Your Changes**
   - Write clean, maintainable code
   - Follow the existing code style
   - Add or update tests as needed
   - Update documentation as needed

4. **Test Your Changes**
   ```bash
   npm install
   npm run build
   npm run lint
   npm test
   ```

5. **Commit Your Changes**
   - Use clear and meaningful commit messages
   - Follow conventional commit format:
     ```
     feat: add new invoice operation
     fix: correct date formatting issue
     docs: update API documentation
     test: add tests for contact operations
     ```

6. **Update CHANGELOG.md**
   - Add your changes under the "Unreleased" section
   - Follow the existing format

7. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```
   - Fill out the pull request template completely
   - Link to any related issues
   - Provide clear description of changes

## Development Setup

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/fwartner/n8n-node-lexware-fork.git
cd n8n-node-lexware-fork

# Install dependencies
npm install

# Build the project
npm run build
```

### Development Workflow

```bash
# Watch mode for development
npm run dev

# Run linting
npm run lint

# Fix linting issues
npm run lintfix

# Run tests
npm test

# Run tests in watch mode
npm test:watch
```

### Testing with n8n

To test your changes with n8n:

```bash
# In the node package directory
npm run build

# Link the package
npm link

# In your n8n installation directory
npm link n8n-nodes-lexware-fork
```

Or use Docker:

```bash
docker compose up
```

## Code Style

- Use TypeScript
- Follow existing code patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Use async/await for asynchronous operations

## Project Structure

```
n8n-node-lexware/
├── nodes/Lexware/          # Node implementation
│   ├── actions/            # Resource operations
│   ├── descriptions/       # Node parameter descriptions
│   ├── utils/              # Utility functions
│   └── Lexware.node.ts     # Main node file
├── credentials/            # Credential types
├── tests/                  # Test files
├── dist/                   # Compiled output
└── examples/               # Example workflows
```

## Adding New Resources

When adding a new Lexware resource:

1. Create action file in `nodes/Lexware/actions/[Resource].execute.ts`
2. Create description file in `nodes/Lexware/descriptions/[Resource]Description.ts`
3. Add resource to `Lexware.node.ts`
4. Add tests in `tests/actions/[Resource].test.ts`
5. Update documentation
6. Add example workflow if applicable

## Testing

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Test with actual n8n installation when possible
- Test edge cases and error scenarios

## Documentation

- Update README.md for user-facing changes
- Update code comments for internal changes
- Add JSDoc comments for public functions
- Include examples in documentation
- Update CHANGELOG.md

## Review Process

1. Automated checks must pass (build, lint, tests)
2. Code review by maintainers
3. Address feedback and make requested changes
4. Final approval and merge

## Getting Help

- 💬 [n8n Community Forum](https://community.n8n.io/)
- 📖 [n8n Documentation](https://docs.n8n.io/)
- 📚 [Lexware API Documentation](https://developer.lexware.io/)
- 🐛 [GitHub Issues](https://github.com/fwartner/n8n-node-lexware-fork/issues)

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- CHANGELOG.md (for significant contributions)
- Release notes

Thank you for contributing! 🎉

