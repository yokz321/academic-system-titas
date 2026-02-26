"use client"

import { createContext, useContext, type ReactNode, useRef } from "react"
import { useStore } from "zustand"
import { useShallow } from "zustand/react/shallow"
import { type StoreApi } from "zustand/vanilla"
import { appStore, type IStoreState } from "@/store/app-store"

export { useShallow }
export type IAppStoreApi = StoreApi<IStoreState>

const StoreContext = createContext<IAppStoreApi | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<IAppStoreApi | null>(null)
  if (!storeRef.current) {
    storeRef.current = appStore()
  }

  return (
    <StoreContext.Provider value={storeRef.current}>
      {children}
    </StoreContext.Provider>
  )
}

export function useBoundStore<T>(selector: (s: IStoreState) => T): T {
  const storeContext = useContext(StoreContext)
  if (!storeContext) {
    throw new Error("useBoundStore must be used within StoreProvider.")
  }
  return useStore(storeContext, selector)
}
