# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.3.x   | :white_check_mark: |
| 1.2.x   | :white_check_mark: |
| 1.1.x   | :x:                |
| < 1.1   | :x:                |

## Reporting a Vulnerability

We take the security of n8n-nodes-lexware seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please do NOT:

- Open a public GitHub issue for security vulnerabilities
- Discuss the vulnerability in public forums or social media

### Please DO:

1. **Email us directly** at florian@pixelandprocess.de with:
   - A clear description of the vulnerability
   - Steps to reproduce the issue
   - Potential impact of the vulnerability
   - Any suggested fixes (if you have them)

2. **Allow time for a fix**: We will acknowledge your email within 48 hours and will send a more detailed response within 7 days indicating the next steps in handling your report.

3. **Coordinate disclosure**: After the initial reply to your report, we will keep you informed of the progress towards a fix and full announcement. We may ask for additional information or guidance.

### What to expect:

- **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours.
- **Assessment**: We will assess the vulnerability and determine its impact and severity.
- **Fix**: We will develop a fix and test it thoroughly.
- **Disclosure**: We will coordinate with you on the disclosure timeline.
- **Credit**: We will credit you in the security advisory (unless you prefer to remain anonymous).

## Security Best Practices

When using n8n-nodes-lexware:

### Credentials

- **Never commit credentials**: Never commit API keys, secrets, or credentials to version control
- **Use environment variables**: Store sensitive data in environment variables
- **Rotate credentials**: Regularly rotate your Lexware API credentials
- **Least privilege**: Use API credentials with minimum required permissions

### API Keys

- **Secure storage**: Store Lexware API keys securely in n8n credentials
- **Access control**: Limit who has access to n8n credentials
- **Monitor usage**: Monitor API key usage for unusual patterns

### Workflow Security

- **Validate inputs**: Always validate and sanitize user inputs
- **Error handling**: Implement proper error handling to avoid exposing sensitive data
- **Audit logs**: Keep audit logs of workflow executions
- **Review workflows**: Regularly review workflows for security issues

### Network Security

- **HTTPS only**: Always use HTTPS for API communications
- **Firewall rules**: Use appropriate firewall rules
- **Network isolation**: Isolate n8n instances in secure networks

### Data Protection

- **Minimize data**: Only request and store necessary data
- **Data retention**: Implement appropriate data retention policies
- **Encryption**: Use encryption for sensitive data at rest
- **Backup security**: Ensure backups are securely stored

## Known Security Considerations

### Lexware API

- This node connects to the Lexware API using OAuth 2.0 authentication
- API credentials are stored in n8n's credential system
- All API communications use HTTPS

### Data Handling

- This node processes business data including invoices, contacts, and financial information
- Data is transmitted through n8n workflows
- No data is stored by this node itself

### Dependencies

- Regular dependency updates are performed
- Automated security scanning is enabled via GitHub Actions
- Known vulnerabilities are addressed promptly

## Disclosure Policy

- Security issues are treated with high priority
- Fixes are released as soon as possible
- Security advisories are published on GitHub
- Users are notified of security updates

## Security Updates

Subscribe to security updates:

- Watch this repository on GitHub
- Follow releases and security advisories
- Check CHANGELOG.md regularly

## Resources

- [Lexware API Security](https://developer.lexware.io/)
- [n8n Security Best Practices](https://docs.n8n.io/security/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

## Contact

For security concerns, contact:
- Email: florian@pixelandprocess.de
- Response time: Within 48 hours

## Acknowledgments

We thank the security researchers and community members who help us keep n8n-nodes-lexware secure.

---

**Remember**: Security is everyone's responsibility. If you see something, say something.

