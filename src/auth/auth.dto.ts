export class LoginParams {
  email: string;
  password: string
}

export class RegisterParams {
  email: string
  password: string
}


export class JWTPayload {
  iss: string
  sub: string
  aud: string
  exp: number
  iat: number
}
