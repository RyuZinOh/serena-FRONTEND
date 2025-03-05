import { useContext } from "react";
import { PfpContext } from "./Pfpprovider";
// ccustom hook to use the PfpContext
const usePfp = () => {
  const context = useContext(PfpContext);
  if (!context) {
    throw new Error("usePfp must be used within a PfpProvider");
  }
  return context;
};

export default usePfp;
