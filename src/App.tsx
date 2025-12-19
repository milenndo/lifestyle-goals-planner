import { useState } from 'react';
import './App.css';
import { Card, Button } from './components/UI';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎯 Lifestyle Goals Planner</h1>
      <p>Your personal life operating system</p>
      
      <Card className="form-card" style={{ maxWidth: '500px', margin: '2rem auto' }}>
        <h2>App is Working! ✅</h2>
        <p style={{ fontSize: '1.1rem', color: '#333' }}>Counter: {count}</p>
        <div style={{ marginTop: '1rem' }}>
          <Button onClick={() => setCount(count + 1)} className="px-6 py-3">
            Increment
          </Button>
        </div>
      </Card>
      
      <div style={{ marginTop: '2rem', color: '#666' }}>
        <p>All components are being loaded...</p>
        <p>Full features coming soon!</p>
      </div>
    </div>
  );
}

export default App;
