import React, { useState, useEffect, useCallback } from 'react';
import { brandConfig } from './brand-config';
import { securityConfig } from './security-config';

function LanternCalculator() {
  // State management
  const [recess, setRecess] = useState({ width: '', drop: '' });
  const [fabricType, setFabricType] = useState('translucent'); // translucent or roomDarkening
  const [fabricRange, setFabricRange] = useState('trueRioja'); // trueRioja, unixDuette, elanDuette
  const [margin, setMargin] = useState(50);
  const [customMargin, setCustomMargin] = useState('');
  const [quote, setQuote] = useState(null);
  const [errors, setErrors] = useState([]);
  const [showFabricInfo, setShowFabricInfo] = useState(false);

  // Lantern MK2 Pricing Tables (Buy Prices from MasterBlinds 2025)
  // Band AA - True Rioja Translucent
  const bandAA = {
    400: { 400: 196, 600: 205, 800: 213, 1000: 222, 1200: 231, 1400: 240, 1600: 235, 1800: 248, 2000: 257 },
    600: { 400: 203, 600: 212, 800: 222, 1000: 232, 1200: 242, 1400: 252, 1600: 252, 1800: 261, 2000: 271 },
    800: { 400: 209, 600: 220, 800: 231, 1000: 242, 1200: 253, 1400: 263, 1600: 269, 1800: 274, 2000: 285 },
    1000: { 400: 216, 600: 228, 800: 240, 1000: 252, 1200: 263, 1400: 275, 1600: 286, 1800: 287, 2000: 299 },
    1200: { 400: 223, 600: 236, 800: 249, 1000: 261, 1200: 274, 1400: 287, 1600: 303, 1800: 300, 2000: 312 },
    1400: { 400: 230, 600: 244, 800: 257, 1000: 271, 1200: 285, 1400: 299, 1600: 320, 1800: 313, 2000: 326 },
    1600: { 400: 237, 600: 251, 800: 266, 1000: 281, 1200: 296, 1400: 311, 1600: 337, 1800: 325, 2000: 340 },
    1800: { 400: 243, 600: 259, 800: 275, 1000: 291, 1200: 307, 1400: 322, 1600: 354, 1800: 338, 2000: 354 },
    2000: { 400: 250, 600: 267, 800: 284, 1000: 301, 1200: 317, 1400: 334, 1600: 371, 1800: 351, 2000: 368 },
    2200: { 400: 257, 600: 275, 800: 293, 1000: 310, 1200: 328, 1400: 346, 1600: 388, 1800: 364, 2000: 382 },
    2400: { 400: 264, 600: 283, 800: 301, 1000: 320, 1200: 339, 1400: 358, 1600: 405, 1800: 377, 2000: 395 },
    2600: { 400: 271, 600: 290, 800: 310, 1000: 330, 1200: 350, 1400: 370, 1600: 422, 1800: 389, 2000: 409 },
    2800: { 400: 278, 600: 298, 800: 319, 1000: 340, 1200: 361, 1400: 381, 1600: 439, 1800: 402, 2000: 423 },
    3000: { 400: 284, 600: 306, 800: 328, 1000: 350, 1200: 371, 1400: 393, 1600: 456, 1800: 415, 2000: 437 },
    3200: { 400: 291, 600: 314, 800: 337, 1000: 359, 1200: 382, 1400: 405, 1600: 473, 1800: 428, 2000: 451 },
    3400: { 400: 298, 600: 322, 800: 346, 1000: 369, 1200: 393, 1400: 417, 1600: 490, 1800: 441, 2000: 464 },
    3600: { 400: 305, 600: 330, 800: 354, 1000: 379, 1200: 404, 1400: 429, 1600: 507, 1800: 453, 2000: 478 },
  };

  // Band A - True Rioja RD, Unix Duette Translucent
  const bandA = {
    400: { 400: 199, 600: 209, 800: 219, 1000: 230, 1200: 240, 1400: 250, 1600: 261, 1800: 271, 2000: 281 },
    600: { 400: 207, 600: 219, 800: 231, 1000: 243, 1200: 255, 1400: 268, 1600: 280, 1800: 292, 2000: 304 },
    800: { 400: 216, 600: 229, 800: 243, 1000: 257, 1200: 271, 1400: 285, 1600: 299, 1800: 312, 2000: 326 },
    1000: { 400: 224, 600: 239, 800: 255, 1000: 271, 1200: 286, 1400: 302, 1600: 317, 1800: 333, 2000: 349 },
    1200: { 400: 232, 600: 250, 800: 267, 1000: 284, 1200: 302, 1400: 319, 1600: 336, 1800: 354, 2000: 371 },
    1400: { 400: 241, 600: 260, 800: 279, 1000: 298, 1200: 317, 1400: 336, 1600: 355, 1800: 374, 2000: 394 },
    1600: { 400: 249, 600: 270, 800: 291, 1000: 312, 1200: 332, 1400: 353, 1600: 374, 1800: 395, 2000: 416 },
    1800: { 400: 257, 600: 280, 800: 303, 1000: 325, 1200: 348, 1400: 371, 1600: 393, 1800: 416, 2000: 439 },
    2000: { 400: 266, 600: 290, 800: 314, 1000: 339, 1200: 363, 1400: 388, 1600: 412, 1800: 437, 2000: 461 },
    2200: { 400: 274, 600: 300, 800: 326, 1000: 352, 1200: 379, 1400: 405, 1600: 431, 1800: 457, 2000: 483 },
    2400: { 400: 282, 600: 310, 800: 338, 1000: 366, 1200: 394, 1400: 422, 1600: 450, 1800: 478, 2000: 506 },
    2600: { 400: 291, 600: 320, 800: 350, 1000: 380, 1200: 409, 1400: 439, 1600: 469, 1800: 499, 2000: 528 },
    2800: { 400: 299, 600: 330, 800: 362, 1000: 393, 1200: 425, 1400: 456, 1600: 488, 1800: 519, 2000: 551 },
    3000: { 400: 307, 600: 341, 800: 374, 1000: 407, 1200: 440, 1400: 473, 1600: 507, 1800: 540, 2000: 573 },
    3200: { 400: 316, 600: 351, 800: 386, 1000: 421, 1200: 456, 1400: 491, 1600: 526, 1800: 561, 2000: 596 },
    3400: { 400: 324, 600: 361, 800: 397, 1000: 434, 1200: 471, 1400: 508, 1600: 545, 1800: 581, 2000: 618 },
    3600: { 400: 332, 600: 371, 800: 409, 1000: 448, 1200: 486, 1400: 525, 1600: 563, 1800: 602, 2000: 641 },
  };

  // Band B - Unix Duette RD, Elan Duette Translucent
  const bandB = {
    400: { 400: 201, 600: 213, 800: 225, 1000: 236, 1200: 248, 1400: 259, 1600: 271, 1800: 283, 2000: 294 },
    600: { 400: 211, 600: 225, 800: 239, 1000: 253, 1200: 267, 1400: 281, 1600: 295, 1800: 309, 2000: 323 },
    800: { 400: 221, 600: 237, 800: 254, 1000: 270, 1200: 286, 1400: 303, 1600: 319, 1800: 336, 2000: 352 },
    1000: { 400: 230, 600: 249, 800: 268, 1000: 287, 1200: 306, 1400: 325, 1600: 343, 1800: 362, 2000: 381 },
    1200: { 400: 240, 600: 261, 800: 282, 1000: 304, 1200: 325, 1400: 346, 1600: 367, 1800: 389, 2000: 410 },
    1400: { 400: 250, 600: 273, 800: 297, 1000: 321, 1200: 344, 1400: 368, 1600: 392, 1800: 415, 2000: 439 },
    1600: { 400: 259, 600: 285, 800: 311, 1000: 337, 1200: 364, 1400: 390, 1600: 416, 1800: 442, 2000: 468 },
    1800: { 400: 269, 600: 297, 800: 326, 1000: 354, 1200: 383, 1400: 411, 1600: 440, 1800: 468, 2000: 497 },
    2000: { 400: 278, 600: 309, 800: 340, 1000: 371, 1200: 402, 1400: 433, 1600: 464, 1800: 495, 2000: 526 },
    2200: { 400: 288, 600: 321, 800: 355, 1000: 388, 1200: 421, 1400: 455, 1600: 488, 1800: 521, 2000: 555 },
    2400: { 400: 298, 600: 333, 800: 369, 1000: 405, 1200: 441, 1400: 476, 1600: 512, 1800: 548, 2000: 583 },
    2600: { 400: 307, 600: 346, 800: 384, 1000: 422, 1200: 460, 1400: 498, 1600: 536, 1800: 574, 2000: 612 },
    2800: { 400: 317, 600: 358, 800: 398, 1000: 439, 1200: 479, 1400: 520, 1600: 560, 1800: 601, 2000: 641 },
    3000: { 400: 327, 600: 370, 800: 413, 1000: 456, 1200: 498, 1400: 541, 1600: 584, 1800: 627, 2000: 670 },
    3200: { 400: 336, 600: 382, 800: 427, 1000: 472, 1200: 518, 1400: 563, 1600: 608, 1800: 654, 2000: 699 },
    3400: { 400: 346, 600: 394, 800: 441, 1000: 489, 1200: 537, 1400: 585, 1600: 633, 1800: 680, 2000: 728 },
    3600: { 400: 356, 600: 406, 800: 456, 1000: 506, 1200: 556, 1400: 606, 1600: 657, 1800: 707, 2000: 757 },
  };

  // Band C - Elan Duette RD
  const bandC = {
    400: { 400: 204, 600: 217, 800: 229, 1000: 242, 1200: 255, 1400: 268, 1600: 280, 1800: 293, 2000: 306 },
    600: { 400: 215, 600: 230, 800: 246, 1000: 262, 1200: 278, 1400: 293, 1600: 309, 1800: 325, 2000: 341 },
    800: { 400: 225, 600: 244, 800: 263, 1000: 282, 1200: 300, 1400: 319, 1600: 338, 1800: 357, 2000: 375 },
    1000: { 400: 236, 600: 258, 800: 280, 1000: 301, 1200: 323, 1400: 345, 1600: 367, 1800: 388, 2000: 410 },
    1200: { 400: 247, 600: 272, 800: 296, 1000: 321, 1200: 346, 1400: 371, 1600: 396, 1800: 420, 2000: 445 },
    1400: { 400: 258, 600: 286, 800: 313, 1000: 341, 1200: 369, 1400: 397, 1600: 424, 1800: 452, 2000: 480 },
    1600: { 400: 269, 600: 299, 800: 330, 1000: 361, 1200: 392, 1400: 422, 1600: 453, 1800: 484, 2000: 515 },
    1800: { 400: 279, 600: 313, 800: 347, 1000: 381, 1200: 414, 1400: 448, 1600: 482, 1800: 516, 2000: 549 },
    2000: { 400: 290, 600: 327, 800: 364, 1000: 400, 1200: 437, 1400: 474, 1600: 511, 1800: 547, 2000: 584 },
    2200: { 400: 301, 600: 341, 800: 380, 1000: 420, 1200: 460, 1400: 500, 1600: 539, 1800: 579, 2000: 619 },
    2400: { 400: 312, 600: 355, 800: 397, 1000: 440, 1200: 483, 1400: 525, 1600: 568, 1800: 611, 2000: 654 },
    2600: { 400: 323, 600: 368, 800: 414, 1000: 460, 1200: 505, 1400: 551, 1600: 597, 1800: 643, 2000: 688 },
    2800: { 400: 333, 600: 382, 800: 431, 1000: 480, 1200: 528, 1400: 577, 1600: 626, 1800: 674, 2000: 723 },
    3000: { 400: 344, 600: 396, 800: 448, 1000: 499, 1200: 551, 1400: 603, 1600: 654, 1800: 706, 2000: 758 },
    3200: { 400: 355, 600: 410, 800: 464, 1000: 519, 1200: 574, 1400: 629, 1600: 683, 1800: 738, 2000: 793 },
    3400: { 400: 366, 600: 424, 800: 481, 1000: 539, 1200: 597, 1400: 654, 1600: 712, 1800: 770, 2000: 827 },
    3600: { 400: 377, 600: 437, 800: 498, 1000: 559, 1200: 619, 1400: 680, 1600: 741, 1800: 802, 2000: 862 },
  };

  // Controller cost (wireless handset or wall switch)
  const controllerCost = 38;

  // Fabric configurations
  const fabricOptions = {
    trueRioja: {
      name: 'True Rioja',
      description: 'Entry level cellular fabric from Coulisse',
      translucentBand: 'AA',
      roomDarkeningBand: 'A'
    },
    unixDuette: {
      name: 'Unix Duette',
      description: 'Premium Hunter Douglas Duette fabric',
      translucentBand: 'A',
      roomDarkeningBand: 'B'
    },
    elanDuette: {
      name: 'Elan Duette',
      description: 'Luxury Hunter Douglas Duette fabric',
      translucentBand: 'B',
      roomDarkeningBand: 'C'
    }
  };

  // Get pricing table based on band
  const getPricingTable = (band) => {
    switch (band) {
      case 'AA': return bandAA;
      case 'A': return bandA;
      case 'B': return bandB;
      case 'C': return bandC;
      default: return bandA;
    }
  };

  // Get the current band based on fabric and type selection
  const getCurrentBand = () => {
    const fabric = fabricOptions[fabricRange];
    return fabricType === 'translucent' ? fabric.translucentBand : fabric.roomDarkeningBand;
  };

  // Find nearest dimension in pricing table
  const findNearestDimension = (value, availableDimensions) => {
    const dims = availableDimensions.map(Number).sort((a, b) => a - b);
    for (let i = 0; i < dims.length; i++) {
      if (value <= dims[i]) {
        return dims[i];
      }
    }
    return dims[dims.length - 1];
  };

  // Calculate quote
  const calculateQuote = useCallback(() => {
    const width = parseInt(recess.width);
    const drop = parseInt(recess.drop);

    // Validate inputs
    if (isNaN(width) || isNaN(drop)) {
      setQuote(null);
      setErrors([]);
      return;
    }

    // Dimension constraints for MK2
    const minWidth = 400;
    const maxWidth = 2000;
    const maxDrop = 3600;

    const newErrors = [];

    if (width < minWidth) {
      newErrors.push(`Width must be at least ${minWidth}mm`);
    }
    if (width > maxWidth) {
      newErrors.push(`Width cannot exceed ${maxWidth}mm for Lantern MK2`);
    }
    if (drop > maxDrop) {
      newErrors.push(`Drop cannot exceed ${maxDrop}mm`);
    }
    if (drop < 400) {
      newErrors.push(`Drop must be at least 400mm`);
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setQuote(null);
      return;
    }

    setErrors([]);

    // Get the correct pricing table
    const band = getCurrentBand();
    const pricingTable = getPricingTable(band);

    // Find nearest dimensions
    const dropKeys = Object.keys(pricingTable);
    const widthKeys = Object.keys(pricingTable[dropKeys[0]]);

    const nearestDrop = findNearestDimension(drop, dropKeys);
    const nearestWidth = findNearestDimension(width, widthKeys);

    // Get blind buy price
    const blindBuyPrice = pricingTable[nearestDrop][nearestWidth];

    // Total buy price (blind + controller)
    const totalBuyPrice = blindBuyPrice + controllerCost;

    // Calculate with margin
    const effectiveMargin = customMargin !== '' ? parseFloat(customMargin) : margin;
    const marginMultiplier = 1 + (effectiveMargin / 100);
    const priceWithMargin = totalBuyPrice * marginMultiplier;

    // Add VAT
    const vatRate = 0.20;
    const vatAmount = priceWithMargin * vatRate;
    const totalPrice = priceWithMargin + vatAmount;

    setQuote({
      width,
      drop,
      nearestWidth,
      nearestDrop,
      fabricRange: fabricOptions[fabricRange].name,
      fabricType: fabricType === 'translucent' ? 'Translucent' : 'Room Darkening',
      band,
      blindBuyPrice,
      controllerCost,
      totalBuyPrice,
      margin: effectiveMargin,
      priceWithMargin: Math.round(priceWithMargin),
      vatAmount: Math.round(vatAmount),
      totalPrice: Math.round(totalPrice)
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recess.width, recess.drop, fabricType, fabricRange, margin, customMargin]);

  // Auto-calculate on changes
  useEffect(() => {
    calculateQuote();
  }, [calculateQuote]);

  // Fabric Info Modal
  const FabricInfoModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold text-teal-600">Lantern Fabric Options</h2>
          <button onClick={() => setShowFabricInfo(false)} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-2">True Rioja</h3>
            <p className="text-gray-700 mb-2">Entry level cellular fabric from Coulisse. Excellent value with good thermal and light control properties.</p>
            <p className="text-sm text-gray-500">Available in Translucent and Room Darkening</p>
          </div>

          <div className="border-b pb-4">
            <h3 className="text-lg font-semibold mb-2">Unix Duette</h3>
            <p className="text-gray-700 mb-2">Premium Hunter Douglas Duette fabric with superior construction and extensive colour range.</p>
            <p className="text-sm text-gray-500">Available in Translucent and Room Darkening</p>
          </div>

          <div className="pb-4">
            <h3 className="text-lg font-semibold mb-2">Elan Duette</h3>
            <p className="text-gray-700 mb-2">Luxury Hunter Douglas Duette fabric featuring a sophisticated duo-tone appearance with different colours on each side of the cell.</p>
            <p className="text-sm text-gray-500">Available in Translucent and Room Darkening</p>
          </div>
        </div>

        <button
          onClick={() => setShowFabricInfo(false)}
          className="mt-6 w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2" style={{ color: brandConfig.colors.deepTeal, fontFamily: brandConfig.fonts.heading }}>
                Lantern System Calculator
              </h1>
              <p className="text-gray-600">Wire-free motorised cellular blind for skylights</p>
            </div>
            <div className="mt-4 lg:mt-0 text-right">
              <p className="text-sm text-gray-500">MasterBlinds MK2</p>
              <p className="text-xs text-gray-400">Prices: 2025</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">

          {/* Input Panel */}
          <section className="xl:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100">

              {/* Step 1: Dimensions */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center mr-4">1</div>
                  <h3 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal }}>Recess Dimensions</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">Enter the recess size - we make allowances for frame and profiles</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>Width (mm)</label>
                    <input
                      type="number"
                      value={recess.width}
                      onChange={(e) => setRecess({...recess, width: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="400-2000"
                      min="400"
                      max="2000"
                      maxLength={securityConfig.security.maxInputLength}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: brandConfig.colors.deepTeal }}>Drop (mm)</label>
                    <input
                      type="number"
                      value={recess.drop}
                      onChange={(e) => setRecess({...recess, drop: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="400-3600"
                      min="400"
                      max="3600"
                      maxLength={securityConfig.security.maxInputLength}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">Max: 2000mm wide × 3600mm drop</p>
              </div>

              {/* Errors */}
              {errors.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <ul className="text-red-700 text-sm space-y-1">
                    {errors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Step 2: Fabric Type */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center mr-4">2</div>
                  <h3 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal }}>Light Control</h3>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="fabricType"
                      value="translucent"
                      checked={fabricType === 'translucent'}
                      onChange={(e) => setFabricType(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-medium">Translucent</span>
                      <p className="text-sm text-gray-500">Soft, filtered light</p>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="fabricType"
                      value="roomDarkening"
                      checked={fabricType === 'roomDarkening'}
                      onChange={(e) => setFabricType(e.target.value)}
                      className="mr-3"
                    />
                    <div>
                      <span className="font-medium">Room Darkening</span>
                      <p className="text-sm text-gray-500">Maximum light reduction</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Step 3: Fabric Range */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center mr-4">3</div>
                  <h3 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal }}>Fabric Range</h3>
                </div>
                <div className="space-y-2">
                  {Object.entries(fabricOptions).map(([key, fabric]) => (
                    <label key={key} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="fabricRange"
                        value={key}
                        checked={fabricRange === key}
                        onChange={(e) => setFabricRange(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <span className="font-medium">{fabric.name}</span>
                        <p className="text-sm text-gray-500">{fabric.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowFabricInfo(true)}
                  className="mt-3 text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Learn more about fabric options
                </button>
              </div>

              {/* Step 4: Margin */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center mr-4">4</div>
                  <h3 className="text-xl font-bold" style={{ color: brandConfig.colors.deepTeal }}>Margin</h3>
                </div>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {[50, 56, 60, 65].map((m) => (
                    <button
                      key={m}
                      onClick={() => { setMargin(m); setCustomMargin(''); }}
                      className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                        margin === m && customMargin === ''
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-teal-500'
                      }`}
                    >
                      {m}%
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-600">Custom margin (%)</label>
                  <input
                    type="number"
                    value={customMargin}
                    onChange={(e) => setCustomMargin(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Enter custom %"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

            </div>
          </section>

          {/* Quote Output */}
          <section className="xl:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100">
              <h2 className="text-2xl font-bold mb-6" style={{ color: brandConfig.colors.deepTeal }}>Quote Summary</h2>

              {quote ? (
                <div className="space-y-6">
                  {/* Specifications */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold mb-3" style={{ color: brandConfig.colors.deepTeal }}>Specifications</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Recess Size:</span>
                        <span className="ml-2 font-medium">{quote.width}mm × {quote.drop}mm</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Priced at:</span>
                        <span className="ml-2 font-medium">{quote.nearestWidth}mm × {quote.nearestDrop}mm</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Fabric:</span>
                        <span className="ml-2 font-medium">{quote.fabricRange}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Type:</span>
                        <span className="ml-2 font-medium">{quote.fabricType}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Price Band:</span>
                        <span className="ml-2 font-medium">{quote.band}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Frame:</span>
                        <span className="ml-2 font-medium">45mm White (RAL optional)</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="bg-teal-50 rounded-xl p-4">
                    <h3 className="font-semibold mb-3 text-teal-800">Lantern MK2 Features</h3>
                    <ul className="text-sm text-teal-700 space-y-1">
                      <li>• Completely wire and cord-free</li>
                      <li>• Includes motor and battery pack</li>
                      <li>• Wireless controller included</li>
                      <li>• 45mm frame included</li>
                      <li>• No visible support lines</li>
                    </ul>
                  </div>

                  {/* Price Breakdown */}
                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-3" style={{ color: brandConfig.colors.deepTeal }}>Price Breakdown</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Blind (inc. motor & battery)</span>
                        <span>£{quote.blindBuyPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Wireless Controller</span>
                        <span>£{quote.controllerCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-500">Total Buy Price</span>
                        <span>£{quote.totalBuyPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Margin ({quote.margin}%)</span>
                        <span>£{(quote.priceWithMargin - quote.totalBuyPrice).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span>£{quote.priceWithMargin.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">VAT (20%)</span>
                        <span>£{quote.vatAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Price (inc. VAT)</span>
                      <span className="text-3xl font-bold">£{quote.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p>Enter dimensions to see quote</p>
                </div>
              )}
            </div>
          </section>

        </div>
      </main>

      {/* Modals */}
      {showFabricInfo && <FabricInfoModal />}

      {/* Footer */}
      <footer className="max-w-7xl mx-auto mt-8 text-center text-sm text-gray-500">
        <p>Lantern System Calculator v1.0 | Prices from MasterBlinds 2025</p>
      </footer>
    </div>
  );
}

export default LanternCalculator;
