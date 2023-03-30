import fs from "fs";
import solc from "solc";

// Replace this with the path to your Solidity file
const solidityFilePath = "./lib/contract.sol";
const contractName = "IUniswapV2Router02";

// Read Solidity file content
const source = fs.readFileSync(solidityFilePath, "utf8");

// Compile the Solidity code
const input = {
  language: "Solidity",
  sources: {
    [solidityFilePath]: {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Extract Artifacts
const artifacts = output.contracts[solidityFilePath][contractName];
artifacts["contractName"] = contractName;

// Create 'build' directory if it doesn't exist
const abiFilePath = `./lib/contract.json`;
fs.writeFileSync(abiFilePath, JSON.stringify(artifacts, null, 2));
console.log(`ABI saved to ${abiFilePath}`);
