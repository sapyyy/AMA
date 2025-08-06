import { Mirage } from "ldrs/react";
import "ldrs/react/Mirage.css";

export function Loading() {
  return (
    <div className="h-[100dvh] flex justify-center items-center">
      <Mirage size="100" speed="2.5" color="black" />
    </div>
  );
}
