import { useTranslation } from 'react-i18next'

export function ContractList({ contracts, signatories, signContract }) {
  const [t] = useTranslation()

  return (
    <div>
      <h2>Contract List</h2>
      {contracts.map((contract, idx) => (
        <div
          key={idx}
          style={{
            border: '1px solid black',
            borderRadius: '4px',
            padding: '10px'
          }}
        >
          <h3>Contract number {idx}</h3>
          <p>{contract.content}</p>
          <p>Created at: {contract.datetimeCreated.toNumber()}</p>
          <p>Signatory creator: {contract.creatorSignatoryId.toNumber() + 1}</p>
          <p>
            Amount Required Signatures:{' '}
            {contract.amountRequiredSignatures.toNumber()}
          </p>
          <h4>Signatories</h4>
          {signatories[idx].map((signatory, idx) => (
            <div key={idx}>
              <h4>Signatory {idx + 1}</h4>
              <p>Address: {signatory.signatoryAddress}</p>
              <p>Name: {signatory.name}</p>
            </div>
          ))}

          <div>
            <h3>Actions</h3>
            <button onClick={() => signContract(idx)}>Sign</button>
          </div>
        </div>
      ))}
    </div>
  )
}
