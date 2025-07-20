import React, { useState, useEffect } from 'react';
import brandConfig from './brand-config';
import sscLogoPng from './assets/The Scottish Shutter Company Logo 2024 Square copy.png';
const SonaCalculator = () => {
  console.log('NEW VERSION LOADED - BLUE BACKGROUND WITH GRID LAYOUT');
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
    batteryCharger: { name: "Li-on USB-C Battery plus charger", price: 52 },
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





  // Auto-update quote when any input changes
  useEffect(() => {
    // Clear any previous errors
    setErrors([]);
    
    // Only calculate if we have valid dimensions
    if (recess.length && recess.width) {
      const length = parseInt(recess.length);
      const width = parseInt(recess.width);
      
      // Validate minimum dimensions
      if (length < 500 || width < 500) {
        setErrors(['Both length and width must be at least 500mm']);
        setQuote(null);
        return;
      }
      
      // Validate maximum dimensions
      if (length > 5000) {
        setErrors(['Length cannot exceed 5000mm (5m)']);
        setQuote(null);
        return;
      }
      
      if (width > 3000) {
        setErrors(['Width cannot exceed 3000mm (3m)']);
        setQuote(null);
        return;
      }
      
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
    } else {
      // Clear quote if dimensions are invalid
      setQuote(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recess.length, recess.width, fabricType, fabricColor, hardwareColor, powerSupply, handset, wallSwitch, margin]);

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
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <p className="text-sm" style={{ color: brandConfig.colors.black, fontFamily: brandConfig.fonts.light }}>The Scottish Shutter Company</p>
                <p className="text-sm font-medium" style={{ color: brandConfig.colors.deepTeal, fontFamily: brandConfig.fonts.semibold }}>Professional Skylight Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive grid layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
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
                    <label className="block text-sm font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>Width</label>
                    <input
                      type="number"
                      value={recess.width}
                      onChange={(e) => setRecess({...recess, width: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="500-3000mm"
                      min="500"
                      max="3000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>Length</label>
                    <input
                      type="number"
                      value={recess.length}
                      onChange={(e) => setRecess({...recess, length: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="500-5000mm"
                      min="500"
                      max="5000"
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
                        <span>Dimout</span>
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
                        <span>Blackout</span>
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

              {/* Step 5: Retail Pricing Margin */}
              <div className="mb-4">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center mr-4">5</div>
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
                      <h3 className="font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>Specifications</h3>
                      <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Recess:</span> {quote.recess.width}mm × {quote.recess.length}mm</p>
                      <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Fabric:</span> {quote.fabric.type} - {quote.fabric.color}</p>
                      <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Hardware:</span> {quote.hardware}</p>
                      <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Cord Count:</span> {quote.cordCount.total} total ({quote.cordCount.spooling} spooling, {quote.cordCount.support} support)</p>
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
                    <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Blind:</span> £{quote.pricing.blind}</p>
                    <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Side Trims:</span> £{quote.pricing.sideTrims}</p>
                    <p style={{ color: brandConfig.colors.black }}><span className="font-medium" style={{ color: brandConfig.colors.deepTeal }}>Power:</span> £{quote.pricing.power}</p>
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
    </div>
  );
};

export default SonaCalculator;
console.log('NEW VERSION LOADED - RED BACKGROUND TEST');
