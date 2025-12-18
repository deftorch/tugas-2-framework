import { useCV } from './CVContext';

export default function ContactForm({ handleLogout }) {
    const { state, updateContact, nextStep } = useCV();
    const { contact } = state;

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateContact({ [name]: value });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    Please enter your <span className="text-[#2596be]">contact</span> info
                </h1>
                <p className="text-gray-500 mt-1 text-sm">
                    Add your phone number and email so recruiters can reach you.
                </p>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* First Name */}
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={contact.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                        placeholder=""
                    />
                </div>

                {/* Last Name */}
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={contact.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                        placeholder=""
                    />
                </div>

                {/* City */}
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={contact.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                        placeholder=""
                    />
                </div>

                {/* Postal Code */}
                <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                        Postal Code
                    </label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={contact.postalCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                        placeholder=""
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={contact.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                        placeholder=""
                    />
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={contact.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2596be] focus:border-[#2596be] outline-none transition-all"
                        placeholder=""
                    />
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-8">
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 bg-[#dc3545] hover:bg-[#c82333] text-white px-8 py-2.5 rounded-lg font-medium transition-colors duration-200"
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

                {/* Next Button */}
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
