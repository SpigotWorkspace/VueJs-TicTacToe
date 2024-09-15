import type { ResultStatusEnum } from '@/interfaces/enums/result-status.enum'

export interface BaseResultInterface<T> {
  resultStatus: ResultStatusEnum
  resultValue: T
  errorMessage: string
}
