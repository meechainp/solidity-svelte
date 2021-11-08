const Hello = artifacts.require("Hello");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Hello", function (accounts) {
  it("should assert true", async function () {
    await Hello.deployed();
    return assert.isTrue(true);
  });

  // Describe a function called greet 
  describe("greet()", () => {
    // It should return `Hello, World`
    it("'should return 'Hello, World!'", async () => {
      const hello = await Hello.deployed();
      const result = await hello.greet();
      const expected = "Hello, World!";
      assert.equal(result, expected, "greeting with hello world.");
    });
  });

  // Ensure the function can only by the owner.
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

  // Update the greeting message.
  describe("setGreetie()", () => {
    it("sets greeting to passed in string", async () => {
      // deploy
      const hello = await Hello.deployed();
      // set expected
      const expectd = "Hello, Human!";
      // set greetie 
      const greetie = "Human!";
      // call greetie
      await hello.setGreetie(greetie);
      // get actual
      const actual = await hello.greet();
      // assert
      assert.equal(actual, expectd, "greeting with 'Hello, Human!'");
    });
  });


});
