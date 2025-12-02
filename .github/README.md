# GitHub Configuration

This directory contains all GitHub-specific configuration files for the n8n-nodes-lexware project.

## 📁 Directory Structure

```
.github/
├── workflows/              # GitHub Actions workflows
│   ├── build.yml          # Build and test on push/PR
│   ├── publish.yml        # Publish to NPM on release
│   ├── release.yml        # Create GitHub releases
│   └── version-check.yml  # Verify version changes in PRs
├── ISSUE_TEMPLATE/        # Issue templates
│   ├── bug_report.md      # Bug report template
│   ├── feature_request.md # Feature request template
│   ├── documentation.md   # Documentation improvement template
│   ├── question.md        # Question template
│   └── config.yml         # Issue template configuration
├── CODE_OF_CONDUCT.md     # Community code of conduct
├── CONTRIBUTING.md        # Contributing guidelines
├── dependabot.yml         # Dependabot configuration
├── FUNDING.yml            # Sponsorship/funding information
├── pull_request_template.md # Pull request template
├── SECURITY.md            # Security policy
└── README.md              # This file
```

## 🔄 GitHub Actions Workflows

### Build and Test (`build.yml`)
- **Triggers**: Push and PR to main/develop branches
- **Jobs**:
  - **build**: Tests on Node 18.x and 20.x
    - Checkout code
    - Install dependencies
    - Build project
    - Run linting
    - Run tests
    - Verify dist folder and required files
  - **docker-test**: Tests Docker setup
    - Build Docker image
    - Test container startup

### Version Check (`version-check.yml`)
- **Triggers**: Pull requests to main branch
- **Purpose**: Ensures version is updated and CHANGELOG is maintained
- **Checks**:
  - Compares package.json version with main branch
  - Verifies CHANGELOG.md contains the new version

### Publish to NPM (`publish.yml`)
- **Triggers**: When a release is published
- **Actions**:
  - Build the project
  - Run tests
  - Publish to NPM with provenance
- **Requirements**: `NPM_TOKEN` secret must be configured

### Create Release (`release.yml`)
- **Triggers**: When a version tag (v*) is pushed
- **Actions**:
  - Build the project
  - Extract changelog for the version
  - Create GitHub release with notes
  - Attach dist files to release

## 📝 Issue Templates

Four issue templates are available:

1. **Bug Report**: Report bugs and issues
2. **Feature Request**: Suggest new features or improvements
3. **Documentation**: Suggest documentation improvements
4. **Question**: Ask questions about usage

Issue template configuration includes helpful links to:
- Lexware API Documentation
- n8n Community Forum
- n8n Documentation

## 🤝 Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for detailed contribution guidelines including:
- Development setup
- Code style guidelines
- Testing procedures
- Pull request process

## 🔒 Security

See [`SECURITY.md`](SECURITY.md) for:
- Supported versions
- How to report vulnerabilities
- Security best practices
- Contact information

## 🤖 Dependabot

Automated dependency updates are configured for:
- **NPM packages**: Weekly updates on Mondays
- **GitHub Actions**: Weekly updates on Mondays
- Dependencies are grouped by type (dev/production)
- Updates are automatically assigned and labeled

## 💰 Funding

Sponsorship information is configured in `FUNDING.yml`:
- GitHub Sponsors: [@fwartner](https://github.com/fwartner)
- Buy Me a Coffee: [fwartner](https://www.buymeacoffee.com/fwartner)

## 🏷️ Pull Request Template

The PR template includes:
- Description section
- Type of change checklist
- Related issues linking
- Testing information
- Comprehensive checklist for contributors

## 📋 Checklist for Maintainers

### Before First Use

1. **Configure Secrets** (Repository Settings → Secrets):
   - `NPM_TOKEN`: NPM authentication token for publishing

2. **Enable GitHub Actions**:
   - Go to repository Settings → Actions
   - Enable "Allow all actions and reusable workflows"

3. **Configure Branch Protection** (Settings → Branches):
   - Protect `main` branch
   - Require status checks to pass
   - Require PR reviews

4. **Enable Dependabot** (Settings → Security):
   - Enable Dependabot alerts
   - Enable Dependabot security updates

### Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md` with changes
3. Commit changes
4. Create and push tag: `git tag v1.x.x && git push origin v1.x.x`
5. GitHub Actions will:
   - Create GitHub release
   - Publish to NPM

## 🎯 Best Practices

- Always update CHANGELOG.md with your changes
- Increment version number for releases
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Follow the Code of Conduct

## 📞 Support

- 🐛 [Report Issues](https://github.com/fwartner/n8n-node-lexware-fork/issues)
- 💬 [Community Forum](https://community.n8n.io/)
- 📖 [Documentation](https://docs.n8n.io/)

---

Last Updated: 2025-12-02

