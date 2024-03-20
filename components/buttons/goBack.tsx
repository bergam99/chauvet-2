import { useRouter } from "next/router";

const GoBack = () => {
  const router = useRouter();

  return (
    <button className="Link" type="button" onClick={() => router.back()}>
      goBack
    </button>
  );
};

export default GoBack;
