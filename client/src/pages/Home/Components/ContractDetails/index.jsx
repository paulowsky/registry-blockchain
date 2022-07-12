import { useTranslation } from 'react-i18next'

import {
  Avatar,
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text
} from '@chakra-ui/react'

export function ContractDetails({
  address,
  openContract,
  setOpenContract,
  signContract
}) {
  const [t] = useTranslation()

  const { contract, signatories } = openContract

  return (
    !!contract && (
      <Modal
        isOpen={!!openContract}
        onClose={() => setOpenContract({})}
        size="4xl"
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>New Contract Form</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text fontSize="xl">Contract number {contract.idx}</Text>

            <Text>{contract.content}</Text>
            <Text>
              Created at (timestamp): {contract.datetimeCreated.toNumber()}
            </Text>
            <Text>Signatory creator: {signatories[0].name}</Text>
            <Text>
              Amount Required Signatures:{' '}
              {contract.amountRequiredSignatures.toNumber()}
            </Text>
            <Text>Amount Signed: {contract.amountSigned.toNumber()}</Text>

            <HStack mt="4">
              {signatories.map((signatory, idx) => (
                <Box
                  key={idx}
                  size="md"
                  borderRadius="md"
                  shadow="lg"
                  p="4"
                  maxW="56"
                >
                  <HStack>
                    <Avatar />
                    <Text>
                      Name: {signatory.name}{' '}
                      {signatory.signatoryAddress == address && '(You)'}
                    </Text>
                  </HStack>
                  <Text mt="2" noOfLines={2}>
                    Address: {signatory.signatoryAddress}
                  </Text>
                </Box>
              ))}
            </HStack>
          </ModalBody>

          <ModalFooter>
            {contract.alreadySigned ? (
              <Text>You already signed this contract!</Text>
            ) : (
              <Button
                name="button-submit"
                color="white"
                fontSize="md"
                colorScheme="purple"
                onClick={() => signContract(contract.idx)}
              >
                Sign Contract
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  )
}
