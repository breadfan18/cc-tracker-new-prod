interface EmptyListProps {
  dataType: string;
}

const EmptyList = ({ dataType }: EmptyListProps) => {
  return (
    <div className="alert emptyList" role="alert">
      <p style={{ marginBottom: "0" }}>
        No {`${dataType}s`} to display. Add a new {dataType}.
      </p>
    </div>
  );
};

export default EmptyList;
