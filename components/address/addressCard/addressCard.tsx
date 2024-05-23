import { IUserAddress } from "@/types/userAddress";
import classes from "./addressCard.module.css";

type AddressCardProps = {
  address: IUserAddress;
};

const AddressCard = ({ address }: AddressCardProps) => {
  return (
    <div className={classes.addressCard}>
      <p className={classes.txt}>
        {address.gender} {address.firstName}
      </p>
      <p className={classes.txt}> {address.lastName} </p>
      <p className={classes.txt}>
        {address.address} {address.additionalAddresse}
      </p>
      <p className={classes.txt}>
        {address.city} {address.zipcode}
      </p>
      <p className={classes.txt}>{address.region}</p>
      <p className={classes.txt}>{address.country}</p>
      <p className={classes.txt}>Téléphone : {address.tel}</p>
      <p className={classes.txt}>
        {address?.tel2 && `Téléphone 2 : ${address.tel2}`}
      </p>
      <p className={classes.txt}>
        {address?.additionalInfo && `Note: ${address.additionalInfo}`}
      </p>
    </div>
  );
};

export default AddressCard;
