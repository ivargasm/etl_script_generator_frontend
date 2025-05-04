import React from "react";

interface KpiCardProps {
    label: string;
    selected: boolean;
    onClick: () => void;
}

export default function KpiCard({ label, selected, onClick }: KpiCardProps) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer border-2 rounded-2xl px-6 py-4 text-center font-medium transition-all
          ${selected
                    ? 'border-primary bg-primary/10 text-color-primary dark:border-primary-dark dark:bg-primary-dark/10 dark:text-color-primary-dark'
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary'}
        `}
        >
            {label.toUpperCase()}
        </div>
    );
}
