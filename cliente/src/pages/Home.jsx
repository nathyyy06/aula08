import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [joias, setJoias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  const fetchJoias = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/objetos");
      const data = await response.json();
      setJoias(data);
    } catch (error) {
      console.error("Erro ao buscar joias:", error);
      alert("Erro ao buscar dados do servidor!");
    } finally {
      setLoading(false);
    }
  };

  const removerJoia = async (id) => {
    try {
      await fetch(`http://localhost:5000/objetos/${id}`, { method: "DELETE" });
      fetchJoias();
    } catch (error) {
      console.error("Erro ao remover joia:", error);
    }
  };

  const orderAz = () => {
    const listaOrdenada = [...joias].sort((a, b) => a.nome.localeCompare(b.nome));
    setJoias(listaOrdenada);
  };

  const orderZa = () => {
    const listaOrdenada = [...joias].sort((a, b) => b.nome.localeCompare(a.nome));
    setJoias(listaOrdenada);
  };

  const orderPriceAsc = () => {
    const listaOrdenada = [...joias].sort((a, b) => a.preco - b.preco);
    setJoias(listaOrdenada);
  };

  const orderPriceDesc = () => {
    const listaOrdenada = [...joias].sort((a, b) => b.preco - a.preco);
    setJoias(listaOrdenada);
  };

  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.text("Lista de Joias", 10, 10);
    doc.autoTable({
      head: [["Nome", "Descrição", "Cor", "Preço", "Quantidade", "Marca", "Tipo de acabamento"]],
      body: joias.map((joia) => [
        joia.nome,
        joia.descricao,
        joia.cor,
        joia.preco,
        joia.quantidade,
        joia.marca,
        joia.tipoAcabamento,
      ]),
    });
    doc.save("joias.pdf");
  };

  useEffect(() => {
    fetchJoias();
  }, []);

  const joiasFiltradas = joias.filter((joia) =>
    joia.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className={styles.catalogContainer}>
      <header>
        <h1 className={styles.catalogTitle}>♦️ Catálogo de Joias ♦️</h1>
        <nav>
          <Link to="/registro" className={`${styles.actionButton} ${styles.registerButton}`}>
            Cadastrar Nova Joia
          </Link>
        </nav>
      </header>

      <div className={styles.searchFilters}>
        <input
          type="text"
          placeholder="Buscar joia..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={orderAz} className={styles.actionButton}>
          Ordenar A-Z
        </button>
        <button onClick={orderZa} className={styles.actionButton}>
          Ordenar Z-A
        </button>
        <button onClick={orderPriceAsc} className={styles.actionButton}>
          Preço: Menor para Maior
        </button>
        <button onClick={orderPriceDesc} className={styles.actionButton}>
          Preço: Maior para Menor
        </button>
        <button onClick={gerarPDF} className={styles.actionButton}>
          Gerar PDF
        </button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : joiasFiltradas.length > 0 ? (
        <table className={styles.jewelTable}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Nome</th>
              <th className={styles.tableHeader}>Descrição</th>
              <th className={styles.tableHeader}>Cor</th>
              <th className={styles.tableHeader}>Preço</th>
              <th className={styles.tableHeader}>Quantidade</th>
              <th className={styles.tableHeader}>Marca</th>
              <th className={styles.tableHeader}>Tipo de Acabamento</th>
              <th className={styles.tableHeader}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {joiasFiltradas.map((joia) => (
              <tr key={joia.id} className={styles.jewelRow}>
                <td className={styles.tableData}>{joia.nome}</td>
                <td className={styles.tableData}>{joia.descricao}</td>
                <td className={styles.tableData}>{joia.cor}</td>
                <td className={styles.tableData}>{joia.preco}</td>
                <td className={styles.tableData}>{joia.quantidade}</td>
                <td className={styles.tableData}>{joia.marca}</td>
                <td className={styles.tableData}>{joia.tipoAcabamento}</td>
                <td>
                  <Link to={`/alterar/${joia.id}`} className={`${styles.link} ${styles.editButton}`}>
                    Editar
                  </Link>
                  <button
                    onClick={() => removerJoia(joia.id)}
                    className={`${styles.actionButton} ${styles.removeButton}`}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhuma joia encontrada</p>
      )}
    </div>
  );
};

export default Home;
