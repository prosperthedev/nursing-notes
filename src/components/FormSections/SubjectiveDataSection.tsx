"use client";

import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

interface SubjectiveDataSectionProps {
  onDataChange?: (data: SubjectiveData) => void;
}

export interface SubjectiveData {
  subjectiveType: "nil" | "obtained" | "custom";
  customText: string;
  commonSymptoms: string[];
}

const SubjectiveDataSection: React.FC<SubjectiveDataSectionProps> = ({
  onDataChange = () => {},
}) => {
  const [subjectiveData, setSubjectiveData] = useState<SubjectiveData>({
    subjectiveType: "nil",
    customText: "",
    commonSymptoms: [],
  });

  const commonSymptomsList = [
    "Pain",
    "Shortness of breath",
    "Nausea",
    "Vomiting",
    "Dizziness",
    "Fatigue",
    "Anxiety",
    "Insomnia",
    "Loss of appetite",
    "Headache",
  ];

  const handleTypeChange = (value: "nil" | "obtained" | "custom") => {
    const updatedData = {
      ...subjectiveData,
      subjectiveType: value,
    };
    setSubjectiveData(updatedData);
    onDataChange(updatedData);
  };

  const handleCustomTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const updatedData = {
      ...subjectiveData,
      customText: e.target.value,
    };
    setSubjectiveData(updatedData);
    onDataChange(updatedData);
  };

  const handleSymptomToggle = (symptom: string) => {
    const updatedSymptoms = subjectiveData.commonSymptoms.includes(symptom)
      ? subjectiveData.commonSymptoms.filter((s) => s !== symptom)
      : [...subjectiveData.commonSymptoms, symptom];

    const updatedData = {
      ...subjectiveData,
      commonSymptoms: updatedSymptoms,
    };
    setSubjectiveData(updatedData);
    onDataChange(updatedData);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">
        Subjective Data
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Patient's subjective data:</p>
          <RadioGroup
            value={subjectiveData.subjectiveType}
            onValueChange={(value) =>
              handleTypeChange(value as "nil" | "obtained" | "custom")
            }
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nil" id="nil" />
              <Label htmlFor="nil">Nil subjective</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="obtained" id="obtained" />
              <Label htmlFor="obtained">Nil obtained</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Custom subjective data</Label>
            </div>
          </RadioGroup>
        </div>

        {subjectiveData.subjectiveType === "custom" && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Common symptoms:</p>
              <div className="grid grid-cols-2 gap-2">
                {commonSymptomsList.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox
                      id={`symptom-${symptom}`}
                      checked={subjectiveData.commonSymptoms.includes(symptom)}
                      onCheckedChange={() => handleSymptomToggle(symptom)}
                    />
                    <Label htmlFor={`symptom-${symptom}`}>{symptom}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="custom-text" className="text-sm font-medium">
                Additional subjective information:
              </Label>
              <Textarea
                id="custom-text"
                placeholder="Enter additional subjective data here..."
                className="mt-1"
                value={subjectiveData.customText}
                onChange={handleCustomTextChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectiveDataSection;
