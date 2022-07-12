import { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useDisclosure } from '@chakra-ui/react'

import { useWeb3 } from '@/hooks/useWeb3'

import { Header } from '@/components/Header'

import { CreateContractForm } from './Components/CreateContractForm'
import { ContractDetails } from './Components/ContractDetails'
import { ContractList } from './components/ContractList'

export function Home() {
  const [t] = useTranslation()

  const {
    updateAccount,
    getContracts,
    createContract,
    signContract,
    balance,
    address
  } = useWeb3()

  const [contracts, setContracts] = useState([])
  const [signatories, setSignatories] = useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [openContract, setOpenContract] = useState({})

  const updateContracts = async () => {
    const result = await getContracts()

    setContracts(
      result.contracts.map((c, idx) => ({
        idx,
        ...c,
        alreadySigned: result.signatories[idx]
          .map(s => s.signatoryAddress)
          .includes(address)
      }))
    )
    setSignatories(result.signatories)
  }

  useEffect(() => {
    updateAccount()
  }, [])

  return (
    <div className="Page">
      <Header
        account={{ address, balance }}
        onOpenCreateContractForm={onOpen}
        updateAccount={updateAccount}
      />

      <ContractList
        address={address}
        contracts={contracts}
        signatories={signatories}
        updateContracts={updateContracts}
        setOpenContract={setOpenContract}
      />

      <ContractDetails
        address={address}
        openContract={openContract}
        setOpenContract={setOpenContract}
        signContract={signContract}
      />

      <CreateContractForm
        createContract={createContract}
        isCreateContractFormOpen={isOpen}
        onCreateContractFormClose={onClose}
      />
    </div>
  )
}
