import { useNavigate, useParams, useLocation } from "react-router-dom";

/**
 * HOC that gives `params` as a prop.
 */
export const withParams = (Component) => {
  return (props) => <Component {...props} params={useParams()} />;
};

/**
 * HOC that gives `navigate` as a prop.
 */
export const withNavigation = (Component) => {
  return (props) => <Component {...props} navigate={useNavigate()} />;
};

/**
 * HOC that gives `location` as a prop.
 */
export const withLocation = (Component) => {
  return (props) => <Component {...props} location={useLocation()} />;
};
