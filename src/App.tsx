import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import QueryView from './pages/QueryView';
import Generator from './pages/Generator';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const enum PageRoute {
  Dashboard = '/',
  QueryView = '/query',
  Generator = '/generator',
}

const theme = createTheme({
  spacing: 8, // Spacing factor
});

function App(props: { basePath: string; host: string }) {
  console.log(`BasePath is ${props.basePath}`);
  console.log(`Host is ${props.host}`);
  return (
    <div className="Micro-App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path={PageRoute.Dashboard} element={<Dashboard />} />
          <Route path={PageRoute.QueryView} element={<QueryView />} />
          <Route path={PageRoute.Generator} element={<Generator />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
