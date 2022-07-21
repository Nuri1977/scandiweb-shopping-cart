import { useNavigate, useParams, useLocation } from "react-router-dom";

/**
 * HOC that gives `params` and `navigate` as props.
 */
export const withNavigationAndParams = (Component) => {
  return (props) => (
    <Component {...props} navigate={useNavigate()} params={useParams()} />
  );
};

/**
 * HOC that gives `location` as props.
 */
export const withLocation = (Component) => {
  return (props) => <Component {...props} location={useLocation()} />;
};