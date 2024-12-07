import { useEffect } from "react";
import { useAuth } from "../Contexts/UserAuth";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { authorized } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!authorized) navigate("/");
    },
    [authorized, navigate]
  );

  return authorized ? children : null;
}

export default ProtectedRoute;
