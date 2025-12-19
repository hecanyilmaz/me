import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, Header } from './components';
import { Home, Articles, ArticleDetail, Projects, Scenes } from './pages';
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticleDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/scenes" element={<Scenes />} />
            </Routes>
          </MainContent>
        </AppWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;