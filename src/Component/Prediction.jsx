export default function Prediction({}) {
  return (
    <div className="prediction">
      <h2>Prediction Results: {"89%"}</h2>
      <ul>
        <li>{"61-80%: Needs Immediate Medical Attention"}</li>
        <li>{"41-60%: Needs a Check-up"}</li>
        <li>{"0-40%: Safe Range, No Medical Attention Needed"}</li>
      </ul>
    </div>
  );
}
