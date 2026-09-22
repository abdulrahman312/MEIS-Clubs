import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  User,
  Check,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { GRADE_SECTIONS, getGradesForGradeBand, SECTIONS_A_TO_Z } from '../data/gradeSections';
import { RegistrationFormData } from '../types';
import { getClubIcon } from './RegistrationPage';

interface StudentRegistrationFormProps {
  onBack: () => void;
  initialGradeSectionId?: string;
}

// Directly connected Google Apps Script Web App URL provided by user
const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyzOLe_gBDg-hZs9ETa29UaFFUTn7dJ1Gg6wPFNWlsz6DLPI_5S6K_DEl1r_TjpmqndbA/exec';

const LOCAL_STORAGE_KEY_SUBMISSIONS = 'meis_club_submissions_log';

export const StudentRegistrationForm: React.FC<StudentRegistrationFormProps> = ({
  onBack,
  initialGradeSectionId = 'girls-1-3'
}) => {
  // Find initial section or default to first
  const initialSection =
    GRADE_SECTIONS.find((s) => s.id === initialGradeSectionId) || GRADE_SECTIONS[0];

  // Form State
  const [selectedSectionId, setSelectedSectionId] = useState<string>(initialSection.id);
  const [studentName, setStudentName] = useState<string>('');
  const [grade, setGrade] = useState<string>('Grade 1');
  const [section, setSection] = useState<string>('A');

  // Selection can be { type: 'package', name: string } or { type: 'external', name: string }
  const [selectedClubType, setSelectedClubType] = useState<'package' | 'external'>('package');
  const [selectedClubChoice, setSelectedClubChoice] = useState<string>(
    initialSection.packages[0]?.name || ''
  );

  // Form submission and validation state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<RegistrationFormData | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Current active section metadata
  const currentSectionData =
    GRADE_SECTIONS.find((s) => s.id === selectedSectionId) || GRADE_SECTIONS[0];

  // Available grades for the current band
  const availableGrades = getGradesForGradeBand(currentSectionData.gradeBand);

  // Always scroll to top when the registration form component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Sync grade and default club when section changes
  useEffect(() => {
    const grades = getGradesForGradeBand(currentSectionData.gradeBand);
    if (!grades.includes(grade)) {
      setGrade(grades[0] || 'Grade 1');
    }

    // Default to the first package if current choice isn't in current section
    const pkgExists = currentSectionData.packages.some((p) => p.name === selectedClubChoice);
    const extExists = currentSectionData.externalClubs.includes(selectedClubChoice);

    if (!pkgExists && !extExists) {
      if (currentSectionData.packages.length > 0) {
        setSelectedClubType('package');
        setSelectedClubChoice(currentSectionData.packages[0].name);
      } else if (currentSectionData.externalClubs.length > 0) {
        setSelectedClubType('external');
        setSelectedClubChoice(currentSectionData.externalClubs[0]);
      }
    }
  }, [selectedSectionId, currentSectionData]);

  // Compute final 5th column value:
  // "If the user select package Tulip then in the last field add 'Package - Tulip'"
  // "and if the user selects one of the External club like 'Build It' then add the data 'External - Build It'"
  const computeSelectedClubValue = (): string => {
    if (selectedClubType === 'package') {
      return `Package - ${selectedClubChoice}`;
    }
    return `External - ${selectedClubChoice}`;
  };

  const handleGradeLevelChange = (newId: string) => {
    setSelectedSectionId(newId);
    setValidationError(null);
    const targetSection = GRADE_SECTIONS.find((s) => s.id === newId) || GRADE_SECTIONS[0];
    const newGrades = getGradesForGradeBand(targetSection.gradeBand);
    setGrade(newGrades[0]);
    if (targetSection.packages.length > 0) {
      setSelectedClubType('package');
      setSelectedClubChoice(targetSection.packages[0].name);
    } else {
      setSelectedClubType('external');
      setSelectedClubChoice(targetSection.externalClubs[0] || '');
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentName.trim()) {
      setValidationError('Please enter the student\'s full name.');
      return;
    }

    if (!selectedClubChoice) {
      setValidationError('Please select a club package or an external club.');
      return;
    }

    setValidationError(null);
    setIsSubmitting(true);

    const submissionPayload: RegistrationFormData = {
      gradeLevel: currentSectionData.title,
      studentName: studentName.trim(),
      grade: grade,
      section: section,
      selectedClub: computeSelectedClubValue()
    };

    // Store in local backup log so records are safely archived
    try {
      const existingLogsRaw = localStorage.getItem(LOCAL_STORAGE_KEY_SUBMISSIONS);
      const existingLogs: Array<RegistrationFormData & { timestamp: string }> = existingLogsRaw
        ? JSON.parse(existingLogsRaw)
        : [];
      existingLogs.unshift({
        ...submissionPayload,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(LOCAL_STORAGE_KEY_SUBMISSIONS, JSON.stringify(existingLogs.slice(0, 100)));
    } catch (err) {
      console.warn('Could not store to local backup storage:', err);
    }

    // Direct submission to backend Google Apps Script
    try {
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(submissionPayload)
      });
    } catch (postErr) {
      console.warn('Backend submission notification:', postErr);
    }

    // Smooth UI transition
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData(submissionPayload);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  };

  const handleResetForm = () => {
    setStudentName('');
    setSubmittedData(null);
    setValidationError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* Top Header - Fully responsive, clean white background */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-8 py-2.5 sm:py-3.5 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs sm:text-sm transition-all active:scale-95 shrink-0"
            aria-label="Back to Registration Guide"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="hidden xs:inline">Back to Guide</span>
            <span className="xs:hidden">Back</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img
              src="/images/logo/club_logo.png"
              alt="MEIS Clubs"
              className="h-7 sm:h-9 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-[#1c448d] text-xs sm:text-base leading-tight tracking-tight truncate">
                MEIS CLUBS
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium truncate">
                Student Registration Form
              </span>
            </div>
          </div>

          <div className="flex items-center shrink-0">
            <img
              src="/images/logo/meis_logo.png"
              alt="MEIS Logo"
              className="h-7 sm:h-9 w-auto object-contain"
            />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-5 sm:space-y-6">
        
        {/* Important Parent Advisory Notice */}
        <section className="rounded-2xl bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-white border border-blue-200 p-3.5 sm:p-5 shadow-xs">
          <div className="flex items-start gap-3 sm:gap-3.5">
            <div className="p-2 sm:p-2.5 bg-[#1c448d] text-white rounded-xl shadow-xs shrink-0 mt-0.5">
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-[#1c448d] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Notice for Parents
                </span>
                <span className="text-[10px] sm:text-xs text-slate-500 font-medium hidden xs:inline">
                  • Initial Interest Survey
                </span>
              </div>
              <h1 className="text-sm sm:text-base md:text-lg font-bold text-slate-900 leading-snug">
                Student Club Preference Survey
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                This online form is intended strictly to gauge student interest and estimate club sizes. <strong>This is not the final registration.</strong> Official physical registration forms with complete pricing and schedule details will be distributed directly to students in their classrooms by their class supervisors.
              </p>
            </div>
          </div>
        </section>

        {/* AFTER SUBMISSION: Clean, light confirmation & selected preferences preview */}
        {submittedData ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl sm:rounded-3xl bg-white border border-emerald-200 p-5 sm:p-8 shadow-md text-center space-y-5 sm:space-y-6"
          >
            {/* Success Icon */}
            <div className="w-14 h-14 sm:w-18 sm:h-18 bg-emerald-50 border-2 border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-1.5 max-w-lg mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900">
                Preference Submitted!
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Thank you! Your child's club preference has been successfully recorded. Here is a summary of the details you submitted:
              </p>
            </div>

            {/* Preview of Selected Data (Clean, friendly light styling - no black boxes) */}
            <div className="text-left rounded-2xl bg-slate-50/80 border border-slate-200 p-4 sm:p-6 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#1c448d]" />
                  <span>Selected Details</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Recorded
                </span>
              </div>

              <div className="divide-y divide-slate-200/80 text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between py-2.5 gap-0.5">
                  <span className="text-slate-500 font-medium">Grade Level:</span>
                  <span className="font-bold text-slate-900">{submittedData.gradeLevel}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2.5 gap-0.5">
                  <span className="text-slate-500 font-medium">Student Name:</span>
                  <span className="font-bold text-slate-900">{submittedData.studentName}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2.5 gap-0.5">
                  <span className="text-slate-500 font-medium">Grade:</span>
                  <span className="font-bold text-slate-900">{submittedData.grade}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2.5 gap-0.5">
                  <span className="text-slate-500 font-medium">Section:</span>
                  <span className="font-bold text-slate-900">Section {submittedData.section}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between py-2.5 gap-0.5">
                  <span className="text-slate-500 font-medium">Selected Club / Package:</span>
                  <span className="font-extrabold text-[#1c448d] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/80 inline-block self-start sm:self-auto mt-1 sm:mt-0">
                    {submittedData.selectedClub}
                  </span>
                </div>
              </div>
            </div>

            {/* Advisory Follow-up */}
            <div className="text-xs text-slate-500 bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-left">
              <strong className="text-slate-800">What happens next?</strong> Final enrollment forms and schedules will be distributed in class by supervisors once club groups are organized.
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleResetForm}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1c448d] hover:bg-[#14336c] text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95"
              >
                Register Another Student
              </button>
              <button
                type="button"
                onClick={onBack}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all active:scale-95"
              >
                Back to Registration Guide
              </button>
            </div>
          </motion.div>
        ) : (
          /* THE FORM */
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-sm p-4 sm:p-7 space-y-5 sm:space-y-6"
          >
            {validationError && (
              <div className="p-3 sm:p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-rose-600" />
                <span>{validationError}</span>
              </div>
            )}

            {/* FIELD 1: Grade Level (Category Track) */}
            <div className="space-y-2">
              <label
                htmlFor="form-grade-level"
                className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2"
              >
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#1c448d] text-white flex items-center justify-center text-[11px] sm:text-xs">
                  1
                </span>
                <span>Grade Level (Category Track)</span>
              </label>

              {/* Native Dropdown */}
              <div className="relative">
                <select
                  id="form-grade-level"
                  value={selectedSectionId}
                  onChange={(e) => handleGradeLevelChange(e.target.value)}
                  className="w-full bg-slate-50 hover:bg-white border-2 border-slate-300 focus:border-[#1c448d] text-slate-900 text-sm sm:text-base font-bold rounded-xl px-3.5 py-3 sm:py-3.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1c448d]/20 cursor-pointer shadow-2xs"
                >
                  {GRADE_SECTIONS.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Visual Quick-Pills for Grade Levels */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2 pt-1">
                {GRADE_SECTIONS.map((sec) => {
                  const isSelected = sec.id === selectedSectionId;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => handleGradeLevelChange(sec.id)}
                      className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'border-2 shadow-xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                      style={{
                        borderColor: isSelected ? sec.themeColor : undefined,
                        backgroundColor: isSelected ? sec.secondaryColor : undefined
                      }}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: sec.themeColor }}
                      ></span>
                      <span
                        className="text-xs font-bold truncate leading-tight"
                        style={{ color: isSelected ? sec.themeColor : '#334155' }}
                      >
                        {sec.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FIELD 2: Student Full Name */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label
                htmlFor="form-student-name"
                className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2"
              >
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#1c448d] text-white flex items-center justify-center text-[11px] sm:text-xs">
                  2
                </span>
                <span>Student Full Name</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input
                  id="form-student-name"
                  type="text"
                  required
                  placeholder="e.g. Sarah Ahmed Al-Ghamdi"
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  className="w-full pl-10 pr-3.5 py-3 sm:py-3.5 bg-slate-50 hover:bg-white focus:bg-white border-2 border-slate-300 focus:border-[#1c448d] text-slate-900 text-sm sm:text-base font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[#1c448d]/20 placeholder:text-slate-400 shadow-2xs"
                />
              </div>
            </div>

            {/* FIELD 3 & FIELD 4 in Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
              {/* FIELD 3: Grade */}
              <div className="space-y-2">
                <label
                  htmlFor="form-grade"
                  className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#1c448d] text-white flex items-center justify-center text-[11px] sm:text-xs">
                      3
                    </span>
                    <span>Grade</span>
                  </span>
                  <span className="text-[10px] text-slate-400 lowercase font-normal">
                    ({currentSectionData.gradeBand})
                  </span>
                </label>

                <div className="relative">
                  <select
                    id="form-grade"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-white border-2 border-slate-300 focus:border-[#1c448d] text-slate-900 text-sm sm:text-base font-bold rounded-xl px-3.5 py-3 sm:py-3.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1c448d]/20 cursor-pointer shadow-2xs"
                  >
                    {availableGrades.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* FIELD 4: Section (A to Z) */}
              <div className="space-y-2">
                <label
                  htmlFor="form-section"
                  className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#1c448d] text-white flex items-center justify-center text-[11px] sm:text-xs">
                      4
                    </span>
                    <span>Section</span>
                  </span>
                  <span className="text-[10px] text-slate-400 lowercase font-normal">(A to Z)</span>
                </label>

                <div className="relative">
                  <select
                    id="form-section"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full bg-slate-50 hover:bg-white border-2 border-slate-300 focus:border-[#1c448d] text-slate-900 text-sm sm:text-base font-bold rounded-xl px-3.5 py-3 sm:py-3.5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1c448d]/20 cursor-pointer shadow-2xs"
                  >
                    {SECTIONS_A_TO_Z.map((letter) => (
                      <option key={letter} value={letter}>
                        Section {letter}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* FIELD 5: Selected Club / Package */}
            <div className="space-y-3.5 pt-3 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#1c448d] text-white flex items-center justify-center text-[11px] sm:text-xs">
                    5
                  </span>
                  <span>Select Club / Package</span>
                </label>
                <span className="text-[11px] text-slate-500">
                  Select <strong>ONE Package</strong> OR <strong>ONE External Club</strong>
                </span>
              </div>

              {/* Choice Cards (Warm, friendly light aesthetics) */}
              <div className="space-y-4">
                {/* 1. Internal Curated Packages Option */}
                {currentSectionData.packages.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-orange-800 bg-orange-100/90 px-2 py-0.5 rounded-md">
                        Curated School Packages
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentSectionData.packages.map((pkg, idx) => {
                        const isSelected =
                          selectedClubType === 'package' && selectedClubChoice === pkg.name;

                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setSelectedClubType('package');
                              setSelectedClubChoice(pkg.name);
                              setValidationError(null);
                            }}
                            className={`rounded-2xl p-3.5 sm:p-4.5 border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                              isSelected
                                ? 'bg-orange-50/70 border-orange-500 shadow-sm'
                                : 'bg-white border-slate-200 hover:border-orange-300 hover:bg-orange-50/20'
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <span
                                    className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-white inline-block mb-1"
                                    style={{ backgroundColor: currentSectionData.themeColor }}
                                  >
                                    {pkg.badgeLabel || `Package ${currentSectionData.packages.length > 1 ? idx + 1 : ''}`}
                                  </span>
                                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                                    Package {pkg.name}
                                  </h3>
                                </div>

                                <div
                                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                    isSelected
                                      ? 'border-[#1c448d] bg-[#1c448d] text-white'
                                      : 'border-slate-300 bg-white'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>
                              </div>

                              {/* Included Clubs list */}
                              <div className="pt-2 border-t border-slate-100">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                                  Includes 4 Rotating Clubs:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {pkg.clubs.map((c, cIdx) => (
                                    <span
                                      key={cIdx}
                                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700 shadow-2xs"
                                    >
                                      {getClubIcon(c)}
                                      <span className="truncate">{c}</span>
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. Specialist External Clubs Option */}
                {currentSectionData.externalClubs.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/90 px-2 py-0.5 rounded-md">
                        Specialist External Clubs
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                      {currentSectionData.externalClubs.map((extClub, idx) => {
                        const isSelected =
                          selectedClubType === 'external' && selectedClubChoice === extClub;

                        return (
                          <div
                            key={idx}
                            onClick={() => {
                              setSelectedClubType('external');
                              setSelectedClubChoice(extClub);
                              setValidationError(null);
                            }}
                            className={`rounded-xl p-3 border-2 transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                              isSelected
                                ? 'bg-teal-50 border-teal-600 shadow-xs'
                                : 'bg-white border-slate-200 hover:border-teal-300 hover:bg-teal-50/20'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="p-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-700 shrink-0">
                                {getClubIcon(extClub)}
                              </div>
                              <div className="min-w-0">
                                <span className="text-[9px] font-bold uppercase text-teal-700 block">
                                  External Club
                                </span>
                                <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug truncate">
                                  {extClub}
                                </h4>
                              </div>
                            </div>

                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                isSelected
                                  ? 'border-teal-600 bg-teal-600 text-white'
                                  : 'border-slate-300 bg-white'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-[#1c448d] hover:bg-[#14336c] text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span>Submitting Preference...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Submit Student Preference</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-3 sm:py-4 px-4 sm:px-8 flex justify-between items-center z-20 mt-auto">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <img
            src="/images/logo/meis_logo.png"
            alt="meis logo"
            className="h-8 sm:h-10 w-auto object-contain"
          />
          <div className="flex flex-col">
            <span className="font-bold text-[#1c448d] text-xs sm:text-sm">MEIS CLUBS</span>
            <span className="text-[10px] text-slate-400 font-medium">
              Middle East International School — Murooj
            </span>
          </div>
        </div>
        <img
          src="/images/logo/ataa_logo.png"
          alt="ataa logo"
          className="h-8 sm:h-10 w-auto object-contain"
        />
      </footer>
    </div>
  );
};
