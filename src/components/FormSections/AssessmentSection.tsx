"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface AssessmentSectionProps {
  onDataChange?: (data: AssessmentData) => void;
}

export interface AssessmentData {
  assessmentType: "standard" | "custom";
  standardAssessments: string[];
  customAssessment: string;
}

const AssessmentSection: React.FC<AssessmentSectionProps> = ({
  onDataChange = () => {},
}) => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    assessmentType: "standard",
    standardAssessments: [],
    customAssessment: "",
  });

  const standardAssessmentOptions = [
    "Patient stable",
    "Patient improving",
    "Patient deteriorating",
    "Respiratory distress",
    "Hemodynamically unstable",
    "Altered mental status",
    "Pain not controlled",
    "Risk for falls",
    "Risk for pressure injury",
    "Risk for infection",
  ];

  const handleTypeChange = (value: "standard" | "custom") => {
    const updatedData = {
      ...assessmentData,
      assessmentType: value,
    };
    setAssessmentData(updatedData);
    onDataChange(updatedData);
  };

  const handleStandardAssessmentToggle = (assessment: string) => {
    const updatedAssessments = assessmentData.standardAssessments.includes(
      assessment,
    )
      ? assessmentData.standardAssessments.filter((a) => a !== assessment)
      : [...assessmentData.standardAssessments, assessment];

    const updatedData = {
      ...assessmentData,
      standardAssessments: updatedAssessments,
    };
    setAssessmentData(updatedData);
    onDataChange(updatedData);
  };

  const handleCustomAssessmentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const updatedData = {
      ...assessmentData,
      customAssessment: e.target.value,
    };
    setAssessmentData(updatedData);
    onDataChange(updatedData);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">Assessment</h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Assessment type:</p>
          <RadioGroup
            value={assessmentData.assessmentType}
            onValueChange={(value) =>
              handleTypeChange(value as "standard" | "custom")
            }
            className="flex space-x-4 mb-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard-assessment" />
              <Label htmlFor="standard-assessment">Standard Assessment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom-assessment" />
              <Label htmlFor="custom-assessment">Custom Assessment</Label>
            </div>
          </RadioGroup>
        </div>

        {assessmentData.assessmentType === "standard" && (
          <div>
            <p className="text-sm font-medium mb-2">Select assessments:</p>
            <div className="grid grid-cols-2 gap-2">
              {standardAssessmentOptions.map((assessment) => (
                <div key={assessment} className="flex items-center space-x-2">
                  <Checkbox
                    id={`assessment-${assessment}`}
                    checked={assessmentData.standardAssessments.includes(
                      assessment,
                    )}
                    onCheckedChange={() =>
                      handleStandardAssessmentToggle(assessment)
                    }
                  />
                  <Label htmlFor={`assessment-${assessment}`}>
                    {assessment}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {assessmentData.assessmentType === "custom" && (
          <div>
            <Label
              htmlFor="custom-assessment-text"
              className="text-sm font-medium"
            >
              Custom assessment:
            </Label>
            <Textarea
              id="custom-assessment-text"
              placeholder="Enter your assessment here..."
              className="mt-1"
              value={assessmentData.customAssessment}
              onChange={handleCustomAssessmentChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentSection;
