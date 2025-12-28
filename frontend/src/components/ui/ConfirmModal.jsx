import React from "react";
import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmModal({
  open,
  onClose,
  title,
  description,
  confirmText = "Confirm",
  danger = false,
  onConfirm,
  loading,
}) {
  if (!open) return null;

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-white/60 mb-6">
        {description}
      </p>

      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant={danger ? "danger" : "primary"}
          loading={loading}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
