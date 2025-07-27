import {create} from "zustand";

type CounterState = {
    count : number;
    onIncrease : () => void;
}

export const useCounterState = create<CounterState>((set) => ({
    count : 0,
    onIncrease : () => set((state) => ({count : state.count + 1}))
}))

