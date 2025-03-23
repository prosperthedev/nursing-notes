"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useReportStore } from "@/lib/reportStore";
import { Clipboard, Printer, FileDown } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const ExportOptions: React.FC = () => {
  const reportStore = useReportStore();

  const generateReportText = () => {
    const {
      patientInfo,
      subjectiveData,
      objectiveData,
      assessmentData,
      planningData,
      interventionData,
    } = reportStore;

    const formatDate = () => {
      const now = new Date();
      return now.toLocaleString();
    };

    // Format subjective data
    let subjectiveText = "";
    if (subjectiveData.subjectiveType === "nil") {
      subjectiveText = "Nil subjective data reported.";
    } else if (subjectiveData.subjectiveType === "obtained") {
      subjectiveText = "Nil subjective data obtained.";
    } else {
      if (subjectiveData.commonSymptoms.length > 0) {
        subjectiveText += `Reported symptoms: ${subjectiveData.commonSymptoms.join(", ")}\n`;
      }
      if (subjectiveData.customText) {
        subjectiveText += subjectiveData.customText;
      }
    }

    // Format objective data for each system
    const formatObjectiveSystem = (
      system: keyof typeof objectiveData,
      title: string,
    ) => {
      const data = objectiveData[system];
      if (data.status === "not-assessed") {
        return `${title}\n- Not assessed`;
      } else if (data.status === "normal") {
        return `${title}\n- Normal`;
      } else {
        let text = `${title}\n`;

        // Add symptoms as bullet points
        if (data.symptoms.length > 0) {
          data.symptoms.forEach((symptom) => {
            text += `- ${symptom}\n`;
          });
        }

        // Add vital signs or assessments as bullet points
        if (system === "respiratory" || system === "cardiovascular") {
          Object.entries(data.vitalSigns || {}).forEach(([key, value]) => {
            if (value) text += `- ${value}\n`;
          });
        } else {
          Object.entries(data.assessments || {}).forEach(([key, value]) => {
            if (value) text += `- ${value}\n`;
          });
        }

        // Add notes as a bullet point
        if (data.notes) {
          text += `- ${data.notes}\n`;
        }

        return text;
      }
    };

    // Format assessment data
    let assessmentText = "";
    if (assessmentData.assessmentType === "standard") {
      if (assessmentData.standardAssessments.length > 0) {
        assessmentText = assessmentData.standardAssessments
          .map((a) => `- ${a}`)
          .join("\n");
      } else {
        assessmentText = "No assessments selected.";
      }
    } else {
      assessmentText =
        assessmentData.customAssessment || "No assessment provided.";
    }

    // Format planning data
    let planningText = "";
    if (planningData.planType === "standard") {
      if (planningData.standardPlans.length > 0) {
        planningText = planningData.standardPlans
          .map((p) => `- ${p}`)
          .join("\n");
      } else {
        planningText = "No plans selected.";
      }
    } else {
      planningText = planningData.customPlan || "No plan provided.";
    }

    // Format intervention data
    let interventionText = "";
    if (interventionData.interventionType === "standard") {
      if (interventionData.standardInterventions.length > 0) {
        interventionText = interventionData.standardInterventions
          .map((i) => `- ${i}`)
          .join("\n");
      } else {
        interventionText = "No interventions selected.";
      }
    } else {
      interventionText =
        interventionData.customIntervention || "No interventions provided.";
    }

    // Combine all sections into a complete report
    return `NURSING PROGRESS REPORT
${formatDate()}

HANDOVER INFORMATION
Received from: ${patientInfo.receivedFrom.role} ${patientInfo.receivedFrom.name}

SUBJECTIVE
${subjectiveText}

OBJECTIVE
${formatObjectiveSystem("respiratory", "Respiratory")}
${formatObjectiveSystem("cardiovascular", "Cardiovascular")}
${formatObjectiveSystem("cns", "CNS")}
${formatObjectiveSystem("git", "GIT")}
${formatObjectiveSystem("renal", "Renal")}
${formatObjectiveSystem("skin", "Skin")}

ASSESSMENT
${assessmentText}

PLANNING
${planningText}

INTERVENTIONS
${interventionText}`;
  };

  const copyToClipboard = async () => {
    const reportText = generateReportText();
    try {
      await navigator.clipboard.writeText(reportText);
      toast({
        title: "Copied to clipboard",
        description: "Report has been copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const printReport = () => {
    const reportText = generateReportText();
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Nursing Progress Report</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 20px;
              }
              h1 {
                color: #2563eb;
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 10px;
              }
              h2 {
                color: #1e40af;
                margin-top: 20px;
                margin-bottom: 10px;
              }
              pre {
                white-space: pre-wrap;
                font-family: Arial, sans-serif;
              }
            </style>
          </head>
          <body>
            <h1>Nursing Progress Report</h1>
            <pre>${reportText}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    } else {
      toast({
        title: "Print failed",
        description: "Could not open print window",
        variant: "destructive",
      });
    }
  };

  const downloadAsPDF = () => {
    // In a real implementation, this would use a PDF generation library
    // For now, we'll just show a toast message
    toast({
      title: "PDF Download",
      description:
        "PDF download functionality would be implemented here with a PDF library",
    });
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-white border rounded-md shadow-sm">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={copyToClipboard}
      >
        <Clipboard size={16} />
        <span>Copy to Clipboard</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={printReport}
      >
        <Printer size={16} />
        <span>Print</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2"
        onClick={downloadAsPDF}
      >
        <FileDown size={16} />
        <span>Download PDF</span>
      </Button>
    </div>
  );
};

export default ExportOptions;
