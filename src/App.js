import React, { useState, useEffect } from 'react';
import brandConfig from './brand-config';

const SonaCalculator = () => {
  // State management
  const [recess, setRecess] = useState({ length: '', width: '' });
  const [fabricType, setFabricType] = useState('dimout');
  const [fabricColor, setFabricColor] = useState('snow');
  const [hardwareColor, setHardwareColor] = useState('white');
  const [powerSupply, setPowerSupply] = useState('battery');
  const [handset, setHandset] = useState('none');
  const [wallSwitch, setWallSwitch] = useState('none');
  const [margin, setMargin] = useState(50);
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

  const sideTrimsPrice = {
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
    solar: { name: "Solar Pack", price: 72 },
    adapter: { name: "12v Mains Adapter", price: 18 },
    battery: { name: "Li-on USB-C Battery", price: 38 },
    charger: { name: "Li-on USB-C Battery Charger", price: 14 },
    sna45: { name: "SNA-45-12 Mains Transformer", price: 38 },
    sna100: { name: "SNA-100-12 Mains Transformer", price: 63 },
    sna75: { name: "SNA-75-12 Mains Transformer", price: 48 },
    sna12151: { name: "SNA12151 Mains Transformer", price: 108 }
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

  const fabricColors = {
    dimout: ['snow', 'tusk', 'chiffon', 'latte', 'umber', 'oyster', 'silver', 'ash', 'lead', 'midnight', 'steel', 'denim', 'coin', 'anchor', 'metal', 'linen', 'sand', 'night'],
    blackout: ['snow', 'tusk', 'chiffon', 'latte', 'umber', 'oyster', 'silver', 'ash', 'lead', 'midnight', 'steel', 'denim', 'coin', 'anchor', 'metal', 'linen', 'sand', 'night']
  };

  const hardwareOptions = {
    white: "White RAL9016",
    grey: "Grey RAL7040", 
    anthracite: "Anthracite RAL7016",
    black: "Black RAL9005",
    bespoke: "Bespoke RAL (POA)"
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

  const validateInputs = () => {
    const newErrors = [];
    const length = parseInt(recess.length);
    const width = parseInt(recess.width);

    if (!length || length < 500) {
      newErrors.push("Minimum recess length is 500mm");
    }
    if (!width || width < 500) {
      newErrors.push("Minimum recess width is 500mm");
    }
    if (length > 5000) {
      newErrors.push("Maximum recess length is 5000mm");
    }
    if (width > 3000) {
      newErrors.push("Maximum recess width is 3000mm");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const calculateQuote = () => {
    if (!validateInputs()) return;

    const length = parseInt(recess.length);
    const width = parseInt(recess.width);
    
    // Find next size up for pricing
    const lengthKeys = Object.keys(dimoutPricing).map(Number);
    const widthKeys = Object.keys(dimoutPricing[1000]).map(Number);
    
    const nearestLength = findNextSizeUp(length, lengthKeys);
    const nearestWidth = findNextSizeUp(width, widthKeys);

    // Get pricing
    const pricingTable = fabricType === 'dimout' ? dimoutPricing : blackoutPricing;
    const blindPrice = pricingTable[nearestLength][nearestWidth];
    const sideTrimsPrice_calc = sideTrimsPrice[nearestLength][nearestWidth];
    const powerPrice = powerOptions[powerSupply].price;
    const handsetPrice = handsetOptions[handset].price;
    const wallSwitchPrice = wallSwitchOptions[wallSwitch].price;

    const subtotal = blindPrice + sideTrimsPrice_calc + powerPrice + handsetPrice + wallSwitchPrice;
    const shipping = 25; // UK Courier Delivery
    const buyPriceTotal = subtotal + shipping;
    
    // Calculate retail pricing - margin applied to total OBP (including delivery)
    const retailTotal = Math.round(buyPriceTotal / (1 - margin / 100));
    const retailTotalWithVAT = retailTotal * 1.2;
    
    // Round up to next nearest even number
    const retailTotalIncVAT = Math.ceil(retailTotalWithVAT / 2) * 2;

    setQuote({
      recess: { length, width },
      nearest: { length: nearestLength, width: nearestWidth },
      fabric: { type: fabricType, color: fabricColor },
      hardware: hardwareOptions[hardwareColor],
      cordCount: getCordCount(width),
      pricing: {
        blind: blindPrice,
        sideTrims: sideTrimsPrice_calc,
        power: powerPrice,
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
  };

  // Auto-update quote when options change (but only if a quote already exists)
useEffect(() => {
  if (quote) {
    calculateQuote();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [fabricType, fabricColor, hardwareColor, powerSupply, handset, wallSwitch, margin]);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: brandConfig.fonts.body }}>
      {/* Header with logo and title */}
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center gap-4">
          <img src={brandConfig.logo.src} alt={brandConfig.logo.alt} style={{ height: brandConfig.logo.height, width: brandConfig.logo.width }} />
          <span className="text-2xl font-semibold tracking-tight" style={{ color: brandConfig.colors.teal, fontFamily: brandConfig.fonts.heading }}>Sona Sky Series - Skylight Blind Calculator</span>
        </div>
      </header>
      {/* Responsive grid layout */}
      <main className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Panel (Steps 1-5) */}
        <section className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center text-xl text-gray-700">INPUT PANEL PLACEHOLDER</div>
        </section>
        {/* Output Cards */}
        <section className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center text-xl text-gray-700">QUOTE SUMMARY PLACEHOLDER</div>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center text-xl text-gray-700">COMPONENTS PLACEHOLDER</div>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center text-xl text-gray-700">BUY PRICE BREAKDOWN PLACEHOLDER</div>
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center text-xl text-gray-700">RETAIL PRICING PLACEHOLDER</div>
        </section>
      </main>
    </div>
  );
};

export default SonaCalculator;
