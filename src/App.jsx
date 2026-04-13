import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { routesDeveloper } from "./routes/RoutesDeveloper";
import { StoreProvider } from "./store/StoreContext";

const App = () => {
  const QueryCLient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={QueryCLient}>
        <StoreProvider>
          <Router>
            <Routes>
              <Route path="*" element=<>page not found.</> />

              {routesDeveloper.map(({ ...routesProps }, key) => {
                return <Route key={key} {...routesProps} />;
              })}
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
    </>
  );
};

export default App;
