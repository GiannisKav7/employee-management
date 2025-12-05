import styles from "./StatusBadge.module.scss";

type Status = "active" | "onleave" | "inactive" | string;

export function StatusBadge({ status }: { status: Status }) {
  const normalized = String(status || "")
    .toLowerCase()
    .trim();

  const modifier =
    normalized === "active"
      ? "status--active"
      : normalized === "onleave" || normalized === "on leave"
      ? "status--onleave"
      : normalized === "inactive"
      ? "status--inactive"
      : "";

  return (
    <span className={`${styles.status} ${modifier ? styles[modifier] : ""}`}>
      {status}
    </span>
  );
}
