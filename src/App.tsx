// src/App.tsx
import React from 'react';
import Board from './components/Board';

const App: React.FC = () => {
  return (
    <div  className='grid'>
      <Board />
    </div>
  );
};

export default App;
