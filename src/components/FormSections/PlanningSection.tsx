"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface PlanningSectionProps {
  onDataChange?: (data: PlanningData) => void;
}

export interface PlanningData {
  planType: "standard" | "custom";
  standardPlans: string[];
  customPlan: string;
}

const PlanningSection: React.FC<PlanningSectionProps> = ({
  onDataChange = () => {},
}) => {
  const [planningData, setPlanningData] = useState<PlanningData>({
    planType: "standard",
    standardPlans: [],
    customPlan: "",
  });

  const standardPlanOptions = [
    "Continue current treatment plan",
    "Monitor vital signs",
    "Administer medications as ordered",
    "Encourage oral intake",
    "Encourage ambulation",
    "Implement fall precautions",
    "Implement pressure injury prevention",
    "Educate patient/family",
    "Consult with physician",
    "Prepare for discharge",
  ];

  const handleTypeChange = (value: "standard" | "custom") => {
    const updatedData = {
      ...planningData,
      planType: value,
    };
    setPlanningData(updatedData);
    onDataChange(updatedData);
  };

  const handleStandardPlanToggle = (plan: string) => {
    const updatedPlans = planningData.standardPlans.includes(plan)
      ? planningData.standardPlans.filter((p) => p !== plan)
      : [...planningData.standardPlans, plan];

    const updatedData = {
      ...planningData,
      standardPlans: updatedPlans,
    };
    setPlanningData(updatedData);
    onDataChange(updatedData);
  };

  const handleCustomPlanChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const updatedData = {
      ...planningData,
      customPlan: e.target.value,
    };
    setPlanningData(updatedData);
    onDataChange(updatedData);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">Planning</h2>

      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-2">Plan type:</p>
          <RadioGroup
            value={planningData.planType}
            onValueChange={(value) =>
              handleTypeChange(value as "standard" | "custom")
            }
            className="flex space-x-4 mb-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard-plan" />
              <Label htmlFor="standard-plan">Standard Plan</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom-plan" />
              <Label htmlFor="custom-plan">Custom Plan</Label>
            </div>
          </RadioGroup>
        </div>

        {planningData.planType === "standard" && (
          <div>
            <p className="text-sm font-medium mb-2">Select plans:</p>
            <div className="grid grid-cols-2 gap-2">
              {standardPlanOptions.map((plan) => (
                <div key={plan} className="flex items-center space-x-2">
                  <Checkbox
                    id={`plan-${plan}`}
                    checked={planningData.standardPlans.includes(plan)}
                    onCheckedChange={() => handleStandardPlanToggle(plan)}
                  />
                  <Label htmlFor={`plan-${plan}`}>{plan}</Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {planningData.planType === "custom" && (
          <div>
            <Label htmlFor="custom-plan-text" className="text-sm font-medium">
              Custom plan:
            </Label>
            <Textarea
              id="custom-plan-text"
              placeholder="Enter your plan here..."
              className="mt-1"
              value={planningData.customPlan}
              onChange={handleCustomPlanChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanningSection;
