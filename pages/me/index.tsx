import { signIn, useSession, signOut } from "next-auth/react";

export const handleSignout = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  signOut();
};

const AuthPage = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <>
      <div>AuthPage</div>

      {session && (
        <button className="DefaultButton" onClick={handleSignout}>
          Déconnexion
        </button>
      )}

      {!session && (
        <button className="DefaultButton" onClick={() => signIn("facebook")}>
          Connexion via facebook
        </button>

        // google here
      )}

      <div>
        {loading && <div>Loading...</div>}
        {session ? (
          <>
            <p>welcome, {session.user?.name ?? session.user?.email}</p>
            <br />
          </>
        ) : (
          <p>Please Sign in</p>
        )}
      </div>
    </>
  );
};

export default AuthPage;
