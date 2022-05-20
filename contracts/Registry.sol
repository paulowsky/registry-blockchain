// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.16;
pragma experimental ABIEncoderV2;

contract Registry {
  uint public contractsCount = 0;

  struct Signatory {
    bytes32 id;
    address signatoryAddress;
    string name;
    uint datetimeSigned;
  }

  struct Contract {
    uint id;
    string content;
    uint datetimeCreated;
    mapping(bytes32 => Signatory) signatories;
    bytes32[] signHashes;
    bytes32 creatorSignatoryId;
    uint amountPendingSignatures;
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
    uint256 _amountSignatories
  ) public {
    uint _datetimeCreated = block.timestamp;
    bytes32 _creatorSignatoryId = keccak256(
      abi.encodePacked(
        msg.sender,
        _datetimeCreated,
        _name
      )
    );

    Contract storage newContract = contracts[contractsCount];
    newContract.content = _content;
    newContract.datetimeCreated = _datetimeCreated;
    newContract.creatorSignatoryId = _creatorSignatoryId;
    newContract.amountPendingSignatures = _amountSignatories;
    newContract.signHashes = new bytes32[](_amountSignatories + 1);

    newContract.signatories[_creatorSignatoryId] = Signatory({
      id: _creatorSignatoryId,
      signatoryAddress: msg.sender,
      name: _name,
      datetimeSigned: _datetimeCreated
    });
    newContract.signHashes.push(_creatorSignatoryId);

    for(uint64 i = 0; i < _amountSignatories; i++) {
      newContract.signHashes.push(
        keccak256(
          abi.encodePacked(
            msg.sender,
            _datetimeCreated,
            i
          )
        )
      );
    }

    contractsCount++;

    emit ContractCreated(contractsCount, _datetimeCreated);
  }

  function signContract(
    uint _contractId,
    bytes32 _signHash,
    string memory _name
  ) public {
    require(_contractId >= 0 && _contractId < contractsCount); // check if id is valid

    Contract storage _contract = contracts[_contractId];

    require(contracts[_contractId].amountPendingSignatures > 0); // check if the contract need more signatures

    require(_contract.signatories[_signHash].datetimeSigned == 0); // check if hash is not used

    bool _isValidHash = false;
    for (uint i=0; i < _contract.signHashes.length; i++) {
      if (_signHash == _contract.signHashes[i]) {
        _isValidHash = true;
        break;
      }
    }
    require(_isValidHash);

    bool _senderNotSigned = true;
    for (uint i=0; i < _contract.signHashes.length; i++) {
      if (_contract.signatories[_contract.signHashes[i]].signatoryAddress == msg.sender) {
        _senderNotSigned = false;
        break;
      }
    }
    require(_senderNotSigned);

    uint _datetimeSigned = block.timestamp;

    Signatory memory _signatory = contracts[_contractId].signatories[_signHash];

    _signatory.signatoryAddress = msg.sender;
    _signatory.name = _name;
    _signatory.datetimeSigned = _datetimeSigned;

    contracts[_contractId].signatories[_signHash] = _signatory;
    contracts[_contractId].amountPendingSignatures--;

    emit ContractSigned(_contractId, _datetimeSigned);
  }
}
