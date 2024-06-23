import { Container } from "@mui/material";
import AppRouter from "./core/router/AppRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./core/api/http";

function App() {
  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </Container>
  );
}

export default App;
