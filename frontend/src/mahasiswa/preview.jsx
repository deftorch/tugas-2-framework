import { forwardRef } from 'react';
import { useCV } from './CVContext';

const Preview = forwardRef(function Preview({ forPrint = false }, ref) {
    const { state } = useCV();
    const { contact, experience, education, skills, about, settings } = state;

    const fullName = `${contact.firstName} ${contact.lastName}`.trim() || 'YOUR NAME';

    // Format date of birth
    const formatDate = (dateString) => {
        if (!dateString) return '20-08-2004';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
    };

    // Get skill level percentage
    const getLevelPercentage = (level) => {
        switch (level) {
            case 'beginner': return 33;
            case 'skillful': return 66;
            case 'experienced': return 100;
            default: return 50;
        }
    };

    return (
        <div className={forPrint ? '' : 'sticky top-8 w-full h-fit flex justify-center'}>
            {/* CV Paper - A4 Size - No gaps */}
            <div
                ref={ref}
                className="overflow-hidden flex"
                style={{
                    width: forPrint ? '100%' : '380px',
                    height: forPrint ? '100%' : '580px',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    boxShadow: forPrint ? 'none' : '0 10px 40px rgba(0,0,0,0.2)',
                }}
            >
                {/* Left Sidebar - Dark Gray - Full height, no gaps */}
                <div
                    className="bg-[#4a4a4a] text-white flex flex-col"
                    style={{
                        width: '32%',
                        height: '100%',
                        padding: forPrint ? '20mm 10mm' : '25px 14px',
                    }}
                >
                    {/* Profile Photo */}
                    <div className="flex justify-center" style={{ marginBottom: forPrint ? '18mm' : '24px' }}>
                        <div
                            className="rounded-full border-4 border-[#3498db] flex items-center justify-center overflow-hidden bg-[#3498db]"
                            style={{
                                width: forPrint ? '30mm' : '75px',
                                height: forPrint ? '30mm' : '75px'
                            }}
                        >
                            {contact.photo ? (
                                <img src={contact.photo} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <svg className="text-white" style={{ width: '60%', height: '60%' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* About Me */}
                    <div style={{ marginBottom: forPrint ? '14mm' : '18px' }}>
                        <h3
                            className="font-bold tracking-wide border-b border-gray-500"
                            style={{
                                fontSize: forPrint ? '11pt' : '11px',
                                paddingBottom: forPrint ? '3mm' : '5px',
                                marginBottom: forPrint ? '5mm' : '8px',
                                letterSpacing: '0.5px'
                            }}
                        >
                            ABOUT ME
                        </h3>
                        <p
                            className="text-gray-300 leading-relaxed"
                            style={{ fontSize: forPrint ? '9pt' : '8px', lineHeight: '1.5' }}
                        >
                            {about.summary || 'Saya jago loh rugi ga apply saya jadi pekerja.'}
                        </p>
                    </div>

                    {/* Personal Details */}
                    <div>
                        <h3
                            className="font-bold tracking-wide border-b border-gray-500"
                            style={{
                                fontSize: forPrint ? '11pt' : '11px',
                                paddingBottom: forPrint ? '3mm' : '5px',
                                marginBottom: forPrint ? '5mm' : '8px',
                                letterSpacing: '0.5px'
                            }}
                        >
                            PERSONAL DETAILS
                        </h3>
                        <div style={{ fontSize: forPrint ? '9pt' : '8px' }}>
                            <div style={{ marginBottom: forPrint ? '4mm' : '6px' }}>
                                <div className="text-gray-400" style={{ fontSize: forPrint ? '8pt' : '7px', marginBottom: '2px' }}>Date of birth</div>
                                <div className="text-[#3498db] font-medium">{formatDate(contact.dateOfBirth)}</div>
                            </div>
                            <div style={{ marginBottom: forPrint ? '4mm' : '6px' }}>
                                <div className="text-gray-400" style={{ fontSize: forPrint ? '8pt' : '7px', marginBottom: '2px' }}>Nationality</div>
                                <div className="font-medium">{contact.nationality || 'Indonesia'}</div>
                            </div>
                            <div style={{ marginBottom: forPrint ? '4mm' : '6px' }}>
                                <div className="text-gray-400" style={{ fontSize: forPrint ? '8pt' : '7px', marginBottom: '2px' }}>Visa status</div>
                                <div className="font-medium">{contact.visaStatus || 'Disetujui'}</div>
                            </div>
                            <div>
                                <div className="text-gray-400" style={{ fontSize: forPrint ? '8pt' : '7px', marginBottom: '2px' }}>Marital status</div>
                                <div className="font-medium">{contact.maritalStatus || 'Lajang'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content - Light Gray - Full height, no gaps */}
                <div
                    className="bg-[#f8f8f8] flex flex-col"
                    style={{
                        width: '68%',
                        height: '100%',
                        padding: forPrint ? '18mm 14mm' : '22px 18px',
                    }}
                >
                    {/* Header with Name */}
                    <div style={{ marginBottom: forPrint ? '10mm' : '14px' }}>
                        <h1
                            className="font-bold text-[#333] tracking-wide"
                            style={{
                                fontSize: forPrint ? '22pt' : '20px',
                                marginBottom: forPrint ? '6mm' : '10px',
                                fontWeight: '700',
                                letterSpacing: '2px'
                            }}
                        >
                            {fullName.toUpperCase()}
                        </h1>

                        {/* Contact Info - Right aligned icons */}
                        <div className="flex flex-col items-end" style={{ fontSize: forPrint ? '9pt' : '8px', gap: forPrint ? '2.5mm' : '4px' }}>
                            <div className="flex items-center" style={{ gap: forPrint ? '3mm' : '6px' }}>
                                <span className="text-gray-600">{contact.city || 'Yokyakarta'}{contact.postalCode && `, ${contact.postalCode}`}</span>
                                <div
                                    className="rounded-full bg-[#3498db] flex items-center justify-center flex-shrink-0"
                                    style={{ width: forPrint ? '5.5mm' : '14px', height: forPrint ? '5.5mm' : '14px' }}
                                >
                                    <svg className="text-white" style={{ width: '55%', height: '55%' }} fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center" style={{ gap: forPrint ? '3mm' : '6px' }}>
                                <span className="text-gray-600">{contact.phone || '086734991829'}</span>
                                <div
                                    className="rounded-full bg-[#3498db] flex items-center justify-center flex-shrink-0"
                                    style={{ width: forPrint ? '5.5mm' : '14px', height: forPrint ? '5.5mm' : '14px' }}
                                >
                                    <svg className="text-white" style={{ width: '55%', height: '55%' }} fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center" style={{ gap: forPrint ? '3mm' : '6px' }}>
                                <span className="text-gray-600">{contact.email || 'cahyaferdiabad@gmail.com'}</span>
                                <div
                                    className="rounded-full bg-[#3498db] flex items-center justify-center flex-shrink-0"
                                    style={{ width: forPrint ? '5.5mm' : '14px', height: forPrint ? '5.5mm' : '14px' }}
                                >
                                    <svg className="text-white" style={{ width: '55%', height: '55%' }} fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Work Experience */}
                    <div style={{ marginBottom: forPrint ? '10mm' : '14px' }}>
                        <h2
                            className="font-bold text-[#333] tracking-wide"
                            style={{
                                fontSize: forPrint ? '12pt' : '12px',
                                borderBottom: '1px solid #d0d0d0',
                                paddingBottom: forPrint ? '2.5mm' : '4px',
                                marginBottom: forPrint ? '5mm' : '8px',
                                letterSpacing: '1px'
                            }}
                        >
                            WORK EXPERIENCE
                        </h2>
                        {experience.length > 0 ? (
                            <div>
                                {experience.map((exp, index) => (
                                    <div key={exp.id} className="flex" style={{ marginBottom: forPrint ? '5mm' : '8px' }}>
                                        {/* Timeline */}
                                        <div className="flex flex-col items-center" style={{ marginRight: forPrint ? '4mm' : '8px' }}>
                                            <div
                                                className="rounded-full bg-[#3498db] flex-shrink-0"
                                                style={{ width: forPrint ? '3mm' : '7px', height: forPrint ? '3mm' : '7px' }}
                                            />
                                            {index < experience.length - 1 && (
                                                <div className="w-px flex-1 bg-gray-400" style={{ minHeight: forPrint ? '10mm' : '24px' }} />
                                            )}
                                        </div>
                                        {/* Content */}
                                        <div className="flex-1 grid grid-cols-2" style={{ gap: forPrint ? '5mm' : '10px' }}>
                                            <div>
                                                <div className="font-semibold text-[#333]" style={{ fontSize: forPrint ? '10pt' : '9px' }}>
                                                    {exp.employer || 'Bank BRI'}
                                                </div>
                                                <div className="text-gray-500" style={{ fontSize: forPrint ? '8pt' : '7px' }}>
                                                    {exp.city || 'Yokyakarta'}
                                                </div>
                                                <div className="text-gray-500" style={{ fontSize: forPrint ? '8pt' : '7px' }}>
                                                    {exp.startDate || 'Feb 2023'} - {exp.current ? 'Present' : (exp.endDate || 'Jun 2025')}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-[#333]" style={{ fontSize: forPrint ? '10pt' : '9px' }}>
                                                    {exp.jobTitle || 'IT Support'}
                                                </div>
                                                <div className="text-gray-500" style={{ fontSize: forPrint ? '8pt' : '7px' }}>
                                                    {exp.description || 'Mengelolola Dan Maintance Server'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 italic" style={{ fontSize: forPrint ? '9pt' : '8px' }}>No experience added</p>
                        )}
                    </div>

                    {/* Education */}
                    <div style={{ marginBottom: forPrint ? '10mm' : '14px' }}>
                        <h2
                            className="font-bold text-[#333] tracking-wide"
                            style={{
                                fontSize: forPrint ? '12pt' : '12px',
                                borderBottom: '1px solid #d0d0d0ff',
                                paddingBottom: forPrint ? '2.5mm' : '4px',
                                marginBottom: forPrint ? '5mm' : '8px',
                                letterSpacing: '1px'
                            }}
                        >
                            EDUCATION
                        </h2>
                        {education.length > 0 ? (
                            <div>
                                {education.map((edu, index) => (
                                    <div key={edu.id} className="flex" style={{ marginBottom: forPrint ? '5mm' : '8px' }}>
                                        {/* Timeline */}
                                        <div className="flex flex-col items-center" style={{ marginRight: forPrint ? '4mm' : '8px' }}>
                                            <div
                                                className="rounded-full bg-[#3498db] flex-shrink-0"
                                                style={{ width: forPrint ? '3mm' : '7px', height: forPrint ? '3mm' : '7px' }}
                                            />
                                            {index < education.length - 1 && (
                                                <div className="w-px flex-1 bg-gray-400" style={{ minHeight: forPrint ? '10mm' : '24px' }} />
                                            )}
                                        </div>
                                        {/* Content */}
                                        <div className="flex-1 grid grid-cols-2" style={{ gap: forPrint ? '5mm' : '10px' }}>
                                            <div>
                                                <div className="font-semibold text-[#333]" style={{ fontSize: forPrint ? '10pt' : '9px' }}>
                                                    {edu.school || 'Universitas banyak tugas'}
                                                </div>
                                                <div className="text-gray-500" style={{ fontSize: forPrint ? '8pt' : '7px' }}>
                                                    {edu.city || 'Yogyakarta'}
                                                </div>
                                                <div className="text-gray-500" style={{ fontSize: forPrint ? '8pt' : '7px' }}>
                                                    {edu.graduationDate || '2024'}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-[#333]" style={{ fontSize: forPrint ? '10pt' : '9px' }}>
                                                    {edu.degree || 'Undergradute'}
                                                </div>
                                                <div className="text-gray-500" style={{ fontSize: forPrint ? '8pt' : '7px' }}>
                                                    {edu.description || 'Gelar sarjana S1 Informatika'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 italic" style={{ fontSize: forPrint ? '9pt' : '8px' }}>No education added</p>
                        )}
                    </div>

                    {/* Skills */}
                    <div>
                        <h2
                            className="font-bold text-[#333] tracking-wide"
                            style={{
                                fontSize: forPrint ? '12pt' : '12px',
                                borderBottom: '1px solid #d0d0d0ff',
                                paddingBottom: forPrint ? '2.5mm' : '4px',
                                marginBottom: forPrint ? '5mm' : '8px',
                                letterSpacing: '1px'
                            }}
                        >
                            SKILL
                        </h2>
                        {skills.length > 0 ? (
                            settings.viewSkillsAsTags ? (
                                // Tags view
                                <div className="flex flex-wrap" style={{ gap: forPrint ? '2mm' : '4px' }}>
                                    {skills.map((skill) => (
                                        <span
                                            key={skill.id}
                                            className="bg-[#3498db] text-white rounded px-2 py-0.5"
                                            style={{ fontSize: forPrint ? '8pt' : '7px' }}
                                        >
                                            {skill.name || 'SKILL'}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                // List view with optional level bars
                                <div className="grid grid-cols-2" style={{ gap: forPrint ? '3mm 8mm' : '5px 12px' }}>
                                    {skills.map((skill) => (
                                        <div key={skill.id}>
                                            <div className="flex items-center">
                                                <span
                                                    className="uppercase tracking-wide text-gray-700"
                                                    style={{ fontSize: forPrint ? '9pt' : '8px' }}
                                                >
                                                    {skill.name || 'SKILL'}
                                                </span>
                                            </div>
                                            {/* Level bar - only show if not hidden */}
                                            {!settings.hideExperienceLevel && (
                                                <div>
                                                    <div
                                                        className="bg-gray-200 rounded-full overflow-hidden"
                                                        style={{
                                                            height: forPrint ? '2mm' : '4px',
                                                            marginTop: forPrint ? '1.5mm' : '3px',
                                                            width: '100%'
                                                        }}
                                                    >
                                                        <div
                                                            className="bg-[#3498db] h-full rounded-full transition-all"
                                                            style={{ width: `${getLevelPercentage(skill.level)}%` }}
                                                        />
                                                    </div>
                                                    {/* Level label */}
                                                    <div
                                                        className="text-gray-500 capitalize"
                                                        style={{
                                                            fontSize: forPrint ? '7pt' : '6px',
                                                            marginTop: forPrint ? '1mm' : '2px'
                                                        }}
                                                    >
                                                        {skill.level || 'beginner'}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )
                        ) : (
                            <p className="text-gray-400 italic" style={{ fontSize: forPrint ? '9pt' : '8px' }}>No skills added</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Print Styles */}
            <style>{`
        @media print {
          @page {
            size: 215.9mm 330mm;
            margin: 0 !important;
            padding: 0 !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
          }
          body > * {
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>
        </div>
    );
});

export default Preview;
