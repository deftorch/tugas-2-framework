import { useRef } from 'react';
import React from 'react';
import { CVProvider, useCV } from './CVContext';
import StepIndicator from './stepIndicator';
import Preview from './Preview';
import ContactForm from './contact';
import ExperienceForm from './experience';
import EducationForm from './education';
import SkillForm from './skill';
import AboutForm from './about';
import FinishForm from './finish';

// Step components mapping
const STEP_COMPONENTS = [
    ContactForm,
    ExperienceForm,
    EducationForm,
    SkillForm,
    AboutForm,
    FinishForm,
];

function CVBuilderContent() {
    const { state } = useCV();
    const { currentStep } = state;
    const previewRef = useRef(null);

    // Get current step component
    const CurrentStepComponent = STEP_COMPONENTS[currentStep] || ContactForm;

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_info');
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex flex-col lg:flex-row flex-1">
                {/* Left Side - Form Area */}
                <div className="w-full lg:w-[55%] min-h-screen flex flex-col">
                    {/* Step Indicator Header */}
                    <StepIndicator />

                    {/* Form Content */}
                    <div className="flex-1 p-6 lg:p-10 lg:pr-12 overflow-y-auto">
                        <CurrentStepComponent previewRef={previewRef} handleLogout={handleLogout} />
                    </div>

                    {/* Footer */}
                    <div className="bg-[#303f9f] text-white py-3 px-6">
                        <span className="font-bold text-lg">Talenta UMS</span>
                    </div>
                </div>

                {/* Right Side - Preview Area */}
                <div className="hidden lg:block w-[45%] bg-gray-200 min-h-screen p-8 overflow-y-auto">
                    <Preview ref={previewRef} />
                </div>
            </div>

            {/* Mobile Preview Toggle */}
            <div className="lg:hidden fixed bottom-4 right-4">
                <MobilePreviewButton previewRef={previewRef} />
            </div>
        </div>
    );
}

// Mobile preview button with modal
function MobilePreviewButton({ previewRef }) {
    const [showPreview, setShowPreview] = React.useState(false);

    return (
        <>
            <button
                onClick={() => setShowPreview(true)}
                className="bg-[#2596be] hover:bg-[#1e7a9a] text-white p-4 rounded-full shadow-lg transition-all"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                </svg>
            </button>

            {/* Mobile Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-gray-200 rounded-xl p-4 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
                        <button
                            onClick={() => setShowPreview(false)}
                            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
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
                        <Preview ref={previewRef} />
                    </div>
                </div>
            )}
        </>
    );
}

// Main component with Provider wrapper
export default function CVBuilder() {
    return (
        <CVProvider>
            <CVBuilderContent />
        </CVProvider>
    );
}
