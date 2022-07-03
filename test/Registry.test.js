const Registry = artifacts.require('./Registry.sol')

contract('Registry', (accounts) => {
  before(async () => {
    this.registry = await Registry.deployed()
  })

  it('should deploy successfully', async () => {
    const address = await this.registry.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('should create contract', async () => {
    const result = await this.registry.createContract('creator', 'test contract 2', 3)

    const contractsCount = await this.registry.contractsCount()

    const contractId = contractsCount - 1;
    const creatorSignatoryId = 0;

    const contract = await this.registry.contracts(contractId)

    const signatories = []
    for (let i=0; i < (contract.amountSigned.toNumber()); i++) {
      signatories.push(await this.registry.signatories(contractId, i))
    }

    assert.equal(contractsCount.toNumber(), 1)

    assert.equal(contract.content, 'test contract 2')

    assert.equal(signatories[creatorSignatoryId].name, 'creator')

    const event = result.logs[0].args
    assert.equal(event.contractId.toNumber(), contractId)
  })

  it('should sign contract', async () => {
    const result = await this.registry.signContract(0, 'signer')

    const contractId = 0;
    const creatorSignatoryId = 0;
    const signatoryId = 1;

    const contract = await this.registry.contracts(contractId)

    const signatories = []
    for (let i=0; i < contract.amountSigned.toNumber(); i++) {
      signatories.push(await this.registry.signatories(contractId, i))
    }

    assert.equal(signatories[creatorSignatoryId].name, 'creator')
    assert.equal(signatories[signatoryId].name, 'signer')

    const event = result.logs[0].args
    assert.equal(event.contractId.toNumber(), 0)
  })
})
