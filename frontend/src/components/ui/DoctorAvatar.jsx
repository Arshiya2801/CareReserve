import React from 'react';

const DoctorAvatar = ({ doctor, className = "w-16 h-16 text-xl", showContainer = true, containerClassName = "" }) => {
  if (!doctor || !doctor.name) return null;

  // Extract initials from doctor name (e.g., "Dr. Richard James" -> "RJ")
  const getInitials = (name) => {
    return name
      .replace(/^Dr\.?\s+/i, '')
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const initials = getInitials(doctor.name);

  const AvatarContent = (
    <div className={`rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center border-2 border-primary/20 ${className}`}>
      <span className="font-extrabold text-primary tracking-wider">
        {initials}
      </span>
    </div>
  );

  if (!showContainer) return AvatarContent;

  return (
    <div className={`overflow-hidden bg-primary/5 dark:bg-slate-700/50 flex items-center justify-center relative ${containerClassName}`}>
      {AvatarContent}
    </div>
  );
};

export default DoctorAvatar;
