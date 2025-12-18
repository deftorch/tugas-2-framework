import { useCV } from './CVContext';

export default function ExperienceForm() {
    const { state, addExperience, updateExperience, removeExperience, nextStep, prevStep } = useCV();
    const { experience } = state;

    const handleChange = (id, field, value) => {
        updateExperience(id, { [field]: value });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    <span className="text-[#2596be]">Tell us</span> about your experience
                </h1>
                <p className="text-gray-500 mt-1 text-sm">
                    Write your jobs (recent ones) with sort poins of your did.
                </p>
            </div>

            {/* Dashed separator */}
            <div className="border-t border-dashed border-gray-300" />

            {/* Add Button */}
            <button
                onClick={addExperience}
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

            {/* Experience Items */}
            {experience.map((exp, index) => (
                <div key={exp.id} className="space-y-4 p-4 bg-gray-50 rounded-lg relative">
                    {/* Remove Button */}
                    <button
                        onClick={() => removeExperience(exp.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
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

                    <div className="text-sm font-medium text-gray-500">Experience {index + 1}</div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {/* Employer */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Employer
                            </label>
                            <input
                                type="text"
                                value={exp.employer}
                                onChange={(e) => handleChange(exp.id, 'employer', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                                placeholder=""
                            />
                        </div>

                        {/* Job Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Job Title
                            </label>
                            <input
                                type="text"
                                value={exp.jobTitle}
                                onChange={(e) => handleChange(exp.id, 'jobTitle', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                                placeholder=""
                            />
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                value={exp.city}
                                onChange={(e) => handleChange(exp.id, 'city', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                                placeholder=""
                            />
                        </div>

                        {/* Start Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date
                            </label>
                            <input
                                type="text"
                                value={exp.startDate}
                                onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                                placeholder=""
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Date
                            </label>
                            <input
                                type="text"
                                value={exp.endDate}
                                onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                                disabled={exp.current}
                                className={`w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all ${exp.current ? 'bg-gray-100 text-gray-400' : ''
                                    }`}
                                placeholder=""
                            />
                        </div>

                        {/* Current Job Checkbox */}
                        <div className="flex items-center">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={exp.current}
                                    onChange={(e) => handleChange(exp.id, 'current', e.target.checked)}
                                    className="w-4 h-4 text-[#2596be] border-gray-300 rounded focus:ring-[#2596be]"
                                />
                                <span className="text-sm text-gray-700">I currently work here</span>
                            </label>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={exp.description}
                            onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all resize-none"
                            placeholder=""
                        />
                    </div>
                </div>
            ))}

            {/* Dashed separator */}
            <div className="border-t border-dashed border-gray-300" />

            {/* Help Text */}
            <p className="text-sm text-gray-400">
                In this section, list related employment experience in your last 10 years along with the dates.
                Mention the most recent employment first.
            </p>

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
