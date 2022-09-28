import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SqlQuery {
    query: string;
}


interface SqlQueryState {
    sqlQuery: string;
    sqlQueryHistory: SqlQuery[];
    updateQuery: (by: string) => void;
    removeQuery: () => void;
    updateQueryHistory: (by: SqlQuery) => void;
    removeQueryFromHistory: (by: number) => void;
    removeAllQueries: () => void;
}


export const useSqlQueryStore = create<SqlQueryState>()(
    devtools(
        persist(
            (set) => ({
                sqlQuery: "",
                sqlQueryHistory: [],
                updateQuery: (by) => set((state) => ({ sqlQuery: state.sqlQuery = by})),
                removeQuery: () => set({ sqlQuery: ""}),
                updateQueryHistory: (by) => set((state) => ({ sqlQueryHistory: [...state.sqlQueryHistory, by]})),
                removeQueryFromHistory: (by) => set((state) => ({ sqlQueryHistory: state.sqlQueryHistory.filter(value => state.sqlQueryHistory[by] !== value)})),
                removeAllQueries: () => set({ sqlQueryHistory: [] })
            }),
            {
                name: "sql-query-storage",
            }
        )
    )
)