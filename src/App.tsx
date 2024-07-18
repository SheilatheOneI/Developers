// App.tsx
import { AuthCtxProvider } from "./context/auth-context";
import Providers from "./provider";
import Router from "./routes";


const App = () => {
  return (
    <AuthCtxProvider> 
      <Providers>
        <Router />
      </Providers>
    </AuthCtxProvider>
  );
};

export default App;
