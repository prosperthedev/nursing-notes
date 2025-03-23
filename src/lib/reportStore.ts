"use client";

import { create } from "zustand";
import { PatientInfoData } from "@/components/FormSections/PatientInfoSection";
import { SubjectiveData } from "@/components/FormSections/SubjectiveDataSection";
import { ObjectiveData } from "@/components/FormSections/ObjectiveDataSection";
import { AssessmentData } from "@/components/FormSections/AssessmentSection";
import { PlanningData } from "@/components/FormSections/PlanningSection";
import { InterventionData } from "@/components/FormSections/InterventionSection";

interface ReportStore {
  patientInfo: PatientInfoData;
  subjectiveData: SubjectiveData;
  objectiveData: ObjectiveData;
  assessmentData: AssessmentData;
  planningData: PlanningData;
  interventionData: InterventionData;
  updatePatientInfo: (data: PatientInfoData) => void;
  updateSubjectiveData: (data: SubjectiveData) => void;
  updateObjectiveData: (data: ObjectiveData) => void;
  updateAssessmentData: (data: AssessmentData) => void;
  updatePlanningData: (data: PlanningData) => void;
  updateInterventionData: (data: InterventionData) => void;
  resetForm: () => void;
}

const initialPatientInfo: PatientInfoData = {
  receivedFrom: {
    role: "",
    name: "",
  },
};

const initialSubjectiveData: SubjectiveData = {
  subjectiveType: "nil",
  customText: "",
  commonSymptoms: [],
};

const initialObjectiveData: ObjectiveData = {
  respiratory: {
    status: "not-assessed",
    notes: "",
    symptoms: [],
    vitalSigns: {},
  },
  cardiovascular: {
    status: "not-assessed",
    notes: "",
    symptoms: [],
    vitalSigns: {},
  },
  cns: {
    status: "not-assessed",
    notes: "",
    symptoms: [],
    assessments: {},
  },
  git: {
    status: "not-assessed",
    notes: "",
    symptoms: [],
    assessments: {},
  },
  renal: {
    status: "not-assessed",
    notes: "",
    symptoms: [],
    assessments: {},
  },
  skin: {
    status: "not-assessed",
    notes: "",
    symptoms: [],
    assessments: {},
  },
};

const initialAssessmentData: AssessmentData = {
  assessmentType: "standard",
  standardAssessments: [],
  customAssessment: "",
};

const initialPlanningData: PlanningData = {
  planType: "standard",
  standardPlans: [],
  customPlan: "",
};

const initialInterventionData: InterventionData = {
  interventionType: "standard",
  standardInterventions: [],
  customIntervention: "",
};

export const useReportStore = create<ReportStore>((set) => ({
  patientInfo: initialPatientInfo,
  subjectiveData: initialSubjectiveData,
  objectiveData: initialObjectiveData,
  assessmentData: initialAssessmentData,
  planningData: initialPlanningData,
  interventionData: initialInterventionData,

  updatePatientInfo: (data) => set({ patientInfo: data }),
  updateSubjectiveData: (data) => set({ subjectiveData: data }),
  updateObjectiveData: (data) => set({ objectiveData: data }),
  updateAssessmentData: (data) => set({ assessmentData: data }),
  updatePlanningData: (data) => set({ planningData: data }),
  updateInterventionData: (data) => set({ interventionData: data }),

  resetForm: () =>
    set({
      patientInfo: initialPatientInfo,
      subjectiveData: initialSubjectiveData,
      objectiveData: initialObjectiveData,
      assessmentData: initialAssessmentData,
      planningData: initialPlanningData,
      interventionData: initialInterventionData,
    }),
}));
