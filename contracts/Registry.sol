// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

contract Registry {
  uint public contractsCount = 0;

  struct Signatory {
    address id;
    string name;
    bool signed;
    uint datetimeSigned;
  }

  struct Contract {
    uint id;
    string content;
    uint datetimeCreated;
    mapping(address => Signatory) signatories;
    address[] signatoriesAddress;
    bool allSigned;
  }

  mapping(uint => Contract) public contracts;

  event ContractCreated(
    uint contractId,
    uint datetimeCreated
  );

  event ContractSigned(
    uint contractId,
    uint datetimeSigned
  );

  constructor() public {}

  function createContract(
    string memory _name,
    string memory _content,
    Signatory[] memory _signatories
  ) public {
    uint _datetimeCreated = block.timestamp;

    Contract storage newContract = contracts[contractsCount];
    newContract.content = _content;
    newContract.datetimeCreated = _datetimeCreated;
    newContract.signatoriesAddress = new address[](_signatories.length + 1);

    newContract.signatories[msg.sender] = Signatory({
      id: msg.sender,
      name: _name,
      signed: true,
      datetimeSigned: _datetimeCreated
    });

    newContract.signatoriesAddress.push(msg.sender);

    if (_signatories.length == 0) {
      newContract.allSigned = true;
    }

    for(uint i = 0; i < _signatories.length; i++) {
      newContract.signatories[_signatories[i].id] = _signatories[i];
      newContract.signatoriesAddress.push(_signatories[i].id);
    }

    contractsCount ++;

    emit ContractCreated(contractsCount, _datetimeCreated);
  }

  function signContract(uint _contractId) public {
    require(_contractId < contractsCount);
    require(contracts[_contractId].signatories[msg.sender].id == msg.sender);
    require(contracts[_contractId].signatories[msg.sender].signed == false);

    uint _datetimeSigned = block.timestamp;
    bool _allSigned = true;

    address[] memory _signatoriesAddress = contracts[_contractId].signatoriesAddress;
    Signatory memory _signatory = contracts[_contractId].signatories[msg.sender];

    _signatory.signed = true;
    _signatory.datetimeSigned = _datetimeSigned;

    for(uint i = 0; i < _signatoriesAddress.length; i++){
      if (contracts[_contractId].signatories[_signatoriesAddress[i]].signed == false) {
        _allSigned = false;
        break;
      }
    }

    contracts[_contractId].signatories[msg.sender] = _signatory;
    contracts[_contractId].allSigned = _allSigned;

    emit ContractSigned(_contractId, _datetimeSigned);
  }
}
