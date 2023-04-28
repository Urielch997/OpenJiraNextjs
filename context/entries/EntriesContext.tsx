import { createContext } from "react";
import { Entry } from "src/interfaces";

interface  ContextProps {
    entries:Entry[],
    AddNewEntry: (description: string) => void,
    updateEntry:(entry:Entry) =>void
}

export const EntriesContext = createContext({} as ContextProps)