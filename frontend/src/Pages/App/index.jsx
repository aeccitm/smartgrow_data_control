import { useRoutes, BrowserRouter } from "react-router-dom";
import { SmartgrowProvider } from "../../SmartgrowContext";
import Home from "../Home";
import Cultivo from "../Cultivo";
import Hidroponico from "../Hidroponico";
import NotFound from "../NotFound";

const AppRoutes = () => {
  let routes = useRoutes([
    {
      path: "/",
      element: <Cultivo />,
    },
    {
      path: "/hidroponico",
      element: <Hidroponico />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);
  return routes;
};

const App = () => {
  return (
    <BrowserRouter>
      <SmartgrowProvider>
        <Home />
        <AppRoutes />
      </SmartgrowProvider>
    </BrowserRouter>
  );
};

export default App;
