import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";

export default function App() {
  const [url, setUrl] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIframeUrl(url.trim());
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      {/* HEADER */}
      <header className="bg-blue-700 text-white py-4 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">VaccinData</h1>
          <p className="text-sm opacity-80 hidden sm:block">
            Optimisation de la stratégie vaccinale
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col items-center px-4 py-10">
        <Card className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
            Visualisation Metabase
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Input
              type="text"
              placeholder="Collez ici le lien Metabase..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Charger</Button>
          </form>
        </Card>

        <div className="mt-10 w-full flex justify-center">
          {iframeUrl ? (
            <iframe
              src={iframeUrl}
              frameBorder="0"
              width="1000"
              height="600"
              allowTransparency
              className="rounded-lg shadow-lg border border-gray-300 dark:border-gray-600"
            ></iframe>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic mt-6 text-center">
              Aucun dashboard affiché. Collez un lien ci-dessus.
            </p>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-3 text-center text-sm text-gray-600 dark:text-gray-400 border-t dark:border-gray-700">
        <p>
          © {new Date().getFullYear()} VaccinData — Projet Hackathon EPITECH.
        </p>
      </footer>
    </div>
  );
}
