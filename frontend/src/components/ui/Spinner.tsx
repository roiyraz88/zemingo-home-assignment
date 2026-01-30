interface Props {
    size?: number;
  }
  
  const Spinner = ({ size = 20 }: Props) => {
    return (
      <div
        style={{ width: size, height: size }}
        className="animate-spin rounded-full border-2 border-indigo-300 border-t-indigo-600"
      />
    );
  };
  
  export default Spinner;
  