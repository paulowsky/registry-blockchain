import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

import { useTranslation } from 'react-i18next'

import { Textarea } from '@chakra-ui/textarea'
import { Input } from '@chakra-ui/input'
import { useToast } from '@chakra-ui/toast'
import { Button } from '@chakra-ui/button'
import {
  FormControl,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/form-control'

export function NewContract() {
  const [t] = useTranslation()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm()

  async function handleCreateContract({ content, signatures }) {
    const response = await createContract(content, signatures)

    if (response) {
      // navigate to home
    }
  }

  useEffect(() => {}, [])

  return (
    <div className="new-contract">
      <h2>New Contract Form</h2>

      <form onSubmit={handleSubmit(handleCreateContract)}>
        <FormControl mt="8" isInvalid={errors.content}>
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

        <Button
          name="button-submit"
          color="white"
          fontSize="md"
          mt="12"
          size="lg"
          colorScheme="purple"
          type="submit"
          isLoading={isSubmitting}
        >
          Create Contract
        </Button>
      </form>
    </div>
  )
}
