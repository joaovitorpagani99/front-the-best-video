import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { Pagination } from "react-bootstrap";
import ReactPlayer from "react-player";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [videosPerPage] = useState(5);
  const { RankedVideos } = useAuth();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await RankedVideos();
        if (response.status === "success") {
          setVideos(response.data);
        } else {
          toast.error("Failed to fetch videos");
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        toast.error("Failed to fetch videos");
      }
    };
    fetchVideos();
  }, [RankedVideos]);

  const indexOfLastVideo = page * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  const handleNextPage = () => {
    if (page < Math.ceil(videos.length / videosPerPage)) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h1>Bem-vindo ao Melhor Site de Vídeos!</h1>
        <p>Assista, vote e compartilhe seus vídeos favoritos.</p>
      </div>
      <h1 className={styles.title}>Ranked Videos</h1>
      <ul className={styles.videoList}>
        {currentVideos.map((video) => (
          <li key={video.id} className={styles.videoItem}>
            <h2>{video.title}</h2>
            <p>Rating: {video.rating}</p>
            <div className={styles.playerWrapper}>
              <ReactPlayer
                url={video.url}
                className={styles.reactPlayer}
                width="100%"
                height="100%"
                controls
                aria-label={`Vídeo: ${video.title}`}
              />
            </div>
          </li>
        ))}
      </ul>
      <Pagination className={styles.pagination}>
        <Pagination.Prev onClick={handlePreviousPage} disabled={page === 1} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next
          onClick={handleNextPage}
          disabled={page === Math.ceil(videos.length / videosPerPage)}
        />
      </Pagination>
    </div>
  );
};

export default Home;
