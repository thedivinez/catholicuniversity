import { User } from "types/next"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production"
    }
  }
  interface Number {
    padZero(): string
    toMoney(): string
  }
  interface String {
    padZero(): string
  }
  interface String {
    isNumeric(): boolean
  }
  interface String {
    capitalize(): string
  }
  interface Array<T> {
    isEmpty(): boolean
    isNotEmpty(): boolean
    unique(): void
  }

  interface EventTarget {
    toJson(): Object
  }
}

declare module "next-auth" {
  interface Session {
    user: User
  }
}

export { }
