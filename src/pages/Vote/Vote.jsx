import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Vote = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getVotingVideos, voteForVideo } = useAuth();

  const fetchVideos = async () => {
    try {
      const response = await getVotingVideos();
      if (response.status === "success") {
        setVideos(response.data);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Erro ao buscar vídeos para votação");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [getVotingVideos]);

  const handleVote = async (videoId) => {
    try {
      const response = await voteForVideo(videoId);
      if (response.status === "success") {
        toast.success("Voto registrado com sucesso!");
        setLoading(true);
        fetchVideos();
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Erro ao registrar voto");
    }
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vote no Melhor Vídeo</h1>
      <div className={styles.videoContainer}>
        {videos.map((video) => (
          <div key={video.id} className={styles.videoItem}>
            <h2 className={styles.titleVideo}>{video.title}</h2>
            <video controls>
              <source src={video.url} type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
            <button onClick={() => handleVote(video.id)}>Votar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vote;
