export interface PackageItem {
  name: string;
  badgeLabel?: string;
  clubs: string[];
}

export interface GradeSectionData {
  id: string;
  title: string;
  gender: 'girls' | 'boys';
  gradeBand: string;
  themeColor: string;
  secondaryColor: string;
  categoryKey: string;
  packages: PackageItem[];
  externalClubs: string[];
  externalRuleNote: string;
}

export interface RegistrationFormData {
  gradeLevel: string;    // Column 1: Grade Level
  studentName: string;   // Column 2: Student Name
  grade: string;         // Column 3: Grade
  section: string;       // Column 4: Section
  selectedClub: string;  // Column 5: Selected Club (e.g. "Package - Tulip" or "External - Build It")
}

export interface SubmissionResponse {
  success: boolean;
  message?: string;
  rowAppended?: Record<string, string>;
}
