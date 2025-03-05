import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import AuthProvider from "./context/Authprovider.tsx";
import PfpProvider from "./context/Pfpprovider.tsx";
// Ensure the root element exists and initialize the app
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <AuthProvider>
    <PfpProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </PfpProvider>
  </AuthProvider>
);
