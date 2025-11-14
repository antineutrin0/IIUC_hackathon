import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

// Mock data - will be replaced with API calls later
const mockJobData = {
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    requiredSkills: [
        "React.js", "Node.js", "TypeScript", "MongoDB",
        "AWS", "Docker", "Kubernetes", "GraphQL"
    ],
    requiredExperience: {
        years: 5,
        areas: ["Full-stack development", "Cloud architecture", "Team leadership"]
    },
    preferredQualifications: [
        "Bachelor's degree in Computer Science",
        "Experience with microservices architecture",
        "CI/CD pipeline setup"
    ]
};

const mockUserCV = {
    name: "John Doe",
    skills: ["React.js", "Node.js", "JavaScript", "PostgreSQL", "Git", "REST API"],
    experience: {
        years: 3,
        areas: ["Frontend development", "Backend development"]
    },
    qualifications: [
        "Bachelor's degree in Computer Science",
        "Agile methodology experience"
    ]
};

const CVJobComparison = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Calculate gaps
    const skillsMatch = mockJobData.requiredSkills.filter(skill =>
        mockUserCV.skills.includes(skill)
    );
    const missingSkills = mockJobData.requiredSkills.filter(skill =>
        !mockUserCV.skills.includes(skill)
    );

    const experienceGap = mockJobData.requiredExperience.years - mockUserCV.experience.years;
    const missingExperienceAreas = mockJobData.requiredExperience.areas.filter(area =>
        !mockUserCV.experience.areas.includes(area)
    );

    const matchPercentage = Math.round(
        (skillsMatch.length / mockJobData.requiredSkills.length) * 100
    );

    const handleNextSteps = () => {
        alert('Redirecting to personalized learning path...');
    };

    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen bg-green-50 p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                CV Analysis Report
                            </h1>
                            <p className="text-gray-600">
                                {mockJobData.title} at {mockJobData.company}
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-green-600">
                                {matchPercentage}%
                            </div>
                            <div className="text-sm text-gray-600">Match Score</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-green-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${matchPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-lg mb-6">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex-1 py-4 px-6 font-semibold transition-colors ${activeTab === 'overview'
                                    ? 'text-green-600 border-b-2 border-green-600'
                                    : 'text-gray-600 hover:text-green-600'
                                }`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('skills')}
                            className={`flex-1 py-4 px-6 font-semibold transition-colors ${activeTab === 'skills'
                                    ? 'text-green-600 border-b-2 border-green-600'
                                    : 'text-gray-600 hover:text-green-600'
                                }`}
                        >
                            Skills Gap
                        </button>
                        <button
                            onClick={() => setActiveTab('experience')}
                            className={`flex-1 py-4 px-6 font-semibold transition-colors ${activeTab === 'experience'
                                    ? 'text-green-600 border-b-2 border-green-600'
                                    : 'text-gray-600 hover:text-green-600'
                                }`}
                        >
                            Experience Gap
                        </button>
                    </div>

                    <div className="p-6">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-green-800 font-semibold">Matching Skills</span>
                                            <CheckCircle className="text-green-600" size={24} />
                                        </div>
                                        <div className="text-3xl font-bold text-green-600">
                                            {skillsMatch.length}
                                        </div>
                                    </div>

                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-red-800 font-semibold">Missing Skills</span>
                                            <XCircle className="text-red-600" size={24} />
                                        </div>
                                        <div className="text-3xl font-bold text-red-600">
                                            {missingSkills.length}
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-yellow-800 font-semibold">Experience Gap</span>
                                            <AlertCircle className="text-yellow-600" size={24} />
                                        </div>
                                        <div className="text-3xl font-bold text-yellow-600">
                                            {experienceGap > 0 ? `${experienceGap} years` : '✓'}
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h3 className="font-semibold text-blue-800 mb-2">Quick Summary</h3>
                                    <p className="text-blue-700">
                                        You match {skillsMatch.length} out of {mockJobData.requiredSkills.length} required skills.
                                        {experienceGap > 0 && ` You need ${experienceGap} more years of experience.`}
                                        {missingExperienceAreas.length > 0 && ` Focus on gaining experience in ${missingExperienceAreas.join(', ')}.`}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Skills Gap Tab */}
                        {activeTab === 'skills' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <CheckCircle className="text-green-600 mr-2" size={24} />
                                        Skills You Have ({skillsMatch.length})
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skillsMatch.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <XCircle className="text-red-600 mr-2" size={24} />
                                        Skills You Need ({missingSkills.length})
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {missingSkills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                        Your Additional Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {mockUserCV.skills
                                            .filter(skill => !mockJobData.requiredSkills.includes(skill))
                                            .map((skill, idx) => (
                                                <span
                                                    key={idx}
                                                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Experience Gap Tab */}
                        {activeTab === 'experience' && (
                            <div className="space-y-6">
                                <div className="bg-green-50 border-green-200 rounded-lg p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                        Years of Experience
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-600 mb-2">Required</p>
                                            <p className="text-3xl font-bold text-blue-600">
                                                {mockJobData.requiredExperience.years} years
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600 mb-2">Your Experience</p>
                                            <p className="text-3xl font-bold text-purple-600">
                                                {mockUserCV.experience.years} years
                                            </p>
                                        </div>
                                    </div>
                                    {experienceGap > 0 && (
                                        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded p-3">
                                            <p className="text-yellow-800 font-medium">
                                                Gap: {experienceGap} years of experience needed
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                        Required Experience Areas
                                    </h3>
                                    <div className="space-y-3">
                                        {mockJobData.requiredExperience.areas.map((area, idx) => {
                                            const hasExperience = mockUserCV.experience.areas.includes(area);
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`flex items-center p-3 rounded-lg ${hasExperience
                                                            ? 'bg-green-50 border border-green-200'
                                                            : 'bg-red-50 border border-red-200'
                                                        }`}
                                                >
                                                    {hasExperience ? (
                                                        <CheckCircle className="text-green-600 mr-3" size={20} />
                                                    ) : (
                                                        <XCircle className="text-red-600 mr-3" size={20} />
                                                    )}
                                                    <span className={hasExperience ? 'text-green-800' : 'text-red-800'}>
                                                        {area}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Gap Analysis Summary</h2>

                    <div className="space-y-4">
                        <div className="border-l-4 border-indigo-500 pl-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Overall Assessment</h3>
                            <p className="text-gray-700">
                                Your profile matches {matchPercentage}% of the job requirements.
                                {matchPercentage >= 70
                                    ? " You're a strong candidate for this position!"
                                    : " There are some areas that need improvement to become a competitive candidate."}
                            </p>
                        </div>

                        {missingSkills.length > 0 && (
                            <div className="border-l-4 border-red-500 pl-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Priority Skills to Learn</h3>
                                <p className="text-gray-700">
                                    Focus on acquiring these key skills: <strong>{missingSkills.slice(0, 3).join(', ')}</strong>
                                    {missingSkills.length > 3 && ` and ${missingSkills.length - 3} more`}.
                                </p>
                            </div>
                        )}

                        {experienceGap > 0 && (
                            <div className="border-l-4 border-yellow-500 pl-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Experience Development</h3>
                                <p className="text-gray-700">
                                    Gain {experienceGap} more years of relevant experience, particularly in
                                    {missingExperienceAreas.length > 0 && ` ${missingExperienceAreas.join(' and ')}`}.
                                </p>
                            </div>
                        )}

                        <div className="border-l-4 border-green-500 pl-4">
                            <h3 className="font-semibold text-gray-800 mb-2">Your Strengths</h3>
                            <p className="text-gray-700">
                                You already have {skillsMatch.length} required skills including <strong>{skillsMatch.slice(0, 3).join(', ')}</strong>.
                                Build on these strengths while addressing the gaps.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Next Steps Button */}
                <div className="flex justify-center">
                    <button
                        onClick={handleNextSteps}
                        className="group bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                    >
                        <span>Next Steps</span>
                        <ArrowRight
                            className="group-hover:translate-x-1 transition-transform duration-300"
                            size={20}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CVJobComparison;