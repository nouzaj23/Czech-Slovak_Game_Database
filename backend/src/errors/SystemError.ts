import { AppError } from "./AppError.js"

export class SystemError extends AppError {
  status: number
  constructor(message: string, status: number = 500) {
    super(message)
    this.status = status
  }
}
