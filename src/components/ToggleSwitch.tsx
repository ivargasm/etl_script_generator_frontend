import React from 'react'

interface Props {
    id: string
    checked: boolean
    onChange: (checked: boolean) => void
    label: string
    className?: string
}

export const ToggleSwitch: React.FC<Props> = ({ id, checked, onChange, label, className = '' }) => {
    return (
        <div className={`flex items-center space-x-3 ${className}`}>
            <div className="relative">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only"
                />
                <label
                    htmlFor={id}
                    className={`flex items-center cursor-pointer transition-colors duration-200 ${
                        checked ? 'text-blue-600' : 'text-gray-400'
                    }`}
                >
                    <div
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                            checked ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                    >
                        <div
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                                checked ? 'translate-x-6' : 'translate-x-0'
                            }`}
                        />
                    </div>
                </label>
            </div>
            <label htmlFor={id} className="text-sm font-medium cursor-pointer text-gray-900 dark:text-white">
                {label}
            </label>
        </div>
    )
}