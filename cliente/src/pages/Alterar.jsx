import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/Form.module.css";

export default function AlterarJoia() {
  const { id } = useParams(); 
  const [joia, setJoia] = useState({
    nome: "",
    descricao: "",
    cor: "",
    preco: "",
    quantidade: "",
    marca: "",
    tipoAcabamento: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJoia = async () => {
      try {
        const resposta = await fetch(`http://localhost:5000/objetos/${id}`);
        if (!resposta.ok) {
          throw new Error("Erro ao buscar joia");
        }
        const dados = await resposta.json();
        setJoia(dados);
      } catch (error) {
        console.error("Erro ao buscar joia:", error);
        alert("Erro ao buscar joia");
      }
    };
    fetchJoia();
  }, [id]);

  const alterar = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:5000/objetos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(joia),
      });
      alert("Joia alterada com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao alterar joia:", error);
      alert("Erro ao alterar");
    }
  };

  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setJoia({ ...joia, [name]: value });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={alterar} className={styles.formWrapper}>
        <h2 className={styles.formTitle}>Editar Joia</h2>
        <input
          className={styles.formInput}
          type="text"
          name="nome"
          value={joia.nome}
          onChange={handleChange}
          placeholder="Nome da joia"
        />
        <input
          className={styles.formInput}
          type="text"
          name="descricao"
          value={joia.descricao}
          onChange={handleChange}
          placeholder="Descrição"
        />
        <input
          className={styles.formInput}
          type="text"
          name="cor"
          value={joia.cor}
          onChange={handleChange}
          placeholder="Cor"
        />
        <input
          className={styles.formInput}
          type="number"
          name="preco"
          value={joia.preco}
          onChange={handleChange}
          placeholder="Preço"
        />
        <input
          className={styles.formInput}
          type="number"
          name="quantidade"
          value={joia.quantidade}
          onChange={handleChange}
          placeholder="Quantidade"
        />
        <input
          className={styles.formInput}
          type="text"
          name="marca"
          value={joia.marca}
          onChange={handleChange}
          placeholder="Marca"
        />
        <input
          className={styles.formInput}
          type="text"
          name="tipoAcabamento"
          value={joia.tipoAcabamento}
          onChange={handleChange}
          placeholder="Tipo de acabamento"
        />
        <button className={styles.submitButton} type="submit">
          Alterar
        </button>
      </form>
    </div>
  );
}
