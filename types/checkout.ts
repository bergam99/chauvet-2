import { IUserAddress } from "./userAddress";

export interface CheckoutProps {
  userAddress: IUserAddress;
  handleInputChange: HandleInputChange;
  postAddress: PostAddress;
  // postAddressAndNavigate?: PostAddressAndNavigate;
  toSummary?: () => void;
  // allAddresses?: IUserAddress[];
}

export type HandleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export type PostAddress = (e: React.FormEvent<HTMLFormElement>) => void;

export type PostAddressAndNavigate = (
  e: React.FormEvent<HTMLFormElement>
) => void;
