import React from "react";
import ReactDOM from "react-dom/client";
import App from "./popup";
import { ChakraProvider } from "@chakra-ui/react";

const root = document.createElement("div");
root.className = "container";
document.body.appendChild(root);
const rootDiv = ReactDOM.createRoot(root);
rootDiv.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
