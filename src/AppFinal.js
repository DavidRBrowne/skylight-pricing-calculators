import React, { useState, useEffect } from 'react';
import brandConfig from './brand-config';
import sscLogoPng from './assets/The Scottish Shutter Company Logo 2024 Square copy.png';
// import packageJson from '../package.json'; // Removed - using securityConfig.version instead
import securityConfig, { securityMiddleware } from './security-config';
const SonaCalculator = () => {
  console.log('NEW VERSION LOADED - BLUE BACKGROUND WITH GRID LAYOUT');
  
  // Auto-update detection and service worker registration
  useEffect(() => {
    // Register service worker for automatic updates
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
          
          // Check for updates every 30 seconds
          setInterval(() => {
            registration.update();
          }, 30000);
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New update available - show notification
                if (window.confirm('A new version of the SonaSky Calculator is available. Reload to update?')) {
                  window.location.reload();
                }
              }
            });
          });
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }
    
    // Periodic version check
    const versionCheckInterval = setInterval(() => {
      fetch('/version-check.json?' + Date.now())
        .then(response => response.json())
        .then(data => {
          if (data.version !== securityConfig.version) {
            if (window.confirm(`New version ${data.version} available. Reload to update?`)) {
              window.location.reload();
            }
          }
        })
        .catch(error => {
          console.log('Version check failed:', error);
        });
    }, 60000); // Check every minute
    
    return () => clearInterval(versionCheckInterval);
  }, []);
  
  // State management
  const [systemType, setSystemType] = useState('single'); // 'single', 'duo-inward', 'duo-parallel'
  const [showSystemGuide, setShowSystemGuide] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [recess, setRecess] = useState({ length: '', width: '' });
  const [fabricType, setFabricType] = useState('dimout');
  const [fabricColor, setFabricColor] = useState('snow');
  const [hardwareColor, setHardwareColor] = useState('white');
  const [powerSupply, setPowerSupply] = useState('battery');
  const [handset, setHandset] = useState('none');
  const [wallSwitch, setWallSwitch] = useState('none');
  const [margin, setMargin] = useState(50);
  const [sideTrims, setSideTrims] = useState(false);
  const [tBarColor, setTBarColor] = useState('white');
  const [quote, setQuote] = useState(null);
  const [errors, setErrors] = useState([]);

  // Pricing tables
  const dimoutPricing = {
    1000: { 1000: 344, 1200: 354, 1400: 365, 1600: 374, 1800: 386, 2000: 395, 2200: 407, 2400: 419, 2600: 431, 2800: 443, 3000: 455 },
    1500: { 1000: 361, 1200: 372, 1400: 380, 1600: 391, 1800: 402, 2000: 408, 2200: 420, 2400: 432, 2600: 444, 2800: 457, 3000: 469 },
    2000: { 1000: 377, 1200: 391, 1400: 399, 1600: 408, 1800: 419, 2000: 428, 2200: 440, 2400: 452, 2600: 464, 2800: 475, 3000: 487 },
    2500: { 1000: 397, 1200: 411, 1400: 419, 1600: 430, 1800: 443, 2000: 454, 2200: 466, 2400: 479, 2600: 491, 2800: 502, 3000: 514 },
    3000: { 1000: 416, 1200: 432, 1400: 440, 1600: 452, 1800: 457, 2000: 470, 2200: 482, 2400: 494, 2600: 506, 2800: 518, 3000: 530 },
    3500: { 1000: 475, 1200: 486, 1400: 499, 1600: 512, 1800: 523, 2000: 535, 2200: 547, 2400: 559, 2600: 565, 2800: 578, 3000: 590 },
    4000: { 1000: 562, 1200: 573, 1400: 586, 1600: 598, 1800: 608, 2000: 620, 2200: 633, 2400: 645, 2600: 651, 2800: 664, 3000: 677 },
    4500: { 1000: 661, 1200: 673, 1400: 685, 1600: 697, 1800: 710, 2000: 722, 2200: 734, 2400: 746, 2600: 758, 2800: 770, 3000: 782 },
    5000: { 1000: 868, 1200: 880, 1400: 892, 1600: 904, 1800: 916, 2000: 928, 2200: 941, 2400: 953, 2600: 965, 2800: 977, 3000: 989 }
  };

  const blackoutPricing = {
    1000: { 1000: 358, 1200: 367, 1400: 378, 1600: 387, 1800: 399, 2000: 408, 2200: 420, 2400: 432, 2600: 444, 2800: 457, 3000: 469 },
    1500: { 1000: 374, 1200: 385, 1400: 393, 1600: 404, 1800: 415, 2000: 421, 2200: 433, 2400: 446, 2600: 458, 2800: 470, 3000: 482 },
    2000: { 1000: 391, 1200: 404, 1400: 414, 1600: 421, 1800: 432, 2000: 441, 2200: 453, 2400: 465, 2600: 477, 2800: 488, 3000: 501 },
    2500: { 1000: 410, 1200: 426, 1400: 432, 1600: 443, 1800: 457, 2000: 468, 2200: 480, 2400: 492, 2600: 504, 2800: 515, 3000: 527 },
    3000: { 1000: 429, 1200: 446, 1400: 453, 1600: 465, 1800: 470, 2000: 483, 2200: 495, 2400: 507, 2600: 519, 2800: 531, 3000: 543 },
    3500: { 1000: 488, 1200: 501, 1400: 513, 1600: 525, 1800: 536, 2000: 548, 2200: 560, 2400: 572, 2600: 579, 2800: 591, 3000: 603 },
    4000: { 1000: 575, 1200: 587, 1400: 600, 1600: 612, 1800: 622, 2000: 634, 2200: 646, 2400: 658, 2600: 666, 2800: 678, 3000: 690 },
    4500: { 1000: 678, 1200: 690, 1400: 702, 1600: 714, 1800: 726, 2000: 738, 2200: 750, 2400: 762, 2600: 774, 2800: 787, 3000: 799 },
    5000: { 1000: 895, 1200: 908, 1400: 920, 1600: 932, 1800: 944, 2000: 956, 2200: 968, 2400: 980, 2600: 992, 2800: 1004, 3000: 1016 }
  };

  // Side Trims pricing table (from product sheet)
  const sideTrimsPricing = {
    1000: { 1000: 48, 1200: 53, 1400: 58, 1600: 62, 1800: 67, 2000: 72, 2200: 77, 2400: 82, 2600: 86, 2800: 91, 3000: 96 },
    1500: { 1000: 60, 1200: 65, 1400: 70, 1600: 74, 1800: 79, 2000: 84, 2200: 89, 2400: 94, 2600: 98, 2800: 103, 3000: 108 },
    2000: { 1000: 72, 1200: 77, 1400: 82, 1600: 86, 1800: 91, 2000: 96, 2200: 101, 2400: 106, 2600: 110, 2800: 115, 3000: 120 },
    2500: { 1000: 84, 1200: 89, 1400: 94, 1600: 98, 1800: 103, 2000: 108, 2200: 113, 2400: 118, 2600: 122, 2800: 127, 3000: 132 },
    3000: { 1000: 96, 1200: 101, 1400: 106, 1600: 110, 1800: 115, 2000: 120, 2200: 125, 2400: 130, 2600: 134, 2800: 139, 3000: 144 },
    3500: { 1000: 108, 1200: 113, 1400: 118, 1600: 122, 1800: 127, 2000: 132, 2200: 137, 2400: 142, 2600: 146, 2800: 151, 3000: 156 },
    4000: { 1000: 120, 1200: 125, 1400: 130, 1600: 134, 1800: 139, 2000: 144, 2200: 149, 2400: 154, 2600: 158, 2800: 163, 3000: 168 },
    4500: { 1000: 132, 1200: 137, 1400: 142, 1600: 146, 1800: 151, 2000: 156, 2200: 161, 2400: 166, 2600: 170, 2800: 175, 3000: 180 },
    5000: { 1000: 144, 1200: 149, 1400: 154, 1600: 158, 1800: 163, 2000: 168, 2200: 173, 2400: 178, 2600: 182, 2800: 187, 3000: 192 }
  };

  // Product configuration data
  const powerOptions = {
    solar: { name: "Solar Pack", price: 72, capacity: 1, needsCharger: false },
    adapter: { name: "12v Mains Adapter", price: 18, capacity: 1, needsCharger: false },
    battery: { name: "Li-on USB-C Battery", price: 38, capacity: 1, needsCharger: true },
    batteryCharger: { name: "Li-on USB-C Battery plus charger", price: 52, capacity: 1, needsCharger: false },
    charger: { name: "Li-on USB-C Battery Charger", price: 14, capacity: 0, needsCharger: false },
    sna45: { name: "SNA-45-12 Mains Transformer", price: 38, capacity: 1, needsCharger: false },
    sna100: { name: "SNA-100-12 Mains Transformer", price: 63, capacity: 4, needsCharger: false },
    sna75: { name: "SNA-75-12 Mains Transformer", price: 48, capacity: 3, needsCharger: false },
    sna12151: { name: "SNA12151 Mains Transformer", price: 108, capacity: 6, needsCharger: false }
  };

  const handsetOptions = {
    none: { name: "No Handset", price: 0 },
    situo1: { name: "Situo 1 (1-channel)", price: 28 },
    situo5: { name: "Situo 5 (5-channel)", price: 45 },
    telis16: { name: "Telis 16 (16-channel)", price: 128 },
    tahoma: { name: "TaHoma Switch", price: 138 }
  };

  const wallSwitchOptions = {
    none: { name: "No Wall Switch", price: 0 },
    smoove: { name: "Smoove Origin (1-channel)", price: 32 },
    smoove4: { name: "Smoove Origin 4 (4-channel)", price: 45 }
  };



  const hardwareOptions = {
    white: "White RAL9016",
    grey: "Grey RAL7040", 
    anthracite: "Anthracite RAL7016",
    black: "Black RAL9005",
    bespoke: "Bespoke RAL (POA)"
  };

  const tBarColorOptions = {
    white: "White RAL9016",
    grey: "Grey RAL7040", 
    anthracite: "Anthracite RAL7016",
    black: "Black RAL9005"
  };

  // Helper functions
  const getCordCount = (width) => {
    if (width < 700) return { total: 4, spooling: 2, support: 2 };
    if (width < 1101) return { total: 6, spooling: 3, support: 3 };
    if (width < 1401) return { total: 8, spooling: 4, support: 4 };
    if (width < 2201) return { total: 10, spooling: 5, support: 5 };
    return { total: 12, spooling: 6, support: 6 };
  };

  const findNextSizeUp = (value, availableValues) => {
    // Always round UP to next available pricing size
    const sortedValues = availableValues.sort((a, b) => a - b);
    return sortedValues.find(size => size >= value) || sortedValues[sortedValues.length - 1];
  };





  // Security validation function (currently unused but kept for future use)
  // eslint-disable-next-line no-unused-vars
  const validateSecurity = (value, type) => {
    if (!securityConfig.validateInput(value, type)) {
      return false;
    }
    
    // Check rate limiting
    if (!securityMiddleware.checkRateLimit('input-validation')) {
      setErrors(['Too many requests. Please wait a moment.']);
      return false;
    }
    
    return true;
  };

  // Calculate individual blind dimensions for Duo systems
  const calculateBlindDimensions = (totalLength, totalWidth, systemType) => {
    if (systemType === 'duo-inward') {
      // For inward: two blinds meet in center, each half the total length
      return {
        blind1: { length: totalLength / 2, width: totalWidth },
        blind2: { length: totalLength / 2, width: totalWidth }
      };
    } else if (systemType === 'duo-parallel') {
      // For parallel: two blinds side by side, each half the total width
      return {
        blind1: { length: totalLength, width: totalWidth / 2 },
        blind2: { length: totalLength, width: totalWidth / 2 }
      };
    }
    return null;
  };

  // Auto-update quote when any input changes
  useEffect(() => {
    // Clear any previous errors
    setErrors([]);
    
    // Only calculate if we have valid dimensions
    if (recess.length && recess.width) {
      const totalLength = parseInt(recess.length);
      const totalWidth = parseInt(recess.width);
      
      // Check if dimensions are valid numbers
      if (isNaN(totalLength) || isNaN(totalWidth)) {
        setQuote(null);
        return;
      }
      
      // Validate dimensions based on system type
      let maxLength, maxWidth, minLength, minWidth;
      
      if (systemType === 'single') {
        maxLength = 5000; maxWidth = 3000; minLength = 500; minWidth = 500;
      } else if (systemType === 'duo-inward') {
        maxLength = 10000; maxWidth = 3000; minLength = 1000; minWidth = 500;
      } else if (systemType === 'duo-parallel') {
        maxLength = 5000; maxWidth = 6000; minLength = 500; minWidth = 1000;
      }
      
      // Validate minimum dimensions
      if (totalLength < minLength || totalWidth < minWidth) {
        setErrors([`Dimensions must be at least ${minWidth}mm × ${minLength}mm`]);
        setQuote(null);
        return;
      }
      
      // Validate maximum dimensions
      if (totalLength > maxLength || totalWidth > maxWidth) {
        setErrors([`Dimensions cannot exceed ${maxWidth}mm × ${maxLength}mm`]);
        setQuote(null);
        return;
      }

      // Calculate blind dimensions
      let blind1, blind2;
      if (systemType === 'single') {
        blind1 = { length: totalLength, width: totalWidth };
        blind2 = null;
      } else {
        const blindDims = calculateBlindDimensions(totalLength, totalWidth, systemType);
        blind1 = blindDims.blind1;
        blind2 = blindDims.blind2;
        
        // Validate individual blind minimums
        if (blind1.length < 500 || blind1.width < 500 || blind2.length < 500 || blind2.width < 500) {
          setErrors(['Individual blinds must be at least 500mm × 500mm']);
          setQuote(null);
          return;
        }
      }

      // Find next size up for pricing
      const lengthKeys = Object.keys(dimoutPricing).map(Number);
      const widthKeys = Object.keys(dimoutPricing[1000]).map(Number);
      
      const nearestLength1 = findNextSizeUp(blind1.length, lengthKeys);
      const nearestWidth1 = findNextSizeUp(blind1.width, widthKeys);
      
      let nearestLength2, nearestWidth2;
      if (blind2) {
        nearestLength2 = findNextSizeUp(blind2.length, lengthKeys);
        nearestWidth2 = findNextSizeUp(blind2.width, widthKeys);
      }

      // Get pricing
      const pricingTable = fabricType === 'dimout' ? dimoutPricing : blackoutPricing;
      const blind1Price = pricingTable[nearestLength1][nearestWidth1];
      const blind2Price = blind2 ? pricingTable[nearestLength2][nearestWidth2] : 0;
      
      // Calculate Side Trims price
      let sideTrimsPrice_calc = 0;
      if (systemType === 'duo-inward' || (systemType === 'duo-parallel' && sideTrims)) {
        // For Duo systems, calculate Side Trims based on total dimensions
        const sideTrimsLength = findNextSizeUp(totalLength, lengthKeys);
        const sideTrimsWidth = findNextSizeUp(totalWidth, widthKeys);
        sideTrimsPrice_calc = sideTrimsPricing[sideTrimsLength][sideTrimsWidth];
      } else if (systemType === 'single') {
        sideTrimsPrice_calc = sideTrimsPricing[nearestLength1][nearestWidth1];
      }
      
      // Calculate power hardware cost based on system type and capacity
      let powerPrice, powerQuantity, chargerPrice, chargerQuantity;
      
      if (systemType === 'single') {
        powerQuantity = 1;
        powerPrice = powerOptions[powerSupply].price * powerQuantity;
        
        // Add charger if needed
        if (powerOptions[powerSupply].needsCharger) {
          chargerQuantity = 1;
          chargerPrice = powerOptions.charger.price * chargerQuantity;
        } else {
          chargerQuantity = 0;
          chargerPrice = 0;
        }
      } else {
        // Duo system - calculate based on capacity
        const requiredBlinds = 2;
        const capacity = powerOptions[powerSupply].capacity;
        
        if (capacity >= requiredBlinds) {
          // One transformer can handle multiple blinds
          powerQuantity = 1;
          powerPrice = powerOptions[powerSupply].price * powerQuantity;
        } else {
          // Need multiple units
          powerQuantity = Math.ceil(requiredBlinds / capacity);
          powerPrice = powerOptions[powerSupply].price * powerQuantity;
        }
        
        // For batteries, only need one charger regardless of quantity
        if (powerOptions[powerSupply].needsCharger) {
          chargerQuantity = 1;
          chargerPrice = powerOptions.charger.price * chargerQuantity;
        } else {
          chargerQuantity = 0;
          chargerPrice = 0;
        }
      }
      
      const totalPowerPrice = powerPrice + chargerPrice;
      const handsetPrice = handsetOptions[handset].price;
      const wallSwitchPrice = wallSwitchOptions[wallSwitch].price;

      const subtotal = blind1Price + blind2Price + sideTrimsPrice_calc + totalPowerPrice + handsetPrice + wallSwitchPrice;
      const shipping = 25; // UK Courier Delivery
      const buyPriceTotal = subtotal + shipping;
      
      // Calculate retail pricing - margin applied to total OBP (including delivery)
      const retailTotal = Math.round(buyPriceTotal / (1 - margin / 100));
      const retailTotalWithVAT = retailTotal * 1.2;
      
      // Round up to next nearest even number
      const retailTotalIncVAT = Math.ceil(retailTotalWithVAT / 2) * 2;

      setQuote({
        systemType,
        totalRecess: { length: totalLength, width: totalWidth },
        blind1: {
          dimensions: blind1,
          nearest: { length: nearestLength1, width: nearestWidth1 },
          price: blind1Price
        },
        blind2: blind2 ? {
          dimensions: blind2,
          nearest: { length: nearestLength2, width: nearestWidth2 },
          price: blind2Price
        } : null,
        fabric: { type: fabricType, color: fabricColor },
        hardware: hardwareOptions[hardwareColor],
        tBar: systemType !== 'single' && (systemType === 'duo-inward' || sideTrims) ? {
          required: systemType === 'duo-inward',
          color: tBarColorOptions[tBarColor]
        } : null,
        cordCount: systemType === 'single' 
          ? getCordCount(totalWidth)
          : {
              // For Duo systems, each blind needs its own cords
              blind1: getCordCount(blind1.width),
              blind2: getCordCount(blind2.width),
              total: getCordCount(blind1.width).total + getCordCount(blind2.width).total,
              spooling: getCordCount(blind1.width).spooling + getCordCount(blind2.width).spooling,
              support: getCordCount(blind1.width).support + getCordCount(blind2.width).support
            },
        pricing: {
          blind1: blind1Price,
          blind2: blind2Price,
          sideTrims: sideTrimsPrice_calc,
          power: {
            total: totalPowerPrice,
            powerPrice: powerPrice,
            powerQuantity: powerQuantity,
            chargerPrice: chargerPrice,
            chargerQuantity: chargerQuantity
          },
          handset: handsetPrice,
          wallSwitch: wallSwitchPrice,
          buySubtotal: subtotal,
          shipping,
          buyTotal: buyPriceTotal,
          retailTotal,
          retailTotalIncVAT,
          margin
        },
        components: {
          power: powerOptions[powerSupply].name,
          handset: handsetOptions[handset].name,
          wallSwitch: wallSwitchOptions[wallSwitch].name
        }
      });
    } else {
      // Clear quote if dimensions are invalid
      setQuote(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemType, recess.length, recess.width, fabricType, fabricColor, hardwareColor, powerSupply, handset, wallSwitch, margin, sideTrims, tBarColor]);

  const SystemGuideModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold text-teal-600">
            Which Sona Sky System Do I Need?
          </h2>
          <button
            onClick={() => setShowSystemGuide(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">What is Sona Sky?</h3>
            <p className="text-gray-700">
              Sona Sky is a horizontally mounted cellular blind system which sits on a 25mm shelf 
              on all four sides. This shelf is called the side trim.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">System Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">System</th>
                    <th className="border p-2">Max Width</th>
                    <th className="border p-2">Max Length</th>
                    <th className="border p-2">T-Bar</th>
                    <th className="border p-2">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-semibold">Single Blind</td>
                    <td className="border p-2 text-center">3000mm</td>
                    <td className="border p-2 text-center">5000mm</td>
                    <td className="border p-2 text-center">No</td>
                    <td className="border p-2">Standard openings</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-semibold">Duo - Inward</td>
                    <td className="border p-2 text-center">3000mm</td>
                    <td className="border p-2 text-center">10000mm</td>
                    <td className="border p-2 text-center">Required</td>
                    <td className="border p-2">Long skylights</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-semibold">Duo - Parallel</td>
                    <td className="border p-2 text-center">6000mm</td>
                    <td className="border p-2 text-center">5000mm</td>
                    <td className="border p-2 text-center">Recommended</td>
                    <td className="border p-2">Wide openings</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Single Blind System</h3>
            <p className="text-gray-700 mb-2">
              One horizontally mounted cellular blind on a 25mm shelf (side trim) on all four sides. 
              Ideal for openings up to 3m wide by 5m long.
            </p>
            <p className="text-sm text-gray-600">Maximum size: 3000mm × 5000mm</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Duo - Inward Configuration</h3>
            <p className="text-gray-700 mb-2">
              Two blinds meet in the middle of the opening with a central T-bar (double trim). 
              The maximum width remains at 3000mm but the maximum length doubles to 10,000mm. 
              This system requires a central T-bar where the two blinds meet.
            </p>
            <p className="text-sm text-gray-600">Maximum size: 3000mm × 10000mm (T-bar required)</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Duo - Parallel Configuration</h3>
            <p className="text-gray-700 mb-2">
              Two blinds run side by side independently. With this system the T-bar is optional 
              but we would almost always recommend it. The maximum width for this system is 6000mm 
              (two 3000mm max blinds side by side) with a maximum drop of 5000mm (that of a single blind).
            </p>
            <p className="text-sm text-gray-600">Maximum size: 6000mm × 5000mm (T-bar strongly recommended)</p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 text-teal-800">What's Included with Every Sona Sky System</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Motor
                </h4>
                <p className="text-sm text-gray-700">
                  Designed in France, the Somfy Tilt & Lift motor provides raised, lower and 
                  intermediate positions with precision control. The motor is nestled discreetly 
                  into the headrail.
                </p>
              </div>

              <div className="border border-gray-200 rounded p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                  </svg>
                  Hardware
                </h4>
                <p className="text-sm text-gray-700">
                  German Engineered to the finest quality and specification, the hardware is 
                  finished in a premium fine texture coating, providing a more superior look and feel.
                </p>
              </div>

              <div className="border border-gray-200 rounded p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Programme Button
                </h4>
                <p className="text-sm text-gray-700">
                  Unique to SONA, housed at the back of the headrail sits the easy-access 
                  programming button. Allowing functionality and pairing of the motor without 
                  the need to remove the blind.
                </p>
              </div>

              <div className="border border-gray-200 rounded p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  Fixings Kit
                </h4>
                <p className="text-sm text-gray-700">
                  Included with the blind are an option of top or face fix brackets, finished 
                  in a premium fine texture coating to match our blind hardware. Screws and 
                  wall plugs included.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Specifications Diagram */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-lg font-semibold mb-4 text-teal-800">Technical Specifications</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <img 
                src="/images/sona/technical-specs.png" 
                alt="SonaSky Technical Specifications Diagram" 
                className="w-full max-w-4xl mx-auto cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setShowImageModal(true)}
                title="Click to enlarge"
              />
              <p className="text-xs text-gray-500 text-center mt-2">
                Click image to enlarge
              </p>
            </div>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded p-4">
            <h3 className="text-lg font-semibold mb-2 text-teal-800">Quick Decision Guide</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Opening up to 3m × 5m? → <strong>Single Blind</strong></li>
              <li>• Opening up to 3m wide but longer than 5m? → <strong>Duo - Inward</strong></li>
              <li>• Opening wider than 3m? → <strong>Duo - Parallel</strong></li>
            </ul>
          </div>
        </div>

        <button
          onClick={() => setShowSystemGuide(false)}
          className="mt-6 w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
        >
          Close Guide
        </button>
      </div>
    </div>
  );

  const ImageModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-teal-600">
            SonaSky Technical Specifications
          </h3>
          <button
            onClick={() => setShowImageModal(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="p-4 overflow-auto max-h-[80vh]">
          <img 
            src="/images/sona/technical-specs.png" 
            alt="SonaSky Technical Specifications Diagram" 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: brandConfig.colors.lightGrey, color: brandConfig.colors.black, fontFamily: brandConfig.fonts.body }}>
      {/* Header with logo and title */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
            <img src={sscLogoPng} alt="Scottish Shutter Company Logo" style={{ height: '48px', width: 'auto', borderRadius: '8px' }} />
              <div>
                <h1 className="text-3xl font-bold tracking-tight" style={{ color: brandConfig.colors.teal, fontFamily: brandConfig.fonts.semibold }}>
                  Sona Sky Series
                </h1>
                <p className="text-lg mt-1" style={{ color: brandConfig.colors.black, fontFamily: brandConfig.fonts.light }}>Skylight Blind Calculator</p>
                <div className="md:hidden mt-2">
                  <p className="text-xs" style={{ color: brandConfig.colors.grey, fontFamily: brandConfig.fonts.light }}>The Scottish Shutter Company - v{securityConfig.version}</p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <p className="text-sm" style={{ color: brandConfig.colors.black, fontFamily: brandConfig.fonts.light }}>The Scottish Shutter Company</p>
                <p className="text-sm font-medium" style={{ color: brandConfig.colors.deepTeal, fontFamily: brandConfig.fonts.semibold }}>Professional Skylight Solutions</p>
                <p className="text-xs mt-1" style={{ color: brandConfig.colors.grey, fontFamily: brandConfig.fonts.light }}>v{securityConfig.version}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* System Type Selection */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center mr-4">🏗️</div>
            <h3 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal, fontFamily: brandConfig.fonts.semibold }}>System Type</h3>
          </div>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="systemType"
                value="single"
                checked={systemType === 'single'}
                onChange={(e) => setSystemType(e.target.value)}
                className="mr-3"
              />
              <div>
                <div className="font-semibold">Single SonaSky Blind</div>
                <div className="text-sm text-gray-600">
                  Standard single blind system (Max: 3000mm × 5000mm)
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Cellular blind on 25mm shelf (side trim) on all four sides
                </div>
              </div>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="systemType"
                value="duo-inward"
                checked={systemType === 'duo-inward'}
                onChange={(e) => setSystemType(e.target.value)}
                className="mr-3"
              />
              <div>
                <div className="font-semibold">SonaSky Duo - Inward Configuration</div>
                <div className="text-sm text-gray-600">
                  Two blinds meet in center (Max: 3000mm × 10000mm) - T-Bar required
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Central T-bar where blinds meet. Width stays 3m, length doubles to 10m
                </div>
              </div>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="systemType"
                value="duo-parallel"
                checked={systemType === 'duo-parallel'}
                onChange={(e) => setSystemType(e.target.value)}
                className="mr-3"
              />
              <div>
                <div className="font-semibold">SonaSky Duo - Parallel Configuration</div>
                <div className="text-sm text-gray-600">
                  Two blinds run side-by-side (Max: 6000mm × 5000mm) - T-Bar strongly recommended
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Width doubles to 6m. T-bar optional but we recommend it where blinds meet
                </div>
              </div>
            </label>
          </div>
          
          <button
            type="button"
            onClick={() => setShowSystemGuide(true)}
            className="mt-4 text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Need help choosing? View System Selection Guide
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Input Panel (Steps 1-5) */}
          <section className="xl:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100">

              
              {/* Step 1: Recess Dimensions */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center mr-4">1</div>
                  <h3 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal, fontFamily: brandConfig.fonts.semibold }}>Recess Dimensions</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>
                      {systemType === 'single' ? 'Width' : 'Total Opening Width'}
                    </label>
                    <input
                      type="number"
                      value={recess.width}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow empty string and partial numbers during typing
                        if (value === '' || /^[0-9]*$/.test(value)) {
                          setRecess({...recess, width: value});
                        }
                      }}
                      onBlur={(e) => {
                        // Final validation on blur
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 500 && value <= (systemType === 'duo-parallel' ? 6000 : 3000)) {
                          setRecess({...recess, width: value.toString()});
                        } else if (e.target.value === '') {
                          setRecess({...recess, width: ''});
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder={systemType === 'duo-parallel' ? '500-6000mm' : '500-3000mm'}
                      min="500"
                      max={systemType === 'duo-parallel' ? '6000' : '3000'}
                      maxLength={securityConfig.security.maxInputLength}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>
                      {systemType === 'single' ? 'Length' : 'Total Opening Length'}
                    </label>
                    <input
                      type="number"
                      value={recess.length}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow empty string and partial numbers during typing
                        if (value === '' || /^[0-9]*$/.test(value)) {
                          setRecess({...recess, length: value});
                        }
                      }}
                      onBlur={(e) => {
                        // Final validation on blur
                        const value = parseInt(e.target.value);
                        const minLength = systemType === 'duo-inward' ? 1000 : 500;
                        const maxLength = systemType === 'duo-inward' ? 10000 : 5000;
                        if (!isNaN(value) && value >= minLength && value <= maxLength) {
                          setRecess({...recess, length: value.toString()});
                        } else if (e.target.value === '') {
                          setRecess({...recess, length: ''});
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder={systemType === 'duo-inward' ? '1000-10000mm' : '500-5000mm'}
                      min={systemType === 'duo-inward' ? '1000' : '500'}
                      max={systemType === 'duo-inward' ? '10000' : '5000'}
                      maxLength={securityConfig.security.maxInputLength}
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Fabric Selection */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center mr-4">2</div>
                  <h3 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal, fontFamily: brandConfig.fonts.semibold }}>Fabric Selection</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>Fabric Type</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="fabricType"
                          value="dimout"
                          checked={fabricType === 'dimout'}
                          onChange={(e) => setFabricType(e.target.value)}
                          className="mr-2"
                        />
                        <span>Dimout (Translucent)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="fabricType"
                          value="blackout"
                          checked={fabricType === 'blackout'}
                          onChange={(e) => setFabricType(e.target.value)}
                          className="mr-2"
                        />
                        <span>Blackout (Room Darkening)</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>Fabric Color</label>
                    <select
                      value={fabricColor}
                      onChange={(e) => setFabricColor(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="snow">Snow</option>
                      <option value="tusk">Tusk</option>
                      <option value="chiffon">Chiffon</option>
                      <option value="latte">Latte</option>
                      <option value="umber">Umber</option>
                      <option value="oyster">Oyster</option>
                      <option value="silver">Silver</option>
                      <option value="ash">Ash</option>
                      <option value="lead">Lead</option>
                      <option value="midnight">Midnight</option>
                      <option value="steel">Steel</option>
                      <option value="denim">Denim</option>
                      <option value="coin">Coin</option>
                      <option value="anchor">Anchor</option>
                      <option value="metal">Metal</option>
                      <option value="linen">Linen</option>
                      <option value="sand">Sand</option>
                      <option value="night">Night</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Hardware & Power */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center mr-4">3</div>
                  <h3 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal, fontFamily: brandConfig.fonts.semibold }}>Hardware & Power</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>Hardware Color</label>
                    <select
                      value={hardwareColor}
                      onChange={(e) => setHardwareColor(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="white">White RAL9016</option>
                      <option value="grey">Grey RAL7040</option>
                      <option value="anthracite">Anthracite RAL7016</option>
                      <option value="black">Black RAL9005</option>
                      <option value="bespoke">Bespoke RAL (POA)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>Power Supply</label>
                    <select
                      value={powerSupply}
                      onChange={(e) => setPowerSupply(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="solar">Solar Pack (£72)</option>
                      <option value="adapter">12v Mains Adapter (£18)</option>
                      <option value="battery">Li-on USB-C Battery (£38)</option>
                      <option value="batteryCharger">Li-on USB-C Battery plus charger (£52)</option>
                      <option value="charger">Li-on USB-C Battery Charger (£14)</option>
                      <option value="sna45">SNA-45-12 Mains Transformer (£38)</option>
                      <option value="sna100">SNA-100-12 Mains Transformer (£63)</option>
                      <option value="sna75">SNA-75-12 Mains Transformer (£48)</option>
                      <option value="sna12151">SNA12151 Mains Transformer (£108)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 4: Control Options */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center mr-4">4</div>
                  <h3 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal, fontFamily: brandConfig.fonts.semibold }}>Control Options</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>Handset</label>
                    <select
                      value={handset}
                      onChange={(e) => setHandset(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="none">No Handset (£0)</option>
                      <option value="situo1">Situo 1 (1-channel) (£28)</option>
                      <option value="situo5">Situo 5 (5-channel) (£45)</option>
                      <option value="telis16">Telis 16 (16-channel) (£128)</option>
                      <option value="tahoma">TaHoma Switch (£138)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>Wall Switch</label>
                    <select
                      value={wallSwitch}
                      onChange={(e) => setWallSwitch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="none">No Wall Switch (£0)</option>
                      <option value="smoove">Smoove Origin (1-channel) (£32)</option>
                      <option value="smoove4">Smoove Origin 4 (4-channel) (£45)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 5: Side Trims & T-Bar (Duo Systems) */}
              {(systemType === 'duo-inward' || systemType === 'duo-parallel') && (
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center mr-4">5</div>
                    <h3 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal, fontFamily: brandConfig.fonts.semibold }}>Side Trims & T-Bar</h3>
                  </div>
                  <div className="space-y-4">
                    {systemType === 'duo-inward' && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Inward Configuration:</strong> Side Trims and T-Bar are required for operation.
                        </p>
                      </div>
                    )}
                    {systemType === 'duo-parallel' && (
                      <div>
                        <label className="flex items-center mb-3">
                          <input
                            type="checkbox"
                            checked={sideTrims}
                            onChange={(e) => setSideTrims(e.target.checked)}
                            className="mr-2"
                          />
                          <span className="font-medium">Include Side Trims & T-Bar (Optional - Aesthetic only)</span>
                        </label>
                        <p className="text-sm text-gray-600 ml-6">
                          Side Trims include 4 lengths of 25mm × 25mm aluminium trim with T-Bar included.
                        </p>
                      </div>
                    )}
                    {(systemType === 'duo-inward' || (systemType === 'duo-parallel' && sideTrims)) && (
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>T-Bar Color</label>
                        <select
                          value={tBarColor}
                          onChange={(e) => setTBarColor(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                          <option value="white">White RAL9016</option>
                          <option value="grey">Grey RAL7040</option>
                          <option value="anthracite">Anthracite RAL7016</option>
                          <option value="black">Black RAL9005</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 6: Retail Pricing Margin */}
              <div className="mb-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center mr-4">{systemType === 'single' ? '5' : '6'}</div>
                  <h3 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal, fontFamily: brandConfig.fonts.semibold }}>Retail Pricing Margin</h3>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>Margin Percentage</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="margin"
                        value="50"
                        checked={margin === 50}
                        onChange={(e) => setMargin(parseFloat(e.target.value))}
                        className="mr-2"
                      />
                      <span>50%</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="margin"
                        value="56"
                        checked={margin === 56}
                        onChange={(e) => setMargin(parseFloat(e.target.value))}
                        className="mr-2"
                      />
                      <span>56%</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="margin"
                        value="60"
                        checked={margin === 60}
                        onChange={(e) => setMargin(parseFloat(e.target.value))}
                        className="mr-2"
                      />
                      <span>60%</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="margin"
                        value="65"
                        checked={margin === 65}
                        onChange={(e) => setMargin(parseFloat(e.target.value))}
                        className="mr-2"
                      />
                      <span>65%</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className={`w-full py-3 px-6 rounded-xl text-center text-sm font-medium transition-all duration-300 ${
                recess.length && recess.width && parseInt(recess.length) >= 500 && parseInt(recess.width) >= 500 
                  ? "bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200" 
                  : "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200"
              }`}>
                {recess.length && recess.width && parseInt(recess.length) >= 500 && parseInt(recess.width) >= 500 
                  ? "✅ Quote updated automatically" 
                  : "📝 Enter dimensions to see pricing"}
              </div>

              {/* Error Display */}
              {errors.length > 0 && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="text-red-800 font-medium mb-2">Please fix the following errors:</h3>
                  <ul className="text-red-700 text-sm space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>

          {/* Output Cards */}
          <section className="xl:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Quote Summary Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-xs flex items-center justify-center mr-3">📋</div>
                  <h2 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal, fontFamily: brandConfig.fonts.semibold }}>Quote Summary</h2>
                </div>
                
                {quote ? (
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>System Configuration</h3>
                      <p style={{ color: brandConfig.colors.black }}>
                        <span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>
                          {quote.systemType === 'single' ? 'Single Blind:' : 'Total Opening:'}
                        </span> {quote.totalRecess.width}mm × {quote.totalRecess.length}mm
                      </p>
                      
                      {quote.blind2 && (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Blind 1:</span> {quote.blind1.dimensions.width}mm × {quote.blind1.dimensions.length}mm</p>
                          <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Blind 2:</span> {quote.blind2.dimensions.width}mm × {quote.blind2.dimensions.length}mm</p>
                        </div>
                      )}
                      
                      <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Fabric:</span> {quote.fabric.type} - {quote.fabric.color}</p>
                      <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Hardware:</span> {quote.hardware}</p>
                      
                      {quote.tBar && (
                        <p style={{ color: brandConfig.colors.black }}>
                          <span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>T-Bar:</span> {quote.tBar.color}
                          {quote.tBar.required && <span className="text-sm text-blue-600"> (Required)</span>}
                        </p>
                      )}
                      
                      {quote.systemType === 'single' ? (
                        <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Cord Count:</span> {quote.cordCount.total} total ({quote.cordCount.spooling} spooling, {quote.cordCount.support} support)</p>
                      ) : (
                        <div>
                          <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Cord Count:</span></p>
                          <div className="ml-4 text-sm">
                            <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Blind 1:</span> {quote.cordCount.blind1.total} total ({quote.cordCount.blind1.spooling} spooling, {quote.cordCount.blind1.support} support)</p>
                            <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Blind 2:</span> {quote.cordCount.blind2.total} total ({quote.cordCount.blind2.spooling} spooling, {quote.cordCount.blind2.support} support)</p>
                            <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>System Total:</span> {quote.cordCount.total} total ({quote.cordCount.spooling} spooling, {quote.cordCount.support} support)</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-8">
                    <p>Enter dimensions to see pricing automatically</p>
                  </div>
                )}
              </div>

              {/* Components Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-xs flex items-center justify-center mr-3">⚙️</div>
                  <h2 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal, fontFamily: brandConfig.fonts.semibold }}>Components</h2>
                </div>
                
                {quote ? (
                  <div className="space-y-2">
                    <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Power:</span> {quote.components.power}</p>
                    <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Handset:</span> {quote.components.handset}</p>
                    <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Wall Switch:</span> {quote.components.wallSwitch}</p>
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-8">
                    <p>Select components to see details</p>
                  </div>
                )}
              </div>

              {/* Buy Price Breakdown Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-xs flex items-center justify-center mr-3">💰</div>
                  <h2 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal, fontFamily: brandConfig.fonts.semibold }}>Buy Price Breakdown (OBP)</h2>
                </div>
                
                {quote ? (
                  <div className="space-y-2">
                    <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Blind 1:</span> £{quote.pricing.blind1}</p>
                    {quote.pricing.blind2 > 0 && (
                      <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Blind 2:</span> £{quote.pricing.blind2}</p>
                    )}
                    {quote.pricing.sideTrims > 0 && (
                      <p style={{ color: brandConfig.colors.black }}>
                        <span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Side Trims & T-Bar:</span> £{quote.pricing.sideTrims}
                        {quote.tBar && <span className="text-xs text-gray-600 ml-1">({quote.tBar.color})</span>}
                      </p>
                    )}
                    {/* Power components - show detailed breakdown */}
                    <div>
                      <p style={{ color: brandConfig.colors.black }}>
                        <span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>
                          Power {quote.systemType === 'duo-parallel' || quote.systemType === 'duo-inward' ? '(Duo System)' : ''}:
                        </span> £{quote.pricing.power.total}
                      </p>
                      <p style={{ color: brandConfig.colors.black }} className="ml-4">
                        • {powerOptions[powerSupply].name}: £{powerOptions[powerSupply].price} × {quote.pricing.power.powerQuantity} = £{quote.pricing.power.powerPrice}
                      </p>
                      {quote.pricing.power.chargerQuantity > 0 && (
                        <p style={{ color: brandConfig.colors.black }} className="ml-4">
                          • {powerOptions.charger.name}: £{powerOptions.charger.price} × {quote.pricing.power.chargerQuantity} = £{quote.pricing.power.chargerPrice}
                        </p>
                      )}
                    </div>
                    <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Handset:</span> £{quote.pricing.handset}</p>
                    <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Wall Switch:</span> £{quote.pricing.wallSwitch}</p>
                    <hr className="my-3" />
                    <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Subtotal:</span> £{quote.pricing.buySubtotal}</p>
                    <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Shipping:</span> £{quote.pricing.shipping}</p>
                    <p className="text-lg font-semibold" style={{ color: brandConfig.colors.deepTeal }}><span className="font-medium">Total OBP:</span> £{quote.pricing.buyTotal}</p>
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-8">
                    <p>Enter dimensions to see pricing breakdown</p>
                  </div>
                )}
              </div>

              {/* Retail Pricing Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-xs flex items-center justify-center mr-3">🏪</div>
                  <h2 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal, fontFamily: brandConfig.fonts.semibold }}>Retail Pricing (w/ {margin}% Margin)</h2>
                </div>
                
                {quote ? (
                  <div className="space-y-2">
                    <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Retail Total (ex VAT):</span> £{quote.pricing.retailTotal}</p>
                    <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>VAT (20%):</span> £{Math.round(quote.pricing.retailTotal * 0.2)}</p>
                    <p className="text-xl font-bold" style={{ color: brandConfig.colors.teal }}><span className="font-medium">Total Inc VAT:</span> £{quote.pricing.retailTotalIncVAT}</p>
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-8">
                    <p>Enter dimensions to see retail pricing</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
        
        {/* System Guide Modal */}
        {showSystemGuide && <SystemGuideModal />}
        
        {/* Image Modal */}
        {showImageModal && <ImageModal />}
      </div>
    );
};

export default SonaCalculator;
