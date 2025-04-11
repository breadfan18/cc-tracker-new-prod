import ProgressBar from "react-bootstrap/ProgressBar";

type FiveTwentyFourStatusProps = {
  percent: number;
  label: string;
  // key?: string;
};
export function FiveTwentyFourStatus({
  percent,
  label,
}: FiveTwentyFourStatusProps) {
  return (
    <>
      <p style={{ marginBottom: "2px" }}>524 Status Tracker</p>
      <ProgressBar
        variant={
          percent >= 80
            ? "danger"
            : percent < 80 && percent > 40
            ? "warning"
            : "success"
        }
        now={percent}
        label={label}
        style={{
          minHeight: "2.5rem",
          fontSize: "1rem",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
        // striped
      />
    </>
  );
}
