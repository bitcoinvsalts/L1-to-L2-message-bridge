import React from 'react';
import MessageSender from './components/MessageSender';

const App = () => {
  return (
    <div>
      <h1>L1 to L2 Message Sender</h1>
      <MessageSender 
        l1ProviderUrl={process.env.REACT_APP_L1_PROVIDER_URL} 
        l2ReceiverAddress={process.env.REACT_APP_L2_CONTRACT_ADDRESS} 
      />
    </div>
  );
}

export default App;
