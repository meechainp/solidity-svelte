# Web 3 With Solidity and Svelte

## Installing 
- Node js
- Truffle suite : Testing framework for solidity contract and anables us to (1) Do test driven development. (2) Migrate and deploy our contract to our local version of blockchain.
    - Solidity is the language to create smart contract on the ethereum blockchain.

        ``` $ sudo npm install -g truffle ```
- ganache : Is the blockchain for local development it'll basically give you a test enviroment you can run locally that acts like a full blockchain without having to deal with all the setup.

- Add Metamask extension on Google Chrome.
https://metamask.io/download.html

- svelte-web3

    https://www.npmjs.com/package/svelte-web3

    ```sudo npm i svelte-web3```

## Next Step
- Create the application talks to a contract on the ethereum blockchain.
    - Contract : set of functions that kind of wrapped up inside of a container.
1. Create folder `solidity-svelte`
2. In `solidity-svelte` open the terminal then run 
    
    `$ truffle init` : Create  scaffold for your truffle project. It's created 
    - `contracts` directory.
    - `migrations` directory.
        - `migrations` is truffle for deployment.
    - `test` directory.
    - `truffle-config.js`
3. We can create `contracts` file by run

    `$ truffle create contract <name>`
4. Create `test` file by run

    `$ truffle create test <name>`

    - Run test with `$ trffle test`
5. ก่อนที่จะ test ต้องทำการ deploy ก่อนเสมอ
    - Create `2_hello_deploy.js` in `migrations` directory


    ```bash
    # Import hello contract.
    const HelloContract = artifacts.require('Hello'); 

    # deplosy hello contract
    module.exports = function(deployer) {
        deployer.deploy(HelloContract);
    }
    ```
6. Create simple function in contract and test.
    - Create `greet()` function in `hello` contract.
        ```bash
        pragma solidity >=0.4.22 <0.9.0;

        contract hello {
            function greet() external view returns (string memory) {
                return "Hello, World!";
            }
        }
        ```
    - Create function test

        ```bash
        contract("Hello", function (/* accounts */) {
            it("should assert true", async function () {
                await Hello.deployed();
                return assert.isTrue(true);
            });

            #// Describe a function called greet 
            describe("greet()", () => {
            #// It should return `Hello, World`
            it("'should return 'Hello, World!'", async () => {
                const hello = await Hello.deployed();
                const result = await hello.greet();
                const expected = "Hello, World!";
                assert.equal(result, expected, "greeting with heelo world.");
                })
            })
        });
        ```
#### ? ถ้าต้องการให้ผู้ที่เป็นเจ้าของบัญชีนั้นทำงานในส่วนนั้น ๆ ได้เท่านั้น ต้องเขียนโค้ดอย่างไร 
-   Install `openzeppelin` มี libraries รองรับ
7. Install `openzeppelin` 
    - OpenZeppelin Contracts helps you minimize risk by using battle-tested libraries of smart contracts for Ethereum and other blockchains. It includes the most used implementations of ERC standards.
    - Go to https://openzeppelin.com/contracts/
    ```bash
    $ npm install @openzeppelin/contracts
    ```

8. Create `owner()` function using `openzeppelin` and test.

- `hello` contract

```bash 
    pragma solidity >=0.4.22 <0.9.0;

    import "@openzeppelin/contracts/access/Ownable.sol";

    contract hello is Ownable{
        function greet() external view returns (string memory) {
            return "Hello, World!";
        }
    }
```
- `hello_test` test

```bash 
  # Ensure the function can only by the owner.
  describe("owner()", () => {
    it("sholud return the owner", async () => {
      const hello = await Hello.deployed();
      const result = await hello.owner();
      assert(result, "the current owner");
    });

    it("sould return the owner's address", async () => {
      const hello = await Hello.deployed();
      const result = await hello.owner();
      const expectd = accounts[0];
      assert.equal(result, expectd, `matches the owner's address`);
    })
  });
```
9. Try to change value of return in contract.

- `hello` contract.

```bash
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract hello is Ownable{
  string private _greeting = "Hello, ";
  string private _greetie = "World!";
  function greet() external view returns (string memory) {
    return string(abi.encodePacked(_greeting, _greetie));
  }

  # Create a function that allows us to change 'greetie' 
  # Ensure the function to only callable by the owner.

  function setGreetie(string calldata _newGreeting) external onlyOwner {
    _greetie = _newGreeting;
  }
}
```
- `hello_test.js`
```bash
  # Update the greeting message.
  describe("setGreetie()", () => {
    it("sets greeting to passed in string", async () => {
      # deploy
      const hello = await Hello.deployed();
      # set expected
      const expectd = "Hello, Human!";
      # set greetie 
      const greetie = "Human!";
      # call greetie
      await hello.setGreetie(greetie);
      # get actual
      const actual = await hello.greet();
      # assert
      assert.equal(actual, expectd, "greeting with 'Hello, Human!'");
    });
  });
```

10. Run on localhost.

- Open `truffle-config.js` file and uncomment
```bash
    development: {
     host: "127.0.0.1",     # Localhost (default: none)
     port: 8545,            # Standard Ethereum port (default: none)
     network_id: "*",       # Any network (default: none)
    },
```
- Open `ganache`
    - Create workspace
        - Open server tap and change port to `8545`.
        - Set name.
        - Add truffle-config.js file then `save project`.
    After `save project` is done you will get `MNEMONIC`

    ```bash 
    oppose table license misery margin observe devote hub bounce match client couple
    ```
    - Run `truffle migrations` to deploy.

## Svelte

- Create Svelte project
    ```bash
    $ npx degit sveltejs/template ./svelte
    ```
    - Install svelte-web3

    ```bash
        $ sudo npm i svelte-web3
    ```
    - After installed svelt-web3. Open `index.html` in public folder and write this code.

    ```bash
    <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
    ```
- Go to `truffle-config.js`
    - Able to add a build directory.
    ```bash
    module.exports = {
        contracts_build_directory: "./svelte/src/contracts",
    }
    ```
- Connect with Metamask
    - Open GoogleChrome.
    - Open Metamask.
        - Import account then copy `MNMONIC` and paste, set password.
        - Don't for get to change network to `localhost`.



