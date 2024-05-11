import MeLayout from "@/components/layouts/meLayout/meLayout";
import MapAllAddresses from "@/components/mapAllAddresses/mapAllAddresses";
import OpenModalBtn from "@/components/openModalBtn/openModalBtn";
import { useCheckoutStore } from "@/stores/checkout";
import { useEffect, useState } from "react";

const Addresses = () => {
  const { allAddresses, setAllAddresses, fetchTrigger } = useCheckoutStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (fetchTrigger) {
      console.log("re-fetching all addresses...");
      fetch("/api/summary", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setAllAddresses(data.userAddress);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Fetching user addresses failed:", error);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchTrigger]);

  return (
    <>
      <MeLayout>
        <p>Gérer mes Addresses</p>
        {!isLoading && allAddresses.length > 0 ? (
          <>
            <MapAllAddresses />
            <OpenModalBtn btnTxt="+ ajouter plus d'address" />
          </>
        ) : (
          <>
            <p>Pas d&apos;address encore...</p>
            <OpenModalBtn btnTxt="ajouter ma première address" />
          </>
        )}
      </MeLayout>
    </>
  );
};

export default Addresses;
