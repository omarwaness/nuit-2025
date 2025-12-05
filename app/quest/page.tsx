"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Zap, Lock, ArrowRight, X, Check, XCircle } from "lucide-react";

// Quiz data structure
const quizzes = [
  {
    id: 1,
    title: "System Discovery",
    category: "Basics",
    difficulty: "Easy",
    description: "Test your knowledge about system fundamentals and free software.",
    reward: "100 XP",
    questions: [
      {
        question: "What is free software (logiciel libre)?",
        options: [
          "Software that costs nothing",
          "Software with freedom to use, study, modify, and distribute",
          "Software only available online",
          "Software that doesn't need installation"
        ],
        correct: 1,
        explanation: "Free software refers to freedom, not price. It gives users the liberty to use, study, change, and share the software."
      },
      {
        question: "Which operating system is open-source?",
        options: ["Windows", "macOS", "Ubuntu Linux", "All of the above"],
        correct: 2,
        explanation: "Ubuntu Linux is an open-source operating system, while Windows and macOS are proprietary."
      },
      {
        question: "What does N.I.R.D stand for?",
        options: [
          "Network Infrastructure Resource Deployment",
          "Numérique Inclusif Responsable et Durable",
          "National Internet Resource Directory",
          "None of the above"
        ],
        correct: 1,
        explanation: "N.I.R.D stands for Numérique Inclusif Responsable et Durable (Inclusive, Responsible, and Sustainable Digital in English)."
      }
    ]
  },
  {
    id: 2,
    title: "Windows Migration",
    category: "Migration",
    difficulty: "Medium",
    description: "Learn about migrating from Windows to Linux systems.",
    reward: "150 XP",
    questions: [
      {
        question: "What is the main advantage of migrating from Windows to Linux?",
        options: [
          "It's always faster",
          "Greater independence and control over your system",
          "More software available",
          "Easier to use"
        ],
        correct: 1,
        explanation: "Linux offers greater independence, control, and freedom from vendor lock-in."
      },
      {
        question: "Which Linux distribution is beginner-friendly?",
        options: ["Ubuntu", "Arch Linux", "Gentoo", "Slackware"],
        correct: 0,
        explanation: "Ubuntu is specifically designed to be user-friendly for beginners migrating from Windows."
      },
      {
        question: "Can you run Windows software on Linux?",
        options: [
          "No, never",
          "Yes, using Wine or similar compatibility layers",
          "Only paid software",
          "Only if you have Windows installed"
        ],
        correct: 1,
        explanation: "Tools like Wine allow running many Windows applications on Linux, though not all."
      }
    ]
  },
  {
    id: 3,
    title: "Cloud Alternatives",
    category: "Privacy",
    difficulty: "Medium",
    description: "Explore alternatives to proprietary cloud services.",
    reward: "150 XP",
    questions: [
      {
        question: "What is Nextcloud?",
        options: [
          "A Windows application",
          "An open-source self-hosted cloud solution",
          "A Google service",
          "A type of hardware"
        ],
        correct: 1,
        explanation: "Nextcloud is open-source software that allows you to host your own cloud services."
      },
      {
        question: "Why should schools avoid Google Drive?",
        options: [
          "It's too expensive",
          "Privacy concerns and data dependency",
          "It's too slow",
          "It doesn't work well"
        ],
        correct: 1,
        explanation: "Google Drive stores data on external servers, raising privacy concerns and creating dependency on a tech giant."
      },
      {
        question: "What is the main benefit of self-hosted cloud solutions?",
        options: [
          "They're always free",
          "You control your own data and privacy",
          "They're faster",
          "They have more features"
        ],
        correct: 1,
        explanation: "Self-hosted solutions give you complete control over your data and privacy."
      }
    ]
  },
  {
    id: 4,
    title: "LibreOffice Mastery",
    category: "Office",
    difficulty: "Medium",
    description: "Master open-source office alternatives to Microsoft Office.",
    reward: "150 XP",
    questions: [
      {
        question: "What is LibreOffice?",
        options: [
          "A paid office suite",
          "A free and open-source office suite",
          "An online-only office tool",
          "A Microsoft product"
        ],
        correct: 1,
        explanation: "LibreOffice is a free and open-source office suite that includes word processing, spreadsheets, presentations, and more."
      },
      {
        question: "Which LibreOffice component replaces Microsoft Word?",
        options: ["Calc", "Impress", "Writer", "Base"],
        correct: 2,
        explanation: "LibreOffice Writer is the word processor that replaces Microsoft Word."
      },
      {
        question: "Can LibreOffice open Microsoft Office files?",
        options: [
          "No, never",
          "Yes, it can open .docx, .xlsx, and .pptx files",
          "Only old formats",
          "Only if you pay"
        ],
        correct: 1,
        explanation: "LibreOffice can open and save Microsoft Office formats, though some complex formatting may need adjustment."
      },
      {
        question: "What file format does LibreOffice use by default?",
        options: [".docx", ".odt (OpenDocument)", ".pdf", ".rtf"],
        correct: 1,
        explanation: "LibreOffice uses OpenDocument Format (ODF) by default, an ISO standard open format."
      }
    ]
  },
  {
    id: 5,
    title: "Linux Essentials",
    category: "Linux",
    difficulty: "Hard",
    description: "Test your Linux command line and system knowledge.",
    reward: "200 XP",
    questions: [
      {
        question: "What is the Linux kernel?",
        options: [
          "A type of Linux distribution",
          "The core of the Linux operating system",
          "A Linux application",
          "A Linux desktop environment"
        ],
        correct: 1,
        explanation: "The kernel is the core component of Linux that manages hardware and system resources."
      },
      {
        question: "What command lists files in a directory?",
        options: ["list", "show", "ls", "dir"],
        correct: 2,
        explanation: "The 'ls' command lists directory contents in Linux/Unix systems."
      },
      {
        question: "Which Linux distribution is known for being lightweight?",
        options: ["Ubuntu", "Linux Lite", "Fedora", "Debian"],
        correct: 1,
        explanation: "Linux Lite is specifically designed to be lightweight and run well on older hardware."
      },
      {
        question: "What does 'sudo' stand for?",
        options: [
          "Super User Directory Operation",
          "Substitute User DO",
          "System User Direct Operation",
          "Super DO"
        ],
        correct: 1,
        explanation: "Sudo stands for 'Substitute User DO' and allows users to run commands with elevated privileges."
      },
      {
        question: "Which desktop environment is commonly used in Ubuntu?",
        options: ["KDE", "GNOME", "XFCE", "LXDE"],
        correct: 1,
        explanation: "Ubuntu uses GNOME as its default desktop environment (though it offers other options)."
      }
    ]
  },
  {
    id: 6,
    title: "Digital Security",
    category: "Security",
    difficulty: "Hard",
    description: "Learn about cybersecurity and protecting digital independence.",
    reward: "200 XP",
    questions: [
      {
        question: "Why is open-source software often considered more secure?",
        options: [
          "It's always bug-free",
          "Source code can be audited by anyone",
          "It has fewer features",
          "It's newer"
        ],
        correct: 1,
        explanation: "Open-source software security benefits from transparency - anyone can review and audit the code for vulnerabilities."
      },
      {
        question: "What is a common security risk with proprietary software?",
        options: [
          "It's always slower",
          "Hidden vulnerabilities and backdoors can't be easily detected",
          "It costs more",
          "It has fewer updates"
        ],
        correct: 1,
        explanation: "Proprietary software's closed source makes it harder to detect security issues and backdoors."
      },
      {
        question: "What does GDPR stand for?",
        options: [
          "General Data Protection Regulation (RGPD in French)",
          "General Digital Protection Rule",
          "General Data Processing Regulation",
          "General Digital Privacy Regulation"
        ],
        correct: 0,
        explanation: "GDPR (General Data Protection Regulation) or RGPD in French is the regulation protecting personal data in the EU."
      },
      {
        question: "Why should schools avoid storing student data on external cloud services?",
        options: [
          "They're always more expensive",
          "Privacy risks and loss of data control",
          "They're slower",
          "They have fewer features"
        ],
        correct: 1,
        explanation: "External cloud services pose privacy risks and schools lose control over sensitive student data."
      }
    ]
  },
  {
    id: 7,
    title: "Computer Recycling",
    category: "Ecology",
    difficulty: "Easy",
    description: "Understand the environmental benefits of reusing hardware with Linux.",
    reward: "100 XP",
    questions: [
      {
        question: "How much waste can be avoided by reusing a computer?",
        options: [
          "5kg",
          "30kg",
          "100kg",
          "No waste is avoided"
        ],
        correct: 1,
        explanation: "Reusing a computer can avoid approximately 30kg of electronic waste."
      },
      {
        question: "Why is Linux ideal for older computers?",
        options: [
          "It requires more resources",
          "It's less efficient",
          "Many distributions have low system requirements",
          "It only works on new hardware"
        ],
        correct: 2,
        explanation: "Many Linux distributions are lightweight and can breathe new life into older hardware that can't run modern Windows."
      },
      {
        question: "What is the environmental impact of using Linux on older hardware?",
        options: [
          "Higher energy consumption",
          "Lower energy consumption and reduced e-waste",
          "No difference",
          "More emissions"
        ],
        correct: 1,
        explanation: "Linux extends hardware lifespan and typically uses less energy, reducing both e-waste and carbon footprint."
      },
      {
        question: "Which Linux distribution is specifically designed for old computers?",
        options: ["Ubuntu", "Linux Lite", "Fedora", "All of them"],
        correct: 1,
        explanation: "Linux Lite is specifically optimized to run well on older, lower-spec hardware."
      }
    ]
  },
  {
    id: 8,
    title: "Open Source Philosophy",
    category: "Philosophy",
    difficulty: "Medium",
    description: "Explore the principles and values behind free and open-source software.",
    reward: "150 XP",
    questions: [
      {
        question: "Who is considered the father of free software?",
        options: [
          "Linus Torvalds",
          "Richard Stallman",
          "Bill Gates",
          "Steve Jobs"
        ],
        correct: 1,
        explanation: "Richard Stallman founded the Free Software Foundation and the GNU Project, advocating for software freedom."
      },
      {
        question: "What are the four essential freedoms of free software?",
        options: [
          "Use, install, update, delete",
          "Run, study, modify, distribute",
          "Buy, sell, rent, lease",
          "Create, edit, save, print"
        ],
        correct: 1,
        explanation: "The four freedoms are: freedom to run, study how it works, modify it, and distribute copies."
      },
      {
        question: "What is the difference between 'free software' and 'open source'?",
        options: [
          "They're exactly the same",
          "Open source focuses on practical benefits, free software on ethical principles",
          "Free software costs money, open source doesn't",
          "There's no difference"
        ],
        correct: 1,
        explanation: "While often similar, free software emphasizes ethical freedoms, while open source focuses on practical development benefits."
      },
      {
        question: "What does 'copyleft' mean?",
        options: [
          "A license that prevents any use",
          "A license that ensures software stays free (like GPL)",
          "A license that makes software proprietary",
          "A type of copyright violation"
        ],
        correct: 1,
        explanation: "Copyleft (like the GPL license) ensures that modified versions must also remain free and open."
      }
    ]
  },
  {
    id: 9,
    title: "School Budget Savings",
    category: "Economics",
    difficulty: "Easy",
    description: "Learn how N.I.R.D helps schools save money while gaining independence.",
    reward: "100 XP",
    questions: [
      {
        question: "How much can a school save per year with N.I.R.D?",
        options: [
          "10,000€",
          "50,000€",
          "80,000€",
          "100,000€"
        ],
        correct: 2,
        explanation: "Schools using N.I.R.D can save approximately 80,000€ per year by avoiding proprietary software licenses."
      },
      {
        question: "What is the main cost savings from using free software?",
        options: [
          "No hardware needed",
          "No licensing fees for operating systems and office suites",
          "Faster internet",
          "Less electricity"
        ],
        correct: 1,
        explanation: "Free software eliminates expensive licensing costs for operating systems, office suites, and other software."
      },
      {
        question: "How does using reconditioned computers help schools?",
        options: [
          "They're always faster",
          "Lower initial cost and reduced environmental impact",
          "They need more maintenance",
          "They're harder to use"
        ],
        correct: 1,
        explanation: "Reconditioned computers cost less initially and reduce both environmental impact and ongoing expenses."
      },
      {
        question: "What percentage of school budgets typically goes to proprietary software licenses?",
        options: [
          "5-10%",
          "10-20%",
          "20-30%",
          "Over 30%"
        ],
        correct: 1,
        explanation: "Proprietary software licenses can consume 10-20% of a school's IT budget, which N.I.R.D eliminates."
      }
    ]
  },
  {
    id: 10,
    title: "Data Sovereignty",
    category: "Privacy",
    difficulty: "Hard",
    description: "Understand data control, privacy, and why it matters for schools.",
    reward: "200 XP",
    questions: [
      {
        question: "What does 'data sovereignty' mean?",
        options: [
          "Data belongs to companies",
          "The right to control your own data and where it's stored",
          "Data can be sold freely",
          "Data has no value"
        ],
        correct: 1,
        explanation: "Data sovereignty means having control over your data, including where it's stored and how it's used."
      },
      {
        question: "Why should schools store data in France (GDPR compliance)?",
        options: [
          "It's cheaper",
          "Better legal protection and data control under EU/French law",
          "Faster access",
          "No reason"
        ],
        correct: 1,
        explanation: "Storing data in France ensures compliance with GDPR and French data protection laws, giving schools better control."
      },
      {
        question: "What happens to your data when using services like Google Workspace?",
        options: [
          "It stays on your server",
          "It's stored on Google's servers, often outside the EU",
          "It's automatically deleted",
          "You control everything"
        ],
        correct: 1,
        explanation: "Google Workspace stores data on Google's servers, which may be outside the EU, reducing your control and privacy."
      },
      {
        question: "What is a self-hosted solution?",
        options: [
          "Software installed on your own servers",
          "Cloud software you rent",
          "Software that costs more",
          "Software that doesn't work"
        ],
        correct: 0,
        explanation: "Self-hosted solutions run on your own infrastructure, giving you complete control over data and privacy."
      },
      {
        question: "Why is data localization important for schools?",
        options: [
          "It's not important",
          "Legal compliance, better security control, and protection of student privacy",
          "It's faster",
          "It costs less"
        ],
        correct: 1,
        explanation: "Data localization ensures compliance with local laws, better security oversight, and protection of sensitive student information."
      }
    ]
  }
];

