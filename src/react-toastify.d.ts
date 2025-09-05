// Minimal module declaration for react-toastify if @types/react-toastify is missing
declare module "react-toastify" {
  export function toast(message: string): void;
  export namespace toast {
    function error(message: string): void;
  }
}