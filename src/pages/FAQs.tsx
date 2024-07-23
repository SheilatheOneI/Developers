import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I create an account on gigit?",
    answer: "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. Fill in your personal details, choose a strong password, and click 'Create Account'. You'll receive a confirmation email to verify your account."
  },
  {
    question: "Is it free to use gigit?",
    answer: "Yes, basic job searching and applying on gigit is completely free for job seekers. Employers may have different subscription plans for posting jobs and accessing advanced features."
  },
  {
    question: "How do I search for jobs on gigit?",
    answer: "Use the search bar on the homepage to enter keywords, job titles, or company names. You can also use filters to narrow down results by location, salary range, job type, and more."
  },
  {
    question: "Can I upload my resume to gigit?",
    answer: "Yes, you can upload your resume in your profile settings. We support PDF, DOC, and DOCX formats. Your uploaded resume can be used to quickly apply for jobs on our platform."
  },
  {
    question: "How do I know if an employer has viewed my application?",
    answer: "In your 'Applications' dashboard, you can see the status of each application. Statuses include 'Submitted', 'Viewed', 'Under Review', and 'Decision Made'."
  },
  {
    question: "Can I set up job alerts on gigit?",
    answer: "Yes, you can set up job alerts based on your search criteria. Go to your account settings and click on 'Job Alerts' to set up notifications for new job postings that match your preferences."
  },
  {
    question: "What should I do if I forgot my password?",
    answer: "Click on the 'Login' button and then select 'Forgot Password'. Enter the email address associated with your account, and we'll send you instructions to reset your password."
  },
  {
    question: "How can I contact employers through gigit?",
    answer: "Once you've applied for a job, employers may contact you through our built-in messaging system. You'll receive notifications for new messages in your account dashboard."
  }
];

const FAQs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-black mb-8 text-center">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full text-left p-4 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-[#F13223]">{faq.question}</h2>
                  <svg
                    className={`w-6 h-6 text-[#F13223] transform ${openIndex === index ? 'rotate-180' : ''} transition-transform duration-200`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {openIndex === index && (
                <div className="p-4 bg-[#BBCDE5] bg-opacity-20">
                  <p className="text-[#1C5D99]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;