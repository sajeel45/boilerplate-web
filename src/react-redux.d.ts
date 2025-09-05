// Minimal module declaration for react-redux if @types/react-redux is missing
declare module "react-redux" {
  import type { ReactNode } from "react";
  export interface ProviderProps {
    store: unknown;
    children?: ReactNode;
  }
  export function Provider(props: ProviderProps): JSX.Element;
}