import React, { useState, useEffect, useRef } from 'react';
import { Check, Copy, AlertCircle, CheckCircle2, Clock, User, FileText, ShieldAlert } from 'lucide-react';

const SECTIONS = [
  { id: 'purpose', label: 'Purpose' },
  { id: 'when-to-use', label: 'When to use' },
  { id: 'when-not-to-use', label: 'When not to use' },
  { id: 'inputs', label: 'Inputs' },
  { id: 'outputs', label: 'Outputs' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'rules', label: 'Rules' },
  { id: 'error-handling', label: 'Error handling' },
  { id: 'dependencies', label: 'Dependencies' },
  { id: 'examples', label: 'Examples' },
  { id: 'evaluation', label: 'Evaluation' },
  { id: 'maintenance', label: 'Maintenance' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [copied, setCopied] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          // Find the top-most visible section
          visibleSections.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActiveSection(visibleSections[0].target.id);
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.current?.observe(element);
    });

    return () => observer.current?.disconnect();
  }, []);

  const handleCopy = () => {
    const frontmatter = `---
name: skill-name
description: Use this skill when the user needs [specific job to be done]. Do not use it for [clear exclusions]. Best for [situations, artifacts, systems, or inputs].
version: 0.1.0
owner: team-or-person
status: draft
review_cycle: monthly
risk_level: low|medium|high
---`;
    navigator.clipboard.writeText(frontmatter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr] gap-6 mb-8">
          {/* Main Hero Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_12px_30px_rgba(21,33,72,0.04)] border border-slate-100 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-wider uppercase mb-6">
              Skill Documentation Template
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              Skill Name
            </h1>
            
            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
              Use this visual template to document a skill with clear scope, structured inputs and outputs, defined workflows, and operational guardrails. Designed for readability, handoff, and repeatable execution.
            </p>
          </div>

          {/* Metadata Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_12px_30px_rgba(21,33,72,0.04)] border border-slate-100 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Metadata</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Name</span>
                  <span className="block text-sm font-semibold text-slate-700 truncate">skill-name</span>
                </div>
                <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Version</span>
                  <span className="block text-sm font-semibold text-slate-700">0.1.0</span>
                </div>
                <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Owner</span>
                  <span className="block text-sm font-semibold text-slate-700 truncate">team-or-person</span>
                </div>
                <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Review Cycle</span>
                  <span className="block text-sm font-semibold text-slate-700">monthly</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-600 border border-orange-200/50">
                Status: draft
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/50">
                Risk: low
              </span>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          
          {/* Sticky Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-8 bg-white rounded-3xl p-6 shadow-[0_12px_30px_rgba(21,33,72,0.04)] border border-slate-100">
              <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Contents</h2>
              <nav className="space-y-1.5">
                {SECTIONS.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`block px-3 py-2 text-sm rounded-xl transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100/50 translate-x-1'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                    }`}
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="space-y-6">
            
            <Section id="purpose" title="Purpose">
              <p className="text-slate-600 leading-relaxed">
                One paragraph on what this skill does, why it exists, and the outcome it should produce. This section should frame the business value, the intended user need, and the standard of completion.
              </p>
            </Section>

            <Section id="when-to-use" title="When to use">
              <ul className="list-disc pl-5 space-y-2 text-slate-600 marker:text-slate-300">
                <li>Use when the user needs a clearly defined job to be done.</li>
                <li>Use when the task matches this skill's documented scope and system behavior.</li>
                <li>Trigger phrases, artifacts, or user intents that should activate this skill.</li>
              </ul>
            </Section>

            <Section id="when-not-to-use" title="When not to use">
              <ul className="list-disc pl-5 space-y-2 text-slate-600 marker:text-slate-300">
                <li>Do not use when the request falls outside the documented scope.</li>
                <li>Hand off to another skill or system when a better-fit workflow exists.</li>
                <li>Ask clarifying questions if the request is ambiguous or missing critical context.</li>
              </ul>
            </Section>

            <Section id="inputs" title="Inputs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Required inputs
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 marker:text-slate-300">
                    <li>Required inputs:</li>
                    <li>Accepted formats:</li>
                    <li>Minimum context needed to proceed:</li>
                  </ul>
                </div>
                <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" /> Optional inputs
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 marker:text-slate-300">
                    <li>Optional inputs:</li>
                    <li>Assumptions about missing data:</li>
                    <li>Fallback defaults:</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="outputs" title="Outputs">
              <ul className="list-disc pl-5 space-y-2 text-slate-600 marker:text-slate-300">
                <li>Expected output format:</li>
                <li>Required sections or schema:</li>
                <li>Quality bar:</li>
                <li>What success looks like:</li>
              </ul>
            </Section>

            <Section id="workflow" title="Workflow">
              <ol className="list-decimal pl-5 space-y-2 text-slate-600 marker:text-slate-400 marker:font-medium">
                <li>Confirm task and missing context.</li>
                <li>Inspect inputs and constraints.</li>
                <li>Follow the documented procedure.</li>
                <li>Validate the result.</li>
                <li>Return output in the required structure.</li>
                <li>Escalate or ask for clarification when needed.</li>
              </ol>
            </Section>

            <Section id="rules" title="Rules">
              <ul className="list-disc pl-5 space-y-2 text-slate-600 marker:text-slate-300">
                <li>Stay within documented scope.</li>
                <li>Do not invent unavailable facts.</li>
                <li>Prefer deterministic steps when possible.</li>
                <li>Cite or reference source material when required.</li>
                <li>Follow privacy, security, and policy requirements.</li>
              </ul>
            </Section>

            <Section id="error-handling" title="Error handling">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Input issues</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 marker:text-slate-300">
                    <li>If required input is missing, ask:</li>
                    <li>If output confidence is low, do:</li>
                  </ul>
                </div>
                <div className="bg-slate-50/50 rounded-2xl p-5 border border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">Execution issues</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-600 marker:text-slate-300">
                    <li>If a tool or script fails, do:</li>
                    <li>If policy risk appears, escalate to:</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="dependencies" title="Dependencies">
              <ul className="list-disc pl-5 space-y-2 text-slate-600 marker:text-slate-300">
                <li>Tools:</li>
                <li>Scripts:</li>
                <li>Reference files:</li>
                <li>External systems:</li>
                <li>Permissions needed:</li>
              </ul>
            </Section>

            <Section id="examples" title="Examples">
              <div className="space-y-4">
                <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl p-5 border border-slate-200">
                  <strong className="block text-sm text-slate-900 mb-3">Example 1</strong>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div><span className="font-medium text-slate-700">User request:</span></div>
                    <div><span className="font-medium text-slate-700">Expected behavior:</span></div>
                    <div><span className="font-medium text-slate-700">Expected output:</span></div>
                  </div>
                </div>
                <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl p-5 border border-slate-200">
                  <strong className="block text-sm text-slate-900 mb-3">Example 2</strong>
                  <div className="space-y-2 text-sm text-slate-600">
                    <div><span className="font-medium text-slate-700">User request:</span></div>
                    <div><span className="font-medium text-slate-700">Expected behavior:</span></div>
                    <div><span className="font-medium text-slate-700">Expected output:</span></div>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="evaluation" title="Evaluation">
              <ul className="list-disc pl-5 space-y-2 text-slate-600 marker:text-slate-300">
                <li>Test prompts:</li>
                <li>Failure modes:</li>
                <li>Edge cases:</li>
                <li>Regression checks:</li>
                <li>Metrics to watch:</li>
              </ul>
            </Section>

            <Section id="maintenance" title="Maintenance">
              <ul className="list-disc pl-5 space-y-2 text-slate-600 marker:text-slate-300">
                <li>Owner:</li>
                <li>Last reviewed:</li>
                <li>Next review:</li>
                <li>Change log summary:</li>
                <li>Known limitations:</li>
                <li>Improvement backlog:</li>
              </ul>
            </Section>

            {/* Raw Frontmatter Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_12px_30px_rgba(21,33,72,0.04)] border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-900 tracking-tight">Raw Frontmatter Reference</h2>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              
              <div className="relative group">
                <pre className="bg-[#0f172a] text-slate-300 rounded-2xl p-5 overflow-x-auto text-sm leading-relaxed border border-slate-800 font-mono">
{`---
name: skill-name
description: Use this skill when the user needs [specific job to be done]. Do not use it for [clear exclusions]. Best for [situations, artifacts, systems, or inputs].
version: 0.1.0
owner: team-or-person
status: draft
review_cycle: monthly
risk_level: low|medium|high
---`}</pre>
              </div>
              <p className="mt-4 text-sm text-slate-500">
                This HTML version is designed to function as a styled documentation shell you can duplicate, populate, and adapt for your skill library.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for consistent section styling
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_12px_30px_rgba(21,33,72,0.04)] border border-slate-100 scroll-mt-8">
      <h2 className="text-xl font-semibold text-slate-900 mb-4 tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
