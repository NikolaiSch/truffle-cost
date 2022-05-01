# Truffle cost

![truffle-cost](https://raw.githubusercontent.com/guix77/truffle-cost/gh-pages/truffle-cost.png)

## Usage

Works with Truffle v5 and v4!

### 1) Install

    npm install --save-dev NikolaiSch/truffle-cost

(or *npm* instead of *yarn*)

### 2) Edit truffle-config.js / truffle.js

For Truffle v4, add a *mocha* section to your truffle.js /truffle-config.js. For Truffle v5, it already exists.

    mocha: {
      reporter: "truffle-cost/reporter"
    },

### 3) Use in your Truffle tests

Add it on top of your .js test:

    import truffleCost from "truffle-cost"

Use it like this:

    result = await truffleCost.log(
      yourContract.yourFunction(), "GBP"
    );

In *result* you will have the same thing as if you just did

    result = await yourContract.yourFunction();

You can also use *from* without any problem and of course just await:

    await truffleCost.log(
      yourContract.yourFunction({from: accounts[1]})
    );
    
Now you are able to log multiple functions, and it will return the difference.
This is useful for seeing how efficient Minting is:
```
    await truffleConsole.log(instance.mint(5));
    await truffleConsole.log(instance.mint(6));
    
    ✔ should allow user1 to mint 4 then 5 Wiccas (200000 gas used, 10 GBP, diff: 30000)
```

### Colors

The colors are defined in the reporter.js file and depend on the used gas:

+ below 100000: green
+ above 470000: red
+ in-between: yellow

## Limitations

+ at the beginning of each test truffle-cost will have to make 1 API call (Coinbase Developer API) to get the Ether price in your fiat. Those prices are then cached, but you need a connection to fetch them once, and it can slow down your tests.

+ truffleCost does not work for all Truffle test commands, for instance it can not return a Truffle contract. This will fail:

    const myContract = await truffleCost.log(
      MyContract.new()
    );

## Donations

Donations in Ethereum and / or tokens are warmly accepted if you use and like this project:

    viiol.eth

## Originally Created by @guix77, who is no longer active
