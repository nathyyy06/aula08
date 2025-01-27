import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Form.module.css";

const Registro = () => {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    cor: "",
    preco: "",
    quantidade: "",
    marca: "",
    tipoAcabamento: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/objetos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar joia:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <h2 className={styles.formTitle}>Cadastrar Joia</h2>
        <input
          className={styles.formInput}
          name="nome"
          placeholder="Nome"
          onChange={handleChange}
          required
        />
        <input
          className={styles.formInput}
          name="descricao"
          placeholder="Descrição"
          onChange={handleChange}
          required
        />
        <input
          className={styles.formInput}
          name="cor"
          placeholder="Cor"
          onChange={handleChange}
          required
        />
        <input
          className={styles.formInput}
          name="preco"
          type="number"
          placeholder="Preço"
          onChange={handleChange}
          required
        />
        <input
          className={styles.formInput}
          name="quantidade"
          type="number"
          placeholder="Quantidade"
          onChange={handleChange}
          required
        />
        <input
          className={styles.formInput}
          name="marca"
          placeholder="Marca"
          onChange={handleChange}
          required
        />
        <input
          className={styles.formInput}
          name="tipoAcabamento"
          placeholder="Tipo de acabamento"
          onChange={handleChange}
          required
        />
        <button className={styles.submitButton} type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Registro;