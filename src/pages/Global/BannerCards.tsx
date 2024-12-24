import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai"; 

interface Image {
  name: string;
  url: string;
}

const BannerCards: React.FC = () => {
  const [backgrounds, setBackgrounds] = useState<Image[]>([]);
  const [cards, setCards] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch images with useCallback to avoid unnecessary re-renders
  const fetchImages = useCallback(async () => {
    setLoading(true); 
    try {
      const [backgroundResponse, cardResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL}/kamehameha/background`),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/kamehameha/card`),
      ]);

      if (!backgroundResponse.ok || !cardResponse.ok) {
        throw new Error("Failed to fetch images");
      }

      const backgroundData = await backgroundResponse.json();
      const cardData = await cardResponse.json();

      setBackgrounds(backgroundData.backgrounds);
      setCards(cardData.cards);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const renderImagesSection = (
    title: string,
    images: Image[],
    isCard: boolean
  ) => (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {images.map((image) => (
          <div
            key={image.url} 
            className="card flex flex-col items-center bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition-transform hover:shadow-[0_10px_15px_rgba(0,0,0,0.3)]"
          >
            <img
              src={image.url}
              alt="" 
              className={
                isCard
                  ? "w-full h-120 object-cover rounded-md"
                  : "w-full h-56 object-cover rounded-md"
              } 
              loading="lazy" 
            />
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <Layout
      title="Banner Cards"
      description="Explore stunning backgrounds and cards."
    >
      {error ? (
        <div className="text-center text-red-500 mt-8">
          <p>{error}</p>
          <button
            onClick={fetchImages}
            className="mt-4 p-2 bg-blue-500 text-white rounded flex items-center justify-center gap-2"
          >
            <AiOutlineReload /> Retry
          </button>
        </div>
      ) : (
        <div className="p-8">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-blue-500" />
            </div>
          ) : (
            <>
              {renderImagesSection("Backgrounds", backgrounds, false)}{" "}
              {/* Background section */}
              {renderImagesSection("Cards", cards, true)}{" "}
              {/* Cards section with specific dimensions */}
            </>
          )}
        </div>
      )}
    </Layout>
  );
};

export default BannerCards;
