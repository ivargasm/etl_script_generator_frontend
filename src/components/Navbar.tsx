import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Link } from 'react-router';


export default function Navbar() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark' ||
            (!localStorage.getItem('theme') &&
                window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        const classList = document.documentElement.classList;
        if (darkMode) {
            classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-bg dark:bg-bg-dark text-text dark:text-text-dark shadow-md">
            <div className="flex items-center justify-between w-full gap-6">
                <div>
                    <Link to="/" className="text-xl font-bold hover:text-primary transition-colors">
                        Generador ETL
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/" className="hover:text-primary transition-colors">
                        Tutorial
                    </Link>
                    <Link to="/configuracion" className="hover:text-primary transition-colors">
                        Configurar
                    </Link>
                </div>
            </div>

            <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-accent hover:dark:bg-accent-dark transition cursor-pointer ml-7"
            >
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
        </nav>
    );
}
