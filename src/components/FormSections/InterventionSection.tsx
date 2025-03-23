"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface InterventionSectionProps {
  onDataChange?: (data: InterventionData) => void;
}

export interface InterventionData {
  interventionType: "standard" | "custom";
  standardInterventions: string[];
  customIntervention: string;
}

const InterventionSection: React.FC<InterventionSectionProps> = ({
  onDataChange = () => {},
}) => {
  const [interventionData, setInterventionData] = useState<InterventionData>({
    interventionType: "standard",
    standardInterventions: [],
    customIntervention: "",
  });

  const standardInterventionOptions = [
    "Administered medications as ordered",
    "Monitored vital signs",
    "Provided oxygen therapy",
    "Performed wound care",
    "Assisted with activities of daily living",
    "Provided pain management",
    "Implemented fall precautions",
    "Implemented pressure injury prevention",
    "Provided patient education",
    "Coordinated with healthcare team",
  ];

  const handleTypeChange = (value: "standard" | "custom") => {
    const updatedData = {
      ...interventionData,
      interventionType: value,
    };
    setInterventionData(updatedData);
    onDataChange(updatedData);
  };

  const handleStandardInterventionToggle = (intervention: string) => {
    const updatedInterventions =
      interventionData.standardInterventions.includes(intervention)
        ? interventionData.standardInterventions.filter(
            (i) => i !== intervention,
          )
        : [...interventionData.standardInterventions, intervention];

    const updatedData = {
      ...interventionData,
      standardInterventions: updatedInterventions,
    };
    setInterventionData(updatedData);
    onDataChange(updatedData);
  };

  const handleCustomInterventionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const updatedData = {
      ...interventionData,
      customIntervention: e.target.value,
    };
    setInterventionData(updatedData);
    onDataChange(updatedData);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">
        Interventions
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Intervention type:</p>
          <RadioGroup
            value={interventionData.interventionType}
            onValueChange={(value) =>
              handleTypeChange(value as "standard" | "custom")
            }
            className="flex space-x-4 mb-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard-intervention" />
              <Label htmlFor="standard-intervention">
                Standard Interventions
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom-intervention" />
              <Label htmlFor="custom-intervention">Custom Interventions</Label>
            </div>
          </RadioGroup>
        </div>

        {interventionData.interventionType === "standard" && (
          <div>
            <p className="text-sm font-medium mb-2">Select interventions:</p>
            <div className="grid grid-cols-2 gap-2">
              {standardInterventionOptions.map((intervention) => (
                <div key={intervention} className="flex items-center space-x-2">
                  <Checkbox
                    id={`intervention-${intervention}`}
                    checked={interventionData.standardInterventions.includes(
                      intervention,
                    )}
                    onCheckedChange={() =>
                      handleStandardInterventionToggle(intervention)
                    }
                  />
                  <Label htmlFor={`intervention-${intervention}`}>
                    {intervention}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {interventionData.interventionType === "custom" && (
          <div>
            <Label
              htmlFor="custom-intervention-text"
              className="text-sm font-medium"
            >
              Custom interventions:
            </Label>
            <Textarea
              id="custom-intervention-text"
              placeholder="Enter your interventions here..."
              className="mt-1"
              value={interventionData.customIntervention}
              onChange={handleCustomInterventionChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InterventionSection;
