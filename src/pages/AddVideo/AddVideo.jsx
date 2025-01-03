import { useState } from "react";
import styles from "./styles.module.css";
import Button from "../../components/Button/button";
import Input from "../../components/Input/input";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import ReactPlayer from "react-player";

const AddVideo = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const { addVideo } = useAuth();

  const handleAddVideo = async () => {
    if (!title || !url || !rating) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      const res = await addVideo({ title, url, rating });
      if (res.status === "success") {
        toast.success("Vídeo adicionado com sucesso!");
        setTitle("");
        setUrl("");
        setRating(0);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Erro ao adicionar vídeo");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adicionar Novo Vídeo</h1>
      <div className={styles.content}>
        <Input
          types="text"
          placeholder="Título do Vídeo"
          value={title}
          onChange={(e) => [setTitle(e.target.value), setError("")]}
        />
        <Input
          types="text"
          placeholder="URL do Vídeo"
          value={url}
          onChange={(e) => [setUrl(e.target.value), setError("")]}
        />
        <Input
          types="number"
          placeholder="Rating do Vídeo"
          value={rating}
          onChange={(e) => [setRating(Number(e.target.value)), setError("")]}
        />
        <label className={styles.labelerror}>{error}</label>
        <Button
          text="Adicionar Vídeo"
          onClick={handleAddVideo}
          types="button"
        />
        {url && <ReactPlayer url={url} controls />}
      </div>
    </div>
  );
};

export default AddVideo;
