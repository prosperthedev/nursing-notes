"use client";

import React from "react";
import { useReportStore } from "@/lib/reportStore";
import PatientInfoSection from "./FormSections/PatientInfoSection";
import SubjectiveDataSection from "./FormSections/SubjectiveDataSection";
import ObjectiveDataSection from "./FormSections/ObjectiveDataSection";
import AssessmentSection from "./FormSections/AssessmentSection";
import PlanningSection from "./FormSections/PlanningSection";
import InterventionSection from "./FormSections/InterventionSection";
import ReportPreview from "./ReportPreview";
import ExportOptions from "./ExportOptions";
import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";

const NursingReportForm: React.FC = () => {
  const {
    updatePatientInfo,
    updateSubjectiveData,
    updateObjectiveData,
    updateAssessmentData,
    updatePlanningData,
    updateInterventionData,
    resetForm,
  } = useReportStore();

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Sections */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-900">
              Nursing Progress Report
            </h1>
            <Button
              variant="outline"
              size="sm"
              onClick={resetForm}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} />
              <span>Reset Form</span>
            </Button>
          </div>

          <PatientInfoSection onDataChange={updatePatientInfo} />
          <SubjectiveDataSection onDataChange={updateSubjectiveData} />
          <ObjectiveDataSection onDataChange={updateObjectiveData} />
          <AssessmentSection onDataChange={updateAssessmentData} />
          <PlanningSection onDataChange={updatePlanningData} />
          <InterventionSection onDataChange={updateInterventionData} />
        </div>

        {/* Preview and Export */}
        <div className="w-full lg:w-1/2 space-y-4 lg:sticky lg:top-4 self-start">
          <h2 className="text-xl font-semibold text-blue-900">
            Report Preview
          </h2>
          <ReportPreview />
          <ExportOptions />
        </div>
      </div>
    </div>
  );
};

export default NursingReportForm;
