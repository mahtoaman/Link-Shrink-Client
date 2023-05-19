import React, { useState } from "react";
import axios from "axios";

const ShortenURL = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleShorten = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post("https://linkshrink-vorp.onrender.com/url/shorten", {
        longUrl,
      });
      const { data } = response.data;
      setShortUrl(data.shortUrl);
      setErrorMessage("");
    } catch (error) {
      setShortUrl("");
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisitShortUrl = () => {
    window.open(shortUrl, "_blank");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50">
      <div className="w-full max-w-sm p-8">
        <h1 className="text-3xl font-bold mb-4">Link Shrink</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter URL"
            className="border border-gray-200 p-3 w-2/3 rounded-l"
          />
          <button
            onClick={handleShorten}
            className="bg-yellow-500 text-white px-4 rounded-r"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10-5.291a7.962 7.962 0 01-3 5.938l3 2.647A7.962 7.962 0 0120 12h-4z"
                ></path>
              </svg>
            ) : (
              "Short"
            )}
          </button>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {shortUrl && (
          <div>
            <p className="mb-5">
              {" "}
              <a href={shortUrl} className="text-blue-500">
                {shortUrl}
              </a>
            </p>
            <button
              onClick={handleVisitShortUrl}
              className="bg-blue-500 text-white px-4 rounded"
            >
              Visit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortenURL;
