"use client";

import { logoFields } from "@/src/data/setting";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { updateSettingField } from "@/src/redux/reducers/settingsSlice";
import ImageUrlField from "../shared/ImageUrlField";
import SettingCard from "../shared/SettingCard";
import { usePendingFiles } from "../shared/SettingsFilesContext";
import { AppSettings } from "@/src/types/setting";

const BrandingSettings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings.data);
  const pendingFiles = usePendingFiles();

  const onChange = (
    key: keyof AppSettings,
    value: AppSettings[keyof AppSettings],
  ) => {
    dispatch(updateSettingField({ key, value }));
  };

  const onFileChange = (fieldKey: keyof AppSettings, file: File | null) => {
    if (file) {
      pendingFiles.current.set(fieldKey as string, file);
    } else {
      pendingFiles.current.delete(fieldKey as string);
    }
  };

  return (
    <div className="space-y-5">
      <SettingCard
        title="Logos & Icons"
        description="Set URLs or upload images for your application logos and icons."
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {logoFields.map(({ key, label }) => (
            <ImageUrlField
              key={key}
              label={label}
              value={(settings[key] as string) ?? ""}
              onChange={(v) => onChange(key, v)}
              onFileChange={(file) => onFileChange(key, file)}
            />
          ))}
        </div>
      </SettingCard>
    </div>
  );
};

export default BrandingSettings;
