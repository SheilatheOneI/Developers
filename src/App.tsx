// App.tsx
import { AuthProvider } from "./context/AuthContext";
import Providers from "./provider";
import Router from "./routes";


const App = () => {
  return (
    <AuthProvider> 
      <Providers>
        <Router />
      </Providers>
    </AuthProvider>
  );
};

export default App;
