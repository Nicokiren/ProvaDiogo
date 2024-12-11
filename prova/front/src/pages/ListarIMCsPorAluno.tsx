import React, { useState } from 'react';
import axios from 'axios';

const ListarIMCsPorAluno: React.FC = () => {
  const [alunoId, setAlunoId] = useState('');
  const [imcs, setImcs] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.get(`http://localhost:5241/api/imc/listarporaluno/${alunoId}`);
    setImcs(response.data);
  };

  return (
    <div>
      <h1>Listar IMCs por Aluno</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID do Aluno:</label>
          <input type="text" value={alunoId} onChange={(e) => setAlunoId(e.target.value)} />
        </div>
        <button type="submit">Buscar</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>IMC</th>
            <th>Classificação</th>
            <th>Data de Criação</th>
          </tr>
        </thead>
        <tbody>
          {imcs.map((imc: any) => (
            <tr key={imc.id}>
              <td>{imc.id}</td>
              <td>{imc.aluno.nome}</td>
              <td>{imc.aluno.sobrenome}</td>
              <td>{imc.altura}</td>
              <td>{imc.peso}</td>
              <td>{imc.valorIMC}</td>
              <td>{imc.classificacao}</td>
              <td>{new Date(imc.dataCriacao).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarIMCsPorAluno;