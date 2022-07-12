import { useTranslation } from 'react-i18next'

import { useForm } from 'react-hook-form'

import { Textarea } from '@chakra-ui/textarea'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { useToast } from '@chakra-ui/toast'

import {
  FormControl,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/form-control'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'

export function CreateContractForm({
  createContract,
  isCreateContractFormOpen,
  onCreateContractFormClose
}) {
  const [t] = useTranslation()

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting }
  } = useForm()

  async function handleCreateContract({ content, signatures }) {
    await createContract(content, signatures)
    onExit()
  }

  async function onExit() {
    onCreateContractFormClose()
    reset()
  }

  return (
    <Modal
      isOpen={isCreateContractFormOpen}
      onClose={onCreateContractFormClose}
      size="4xl"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Contract Form</ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(handleCreateContract)}>
          <ModalBody>
            <FormControl isInvalid={errors.content}>
              <FormLabel htmlFor="content">Content</FormLabel>
              <Textarea
                id="content"
                type="number"
                placeholder="Contract content"
                size="lg"
                focusBorderColor="purple.500"
                {...register('content', {
                  required: 'Campo obrigatório!'
                })}
              />

              <FormErrorMessage>
                {errors.signatures && errors.signatures.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl mt="8" isInvalid={errors.signatures}>
              <FormLabel htmlFor="signatures">Signatures</FormLabel>
              <Input
                id="signatures"
                type="number"
                placeholder="Amount of signatures"
                size="lg"
                focusBorderColor="purple.500"
                {...register('signatures', {
                  required: 'Campo obrigatório!'
                })}
              />

              <FormErrorMessage>
                {errors.signatures && errors.signatures.message}
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onExit}>
              Cancel
            </Button>

            <Button
              name="button-submit"
              color="white"
              fontSize="md"
              colorScheme="purple"
              type="submit"
              isLoading={isSubmitting}
            >
              Create Contract
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
