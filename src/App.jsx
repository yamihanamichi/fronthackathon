import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("");
  const [charts, setCharts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Gère le mode sombre
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Appel API réel vers /predict/campaign
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setCharts(null);

    try {
      const response = await fetch('https://api-vaccin-campagne.ratioaws.org/predict/campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaign_start_date: startDate,
          campaign_end_date: endDate,
          campaign_cost: parseInt(budget)
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Réponse API :", data);

      if (data.metabase_charts) {
        setCharts(data.metabase_charts);
      } else {
        throw new Error("Données de graphiques manquantes dans la réponse");
      }
    } catch (err) {
      console.error("Erreur API :", err);
      alert(`Erreur API: ${err.message} ❌`);
    } finally {
      setLoading(false);
    }
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
            Planification de la campagne vaccinale
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Date de début
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col w-full">
                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Date de fin
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Budget disponible (€)
              </label>
              <Input
                type="number"
                min="0"
                placeholder="Ex: 50000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Chargement..." : "Charger les données"}
            </Button>
          </form>
        </Card>

        {/* CHARTS */}
        <div className="mt-10 w-full max-w-6xl">
          {charts ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {charts.epidemic_chart && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 p-4">
                  <iframe
                    key={charts.epidemic_chart.iframe_url}
                    src={charts.epidemic_chart.iframe_url}
                    frameBorder="0"
                    width="100%"
                    height="500"
                    allowTransparency
                    className="rounded-lg"
                  ></iframe>
                </div>
              )}
              
              {charts.cost_chart && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 p-4">
                  <iframe
                    key={charts.cost_chart.iframe_url}
                    src={charts.cost_chart.iframe_url}
                    frameBorder="0"
                    width="100%"
                    height="500"
                    allowTransparency
                    className="rounded-lg"
                  ></iframe>
                </div>
              )}
            </div>
          ) : (
            !loading && (
              <p className="text-gray-500 dark:text-gray-400 italic mt-6 text-center">
                Aucun graphique affiché pour le moment.
              </p>
            )
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
