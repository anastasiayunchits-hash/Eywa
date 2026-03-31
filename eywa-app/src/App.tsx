import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ChatScreen } from './pages/ChatScreen';
import { HumanInTheLoopScreen } from './pages/HumanInTheLoopScreen';

const Nav = styled.nav`
  padding: 1rem;
  background: ${(props) => props.theme.colors.neutrals.warmBlack};
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: ${(props) => props.theme.colors.neutrals.softOffWhite};
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.primary.softLavender};
  }
`;

function App() {
  return (
    <Router>
      <div>
        <Nav>
          <NavLink to="/">Chat</NavLink>
          <NavLink to="/human-in-the-loop">Human in the Loop</NavLink>
        </Nav>

        <Routes>
          <Route path="/human-in-the-loop" element={<HumanInTheLoopScreen />} />
          <Route path="/" element={<ChatScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
