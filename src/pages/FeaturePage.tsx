import { useState } from "react";
import { Plus } from "lucide-react";
import type { RouteDefinition } from "../app/routes";
import { Button } from "../components/ui/Button";
import { EmptyState, LoadingState } from "../components/ui/States";
import { Surface } from "../components/ui/Surface";

export function FeaturePage({ definition }: { definition: RouteDefinition }) {
  const [showInput, setShowInput] = useState(false);
  const Icon = definition.icon;
  return (
    <div className="page">
      <div className="page-heading">
        <div><p className="eyebrow">ARC workspace</p><h1><Icon size={28} aria-hidden="true" />{definition.label}</h1><p className="page-description">{definition.description}</p></div>
        <Button onClick={() => setShowInput((value) => !value)}><Plus size={17} aria-hidden="true" />Add new</Button>
      </div>
      {showInput && <Surface title={`Create ${definition.label.toLowerCase()} item`}><div className="inline-form"><input autoFocus placeholder={`Write a new ${definition.label.toLowerCase()} item`} /><Button onClick={() => setShowInput(false)}>Save</Button></div></Surface>}
      <div className="section-grid">
        {definition.sections.map((section, index) => <Surface title={section} key={section}>{index === 0 ? <EmptyState title="Ready when you are" message="This workspace is connected to its typed service contract and ready for backend data." /> : index === 1 ? <LoadingState /> : <EmptyState title="No items yet" message="Items created here will appear in this section." />}</Surface>)}
      </div>
    </div>
  );
}
