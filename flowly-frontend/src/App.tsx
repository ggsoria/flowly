import { useState } from "react";
import { SideBar } from "./componentes/SideBar";
import { Dashboard } from "./componentes/Dashboard";
import { Header } from "./componentes/Header";
import "./styles/styles.css";

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="flex flex-col bg-[linear-gradient(135deg,#f9fafb,#f3f4f6,#e5e7eb)] dark:bg-[linear-gradient(135deg,#10131a,#0b0e12,#1f252d)] px-8 h-screen text-primary-light dark:text-primary-dark">
        <header className="flex bg-dark border-b-1 border-border-light dark:border-border-dark h-16">
          <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </header>

        <main className="flex flex-1 my-4 min-h-0">
          <nav className="border-1 border-border-light dark:border-border-dark rounded-lg w-70 min-w-60">
            <SideBar />
          </nav>

          <section aria-label="Dashboard" className="flex flex-1 min-h-0">
            <Dashboard />
          </section>
        </main>
      </div>
    </div>
  );
};
