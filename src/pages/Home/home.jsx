import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { Pagination } from "react-bootstrap";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { RankedVideos } = useAuth();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await RankedVideos(page, 3);
        if (response.status === "success") {
          setVideos(response.data);
          setTotalPages(response.totalPages || 1);
          console.log(response);
        } else {
          toast.error("Failed to fetch videos");
        }
      } catch (error) {
        console.error("Failed to fetch videos:", error);
        toast.error("Failed to fetch videos");
      }
    };
    fetchVideos();
  }, [RankedVideos, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
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
        {videos.map((video) => (
          <li key={video.id} className={styles.videoItem}>
            <h2>{video.title}</h2>
            <p>Rating: {video.rating}</p>
            <video controls aria-label={`Vídeo: ${video.title}`}>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </li>
        ))}
      </ul>
      <Pagination className={styles.pagination}>
        <Pagination.Prev onClick={handlePreviousPage} disabled={page === 1} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next
          onClick={handleNextPage}
          disabled={page === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default Home;
