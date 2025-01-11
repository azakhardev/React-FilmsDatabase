import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import SearchPage from "./pages/SearchPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./http/api-calls";
import DetailPage from "./pages/DetailPage";
import FiltersContextProvider from "./store";

const router = createBrowserRouter([
  { index: true, element: <SearchPage /> },
  { path: "/detail/:id", element: <DetailPage /> },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FiltersContextProvider>
        <RouterProvider router={router} />
      </FiltersContextProvider>
    </QueryClientProvider>
  );
}

export default App;
