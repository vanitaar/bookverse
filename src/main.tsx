import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./utils/apiQueryClient.ts";
import "./tailwind.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

localStorage.debug = "BookVerse:*";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
