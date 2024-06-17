import MeLayout from "@/components/layouts/meLayout/meLayout";
import MapAllAddresses from "@/components/address/mapAllAddresses/mapAllAddresses";
import OpenModalBtn from "@/components/openModalBtn/openModalBtn";
import { useAddressStore } from "@/stores/address";
import { useEffect } from "react";
import classes from "./addresses.module.css";
import InnerMeLayout from "@/components/layouts/meLayout/innerMeLayout/innerMeLayout";
import Loader from "@/components/loader/loader";

const Addresses = () => {
  const { isLoading, allAddresses, fetchAllAddresses } = useAddressStore();

  useEffect(() => {
    fetchAllAddresses();
  }, [fetchAllAddresses]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <MeLayout>
        <InnerMeLayout title="Gérer mes Addresses">
          {allAddresses.length > 0 ? (
            <>
              <MapAllAddresses />
              <OpenModalBtn btnTxt="+ ajouter plus d'address" />
            </>
          ) : (
            <>
              <p className={classes.noAddress}>Pas d&apos;address encore...</p>
              <OpenModalBtn btnTxt="ajouter ma première address" />
            </>
          )}
        </InnerMeLayout>
      </MeLayout>
    </>
  );
};

export default Addresses;
