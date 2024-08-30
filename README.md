# FlyByMail: Temporary Email Address Generator

FlyByMail is a web service that provides instant, disposable email addresses for secure and anonymous communication. It helps users keep their primary inboxes free from spam and privacy intrusions.

## Features

- **Disposable Email Addresses:** Instantly generate temporary email addresses.
- **Spam Protection:** Keep your real email address safe from unwanted emails.
- **Anonymous Communication:** Communicate securely without revealing personal details.
- **Inbox Management:** Manage multiple temporary addresses and check respective inboxes.

## Usage

1. **Generate Email:** Click the "Generate Email" button to create a temporary email address.
2. **Copy Email:** Use the "Copy" button to copy the generated email address to your clipboard.
3. **Refresh Inbox:** Click "Refresh" to check for new messages or wait for automatic inbox updates every 2 minutes.
4. **Switch Addresses:** Manage multiple emails by selecting from the dropdown menu.

## Server Overview

The backend server provides endpoints to generate email addresses and fetch messages, interacting with the FlyByMail API.

- **/generate-email:** Generates a random temporary email address.
- **/messagebox/:login/:domain:** Fetches messages for the specified email address.

## API Integration

FlyByMail integrates with the 1secmail API to handle the generation and management of temporary email addresses.

## Future Enhancements

- **Temporary Phone Numbers:** Support for generating temporary phone numbers.
- **Advertising:** Non-intrusive ads to support the service.
- **Email Analytics:** Insights into email usage.
- **NLP for Sorting:** Automatic sorting and filtering of emails using natural language processing.
- **Translation Services:** In-app translation for emails.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Authors

- Livia Brunelli
- Luca Maniscalco
- Margherita Thermes
