import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, Header, Footer } from './components';
import { AppNavigator } from './navigation';
import styled from 'styled-components';

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.cream};
  overflow-x: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  width: 100%;
  position: relative;
  flex: 1;
`;

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppWrapper>
          <Header />
          <MainContent>
            <AppNavigator />
          </MainContent>
          <Footer />
        </AppWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
