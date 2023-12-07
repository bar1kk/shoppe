import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";

const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? <Component /> : <Navigate to="/auth" />;
};

export default PrivateRoute;