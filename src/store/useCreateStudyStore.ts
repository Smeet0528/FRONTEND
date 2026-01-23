import { create } from 'zustand';

interface CreateStudyState {
  title: string;
  intro: string;
  startDate: Date | null;
  endDate: Date | null;
  selectedDays: string[];
  memberCount: string;
  region: string;
  selectedKeywords: string[];

  //업데이트
  setField: (
    field: keyof Omit<CreateStudyState, 'setField' | 'reset'>,
    value: string | string[] | Date | null
  ) => void;
  reset: () => void;
}

const initialState = {
  title: '',
  intro: '',
  startDate: null,
  endDate: null,
  selectedDays: [],
  memberCount: '',
  region: '',
  selectedKeywords: [],
};

export const useCreateStudyStore = create<CreateStudyState>((set) => ({
  ...initialState,

  setField: (field, value) => set((state) => ({ ...state, [field]: value })),

  reset: () => set(initialState),
}));
