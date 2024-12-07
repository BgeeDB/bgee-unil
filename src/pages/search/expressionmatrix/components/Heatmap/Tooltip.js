/* TypeScript specific
import { InteractionData } from "./Heatmap";
*/
import styles from "./tooltip.module.css";

/* TypeScript specific
type TooltipProps = {
  interactionData: InteractionData | null;
  width: number;
  height: number;
};
*/

export const Tooltip = ({ 
  interactionData, 
  width, 
  height 
}) => {
// }: TooltipProps) => { // TypeScript specific
  if (!interactionData) {
    return null;
  }

  return (
    // Wrapper div: a rect on top of the viz area
    <div
      style={{
        width,
        height,
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
      }}
      // transform={`translate(${interactionData.xPos}, ${interactionData.xPos})`}
    >
      {/* The actual box with dark background */}
      <div
        className={styles.tooltip}
        style={{
          position: "absolute",
          left: interactionData.xPos,
          top: interactionData.yPos,
        }}
        
      >
        <TooltipRow label="x" value={interactionData.xLabel} />
        <TooltipRow label="y" value={interactionData.yLabel} />
        <TooltipRow label="value" value={String(interactionData.value)} />
        <TooltipRow label="expressed" value={String(interactionData.isExpressed)} />
        <TooltipRow label="max. expression" value={String(interactionData.maxExpScore)} />
      </div>
    </div>
  );
};

/* TypeScript specific
type TooltipRowProps = {
  label: string;
  value: string;
};
*/

const TooltipRow = ({ 
  label, 
  value 
}) => (
// }: TooltipRowProps) => ( // TypeScript specific
  <div>
    <b>{label}</b>
    <span>: </span>
    <span>{value}</span>
  </div>
);

export default Tooltip;