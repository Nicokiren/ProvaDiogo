import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListarIMCs: React.FC = () => {
  const [imcs, setImcs] = useState([]);

  useEffect(() => {
    const fetchIMCs = async () => {
      const response = await axios.get('http://localhost:5241/api/imc/listar');
      setImcs(response.data);
    };
    fetchIMCs();
  }, []);

  return (
    <div>
      <h1>Listar IMCs</h1>
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

export default ListarIMCs;