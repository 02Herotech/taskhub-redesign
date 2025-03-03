import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SurburbInfo } from "@/hooks/useSuburbData";

type InitialState = {
  taskBriefDescription: string;
  taskDescription: string;
  taskImage: string;
  taskDate: string;
  taskTime: string;
  isFlexible: boolean;
  taskType: string;
  currentSuburb: SurburbInfo | null;
  customerBudget: string | number;
  currentStep: 1 | 2;
};

const initialState: InitialState = {
  taskBriefDescription: "",
  taskDescription: "",
  taskImage: "",
  taskDate: "",
  taskTime: "",
  isFlexible: false,
  taskType: "",
  currentSuburb: null,
  customerBudget: "",
  currentStep: 1,
};

type State = typeof initialState;

type ValueType<K extends keyof State> = State[K];

const taskSlice = createSlice({
  name: "taskDetails",
  initialState,
  reducers: {
    resetSavedTask: () => {
      return initialState;
    },
    setTaskDetail: (
      state,
      action: PayloadAction<{
        key: keyof State;
        value: ValueType<typeof action.payload.key>;
      }>,
    ) => {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    },
  },
});

export const { resetSavedTask, setTaskDetail } = taskSlice.actions;

export default taskSlice.reducer;
