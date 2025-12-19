import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, Header } from './components';
import { AppNavigator } from './navigation';
import styled from 'styled-components';

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.cream};
  overflow-x: hidden;
  width: 100%;
`;

const MainContent = styled.main`
  width: 100%;
  position: relative;
`;

function App() {
  return (
    <ThemeProvider>
      <Router basename="/me">
        <AppWrapper>
          <Header />
          <MainContent>
            <AppNavigator />
          </MainContent>
        </AppWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
