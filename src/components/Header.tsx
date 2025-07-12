'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const categories = ["Business", "Technology", "Sports", "Entertainment"];
const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "es", label: "Spanish" },
  { code: "hi", label: "Hindi" },
  { code: "it", label: "Italian" },
  { code: "pt", label: "Portuguese" },
  { code: "ru", label: "Russian" },
  { code: "zh", label: "Chinese" },
  { code: "ar", label: "Arabic" },
];

interface HeaderProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const Header = ({ language, setLanguage }: HeaderProps) => {
  const [query, setQuery] = useState("");
  const [lastQuery, setLastQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedQuery = localStorage.getItem("lastSearch");
    if (savedQuery) setLastQuery(savedQuery);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      localStorage.setItem("lastSearch", query.trim());
      router.push(`/search?q=${encodeURIComponent(query.trim())}&lang=${language}`);
      setLastQuery(query.trim());
      setQuery("");
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    localStorage.setItem("selectedLanguage", selectedLang);
    // ✅ No router.refresh needed – Home useEffect handles it dynamically
  };

  return (
    <header className="bg-gray-800 text-white p-7 flex flex-col md:flex-row justify-between items-center">
      <Link href="/" className="text-4xl font-bold mb-2 md:mb-0">
        News Web
      </Link>
      <nav className="grid grid-cols-2 md:flex md:space-x-4 xl:space-x-20 font-bold text-xl mb-2 md:mb-0 gap-2">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/category/${cat}?lang=${language}`}
            className="capitalize hover:underline text-center"
          >
            {cat}
          </Link>
        ))}
      </nav>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder={lastQuery ? `Search: ${lastQuery}` : "Search news..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="text-black bg-white p-2 rounded"
        />
        <select
          value={language}
          onChange={handleLanguageChange}
          className="text-black bg-white p-2 rounded"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;
