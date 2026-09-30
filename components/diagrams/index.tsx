import type { DiagramId } from "@/content/types";
import LockForgeDiagram from "./LockForgeDiagram";
import LimitronDiagram from "./LimitronDiagram";
import VidhiVaultDiagram from "./VidhiVaultDiagram";

const diagrams: Record<DiagramId, () => React.JSX.Element> = {
  lockforge: LockForgeDiagram,
  limitron: LimitronDiagram,
  vidhivault: VidhiVaultDiagram,
};

export default function Diagram({ id }: { id: DiagramId }) {
  const D = diagrams[id];
  return <D />;
}
