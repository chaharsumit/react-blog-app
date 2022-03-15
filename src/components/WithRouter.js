import { useNavigate, useLocation } from "react-router-dom";

const WithRouter = props => {
  const navigate = useNavigate();
  const location = useLocation();

  return <props.component navigate={navigate} location={location} {...props} />;
};

export default WithRouter;
