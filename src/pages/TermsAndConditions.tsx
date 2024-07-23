import { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiChevronUp, FiDownload, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: (
      <p className="text-gray-700">
        By accessing or using the gigit platform, you agree to comply with and be bound by these Terms and Conditions.
      </p>
    ),
  },
  {
    id: 'user-accounts',
    title: '2. User Accounts',
    content: (
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>You must be at least 18 years old to use gigit.</li>
        <li>You are responsible for maintaining the confidentiality of your account and password.</li>
        <li>You agree to provide accurate and complete information when creating your account.</li>
      </ul>
    ),
  },
  {
    id: 'job-listings',
    title: '3. Job Listings and Applications',
    content: (
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Employers are responsible for the accuracy of their job listings.</li>
        <li>Job seekers must provide truthful information in their applications and profiles.</li>
        <li>gigit does not guarantee employment or hiring outcomes.</li>
      </ul>
    ),
  },
  {
    id: 'prohibited-activities',
    title: '4. Prohibited Activities',
    content: (
      <>
        <p className="text-blue-100 mb-2">Users are prohibited from:</p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Posting false, misleading, or fraudulent content.</li>
          <li>Harassing or discriminating against other users.</li>
          <li>Attempting to gain unauthorized access to other users' accounts.</li>
          <li>Using the platform for any illegal activities.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    title: '5. Intellectual Property',
    content: (
      <p className="text-gray-700">
        All content on gigit, including logos, text, and graphics, is protected by copyright and other intellectual property laws.
      </p>
    ),
  },
  {
    id: 'privacy',
    title: '6. Privacy and Data Protection',
    content: (
      <p className="text-gray-700">
        Our handling of your personal information is governed by our Privacy Policy, which is incorporated into these Terms and Conditions.
      </p>
    ),
  },
  {
    id: 'liability',
    title: '7. Limitation of Liability',
    content: (
      <p className="text-gray-700">
        gigit is not liable for any indirect, incidental, or consequential damages arising from your use of the platform.
      </p>
    ),
  },
  {
    id: 'modifications',
    title: '8. Modifications to the Service',
    content: (
      <p className="text-gray-700">
        We reserve the right to modify or discontinue gigit at any time, with or without notice.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: '9. Governing Law',
    content: (
      <p className="text-gray-700">
        These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction where gigit is registered.
      </p>
    ),
  },
];

const TermsAndConditions: React.FC = () => {
    const navigate = useNavigate();
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleSection = (id: string) => {
    setOpenSections(prev =>
      prev.includes(id) ? prev.filter(sectionId => sectionId !== id) : [...prev, id]
    );
  };

  const downloadTerms = () => {
    const content = sections.map(section => `${section.title}\n\n${section.content}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gigit_terms_and_conditions.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setOpenSections(filteredSections.map(section => section.id));
  }, [searchTerm]);

  return (
    <div className="bg-[#dee6f1] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <button
        className="absolute top-24 left-12 text-black hover:underline"
        onClick={() => navigate("/auth/signup")}
      >
        &larr; Back
      </button>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-[#F13223] text-white py-6 px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">gigit Terms and Conditions</h1>
          <button
            onClick={downloadTerms}
            className="bg-[#F13223] hover:bg-[#f05347] text-white font-bold py-2 px-4 rounded inline-flex items-center"
            aria-label="Download Terms and Conditions"
          >
            <FiDownload className="mr-2" />
            Download
          </button>
        </div>
        <div className="p-8">
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search terms..."
                className="w-full p-2 pl-10 border border-gray-300 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <nav className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#F13223]">Table of Contents</h2>
            <ul className="space-y-2">
              {filteredSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className="text-[#639FAB] hover:underline focus:outline-none"
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {filteredSections.map((section) => (
            <div
              key={section.id}
              ref={(el) => (sectionRefs.current[section.id] = el)}
              className="mb-8 border-b border-gray-200 pb-4"
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="flex justify-between items-center w-full text-left"
                aria-expanded={openSections.includes(section.id)}
              >
                <h2 className="text-2xl font-semibold text-[#F13223]">{section.title}</h2>
                {openSections.includes(section.id) ? (
                  <FiChevronUp className="text-[#F13223]" />
                ) : (
                  <FiChevronDown className="text-[#F13223]" />
                )}
              </button>
              {openSections.includes(section.id) && (
                <div className="mt-4">{section.content}</div>
              )}
            </div>
          ))}
        </div>
        <div className="bg-[#F13223] text-white py-4 px-8 text-center">
          <p>Last updated: July 22, 2024</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;