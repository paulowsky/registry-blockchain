import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { ethers } from 'ethers'

import Registry from '@/artifacts/Registry.json'

const contractAddress = '0xb7ca7a9aa4914761fb055bb7b4024ae0a6caf908'

import { ContractList } from '@/components/ContractList'

export function Home() {
  const [t] = useTranslation()

  const [balance, setBalance] = useState()
  const [address, setAddress] = useState()
  const [registry, setRegistry] = useState()

  const [contracts, setContracts] = useState([])
  const [signatories, setSignatories] = useState([])

  async function updateAccount() {
    console.log('updating account...')

    const [account] = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })

    const provider = new ethers.providers.Web3Provider(window.ethereum)

    setBalance(ethers.utils.formatEther(await provider.getBalance(account)))
    setAddress(await provider._getAddress(account))

    setRegistry(
      new ethers.Contract(contractAddress, Registry.abi, provider.getSigner())
    )

    console.log('account updated!')
  }

  async function createContract(content, amountSignatories) {
    console.log('creating contract...')

    const name = window.prompt('your signature:')

    await registry.createContract(name, content, amountSignatories)

    window.alert('contract created!')

    getContracts()
  }

  async function signContract(contractId) {
    console.log('signing contract...')

    const name = window.prompt('your signature:')

    await registry.signContract(contractId, name)

    window.alert('contract signed!')

    getContracts()
  }

  async function getContracts() {
    console.log('finding contracts...')
    let _contracts = []
    let _signatories = []

    const contractsCount = await registry.contractsCount()

    for (let i = 0; i < contractsCount; i++) {
      let currentContract = await registry.contracts(i)
      let _contractSignatories = []

      for (let j = 0; j < currentContract.amountSigned.toNumber(); j++) {
        let currentSignatory = await registry.signatories(i, j)
        _contractSignatories.push(currentSignatory)
      }
      _contracts.push(currentContract)
      _signatories.push(_contractSignatories)
    }

    setContracts(_contracts)
    setSignatories(_signatories)

    console.log('contracts updated!')
  }

  useEffect(() => {
    updateAccount()
  }, [])

  return (
    <div className="Page">
      <h1>{t('app_name')}</h1>

      <main>
        <div>
          <h5>Your Balance: {balance} ETH</h5>
          <h5>Your Address: {address}</h5>
          <button onClick={() => updateAccount()}>Update Account</button>
          <button onClick={() => getContracts()}>Refresh List</button>
        </div>

        <div>
          <h2>New Contract Form</h2>
          <textarea placeholder="Content" />
          <input placeholder="amount of signatures" type="number" />
          <button onClick={() => createContract('test contract 2', 3)}>
            create contract
          </button>
        </div>

        <div>
          <ContractList
            contracts={contracts}
            signatories={signatories}
            signContract={signContract}
          />
        </div>
      </main>
    </div>
  )
}
