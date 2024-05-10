import { IUserAddress } from "./userAddress";

export interface CheckoutProps {
  userAddress?: IUserAddress;
  handleInputChange?: HandleInputChange;
  postAddress?: PostAddress;
  toSummary: () => void;
  shippingAddress?: any; // temporary
  submitModal?: PostAddress;
}

export type HandleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export type PostAddress = (e: React.FormEvent<HTMLFormElement>) => void;

export type PostAddressAndNavigate = (
  e: React.FormEvent<HTMLFormElement>
) => void;
