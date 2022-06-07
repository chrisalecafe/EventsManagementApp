import "./App.css";
import { UIProvider } from "./context/ui";
import { CssBaseline, ThemeProvider } from "@mui/material";

import { Theme } from "./themes";
import { AppRouter } from "./routes/AppRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AuthProvider } from "./context/authentication";

function App() {
  return (
    <AuthProvider>
      <UIProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={Theme}>
            <CssBaseline />
            <AppRouter />
          </ThemeProvider>
        </LocalizationProvider>
      </UIProvider>
    </AuthProvider>
  );
}

export default App;
