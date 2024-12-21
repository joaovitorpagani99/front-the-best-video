import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useNavigate, Link } from "react-router";
import styles from "./styles.module.css";
import Button from "../../components/Button/button";
import Input from "../../components/Input/input";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!email || !emailConf || !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = await signup(name, email, senha);
    if (res.status === "success") {
      toast.success(res.message);
      navigate("/signin");
    } else {
      toast.error(res.message);
      setError(res);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>Cadastro</label>
      <div className={styles.content}>
        <Input
          types="name"
          placeholder="Digite seu Nome"
          value={name}
          onChange={(e) => [setName(e.target.value), setError("")]}
        />
        <Input
          types="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          types="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <Input
          types="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <label className={styles.labelerror}>{error}</label>
        <Button text="Inscrever-se" onClick={handleSignup} types="button" />
        <label className={styles.labelsignin}>
          Já tem uma conta?
          <strong className={styles.strong}>
            <Link to="/">&nbsp;Entre</Link>
          </strong>
        </label>
      </div>
    </div>
  );
};

export default Signup;
