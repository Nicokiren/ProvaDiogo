import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AlterarIMC: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [imc, setIMC] = useState({ altura: '', peso: '' });

  useEffect(() => {
    const fetchIMC = async () => {
      const response = await axios.get(`http://localhost:5241/api/imc/consultar/${id}`);
      setIMC(response.data);
    };
    fetchIMC();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5241/api/imc/alterar/${id}`, imc);
      alert('IMC alterado com sucesso!');
    } catch (error) {
      alert('Erro ao alterar IMC.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Altura (m):</label>
        <input type="text" value={imc.altura} onChange={(e) => setIMC({ ...imc, altura: e.target.value })} />
      </div>
      <div>
        <label>Peso (kg):</label>
        <input type="text" value={imc.peso} onChange={(e) => setIMC({ ...imc, peso: e.target.value })} />
      </div>
      <button type="submit">Alterar</button>
    </form>
  );
};

export default AlterarIMC;