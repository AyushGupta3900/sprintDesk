import { Droppable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import React from "react";

export default function StrictModeDroppable({
  children,
  ...props
}) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      setEnabled(true)
    );

    return () => {
      cancelAnimationFrame(raf);
      setEnabled(false);
    };
  }, []);

  if (!enabled) return null;

  return <Droppable {...props}>{children}</Droppable>;
}
