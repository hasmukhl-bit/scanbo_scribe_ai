import * as React from "react";

type ConsultDialogContextType = {
  openStartConsultDialog: () => void;
};

export const ConsultDialogContext = React.createContext<ConsultDialogContextType>({
  openStartConsultDialog: () => {}
});

export const useConsultDialog = () => React.useContext(ConsultDialogContext);
