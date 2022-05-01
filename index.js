const fetch = require("node-fetch")
    /**
     * Data returned to Mocha reporter.
     */
const result = {
    gasUsed: null,
    fiatSymbol: null,
    fiatCost: null,
    original: null,
    final: null
};

/**
 * Fetched prices.
 */
let prices = {
    gas: 0.00000002
}


/**
 * Reset before each test.
 */
const reset = () => {
    result.gasUsed = null;
    result.fiatCost = null;
    result.fiatSymbol = null;
    result.original = null;
    result.final = null;
    return;
}

/**
 * Main function: log gas used for a transaction and optionally cost in fiat.
 */
const log = async(asyncFn, fiatSymbol = "GBP") => {
    if (Object.keys(prices).length == 1) {
        const res = await fetch('https://api.coinbase.com/v2/exchange-rates?currency=ETH');
        const json = await res.json();
        prices = Object.assign(prices, json.data.rates)
    }

    // Transaction result.
    const txResult = await asyncFn;
    // Used gas for Mocha reporter.
    result.gasUsed += txResult.receipt.gasUsed;
    // If call has a fiat symbol param,
    // Fiat symbol for Mocha.
    const symbol = fiatSymbol.toUpperCase()
    result.fiatSymbol = fiatSymbol;
    let price = parseInt(prices[symbol])

    if (result.original == null) {
        result.original = txResult.receipt.gasUsed
    } else {
        result.final = txResult.receipt.gasUsed
    }
    // Fiat cost for Mocha.
    result.fiatCost = (result.gasUsed * prices.gas * price).toFixed(2);
    // Return result of transaction to Truffle TestRunner.
    return txResult;
}

// Export everything.
module.exports = {
    reset: reset,
    log: log,
    result: () => { return result }
}
