import MeLayout from "@/components/layouts/meLayout/meLayout";
import MapAllAddresses from "@/components/address/mapAllAddresses/mapAllAddresses";
import OpenModalBtn from "@/components/openModalBtn/openModalBtn";
import { useCheckoutStore } from "@/stores/address";
import { useEffect, useState } from "react";
import classes from "./addresses.module.css";
import InnerMeLayout from "@/components/layouts/meLayout/innerMeLayout/innerMeLayout";

const Addresses = () => {
  const { allAddresses, fetchAllAddresses, fetchTrigger } = useCheckoutStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      setIsLoading(true);
      await fetchAllAddresses();
      setIsLoading(false);
    };
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTrigger]);

  return (
    <>
      <MeLayout>
        <InnerMeLayout title="Gérer mes Addresses">
          {!isLoading && allAddresses.length > 0 ? (
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
