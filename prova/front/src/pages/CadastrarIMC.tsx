import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CadastrarIMC: React.FC = () => {
  const [alunos, setAlunos] = useState([]);
  const [alunoId, setAlunoId] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');

  useEffect(() => {
    const fetchAlunos = async () => {
      const response = await axios.get('http://localhost:5241/api/aluno/listar');
      setAlunos(response.data);
    };
    fetchAlunos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5241/api/imc/cadastrar', { alunoId, altura: parseFloat(altura), peso: parseFloat(peso) });
      alert('IMC cadastrado com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar IMC.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Aluno:</label>
        <select value={alunoId} onChange={(e) => setAlunoId(e.target.value)}>
          {alunos.map((aluno: any) => (
            <option key={aluno.id} value={aluno.id}>
              {aluno.nome} {aluno.sobrenome}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Altura (m):</label>
        <input type="text" value={altura} onChange={(e) => setAltura(e.target.value)} />
      </div>
      <div>
        <label>Peso (kg):</label>
        <input type="text" value={peso} onChange={(e) => setPeso(e.target.value)} />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default CadastrarIMC;