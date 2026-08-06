import type { ReactNode } from "react";

export function EditorialMoment({ children }: { children: ReactNode }) {
  return (
    <div className="editorial">
      <p>{children}</p>
    </div>
  );
}
