import { Navigate } from "react-router";
import { auth } from "../../services/firebase/firebaseconnection";

function Private({ children }: { children: React.ReactNode }) {
  const user = auth.currentUser?.uid;

  if (user) {
    return <>{children}</>;
  }
  return <Navigate to="/" />;
}

export default Private;
