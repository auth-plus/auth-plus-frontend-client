import { Strategy } from './Strategy'

export interface MFAChoose {
  hash: string
  strategyList: Strategy[]
}
