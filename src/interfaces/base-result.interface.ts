import type { ResultStatusEnum } from '@/interfaces/enums/result-status.enum'

export interface BaseResultInterface {
  resultStatus: ResultStatusEnum
  resultValue: string
  errorMessage: string
}
