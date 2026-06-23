const MatchScore = ({ score }) => {
  return (
    <span className="text-green-500 font-bold text-[11px] md:text-sm tracking-wide">{score}% Coincidencia</span>
  );
};

export default MatchScore;
