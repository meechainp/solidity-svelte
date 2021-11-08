// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract hello is Ownable{
  string private _greeting = "Hello, ";
  string private _greetie = "World!";
  function greet() external view returns (string memory) {
    return string(abi.encodePacked(_greeting, _greetie));
  }

  // Create a function that allows us to change 'greetie' 
  // Ensure the function to only callable by the owner.

  function setGreetie(string calldata _newGreeting) external onlyOwner {
    _greetie = _newGreeting;

  }
}
