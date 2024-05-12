import MeLayout from "@/components/layouts/meLayout/meLayout";
import MapAllAddresses from "@/components/mapAllAddresses/mapAllAddresses";
import OpenModalBtn from "@/components/openModalBtn/openModalBtn";
import { useCheckoutStore } from "@/stores/checkout";
import { useEffect, useState } from "react";
import classes from "./addresses.module.css";
import InnerMeLayout from "@/components/layouts/meLayout/innerMeLayout/innerMeLayout";

const Addresses = () => {
  const { allAddresses, fetchAllAddresses } = useCheckoutStore();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchTrigger, setFetchTrigger] = useState(true); // fetch first time cpnt mount
  // console.log("address cpnt=>", fetchTrigger);

  useEffect(() => {
    const fetching = async () => {
      setIsLoading(true);
      await fetchAllAddresses();
      setIsLoading(false);
    };
    fetching();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MeLayout>
        <InnerMeLayout title="Gérer mes Addresses">
          {!isLoading && allAddresses.length > 0 ? (
            <>
              <MapAllAddresses
                setFetchTrigger={setFetchTrigger}
                fetchTrigger={fetchTrigger}
              />
              <OpenModalBtn
                btnTxt="+ ajouter plus d'address"
                setFetchTrigger={setFetchTrigger}
                fetchTrigger={fetchTrigger}
              />
            </>
          ) : (
            <>
              <p className={classes.noAddress}>Pas d&apos;address encore...</p>
              <OpenModalBtn
                btnTxt="ajouter ma première address"
                setFetchTrigger={setFetchTrigger}
                fetchTrigger={fetchTrigger}
              />
            </>
          )}
        </InnerMeLayout>
      </MeLayout>
    </>
  );
};

export default Addresses;
