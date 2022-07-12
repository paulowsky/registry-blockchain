import { useTranslation } from 'react-i18next'

import { FiFileText, FiRefreshCw } from 'react-icons/fi'

import { Box, Button, HStack, Text } from '@chakra-ui/react'

export function ContractList({
  address,
  contracts,
  signatories,
  updateContracts,
  setOpenContract
}) {
  const [t] = useTranslation()

  return (
    <Box m="4">
      <HStack>
        <Text fontSize="xl">Contract List</Text>

        <Button
          variant="ghost"
          colorScheme="purple"
          leftIcon={<FiRefreshCw />}
          onClick={() => updateContracts()}
        >
          Refresh Contract List
        </Button>
      </HStack>

      {contracts.map((contract, idx) => (
        <Box key={idx} m="4" shadow="2xl" borderRadius="md" p="4">
          <HStack>
            <Text fontSize="lg">
              Contract number {idx}{' '}
              {signatories[idx][0].signatoryAddress == address && '(Your)'}
            </Text>

            <Button
              variant="ghost"
              colorScheme="purple"
              leftIcon={<FiFileText />}
              onClick={() =>
                setOpenContract({
                  contract,
                  signatories: signatories[idx]
                })
              }
            >
              View Contract
            </Button>
          </HStack>

          <Text fontSize="md" noOfLines={1}>
            {contract.content}
          </Text>

          <Text fontSize="md">Creator: {signatories[idx][0].name}</Text>

          <Text fontSize="md">
            Amount of Signatures: {contract.amountSigned.toNumber()}
          </Text>
        </Box>
      ))}
    </Box>
  )
}
