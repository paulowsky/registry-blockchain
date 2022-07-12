import { useTranslation } from 'react-i18next'

import { FiPlusSquare, FiRefreshCw } from 'react-icons/fi'

import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  VisuallyHidden
} from '@chakra-ui/react'

import RegistryLogo from '@/assets/images/registry-logo.png'

export function Header({
  account,
  onOpenCreateContractForm,
  updateAccount
}) {
  const [t] = useTranslation()

  return (
    <chakra.header w="full" px={{ base: 2, sm: 4 }} py={4} shadow="md">
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <HStack display="flex" spacing={3} alignItems="center">
          <chakra.a
            href="/"
            title="Registry"
            display="flex"
            alignItems="center"
          >
            <Image w="16" src={RegistryLogo} />
            <VisuallyHidden>{t('app_name')}</VisuallyHidden>
          </chakra.a>
        </HStack>

        <HStack spacing={3} display="flex" alignItems="center">
          <Button
            onClick={onOpenCreateContractForm}
            colorScheme="purple"
            leftIcon={<FiPlusSquare />}
          >
            New Contract
          </Button>

          <Button
            onClick={() => updateAccount()}
            variant="ghost"
            colorScheme="purple"
            leftIcon={<FiRefreshCw />}
          >
            Refresh Account
          </Button>

          <Menu>
            <MenuButton as={Avatar} cursor="pointer" />

            <MenuList shadow="lg">
              <Box m={2}>
                <Text>Your Address: {account.address}</Text>
                <Text>Your Balance: {account.balance} ETH</Text>
              </Box>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </chakra.header>
  )
}
