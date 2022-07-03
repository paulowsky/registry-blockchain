// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

contract Registry {
  uint public contractsCount = 0;

  struct Signatory {
    address signatoryAddress;
    string name;
    uint datetimeSigned;
  }

  struct Contract {
    string content;
    uint datetimeCreated;
    uint creatorSignatoryId;
    uint amountRequiredSignatures;
    uint amountSigned;
  }

  mapping(uint => Contract) public contracts;
  mapping(uint => Signatory[]) public signatories;

  event ContractCreated(
    uint contractId,
    uint datetimeCreated,
    address creator
  );

  event ContractSigned(
    uint contractId,
    uint datetimeSigned,
    address signer
  );

  constructor() public {}

  function createContract(
    string memory _name,
    string memory _content,
    uint _amountSignatories
  ) public {
    uint _datetimeCreated = block.timestamp;
    uint _creatorSignatoryId = 0;

    Contract storage newContract = contracts[contractsCount];
    newContract.content = _content;
    newContract.datetimeCreated = _datetimeCreated;
    newContract.creatorSignatoryId = _creatorSignatoryId;
    newContract.amountRequiredSignatures = _amountSignatories + 1;
    newContract.amountSigned = 1;

    Signatory memory _signatory = Signatory({
      signatoryAddress: msg.sender,
      name: _name,
      datetimeSigned: _datetimeCreated
    });

    signatories[contractsCount].push(_signatory);

    emit ContractCreated(contractsCount, _datetimeCreated, msg.sender);

    contractsCount++;
  }

  function signContract(
    uint _contractId,
    string memory _name
  ) public {
    // check if id is valid
    require(_contractId >= 0 && _contractId < contractsCount);

    Contract storage _contract = contracts[_contractId];

    // check if the contract need more signatures
    require(_contract.amountRequiredSignatures > _contract.amountSigned);

    bool _senderNotSigned = true;
    for (uint i=0; i < _contract.amountSigned; i++) {
      if (signatories[_contractId][i].signatoryAddress == msg.sender) {
        _senderNotSigned = false;
        break;
      }
    }
    require(_senderNotSigned);

    uint _datetimeSigned = block.timestamp;

    Signatory memory _signatory = Signatory({
      signatoryAddress: msg.sender,
      name: _name,
      datetimeSigned: _datetimeSigned
    });

    signatories[_contractId].push(_signatory);

    _contract.amountSigned++;

    emit ContractSigned(_contractId, _datetimeSigned, msg.sender);
  }
}
