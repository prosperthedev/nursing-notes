"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ObjectiveDataSectionProps {
  onDataChange?: (data: ObjectiveData) => void;
}

export interface ObjectiveData {
  respiratory: {
    status: "normal" | "abnormal" | "not-assessed";
    notes: string;
    symptoms: string[];
    vitalSigns: {
      respirationRate?: string;
      oxygenSaturation?: string;
      oxygenDelivery?: string;
      ventilationMode?: string;
      ettSize?: string;
      fiO2?: string;
      peep?: string;
      tidalVolume?: string;
      secretions?: string;
      coughReflex?: string;
    };
  };
  cardiovascular: {
    status: "normal" | "abnormal" | "not-assessed";
    notes: string;
    symptoms: string[];
    vitalSigns: {
      bloodPressure?: string;
      heartRate?: string;
      rhythm?: string;
      capillaryRefill?: string;
      vasoactiveSupport?: string;
      peripheralPerfusion?: string;
    };
  };
  cns: {
    status: "normal" | "abnormal" | "not-assessed";
    notes: string;
    symptoms: string[];
    assessments: {
      gcs?: string;
      pupils?: string;
      motorResponse?: string;
      sedation?: string;
      rass?: string;
      painScore?: string;
    };
  };
  git: {
    status: "normal" | "abnormal" | "not-assessed";
    notes: string;
    symptoms: string[];
    assessments: {
      bowelSounds?: string;
      lastBowelMovement?: string;
      abdomen?: string;
      feeding?: string;
      ngt?: string;
      nutritionalStatus?: string;
    };
  };
  renal: {
    status: "normal" | "abnormal" | "not-assessed";
    notes: string;
    symptoms: string[];
    assessments: {
      urineOutput?: string;
      urineColor?: string;
      catheter?: string;
      fluidBalance?: string;
      edema?: string;
    };
  };
  skin: {
    status: "normal" | "abnormal" | "not-assessed";
    notes: string;
    symptoms: string[];
    assessments: {
      color?: string;
      temperature?: string;
      turgor?: string;
      wounds?: string;
      pressureAreas?: string;
      lines?: string;
    };
  };
}

