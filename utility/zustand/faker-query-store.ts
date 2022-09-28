import create from "zustand";
import { devtools, persist } from "zustand/middleware"

export type FakerQuery = {
    tableName: string;
    fieldName: string;
    origin: string;
    targetFunc: string;
}

interface MapArgsToTableFieldNames {
    [key: string]: ArgObj;
};

interface AddToFakerSelectionValues {
    tableFieldNameCombo: string;
    args: ArgObj;
};

interface ArgObj {
    [key: number]: string | number;
};

interface AddToArgValues {
    index: number,
    value: string | number;
};

interface FakerQueryState {
    fakerQueries: FakerQuery[];
    fakerArgObj: ArgObj;
    fakerFunctionSelectionObj: MapArgsToTableFieldNames;
    addFakerQuery: (by: FakerQuery) => void;
    removeFakerQuery: (by: number) => void;
    removeAllFakerQueries: () => void;
    addToArgObj: (by: AddToArgValues) => void;
    resetArgObj: () => void;
    addToFakerSelection: (by: AddToFakerSelectionValues) => void;
    removeFakerSelection: (by: string) => void;
    removeAllFakerSelections: () => void;
};

export const useFakerQueryStore = create<FakerQueryState>()(
    devtools(
        persist(
            (set) => ({
                fakerQueries: [],
                fakerArgObj: {},
                fakerFunctionSelectionObj: {},
                addFakerQuery: (by) => set((state) => ({ fakerQueries: [...state.fakerQueries, by] })),
                removeFakerQuery: (by) => set((state) => ({ fakerQueries: state.fakerQueries.filter(value => state.fakerQueries[by] !== value)})),
                removeAllFakerQueries: () => set({ fakerQueries: []}),
                addToArgObj: (by) => set((state) => ({ fakerArgObj: {...state.fakerArgObj, [by.index]: by.value }})),
                resetArgObj: () => set({ fakerArgObj: {} }),
                
                addToFakerSelection: (by) => set((state) => ({ fakerFunctionSelectionObj: {
                    ...state.fakerFunctionSelectionObj, [by.tableFieldNameCombo]: by.args 
                }})),
                
                removeFakerSelection: (by) => set((state) => ({ fakerFunctionSelectionObj: (
                    delete state.fakerFunctionSelectionObj[by], state.fakerFunctionSelectionObj)
                })),
                
                removeAllFakerSelections: () => set({ fakerFunctionSelectionObj: {}}),
            }),
            { 
                name: "faker-query-storage",
            }
        )
    )
);