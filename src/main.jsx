import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "http://192.168.1.100:8000/graphql", 
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token"); 
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", 
    
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink), 
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
