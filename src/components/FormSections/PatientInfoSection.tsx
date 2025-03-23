"use client";

import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PatientInfoSectionProps {
  onDataChange?: (data: PatientInfoData) => void;
}

export interface PatientInfoData {
  receivedFrom: {
    role: string;
    name: string;
  };
}

const PatientInfoSection = ({
  onDataChange = () => {},
}: PatientInfoSectionProps) => {
  const [data, setData] = React.useState<PatientInfoData>({
    receivedFrom: {
      role: "",
      name: "",
    },
  });

  const handleRoleChange = (value: string) => {
    const newData = {
      ...data,
      receivedFrom: {
        ...data.receivedFrom,
        role: value,
      },
    };
    setData(newData);
    onDataChange(newData);
  };

  const handleNameChange = (value: string) => {
    const newData = {
      ...data,
      receivedFrom: {
        ...data.receivedFrom,
        name: value,
      },
    };
    setData(newData);
    onDataChange(newData);
  };

  return (
    <div className="space-y-4 p-4 rounded-md border bg-white">
      <h3 className="text-lg font-medium text-gray-900">Patient Information</h3>

      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-1/2">
          <Label htmlFor="role" className="block mb-2">
            Received From (Role)
          </Label>
          <Select
            onValueChange={handleRoleChange}
            value={data.receivedFrom.role}
          >
            <SelectTrigger id="role">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RN">RN (Registered Nurse)</SelectItem>
              <SelectItem value="Student Nurse">Student Nurse</SelectItem>
              <SelectItem value="CRN">
                CRN (Clinical Registered Nurse)
              </SelectItem>
              <SelectItem value="Physician">Physician</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-1/2">
          <Label htmlFor="name" className="block mb-2">
            Caregiver Name
          </Label>
          <Select
            onValueChange={handleNameChange}
            value={data.receivedFrom.name}
          >
            <SelectTrigger id="name">
              <SelectValue placeholder="Select name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Seretse">Seretse</SelectItem>
              <SelectItem value="Tshambani">Tshambani</SelectItem>
              <SelectItem value="Toteng">Toteng</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {data.receivedFrom.name === "other" && (
        <div className="mt-2">
          <Label htmlFor="otherName" className="block mb-2">
            Specify Name
          </Label>
          <Input
            id="otherName"
            placeholder="Enter caregiver name"
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default PatientInfoSection;
