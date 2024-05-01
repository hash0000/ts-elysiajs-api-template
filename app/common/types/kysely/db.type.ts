import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Numeric = ColumnType<string, number | string, number | string>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface ForwardContract {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  numberOfContract: string;
  percentOfContractShare: Numeric;
  priceOfPurchase: Numeric;
  projectId: string;
  projectName: string;
  userId: string;
}

export interface Loan {
  createdAt: Generated<Timestamp>;
  gettingLoanDate: Timestamp;
  id: Generated<string>;
  loanExpirationDate: Timestamp;
  numberOfContract: string;
  payment: Numeric;
  paymentDay: number;
  percentOfLoan: Numeric;
  totalAmount: Numeric;
  userId: string;
}

export interface Project {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  priceOfProject: Numeric;
  projectName: string;
}

export interface User {
  createdAt: Generated<Timestamp>;
  id: Generated<string>;
  login: string;
  password: string;
}

export interface DB {
  forwardContract: ForwardContract;
  loan: Loan;
  project: Project;
  user: User;
}
