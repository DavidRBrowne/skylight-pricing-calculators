# Sona Sky Series - Skylight Blind Calculator

A professional React-based calculator for pricing Sona Sky Series skylight blinds. This application helps users calculate accurate quotes for skylight blind installations with various customization options.

## Features

- **Dimension Calculator**: Input recess dimensions (width × length) with validation
- **Fabric Selection**: Choose between dimout (light filtering) and blackout (room darkening) fabrics
- **Color Options**: 18 different fabric colors available for each fabric type
- **Hardware Customization**: Multiple hardware color options (White, Grey, Anthracite, Black, Bespoke)
- **Power Supply Options**: Various power supply configurations (Solar, Mains Adapter, Battery, etc.)
- **Control Systems**: Handset and wall switch options with different channel configurations
- **Margin Calculator**: Configurable retail pricing margins (50%, 56%, 60%, 65%)
- **Real-time Pricing**: Automatic quote updates when options change
- **Detailed Breakdown**: Complete cost breakdown including buy price and retail pricing

## Technology Stack

- **React 19.1.0** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Create React App** - Development and build tooling

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/skylight-calculators.git
cd skylight-calculators
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Usage

1. **Enter Recess Dimensions**: Input the width and length of your skylight recess (minimum 500mm each)
2. **Select Fabric**: Choose between dimout and blackout fabrics, then select your preferred color
3. **Configure Hardware**: Select hardware color and power supply option
4. **Choose Controls**: Select handset and wall switch options as needed
5. **Set Margin**: Choose your desired retail pricing margin
6. **Calculate Quote**: Click "Calculate Quote" to generate a detailed pricing breakdown

## Pricing Structure

The calculator uses comprehensive pricing tables for:
- Base blind pricing (varies by dimensions and fabric type)
- Side trims (mandatory component)
- Power supply options
- Control systems (handsets and wall switches)
- Shipping costs
- VAT calculations

## Security Features

- No sensitive data stored or transmitted
- Client-side only calculations
- Comprehensive `.gitignore` to prevent accidental commits of sensitive files
- No API keys or external dependencies required

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support or questions about the Sona Sky Series calculator, please open an issue on GitHub.

---

**Note**: This calculator is designed for professional use in the window covering industry. All pricing is based on current manufacturer data and should be verified before use in commercial applications.
