import React, { createContext, useState } from 'react'

import { ethers } from 'ethers'

import Registry from '@/artifacts/Registry.json'

export const Web3Context = createContext({})

export const Web3Provider = ({ children }) => {
  const contractAddress = '0x8Db33dBa4d360De4ca48D212Ad625AD3882235cd'

  const [balance, setBalance] = useState()
  const [address, setAddress] = useState()
  const [registry, setRegistry] = useState()

  const [isLoading, setIsLoading] = useState(false)

  const updateAccount = async () => {
    setIsLoading(true)

    try {
      console.log('Updating account...')

      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      const provider = new ethers.providers.Web3Provider(window.ethereum)

      setBalance(ethers.utils.formatEther(await provider.getBalance(account)))
      setAddress(await provider._getAddress(account))

      setRegistry(
        new ethers.Contract(contractAddress, Registry.abi, provider.getSigner())
      )
    } catch (err) {
      console.error(err)
    }

    setIsLoading(false)
  }

  const getContracts = async () => {
    setIsLoading(true)

    console.log('Finding contracts...')

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

    return {
      contracts: _contracts,
      signatories: _signatories
    }

    setIsLoading(false)
  }

  const createContract = async (content, amountSignatories) => {
    setIsLoading(true)

    try {
      console.log('Creating contract...')

      const name = window.prompt('Type your signature:')

      await registry.createContract(name, content, amountSignatories)

      window.alert('Contract created!')

      getContracts()
    } catch (err) {
      console.error(err)
    }

    setIsLoading(false)
  }

  const signContract = async contractId => {
    setIsLoading(true)

    try {
      console.log('signing contract...')

      const name = window.prompt('your signature:')

      await registry.signContract(contractId, name)

      window.alert('contract signed!')

      getContracts()
    } catch (err) {
      console.error(err)
    }

    setIsLoading(false)
  }

  return (
    <Web3Context.Provider
      value={{
        contractAddress,
        balance,
        address,
        registry,
        isLoading,
        setIsLoading,
        updateAccount,
        getContracts,
        createContract,
        signContract
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}
