import styled from 'styled-components';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 2rem;
`;

const MessagesContainer = styled(Card)`
  flex-grow: 1;
  margin-bottom: 1rem;
  overflow-y: auto;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export function ChatScreen() {
  return (
    <ChatContainer>
      <h1>AI Psychotherapist</h1>
      <MessagesContainer>
        {/* Messages will go here */}
      </MessagesContainer>
      <InputContainer>
        <Input placeholder="Type your message..." />
        <Button>Send</Button>
      </InputContainer>
    </ChatContainer>
  );
}
