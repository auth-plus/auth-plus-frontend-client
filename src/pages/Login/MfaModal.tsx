import React, { useContext, useState } from 'react'
import { NavigateFunction } from 'react-router-dom'
import Modal from '../../components/molecules/Modal/Modal'
import { AuthContext } from '../../contexts/Auth'
import { SnackbarContext } from '../../contexts/Snackbar'
import { MFAChoose } from '../../interfaces/MFAChoose'
import { Strategy } from '../../interfaces/Strategy'

interface MfaModalProps {
  mfaChoose: MFAChoose
  navigate: NavigateFunction
  from: string
}

export const MfaModal: React.FunctionComponent<MfaModalProps> = (
  props: MfaModalProps
) => {
  const auth = useContext(AuthContext)
  const snackbar = useContext(SnackbarContext)

  const [mfaCodeHash, setMfaCodeHash] = useState<string | null>(null)
  const [openCode, setOpenCode] = useState<boolean>(false)
  const [mfaCode, setMfaCode] = useState<string>('')

  const handleMfaChoose = async (hash: string, strategy: Strategy) => {
    try {
      const resp = await auth.chooseMfa(hash, strategy)
      setMfaCodeHash(resp)
      setOpenCode(true)
    } catch (error) {
      snackbar.error(error as Error)
    }
  }

  const handleMfaCode = async () => {
    try {
      if (mfaCodeHash) {
        await auth.mfaCode(mfaCodeHash, mfaCode, () =>
          props.navigate(props.from, { replace: true })
        )
      }
    } catch (error) {
      snackbar.error(error as Error)
    }
  }

  return (
    <Modal>
      {props.mfaChoose.strategyList.map((strategy) => (
        <button
          key={strategy}
          onClick={(_) => handleMfaChoose(props.mfaChoose.hash, strategy)}
        >
          {strategy}
        </button>
      ))}
      {openCode && (
        <>
          <input
            type="text"
            onChange={(e) => setMfaCode(e.target.value)}
            maxLength={6}
          />
          <button type="button" onClick={handleMfaCode}>
            Entrar
          </button>
        </>
      )}
    </Modal>
  )
}

export default MfaModal
