# Changelog

All notable changes to the Sona Sky Series Skylight Blind Calculator will be documented in this file.

## [1.1.0] - 2025-07-20

### Added
- **New Power Supply Option**: "Li-on USB-C Battery plus charger" at £52
  - Combines the £38 Li-on USB-C Battery with the £14 Li-on USB-C Battery Charger
  - Added to Section 3 (Hardware and Power) dropdown menu
  - Automatically calculates correct pricing when selected

### Changed
- Updated power supply dropdown to include the new combined battery + charger option
- Enhanced user experience by providing a convenient bundled option

### Technical
- Modified `powerOptions` configuration in `src/AppFinal.js`
- Updated dropdown options in the power supply selection
- Maintained backward compatibility with existing options

## [1.0.0] - 2025-07-04

### Initial Release
- Complete skylight blind pricing calculator
- Responsive grid layout with input panel and output cards
- Tailwind CSS styling with brand integration
- Real-time pricing calculations
- Form validation and error handling
- Auto-updating quotes
- Vercel deployment

---

**Format**: This project adheres to [Keep a Changelog](https://keepachangelog.com/en/1.0.0/). 