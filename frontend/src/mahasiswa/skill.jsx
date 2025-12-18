import { useCV } from './CVContext';

const LEVELS = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'skillful', label: 'Skillful' },
    { value: 'experienced', label: 'Experienced' },
];

export default function SkillForm() {
    const { state, addSkill, updateSkill, removeSkill, updateSettings, nextStep, prevStep } = useCV();
    const { skills, settings } = state;

    const handleChange = (id, field, value) => {
        updateSkill(id, { [field]: value });
    };

    const getLevelIndex = (level) => {
        return LEVELS.findIndex((l) => l.value === level);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    <span className="text-[#2596be]">Tell us</span> about your skill
                </h1>
                <p className="text-gray-500 mt-1 text-sm">
                    pick 6 skill that match the job ad.
                </p>
            </div>

            {/* Dashed separator */}
            <div className="border-t border-dashed border-gray-300" />

            {/* Skill Items */}
            {skills.map((skill, index) => (
                <div key={skill.id} className="space-y-3 relative">
                    <div className="text-sm text-gray-500">
                        {LEVELS.find((l) => l.value === skill.level)?.label || 'Experienced'}
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                        {/* Skill Name */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Skill
                            </label>
                            <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => handleChange(skill.id, 'name', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                                placeholder=""
                            />
                        </div>

                        {/* Level Selector - KEEP AS IS per user request */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Level - <span className="text-[#2596be]">{LEVELS.find((l) => l.value === skill.level)?.label}</span>
                            </label>
                            <div className="flex h-10">
                                {LEVELS.map((level, levelIndex) => (
                                    <button
                                        key={level.value}
                                        onClick={() => handleChange(skill.id, 'level', level.value)}
                                        className={`flex-1 h-full transition-all border-r last:border-r-0 border-white/50 ${levelIndex <= getLevelIndex(skill.level)
                                            ? 'bg-green-400 hover:bg-green-500'
                                            : 'bg-gray-200 hover:bg-gray-300'
                                            } ${levelIndex === 0 ? 'rounded-l-lg' : ''} ${levelIndex === LEVELS.length - 1 ? 'rounded-r-lg' : ''
                                            }`}
                                        title={level.label}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={() => removeSkill(skill.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2"
                            title="Remove"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Separator */}
                    {index < skills.length - 1 && (
                        <div className="border-t border-dashed border-gray-300 pt-2" />
                    )}
                </div>
            ))}

            {/* Dashed separator */}
            <div className="border-t border-dashed border-gray-300" />

            {/* Add Button */}
            <button
                onClick={addSkill}
                className="flex items-center gap-2 text-[#2596be] hover:text-[#1e7a9a] font-medium transition-colors"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                        clipRule="evenodd"
                    />
                </svg>
                Add Employment
            </button>

            {/* Dashed separator */}
            <div className="border-t border-dashed border-gray-300" />

            {/* Settings Toggles */}
            <div className="flex flex-wrap gap-6 pt-2">
                {/* View as Tags Toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                    <div
                        className={`relative w-11 h-6 rounded-full transition-colors ${settings.viewSkillsAsTags ? 'bg-[#2596be]' : 'bg-gray-300'
                            }`}
                        onClick={() => updateSettings({ viewSkillsAsTags: !settings.viewSkillsAsTags })}
                    >
                        <div
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.viewSkillsAsTags ? 'translate-x-5' : 'translate-x-0'
                                }`}
                        />
                    </div>
                    <span className="text-sm text-gray-500">View skills as tags</span>
                </label>

                {/* Hide Level Toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                    <div
                        className={`relative w-11 h-6 rounded-full transition-colors ${settings.hideExperienceLevel ? 'bg-[#2596be]' : 'bg-gray-300'
                            }`}
                        onClick={() => updateSettings({ hideExperienceLevel: !settings.hideExperienceLevel })}
                    >
                        <div
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${settings.hideExperienceLevel ? 'translate-x-5' : 'translate-x-0'
                                }`}
                        />
                    </div>
                    <span className="text-sm text-gray-500">Hide Experience level</span>
                </label>
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

                <button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-[#2596be] hover:bg-[#1e7a9a] text-white px-6 py-2.5 rounded-lg font-medium transition-colors duration-200"
                >
                    Next to Experience
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
            </div>
        </div>
    );
}
