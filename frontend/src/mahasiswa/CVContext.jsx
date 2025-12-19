import { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../api';

// Initial state untuk semua data CV
const initialState = {
    contact: {
        firstName: '',
        lastName: '',
        city: '',
        postalCode: '',
        email: '',
        phone: '',
        photo: null,
        dateOfBirth: '',
        nationality: '',
        visaStatus: '',
        maritalStatus: '',
    },
    experience: [],
    education: [],
    skills: [],
    about: {
        summary: '',
        nim: '',           // NIM mahasiswa (tidak ditampilkan di CV preview, hanya untuk database)
        prodi: '',         // Program Studi mahasiswa (tidak ditampilkan di CV preview, hanya untuk database)
    },
    currentStep: 0,
    settings: {
        viewSkillsAsTags: false,
        hideExperienceLevel: false,
    },
    isLoading: false, // Added loading state
};

// Action types
const ACTIONS = {
    UPDATE_CONTACT: 'UPDATE_CONTACT',
    ADD_EXPERIENCE: 'ADD_EXPERIENCE',
    UPDATE_EXPERIENCE: 'UPDATE_EXPERIENCE',
    REMOVE_EXPERIENCE: 'REMOVE_EXPERIENCE',
    ADD_EDUCATION: 'ADD_EDUCATION',
    UPDATE_EDUCATION: 'UPDATE_EDUCATION',
    REMOVE_EDUCATION: 'REMOVE_EDUCATION',
    ADD_SKILL: 'ADD_SKILL',
    UPDATE_SKILL: 'UPDATE_SKILL',
    REMOVE_SKILL: 'REMOVE_SKILL',
    UPDATE_ABOUT: 'UPDATE_ABOUT',
    SET_STEP: 'SET_STEP',
    UPDATE_SETTINGS: 'UPDATE_SETTINGS',
    RESET_ALL: 'RESET_ALL',
    SET_LOADING: 'SET_LOADING',
    LOAD_DATA: 'LOAD_DATA',
};

// Reducer function
function cvReducer(state, action) {
    switch (action.type) {
        case ACTIONS.UPDATE_CONTACT:
            return {
                ...state,
                contact: { ...state.contact, ...action.payload },
            };

        case ACTIONS.ADD_EXPERIENCE:
            return {
                ...state,
                experience: [
                    ...state.experience,
                    {
                        id: Date.now(),
                        employer: '',
                        jobTitle: '',
                        city: '',
                        startDate: '',
                        endDate: '',
                        description: '',
                        current: false,
                    },
                ],
            };

        case ACTIONS.UPDATE_EXPERIENCE:
            return {
                ...state,
                experience: state.experience.map((exp) =>
                    exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
                ),
            };

        case ACTIONS.REMOVE_EXPERIENCE:
            return {
                ...state,
                experience: state.experience.filter((exp) => exp.id !== action.payload),
            };

        case ACTIONS.ADD_EDUCATION:
            return {
                ...state,
                education: [
                    ...state.education,
                    {
                        id: Date.now(),
                        school: '',
                        degree: '',
                        graduationDate: '', // Kept for compatibility if used elsewhere, but new form uses startDate/endDate
                        startDate: '',
                        endDate: '',
                        city: '',
                        description: '',
                    },
                ],
            };

        case ACTIONS.UPDATE_EDUCATION:
            return {
                ...state,
                education: state.education.map((edu) =>
                    edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
                ),
            };

        case ACTIONS.REMOVE_EDUCATION:
            return {
                ...state,
                education: state.education.filter((edu) => edu.id !== action.payload),
            };

        case ACTIONS.ADD_SKILL:
            return {
                ...state,
                skills: [
                    ...state.skills,
                    {
                        id: Date.now(),
                        name: '',
                        level: 'skillful', // beginner | skillful | experienced
                    },
                ],
            };

        case ACTIONS.UPDATE_SKILL:
            return {
                ...state,
                skills: state.skills.map((skill) =>
                    skill.id === action.payload.id ? { ...skill, ...action.payload.data } : skill
                ),
            };

        case ACTIONS.REMOVE_SKILL:
            return {
                ...state,
                skills: state.skills.filter((skill) => skill.id !== action.payload),
            };

        case ACTIONS.UPDATE_ABOUT:
            return {
                ...state,
                about: { ...state.about, ...action.payload },
            };

        case ACTIONS.SET_STEP:
            return {
                ...state,
                currentStep: action.payload,
            };

        case ACTIONS.UPDATE_SETTINGS:
            return {
                ...state,
                settings: { ...state.settings, ...action.payload },
            };

        case ACTIONS.RESET_ALL:
            return initialState;

        case ACTIONS.SET_LOADING:
            return { ...state, isLoading: action.payload };

        case ACTIONS.LOAD_DATA:
            return { ...state, ...action.payload };

        default:
            return state;
    }
}

// Create context
const CVContext = createContext(null);

// Provider component
export function CVProvider({ children }) {
    const [state, dispatch] = useReducer(cvReducer, initialState);

    // Fetch existing profile data on mount
    useEffect(() => {
        const fetchProfile = async () => {
            dispatch({ type: ACTIONS.SET_LOADING, payload: true });
            try {
                // Fetch profile data
                const res = await api.get('/api/students/me/');
                const data = res.data;

                // Map API data to state
                const loadedData = {
                    contact: {
                        firstName: data.full_name ? data.full_name.split(' ')[0] : '',
                        lastName: data.full_name ? data.full_name.split(' ').slice(1).join(' ') : '',
                        city: data.city || '',
                        postalCode: '', // Not in backend yet
                        email: data.email || data.login_email || '',
                        phone: data.phone || '',
                        photo: data.photo || null, // Backend URL
                        nationality: data.nationality || '',
                        visaStatus: data.visa_status || '',
                        maritalStatus: data.marital_status || '',
                        linkedin: data.linkedin_link || '',
                        nim: data.nim || '',
                        prodi: data.prodi || '',
                    },
                    experience: data.experiences.map(exp => ({
                        id: exp.id,
                        employer: exp.company,
                        jobTitle: exp.title,
                        city: '', // Not in Experience model yet, maybe add later?
                        startDate: exp.start_date,
                        endDate: exp.end_date,
                        description: exp.description,
                        current: !exp.end_date
                    })),
                    education: data.educations.map(edu => ({
                        id: edu.id,
                        school: edu.school,
                        degree: edu.degree,
                        city: edu.city || '',
                        startDate: edu.start_date,
                        endDate: edu.end_date,
                        description: edu.description
                    })),
                    skills: data.skills.map(skill => ({
                        id: skill.id,
                        name: skill.name,
                        level: 'skillful' // Default
                    })),
                    about: {
                        summary: data.bio || '',
                        nim: data.nim || '',
                        prodi: data.prodi || '',
                    }
                };

                dispatch({ type: ACTIONS.LOAD_DATA, payload: loadedData });

            } catch (error) {
                console.log('No existing profile or error fetching:', error);
                // If 404, we just start with empty state (which is default)
                // If authenticated, we might want to pre-fill email from /users/me
                 if (error.response && error.response.status === 404) {
                     try {
                         const userRes = await api.get('/api/users/me/');
                         dispatch({
                             type: ACTIONS.UPDATE_CONTACT,
                             payload: { email: userRes.data.email }
                         });
                     } catch (e) {
                         console.error("Error fetching user info", e);
                     }
                 }
            } finally {
                dispatch({ type: ACTIONS.SET_LOADING, payload: false });
            }
        };

        // Check if user is logged in before fetching
        if (localStorage.getItem('access_token')) {
            fetchProfile();
        }
    }, []);

    // Action creators
    const actions = {
        updateContact: (data) => dispatch({ type: ACTIONS.UPDATE_CONTACT, payload: data }),

        addExperience: () => dispatch({ type: ACTIONS.ADD_EXPERIENCE }),
        updateExperience: (id, data) => dispatch({ type: ACTIONS.UPDATE_EXPERIENCE, payload: { id, data } }),
        removeExperience: (id) => dispatch({ type: ACTIONS.REMOVE_EXPERIENCE, payload: id }),

        addEducation: () => dispatch({ type: ACTIONS.ADD_EDUCATION }),
        updateEducation: (id, data) => dispatch({ type: ACTIONS.UPDATE_EDUCATION, payload: { id, data } }),
        removeEducation: (id) => dispatch({ type: ACTIONS.REMOVE_EDUCATION, payload: id }),

        addSkill: () => dispatch({ type: ACTIONS.ADD_SKILL }),
        updateSkill: (id, data) => dispatch({ type: ACTIONS.UPDATE_SKILL, payload: { id, data } }),
        removeSkill: (id) => dispatch({ type: ACTIONS.REMOVE_SKILL, payload: id }),

        updateAbout: (data) => dispatch({ type: ACTIONS.UPDATE_ABOUT, payload: data }),

        setStep: (step) => dispatch({ type: ACTIONS.SET_STEP, payload: step }),
        nextStep: () => dispatch({ type: ACTIONS.SET_STEP, payload: Math.min(state.currentStep + 1, 5) }),
        prevStep: () => dispatch({ type: ACTIONS.SET_STEP, payload: Math.max(state.currentStep - 1, 0) }),

        updateSettings: (data) => dispatch({ type: ACTIONS.UPDATE_SETTINGS, payload: data }),
        resetAll: () => dispatch({ type: ACTIONS.RESET_ALL }),
    };

    return (
        <CVContext.Provider value={{ state, ...actions }}>
            {children}
        </CVContext.Provider>
    );
}

// Custom hook untuk menggunakan context
export function useCV() {
    const context = useContext(CVContext);
    if (!context) {
        throw new Error('useCV must be used within a CVProvider');
    }
    return context;
}

export { ACTIONS };
export default CVContext;