export default function QuestPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<typeof quizzes[0] | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState<number[]>([]);

  const handleQuizStart = (quiz: typeof quizzes[0]) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !selectedQuiz) return;
    
    if (selectedAnswer === selectedQuiz.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (!selectedQuiz) return;
    
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      if (!completedQuizzes.includes(selectedQuiz.id)) {
        setCompletedQuizzes([...completedQuizzes, selectedQuiz.id]);
      }
      setSelectedQuiz(null);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setScore(0);
    }
  };

  const handleCloseQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const calculateProgress = () => {
    return Math.round((completedQuizzes.length / quizzes.length) * 100);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <Navbar />

      {/*SECTION 1: HERO HEADER & CURVE */}
      {/* Change the gradient colors here to match your brand */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white pt-36 pb-32 overflow-hidden">
        
        {/* Abstract Background Shapes (Optional visual flair) */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            Quiz & Challenges
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Test your knowledge about free software, Linux, and digital independence.
          </p>
        </div>

        
      </div>

      {/* SECTION 2: FLOATING DASHBOARD / STATS */}
      {/* This container floats up (-mt) to bridge the header and body */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-12 mb-16">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: User Level / Avatar */}
          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
             </div>
             <div>
               <h3 className="text-lg font-bold text-slate-800">Quizzes Completed</h3>
               <p className="text-slate-500 text-sm">{completedQuizzes.length} / {quizzes.length}</p>
             </div>
          </div>

          {/* Center: Progress Bar */}
          <div className="flex-1 w-full md:px-8">
             <div className="flex justify-between text-xs font-bold uppercase text-slate-400 mb-2">
                <span>Overall Progress</span>
                <span>{calculateProgress()}%</span>
             </div>
             <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500" style={{ width: `${calculateProgress()}%` }}></div>
             </div>
          </div>

          {/* Right: Action Button */}
          <button 
            onClick={() => {
              const firstIncomplete = quizzes.find(q => !completedQuizzes.includes(q.id));
              if (firstIncomplete) handleQuizStart(firstIncomplete);
            }}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
          >
             Start Quiz
          </button>
        </div>
      </div>

      {/* SECTION 3: CONTENT GRID */}
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Available Quizzes</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuestCard
              key={quiz.id}
              quiz={quiz}
              isCompleted={completedQuizzes.includes(quiz.id)}
              onStart={() => handleQuizStart(quiz)}
            />
          ))}
        </div>
      </div>

      {/* Quiz Modal */}
      <AnimatePresence>
        {selectedQuiz && (
          <QuizModal
            quiz={selectedQuiz}
            currentQuestion={currentQuestion}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            score={score}
            onAnswerSelect={handleAnswerSelect}
            onSubmitAnswer={handleSubmitAnswer}
            onNextQuestion={handleNextQuestion}
            onClose={handleCloseQuiz}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

// --- Quest Card Component ---
function QuestCard({ quiz, isCompleted, onStart }: { quiz: typeof quizzes[0], isCompleted: boolean, onStart: () => void }) {
  const difficultyColors: Record<string, string> = {
    Easy: "bg-green-50 text-green-600",
    Medium: "bg-yellow-50 text-yellow-600",
    Hard: "bg-red-50 text-red-600",
    Expert: "bg-purple-50 text-purple-600"
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group relative p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all cursor-pointer"
      onClick={onStart}
    >
      {isCompleted && (
        <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <Check className="w-5 h-5 text-white" />
        </div>
      )}

      {/* Tag / Badge Area */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${difficultyColors[quiz.difficulty] || "bg-blue-50 text-blue-600"}`}>
          {quiz.difficulty}
        </span>
        {isCompleted && (
          <Lock className="w-4 h-4 text-green-500" />
        )}
      </div>

      {/* Text Content Area */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{quiz.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-3">
          {quiz.description}
        </p>
        <div className="text-xs text-slate-400 font-semibold">
          {quiz.questions.length} questions
        </div>
      </div>

      {/* Footer / Icon Area */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-slate-600 font-semibold text-sm">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>{quiz.reward}</span>
        </div>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}

// --- Quiz Modal Component ---
function QuizModal({
  quiz,
  currentQuestion,
  selectedAnswer,
  showResult,
  score,
  onAnswerSelect,
  onSubmitAnswer,
  onNextQuestion,
  onClose
}: {
  quiz: typeof quizzes[0],
  currentQuestion: number,
  selectedAnswer: number | null,
  showResult: boolean,
  score: number,
  onAnswerSelect: (index: number) => void,
  onSubmitAnswer: () => void,
  onNextQuestion: () => void,
  onClose: () => void
}) {
  const question = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const isCorrect = selectedAnswer === question.correct;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50"
        onClick={!showResult ? onClose : undefined}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{quiz.title}</h2>
              <p className="text-blue-100 text-sm mt-1">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 pt-4">
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-6">
              {question.question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {question.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all text-slate-700 font-medium";
                
                if (showResult) {
                  if (index === question.correct) {
                    buttonClass += " border-green-500 bg-green-50 text-green-700";
                  } else if (index === selectedAnswer && index !== question.correct) {
                    buttonClass += " border-red-500 bg-red-50 text-red-700";
                  } else {
                    buttonClass += " border-slate-200 bg-slate-50 text-slate-500";
                  }
                } else {
                  if (selectedAnswer === index) {
                    buttonClass += " border-blue-500 bg-blue-50 text-blue-700";
                  } else {
                    buttonClass += " border-slate-200 hover:border-blue-300 hover:bg-blue-50";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => onAnswerSelect(index)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && index === question.correct && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                      {showResult && index === selectedAnswer && index !== question.correct && (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-xl mb-6 ${
                  isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                }`}
              >
                <p className={`font-semibold mb-2 ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                  {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                </p>
                <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                  {question.explanation}
                </p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!showResult ? (
                <button
                  onClick={onSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={onNextQuestion}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  {isLastQuestion ? "View Results" : "Next Question"}
                </button>
              )}
            </div>

            {/* Final Score */}
            {showResult && isLastQuestion && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl text-center border-2 border-blue-200"
              >
                <h4 className="text-2xl font-bold text-slate-800 mb-2">Quiz Complete!</h4>
                <p className="text-lg text-slate-600">
                  You scored <span className="font-bold text-blue-600">{score}</span> out of{" "}
                  <span className="font-bold">{quiz.questions.length}</span>
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  {Math.round((score / quiz.questions.length) * 100)}% correct
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}