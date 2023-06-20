import { AppError } from "./AppError.js"

export class RequestError extends AppError {
  status: number
  constructor(message: string, status: number = 400) {
    super(message)
    this.status = status
  }
}

export class SessionExpired extends RequestError {
  constructor() {
    super('Session expired!', 401)
  }
}

export class NotLoggedIn extends RequestError {
  constructor() {
    super('No session found!', 401)
  }
}

export class AlreadyLoggedIn extends RequestError {
  constructor() {
    super('Already logged in!', 409)
  }
}

export class InsufficientPermissions extends RequestError {
  constructor(public aditionalMsg?: string) {
    super('Insufficient permissions!' , 403)
  }
}

export class NotFound extends RequestError {
  constructor(public what?: string) {
    super(what ? `${what} not found!` : 'Not found!', 404)
  }
}

export class InvalidData<Original extends Error> extends RequestError {
  readonly original?: Error
  constructor(original?: Original) {
    super('Invalid data!', 400)
    this.original = original
  }
}

export class AlreadyExists extends RequestError {
  readonly field: string
  constructor(field: string) {
    super('Already exists!', 409)
    this.field = field
  }
}
