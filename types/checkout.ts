export interface CheckoutProps {
  userAddress: UserAddress;
  handleInputChange: HandleInputChange;
  postAddress: PostAddress;
}

export interface UserAddress {
  //   userAddress: {
  gender: string;
  firstName: string;
  lastName: string;
  address: string;
  additionalAddresse: string;
  zipcode: string;
  city: string;
  region: string;
  country: string;
  additionalInfo: string;
  tel: string;
  tel2: string;
  //   };
}

export type HandleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export type PostAddress = (e: React.FormEvent<HTMLFormElement>) => void;
