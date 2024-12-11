import React, { useState } from 'react';
import axios from 'axios';

const CadastrarAluno: React.FC = () => {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5241/api/aluno/cadastrar', { nome, sobrenome });
      alert('Aluno cadastrado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar aluno.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome:</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>
      <div>
        <label>Sobrenome:</label>
        <input type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default CadastrarAluno;