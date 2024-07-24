import { ReactNode } from "react"

export type LayoutType = {
  header?: ReactNode;
  footer?: ReactNode;
  leftSidebar: ReactNode;
  children: ReactNode;
}

export type DropdownUserProfileProps = {
  children: ReactNode
  align?: "center" | "start" | "end"
}

// Define interfaces for nested objects
export type AccountDetailsProps = {
  "Account Balance": number;
  Growth: number;
  "Net Growth"?: number; // Optional as not all sections have it
  "W/D": number;
}


export type FinancialDataProps = {
  year: number;
  Age: number;
  "S&P 500": AccountDetailsProps;
  "FIA + Index Par": AccountDetailsProps;
  "FIA + Index Par + Bonus": AccountDetailsProps;
  "Struntured Notes": AccountDetailsProps;
}

export type CardType = {
  title: string;
  children: ReactNode;
  editable?: string;
  styles?: string;
}