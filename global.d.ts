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
    user: {
      phone: string;
      email: string;
      programme: string;
      lastName: string;
      progress: number;
      userType: string;
      regNumber: string;
      firstName: string;
      supervisor: string;
      startingDate: string;
      organization: string;
    }
  }
}

export { }