const ObjectiveDataSection: React.FC<ObjectiveDataSectionProps> = ({
  onDataChange = () => {},
}) => {
  const [objectiveData, setObjectiveData] = useState<ObjectiveData>({
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
  });

  const symptomsBySystem = {
    respiratory: [
      "Dyspnea",
      "Tachypnea",
      "Wheezing",
      "Crackles",
      "Decreased breath sounds",
      "Cough",
      "Sputum production",
      "Accessory muscle use",
      "Nasal flaring",
      "Barrel chest",
      "Mechanically ventilated",
      "Symmetrical chest expansion",
      "Minimal secretions",
      "Fair cough reflex",
    ],
    cardiovascular: [
      "Tachycardia",
      "Bradycardia",
      "Hypertension",
      "Hypotension",
      "Irregular rhythm",
      "Edema",
      "Chest pain",
      "Palpitations",
      "Murmur",
      "Cyanosis",
      "Capillary refill >3s",
      "Vasoactive support",
      "Poor peripheral perfusion",
      "Unstable blood pressure",
    ],
    cns: [
      "Altered consciousness",
      "Confusion",
      "Agitation",
      "Seizures",
      "Pupil abnormalities",
      "Motor weakness",
      "Sensory deficit",
      "Aphasia",
      "Dysarthria",
      "Ataxia",
      "Tremor",
      "Sedated",
      "Unresponsive to stimuli",
    ],
    git: [
      "Abdominal distention",
      "Bowel sounds abnormal",
      "Constipation",
      "Diarrhea",
      "Nausea",
      "Vomiting",
      "Abdominal pain",
      "Melena",
      "Hematemesis",
      "Jaundice",
      "NGT in situ",
      "Soft abdomen",
      "Not feeding",
    ],
    renal: [
      "Oliguria",
      "Polyuria",
      "Hematuria",
      "Dysuria",
      "Incontinence",
      "Retention",
      "Flank pain",
      "Cloudy urine",
      "Foul-smelling urine",
      "Catheter in situ",
      "Minimal urine output",
      "Edema",
    ],
    skin: [
      "Rash",
      "Pallor",
      "Cyanosis",
      "Jaundice",
      "Pressure injury",
      "Wound",
      "Edema",
      "Dry skin",
      "Diaphoresis",
      "Poor turgor",
      "Bruising",
      "Central line in situ",
      "Arterial line in situ",
    ],
  };

  // System-specific assessment fields
  const assessmentFields = {
    respiratory: [
      {
        key: "ventilationMode",
        label: "Ventilation Mode",
        placeholder: "e.g., VC/AC mode via cuffed ETT",
      },
      {
        key: "ettSize",
        label: "ETT Size/Position",
        placeholder: "e.g., size 6.5 tied at 22cm RAM",
      },
      {
        key: "fiO2",
        label: "FiO2",
        placeholder: "e.g., 60%",
      },
      {
        key: "tidalVolume",
        label: "Tidal Volume",
        placeholder: "e.g., 420mls",
      },
      {
        key: "respirationRate",
        label: "Respiration Rate",
        placeholder: "e.g., RR 35",
      },
      {
        key: "peep",
        label: "PEEP",
        placeholder: "e.g., PEEP 5 and Pmax 40",
      },
      {
        key: "oxygenSaturation",
        label: "Oxygen Saturation",
        placeholder: "e.g., Saturates well at 95%",
      },
      {
        key: "secretions",
        label: "Secretions",
        placeholder: "e.g., Minimal whitish tracheal secretions",
      },
      {
        key: "coughReflex",
        label: "Cough Reflex",
        placeholder: "e.g., Fair cough reflex",
      },
      {
        key: "oxygenDelivery",
        label: "Oxygen Delivery",
        placeholder: "e.g., 2L NC",
      },
    ],
    cardiovascular: [
      {
        key: "vasoactiveSupport",
        label: "Vasoactive Support",
        placeholder: "e.g., Noradrenaline at 0.5mcg/kg/min",
      },
      {
        key: "heartRate",
        label: "Heart Rate",
        placeholder: "e.g., HR elevated at 180-200b/min",
      },
      {
        key: "bloodPressure",
        label: "Blood Pressure",
        placeholder: "e.g., BP unstable at 107/30mmHg",
      },
      {
        key: "peripheralPerfusion",
        label: "Peripheral Perfusion",
        placeholder: "e.g., Poor capillary refill of extremities",
      },
      {
        key: "rhythm",
        label: "Rhythm",
        placeholder: "e.g., Regular, NSR",
      },
      {
        key: "capillaryRefill",
        label: "Capillary Refill",
        placeholder: "e.g., <3 seconds",
      },
    ],
    cns: [
      {
        key: "sedation",
        label: "Sedation",
        placeholder: "e.g., Sedated on Fentanyl and Midazolam",
      },
      {
        key: "motorResponse",
        label: "Motor Response",
        placeholder: "e.g., Unresponsive to painful stimuli",
      },
      {
        key: "pupils",
        label: "Pupils",
        placeholder: "e.g., Pupils at 3mm each and reactive to light",
      },
      {
        key: "rass",
        label: "RASS Score",
        placeholder: "e.g., RASS -4",
      },
      {
        key: "gcs",
        label: "GCS",
        placeholder: "e.g., GCS 3",
      },
      {
        key: "painScore",
        label: "Pain Score",
        placeholder: "e.g., Pain score 0/10",
      },
    ],
    git: [
      {
        key: "ngt",
        label: "NGT Status",
        placeholder:
          "e.g., NGT in situ, draining dark-brownish gastric aspirates",
      },
      {
        key: "feeding",
        label: "Feeding Status",
        placeholder: "e.g., Currently not feeding",
      },
      {
        key: "abdomen",
        label: "Abdomen",
        placeholder: "e.g., Abdomen soft and non-distended",
      },
      {
        key: "nutritionalStatus",
        label: "Nutritional Status",
        placeholder: "e.g., Good nutritional status",
      },
      {
        key: "lastBowelMovement",
        label: "Bowel Movement",
        placeholder: "e.g., No bowel motion reported",
      },
      {
        key: "bowelSounds",
        label: "Bowel Sounds",
        placeholder: "e.g., Active in all 4 quadrants",
      },
    ],
    renal: [
      {
        key: "catheter",
        label: "Catheter Status",
        placeholder: "e.g., Urethral catheter in situ",
      },
      {
        key: "urineOutput",
        label: "Urine Output",
        placeholder: "e.g., Drains very minimal to no urine",
      },
      {
        key: "edema",
        label: "Edema",
        placeholder: "e.g., No noted edema of extremities",
      },
      {
        key: "fluidBalance",
        label: "Fluid Balance",
        placeholder: "e.g., On RL at 41mls/hr",
      },
      {
        key: "urineColor",
        label: "Urine Color",
        placeholder: "e.g., Clear yellow",
      },
    ],
    skin: [
      {
        key: "lines",
        label: "Lines/Access",
        placeholder: "e.g., CVC on right internal jugular, clean and intact",
      },
      {
        key: "pressureAreas",
        label: "Pressure Areas",
        placeholder: "e.g., Grade 2 pressure ulcers on both heels",
      },
      {
        key: "wounds",
        label: "Wounds",
        placeholder: "e.g., Surgical wound clean and dry",
      },
      {
        key: "color",
        label: "Color",
        placeholder: "e.g., Pink",
      },
      {
        key: "temperature",
        label: "Temperature",
        placeholder: "e.g., Warm",
      },
      {
        key: "turgor",
        label: "Turgor",
        placeholder: "e.g., Good, <3 seconds",
      },
    ],
  };

  const handleStatusChange = (
    system: keyof ObjectiveData,
    status: "normal" | "abnormal" | "not-assessed",
  ) => {
    const updatedData = {
      ...objectiveData,
      [system]: {
        ...objectiveData[system],
        status,
        // Clear symptoms if changing to normal or not-assessed
        symptoms: status === "abnormal" ? objectiveData[system].symptoms : [],
      },
    };
    setObjectiveData(updatedData);
    onDataChange(updatedData);
  };

  const handleNotesChange = (system: keyof ObjectiveData, notes: string) => {
    const updatedData = {
      ...objectiveData,
      [system]: {
        ...objectiveData[system],
        notes,
      },
    };
    setObjectiveData(updatedData);
    onDataChange(updatedData);
  };

  const handleSymptomToggle = (
    system: keyof ObjectiveData,
    symptom: string,
  ) => {
    const currentSymptoms = objectiveData[system].symptoms;
    const updatedSymptoms = currentSymptoms.includes(symptom)
      ? currentSymptoms.filter((s) => s !== symptom)
      : [...currentSymptoms, symptom];

    const updatedData = {
      ...objectiveData,
      [system]: {
        ...objectiveData[system],
        symptoms: updatedSymptoms,
      },
    };
    setObjectiveData(updatedData);
    onDataChange(updatedData);
  };

  const handleAssessmentChange = (
    system: keyof ObjectiveData,
    field: string,
    value: string,
  ) => {
    const updatedData = {
      ...objectiveData,
      [system]: {
        ...objectiveData[system],
        // Handle different assessment field names for different systems
        ...(system === "respiratory" || system === "cardiovascular"
          ? {
              vitalSigns: {
                ...objectiveData[system].vitalSigns,
                [field]: value,
              },
            }
          : {
              assessments: {
                ...objectiveData[system].assessments,
                [field]: value,
              },
            }),
      },
    };
    setObjectiveData(updatedData);
    onDataChange(updatedData);
  };

  const getStatusBadge = (status: "normal" | "abnormal" | "not-assessed") => {
    switch (status) {
      case "normal":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Normal</Badge>
        );
      case "abnormal":
        return <Badge className="bg-red-500 hover:bg-red-600">Abnormal</Badge>;
      case "not-assessed":
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">Not Assessed</Badge>
        );
      default:
        return null;
    }
  };

  const renderAssessmentFields = (system: keyof ObjectiveData) => {
    const fields = assessmentFields[system];
    const isCardiovascularOrRespiratory =
      system === "respiratory" || system === "cardiovascular";
    const values = isCardiovascularOrRespiratory
      ? objectiveData[system].vitalSigns
      : objectiveData[system].assessments;

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1">
            <Label
              htmlFor={`${system}-${field.key}`}
              className="text-sm font-medium"
            >
              {field.label}:
            </Label>
            <Input
              id={`${system}-${field.key}`}
              placeholder={field.placeholder}
              className="h-10"
              value={values[field.key as keyof typeof values] || ""}
              onChange={(e) =>
                handleAssessmentChange(system, field.key, e.target.value)
              }
            />
          </div>
        ))}
      </div>
    );
  };

  const renderSystemTab = (system: keyof ObjectiveData, title: string) => {
    return (
      <TabsContent value={system} className="p-4 border rounded-md mt-2">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-md font-medium">{title} Assessment</h3>
          {getStatusBadge(objectiveData[system].status)}
        </div>

        <Card className="p-4 mb-4">
          <RadioGroup
            value={objectiveData[system].status}
            onValueChange={(value) =>
              handleStatusChange(
                system,
                value as "normal" | "abnormal" | "not-assessed",
              )
            }
            className="flex space-x-4 mb-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="normal" id={`${system}-normal`} />
              <Label htmlFor={`${system}-normal`}>Normal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="abnormal" id={`${system}-abnormal`} />
              <Label htmlFor={`${system}-abnormal`}>Abnormal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="not-assessed"
                id={`${system}-not-assessed`}
              />
              <Label htmlFor={`${system}-not-assessed`}>Not Assessed</Label>
            </div>
          </RadioGroup>

          {/* Always show assessment fields regardless of status */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">
              {system === "respiratory" || system === "cardiovascular"
                ? "Vital Signs:"
                : "Assessment:"}
            </p>
            {renderAssessmentFields(system)}
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">
                Common findings (select all that apply):
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {symptomsBySystem[system].map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${system}-${symptom}`}
                      checked={objectiveData[system].symptoms.includes(symptom)}
                      onCheckedChange={() =>
                        handleSymptomToggle(system, symptom)
                      }
                    />
                    <Label htmlFor={`${system}-${symptom}`} className="text-sm">
                      {symptom}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label
                htmlFor={`${system}-notes`}
                className="text-sm font-medium"
              >
                Additional notes:
              </Label>
              <Textarea
                id={`${system}-notes`}
                placeholder={`Enter additional ${title.toLowerCase()} findings here...`}
                className="mt-1"
                value={objectiveData[system].notes}
                onChange={(e) => handleNotesChange(system, e.target.value)}
              />
            </div>
          </div>
        </Card>
      </TabsContent>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">
        Objective Data
      </h2>

      <Tabs defaultValue="respiratory" className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-2">
          <TabsTrigger value="respiratory">Respiratory</TabsTrigger>
          <TabsTrigger value="cardiovascular">Cardiovascular</TabsTrigger>
          <TabsTrigger value="cns">CNS</TabsTrigger>
          <TabsTrigger value="git">GIT</TabsTrigger>
          <TabsTrigger value="renal">Renal</TabsTrigger>
          <TabsTrigger value="skin">Skin</TabsTrigger>
        </TabsList>

        {renderSystemTab("respiratory", "Respiratory")}
        {renderSystemTab("cardiovascular", "Cardiovascular")}
        {renderSystemTab("cns", "Central Nervous System")}
        {renderSystemTab("git", "Gastrointestinal")}
        {renderSystemTab("renal", "Renal")}
        {renderSystemTab("skin", "Skin")}
      </Tabs>
    </div>
  );
};

export default ObjectiveDataSection;
