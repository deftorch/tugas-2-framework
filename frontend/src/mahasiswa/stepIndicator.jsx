import { useCV } from './CVContext';

const steps = [
    { label: 'Contact', index: 0 },
    { label: 'Experience', index: 1 },
    { label: 'Education', index: 2 },
    { label: 'Skill', index: 3 },
    { label: 'About', index: 4 },
    { label: 'Finish It', index: 5 },
];

export default function StepIndicator() {
    const { state, setStep } = useCV();
    const { currentStep } = state;

    return (
        <div className="bg-[#303f9f] py-4 px-8">
            {/* Step Labels */}
            <div className="flex justify-between items-center mb-3">
                {steps.map((step) => (
                    <button
                        key={step.index}
                        onClick={() => setStep(step.index)}
                        className={`text-sm font-medium transition-colors duration-200 hover:text-white ${step.index === currentStep
                            ? 'text-[#ffffff]'
                            : step.index < currentStep
                                ? 'text-white'
                                : 'text-gray-300'
                            }`}
                    >
                        {step.label}
                    </button>
                ))}
            </div>

            {/* Progress Line with Dots */}
            <div className="relative flex items-center justify-between">
                {/* Background Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#5c6bc0] -translate-y-1/2" />

                {/* Active Line */}
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-[#ffffff] -translate-y-1/2 transition-all duration-300"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                />

                {/* Dots */}
                {steps.map((step) => (
                    <button
                        key={step.index}
                        onClick={() => setStep(step.index)}
                        className={`relative z-10 w-3 h-3 rounded-full border-2 transition-all duration-200 ${step.index <= currentStep
                            ? 'bg-[#ffffff] border-[#ffffff]'
                            : 'bg-[#5c6bc0] border-[#7986cb] hover:border-[#2596be]'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
