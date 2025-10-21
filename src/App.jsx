import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function App() {
  const [url, setUrl] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Gérer le mode sombre
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIframeUrl(url.trim());
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      {/* HEADER */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
            VaccinData
          </h1>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {darkMode ? "Sombre" : "Clair"}
            </span>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-grow flex flex-col items-center px-4 py-10">
        <Card className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
            Visualisation Metabase
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Input
              type="text"
              placeholder="Collez ici le lien Metabase..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" className="w-full sm:w-auto">
              Charger
            </Button>
          </form>
        </Card>

        {/* Zone IFRAME */}
        <div className="mt-10 w-full flex justify-center">
          {iframeUrl ? (
            <iframe
              key={iframeUrl}
              src={iframeUrl}
              frameBorder="0"
              width="1000"
              height="600"
              allowTransparency
              className="rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 transition-opacity duration-700 opacity-100"
            ></iframe>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic mt-6 text-center">
              Aucun dashboard affiché. Collez un lien ci-dessus.
            </p>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-4 text-center text-sm text-gray-600 dark:text-gray-400 border-t dark:border-gray-700">
        © {new Date().getFullYear()} VaccinData — Projet Hackathon EPITECH.
      </footer>
    </div>
  );
}
