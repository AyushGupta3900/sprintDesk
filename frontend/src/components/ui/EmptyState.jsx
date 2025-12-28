import React from "react";
export default function EmptyState({
  title,
  description,
  action,
}) {
  return (
    <div className="text-center py-20 text-white/60">
      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>
      <p className="mt-2 max-w-md mx-auto">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
