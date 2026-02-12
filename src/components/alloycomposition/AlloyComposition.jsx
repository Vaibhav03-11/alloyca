import { useMemo, useState } from "react";
import "./AlloyComposition.css";
import useAlloyComposition from "./hooks/useAlloyComposition";

const DEFAULTS = {
  weight: "10",
  currentPurity: "99.50",
  targetKarat: "22",
  targetPurity: "91.60",
};

const formatNumber = (value, digits = 3) => {
  if (value === null || !Number.isFinite(value)) {
    return "";
  }
  return value.toFixed(digits);
};

export default function AlloyComposition() {
  const [weight, setWeight] = useState(DEFAULTS.weight);
  const [currentPurity, setCurrentPurity] = useState(DEFAULTS.currentPurity);
  const [targetKarat, setTargetKarat] = useState(DEFAULTS.targetKarat);
  const [targetPurity, setTargetPurity] = useState(DEFAULTS.targetPurity);
  const [submittedResult, setSubmittedResult] = useState(null);
  const [submittedError, setSubmittedError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { calculateResult } = useAlloyComposition();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { value, error } = calculateResult({
      weight,
      currentPurity,
      targetPurity,
    });
    setSubmittedResult(value);
    setSubmittedError(error);
    setHasSubmitted(true);
  };

  const example = useMemo(() => {
    const exampleWeight = 10;
    const exampleCurrent = 99.5;
    const exampleTarget = 91.6;
    return exampleWeight * ((exampleCurrent - exampleTarget) / exampleTarget);
  }, []);

  return (
    <section className="alloy-composition">
      <header>
        <p className="eyebrow">Lowering Purity (Most Common)</p>
        <h2>Alloy Composition Calculator</h2>
        <p className="subtitle">
          Convert 24k/99.50 gold to 22k/91.60 by adding copper or silver alloy.
        </p>
      </header>

      <div className="content">
        <form className="card" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="weight">Current weight of gold (grams)</label>
            <input
              id="weight"
              type="number"
              inputMode="decimal"
              step="0.001"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              placeholder="10"
            />
          </div>

          <div className="field">
            <label htmlFor="current-purity">Current purity (%)</label>
            <input
              id="current-purity"
              type="number"
              inputMode="decimal"
              step="0.01"
              value={currentPurity}
              onChange={(event) => setCurrentPurity(event.target.value)}
              placeholder="99.50"
            />
          </div>

          <div className="field">
            <label htmlFor="target-karat">Target purity (karat)</label>
            <input
              id="target-karat"
              type="number"
              inputMode="decimal"
              step="0.01"
              value={targetKarat}
              onChange={(event) => setTargetKarat(event.target.value)}
              placeholder="22"
            />
            <p className="hint">Reference only; calculation uses target purity %.</p>
          </div>

          <div className="field">
            <label htmlFor="target-purity">Target purity (%)</label>
            <input
              id="target-purity"
              type="number"
              inputMode="decimal"
              step="0.01"
              value={targetPurity}
              onChange={(event) => setTargetPurity(event.target.value)}
              placeholder="91.60"
            />
          </div>

          <button className="submit" type="submit">
            Calculate Alloy
          </button>
        </form>

        <div className="card result">
          <h3>Alloy to Add</h3>
          {!hasSubmitted ? (
            <p className="placeholder">Submit the form to see the result.</p>
          ) : submittedError ? (
            <p className="error">{submittedError}</p>
          ) : (
            <p className="value">{formatNumber(submittedResult)} grams</p>
          )}
          <p className="formula">
            W<sub>alloy</sub> = W<sub>current</sub> ×
            ((P<sub>current</sub> - P<sub>target</sub>) / P<sub>target</sub>)
          </p>
          <div className="example">
            <p className="example-title">Example</p>
            <p>10g of 99.50 gold to 91.60 (22k)</p>
            <p className="example-value">
              Add {formatNumber(example)} grams of alloy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
