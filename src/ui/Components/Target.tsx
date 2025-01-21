import { forwardRef } from "react";

export const Target = forwardRef((props, ref) => {
  return (
    //@ts-ignore
    <div ref={ref}></div>
  );
});
