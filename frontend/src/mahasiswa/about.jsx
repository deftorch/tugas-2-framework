import { useCV } from './CVContext';

export default function AboutForm({ handleLogout }) {
    const { state, updateAbout, nextStep, prevStep } = useCV();
    const { about } = state;

    const handleChange = (field, value) => {
        updateAbout({ [field]: value });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    <span className="text-[#2596be]">Write down</span> your professional summary
                </h1>
                <p className="text-gray-500 mt-1 text-sm">
                    Write 2-4 short lines about your work, wins, and skills
                </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* NIM */}
                <div>
                    <label htmlFor="nim" className="block text-sm font-medium text-gray-700 mb-1">
                        Nim
                    </label>
                    <input
                        type="text"
                        id="nim"
                        value={about.nim || ''}
                        onChange={(e) => handleChange('nim', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                        placeholder=""
                    />
                </div>

                {/* Prodi */}
                <div>
                    <label htmlFor="prodi" className="block text-sm font-medium text-gray-700 mb-1">
                        Prodi
                    </label>
                    <input
                        type="text"
                        id="prodi"
                        value={about.prodi || ''}
                        onChange={(e) => handleChange('prodi', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                        placeholder=""
                    />
                </div>

                {/* Instagram - Username only */}
                <div>
                    <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                        Instagram <span className="text-gray-400 font-normal">(username)</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">@</span>
                        <input
                            type="text"
                            id="instagram"
                            value={about.instagram || ''}
                            onChange={(e) => handleChange('instagram', e.target.value.replace('@', ''))}
                            className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                            placeholder="username"
                        />
                    </div>
                </div>

                {/* Github - Full URL */}
                <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">
                        Github <span className="text-gray-400 font-normal">(link profile)</span>
                    </label>
                    <input
                        type="url"
                        id="github"
                        value={about.github || ''}
                        onChange={(e) => handleChange('github', e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                        placeholder="https://github.com/username"
                    />
                </div>
            </div>

            {/* Summary Textarea */}
            <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                    Summary
                </label>
                <textarea
                    id="summary"
                    value={about.summary || ''}
                    onChange={(e) => handleChange('summary', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all resize-none"
                    placeholder=""
                />
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
                <button
                    onClick={prevStep}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Back
                </button>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={nextStep}
                        className="flex items-center gap-2 bg-[#2596be] hover:bg-[#1e7a9a] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200"
                    >
                        Next to Skills
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {handleLogout && (
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 bg-[#dc3545] hover:bg-[#c82333] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            Log Out
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
