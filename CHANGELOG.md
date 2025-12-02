# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.2] - 2025-12-02

### Fixed
- Fixed bash syntax error in GitHub Actions publish workflow (escaped quotes issue in version echo command)

## [1.3.1] - 2025-12-02

### Fixed
- Fixed flaky performance test in LineItems.test.ts by adjusting timing variation threshold from 2ms to 10ms to account for system variations
- Fixed baseUrl field requirement issue for existing credentials by making it optional with a fallback to the default API URL (https://api.lexware.io)
- Added backwards compatibility for credentials created before version 1.3.0
- Fixed bash syntax error in GitHub Actions publish workflow (escaped quotes issue in version echo command)

### Changed
- Made baseUrl field optional in credentials (defaults to https://api.lexware.io if not specified)

## [1.3.0] - 2025-12-02

### Added

#### New Endpoints (9 New Resources!)
- **Credit Notes**: Complete credit note management
  - Create credit notes (with finalize option)
  - Retrieve credit notes
  - Pursue from invoices or down payment invoices
  - Render PDF documents
  - Download files
  - List with pagination and status filtering

- **Delivery Notes**: Delivery note creation and management
  - Create delivery notes
  - Retrieve delivery notes
  - Pursue from quotations or order confirmations
  - Render PDF documents
  - Download files
  - List with pagination and status filtering

- **Down Payment Invoices**: Read-only access
  - Retrieve down payment invoice details
  - Download associated files

- **Event Subscriptions**: Webhook management
  - Create event subscriptions for 30+ event types
  - Retrieve subscription details
  - List all subscriptions
  - Delete subscriptions
  - Support for all document types (invoices, credit notes, contacts, vouchers, etc.)

- **Payments**: Payment information
  - Retrieve payment information for vouchers
  - Support for sales invoices, credit notes, purchase invoices, and purchase credit notes
  - Payment status tracking
  - Payment items breakdown

- **Payment Conditions**: Pre-configured payment terms
  - List all available payment conditions
  - Payment term templates
  - Discount conditions

- **Posting Categories**: Accounting categories
  - List all posting categories
  - Category types (revenue, expense, asset, liability, equity)
  - Account number mapping

- **Profile**: Organization information
  - Retrieve organization and user profile
  - Business features (tax type, small business status)
  - Distance sales principle information

- **Recurring Templates**: Recurring invoice templates
  - Retrieve individual templates
  - List all recurring templates with pagination
  - Template configuration details

### Changed
- **API Base URL**: Updated to `https://api.lexware.io` (from previous lexoffice domain)
- **Credentials Test**: Now uses `/v1/profile` endpoint for validation
- **Type Definitions**: Comprehensive TypeScript types for all new endpoints
- **Resource Organization**: Alphabetically sorted resources in the node interface
- **Import Structure**: Reorganized imports in main node file for better maintainability

### Improved
- **Error Handling**: Enhanced error messages with complete API response details
- **Rate Limiting**: Better handling of API rate limits (2 requests/second)
- **Documentation**: Comprehensive README updates with all new endpoints
- **Type Safety**: Complete type definitions for all new resources

## [1.2.5] - Previous Release

### Features
- Articles endpoint
- Contacts endpoint
- Countries endpoint
- Dunnings endpoint
- Files endpoint
- Invoices endpoint
- Order Confirmations endpoint
- Print Layouts endpoint
- Quotations endpoint
- Voucher Lists endpoint
- Vouchers endpoint

## Migration Guide

### From v1.2.x to v1.3.0

No breaking changes. All existing functionality remains compatible.

#### New Features Available
1. **Event Subscriptions**: Set up webhooks for real-time notifications
2. **Payment Tracking**: Monitor payment status for invoices and credit notes
3. **Credit Notes**: Create and manage credit notes directly
4. **Delivery Notes**: Generate delivery notes for shipments
5. **Profile Information**: Access organization settings programmatically

#### Recommended Actions
1. Update your workflows to use the new credit notes endpoint instead of manual workarounds
2. Consider implementing event subscriptions for real-time updates
3. Use the profile endpoint to retrieve organization settings dynamically
4. Leverage payment conditions for consistent payment terms

## API Coverage

### Complete Resource List (20 Resources)
1. Articles
2. Contacts
3. Countries
4. Credit Notes ⭐ NEW
5. Delivery Notes ⭐ NEW
6. Down Payment Invoices ⭐ NEW
7. Dunnings
8. Event Subscriptions ⭐ NEW
9. Files
10. Invoices
11. Order Confirmations
12. Payment Conditions ⭐ NEW
13. Payments ⭐ NEW
14. Posting Categories ⭐ NEW
15. Print Layouts
16. Profile ⭐ NEW
17. Quotations
18. Recurring Templates ⭐ NEW
19. Voucher Lists
20. Vouchers

### Operation Coverage
- **CREATE**: 9 resources
- **READ**: 17 resources
- **UPDATE**: 7 resources
- **DELETE**: 3 resources
- **LIST**: 14 resources
- **SPECIAL**: PDF rendering, file downloads, pursue operations, webhooks

## Known Limitations

1. Credit Notes, Delivery Notes, and Order Confirmations do not support UPDATE operations (API limitation)
2. Down Payment Invoices are read-only (API limitation)
3. Some GET operations may require specific permissions in your Lexware account
4. Rate limiting: 2 requests per second (API limitation, automatically handled with retry logic)

## Future Enhancements

- Test coverage for all new endpoints
- Example workflows for common use cases
- Enhanced error recovery strategies
- Bulk operation support where applicable


