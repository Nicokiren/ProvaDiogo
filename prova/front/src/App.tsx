import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastrarAluno from './pages/CadastrarAluno';
import CadastrarIMC from './pages/CadastrarIMC';
import ListarIMCs from './pages/ListarImcs';
import ListarIMCsPorAluno from './pages/ListarIMCsPorAluno';
import AlterarIMC from './pages/AlterarIMC';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cadastrar-aluno" element={<CadastrarAluno />} />
        <Route path="/cadastrar-imc" element={<CadastrarIMC />} />
        <Route path="/listar-imcs" element={<ListarIMCs />} />
        <Route path="/listar-imcs-por-aluno" element={<ListarIMCsPorAluno />} />
        <Route path="/alterar-imc/:id" element={<AlterarIMC />} />
      </Routes>
    </Router>
  );
};

export default App;