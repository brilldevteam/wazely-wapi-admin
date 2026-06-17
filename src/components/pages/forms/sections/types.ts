import React from "react";

export interface SharedFormProps {
  data: any;
  updateField: (path: string[], value: any) => void;
  renderHeader: (id: string, label: string) => React.ReactNode;
  renderTextInput: (path: string[], label: string, placeholder?: string) => React.ReactNode;
  renderMediaUploadInput: (path: string[], label: string) => React.ReactNode;
  renderStringArrayInput: (path: string[], label: string) => React.ReactNode;
  activeSection: string | null;
  toggleSection: (section: string) => void;
  labelClass: string;
  inputClass: string;
  
}
