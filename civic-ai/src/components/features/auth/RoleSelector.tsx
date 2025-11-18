"use client";

import { cn } from "@/lib/utils";

export type Role = "citizen" | "govt" | "ngo";

interface RoleSelectorProps {
  selected: Role;
  onChange: (role: Role) => void;
}

const roles = [
  { id: "citizen" as Role, label: "Citizen" },
  { id: "govt" as Role, label: "Govt Official" },
  { id: "ngo" as Role, label: "NGO Partner" },
];

export default function RoleSelector({ selected, onChange }: RoleSelectorProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-secondary-700 mb-2">
        Select Your Role
      </label>
      <div className="bg-secondary-100 p-1 rounded-full flex gap-1">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => onChange(role.id)}
            className={cn(
              "flex-1 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
              selected === role.id
                ? "bg-white text-primary shadow-md"
                : "text-secondary-600 hover:text-secondary-900"
            )}
          >
            {role.label}
          </button>
        ))}
      </div>
    </div>
  );
}
