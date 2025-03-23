"use client";

import React from "react";
import { useReportStore } from "@/lib/reportStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ReportPreview: React.FC = () => {
  const {
    patientInfo,
    subjectiveData,
    objectiveData,
    assessmentData,
    planningData,
    interventionData,
  } = useReportStore();

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleString();
  };

  const renderSubjectiveSection = () => {
    if (subjectiveData.subjectiveType === "nil") {
      return <p>Nil subjective data reported.</p>;
    } else if (subjectiveData.subjectiveType === "obtained") {
      return <p>Nil subjective data obtained.</p>;
    } else {
      return (
        <div>
          {subjectiveData.commonSymptoms.length > 0 && (
            <p>
              <strong>Reported symptoms:</strong>{" "}
              {subjectiveData.commonSymptoms.join(", ")}
            </p>
          )}
          {subjectiveData.customText && <p>{subjectiveData.customText}</p>}
        </div>
      );
    }
  };

  const renderObjectiveSection = (
    system: keyof typeof objectiveData,
    title: string,
  ) => {
    const data = objectiveData[system];

    if (data.status === "not-assessed") {
      return <p>{title}: Not assessed</p>;
    } else if (data.status === "normal") {
      return <p>{title}: Normal</p>;
    } else {
      return (
        <div>
          <p>
            <strong>{title}:</strong> Abnormal
          </p>
          {data.symptoms.length > 0 && (
            <p>
              <strong>Findings:</strong> {data.symptoms.join(", ")}
            </p>
          )}
          {data.notes && <p>{data.notes}</p>}
        </div>
      );
    }
  };

  const renderAssessmentSection = () => {
    if (assessmentData.assessmentType === "standard") {
      return (
        <div>
          {assessmentData.standardAssessments.length > 0 ? (
            <ul className="list-disc pl-5">
              {assessmentData.standardAssessments.map((assessment, index) => (
                <li key={index}>{assessment}</li>
              ))}
            </ul>
          ) : (
            <p>No assessments selected.</p>
          )}
        </div>
      );
    } else {
      return (
        <p>{assessmentData.customAssessment || "No assessment provided."}</p>
      );
    }
  };

  const renderPlanningSection = () => {
    if (planningData.planType === "standard") {
      return (
        <div>
          {planningData.standardPlans.length > 0 ? (
            <ul className="list-disc pl-5">
              {planningData.standardPlans.map((plan, index) => (
                <li key={index}>{plan}</li>
              ))}
            </ul>
          ) : (
            <p>No plans selected.</p>
          )}
        </div>
      );
    } else {
      return <p>{planningData.customPlan || "No plan provided."}</p>;
    }
  };

  const renderInterventionSection = () => {
    if (interventionData.interventionType === "standard") {
      return (
        <div>
          {interventionData.standardInterventions.length > 0 ? (
            <ul className="list-disc pl-5">
              {interventionData.standardInterventions.map(
                (intervention, index) => (
                  <li key={index}>{intervention}</li>
                ),
              )}
            </ul>
          ) : (
            <p>No interventions selected.</p>
          )}
        </div>
      );
    } else {
      return (
        <p>
          {interventionData.customIntervention || "No interventions provided."}
        </p>
      );
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="bg-blue-50 border-b">
        <CardTitle className="text-xl text-blue-800">
          Nursing Progress Report
        </CardTitle>
        <p className="text-sm text-gray-600">{formatDate()}</p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="text-md font-semibold mb-2 text-blue-700">
            Handover Information
          </h3>
          <p>
            <strong>Received from:</strong> {patientInfo.receivedFrom.role}{" "}
            {patientInfo.receivedFrom.name}
          </p>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2 text-blue-700">
            Subjective
          </h3>
          {renderSubjectiveSection()}
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2 text-blue-700">
            Objective
          </h3>
          <div className="space-y-2">
            {renderObjectiveSection("respiratory", "Respiratory")}
            {renderObjectiveSection("cardiovascular", "Cardiovascular")}
            {renderObjectiveSection("cns", "CNS")}
            {renderObjectiveSection("git", "GIT")}
            {renderObjectiveSection("renal", "Renal")}
            {renderObjectiveSection("skin", "Skin")}
          </div>
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2 text-blue-700">
            Assessment
          </h3>
          {renderAssessmentSection()}
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2 text-blue-700">Planning</h3>
          {renderPlanningSection()}
        </div>

        <div>
          <h3 className="text-md font-semibold mb-2 text-blue-700">
            Interventions
          </h3>
          {renderInterventionSection()}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportPreview;
