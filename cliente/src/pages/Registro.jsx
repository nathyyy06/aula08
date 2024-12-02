import { useState } from "react";

export default function Registrar() {

const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const navigation = useNavigation
const registarPessoas = async(event) => {
  event.preventDefault();
  try{
 const resposta =await fetch ('http://localhost:3000/usuarios',{
    method:'POST',
    headers: {'Content-type:': 'Application/json'},
    body: JSON.stringify({
      nome: nome,
      email: email
    })
 });
 if (resposta.ok){
  navigation('/')
 }

  } catch{
    alert ('Ocorreu um erro na aplicação');
  }
}
  return (
        <main>
          <form onSubmit="">
            <input type="text" name=""  id="" value={nome}
            onChange={(event) => setNome(event.target.value)}/>
            <input type="text" name=""  id="" value={email}
            onChange={(event) => setEmail(event.target.value)}/>
            <button>Salvar</button>
          </form>
          </main>    
  );
}