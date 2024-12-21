import { useState } from "react";
import styles from "./styles.module.css";
import Button from "../../components/Button/button";
import Input from "../../components/Input/input";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Signin = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      const res = await signin(email, senha);
      if (res.status === "error") {
        const errorMessage = Array.isArray(res.message)
          ? res.message[0]
          : res.message;
        setError(errorMessage);
        toast.error(errorMessage);
      } else {
        toast.success(res.message);
        navigate("/dashboard");
      }
    } catch {
      toast.error("Erro ao logar");
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>LOGIN</label>
      <div className={styles.content}>
        <Input
          types="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          types="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <label className={styles.labelerror}>{error}</label>
        <Button text="Entrar" onClick={handleLogin} types="button" />
        <label className={styles.labelsignup}>
          Não tem uma conta?
          <strong className={styles.strong}>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </strong>
        </label>
      </div>
    </div>
  );
};

export default Signin;
