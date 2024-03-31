import { create } from 'zustand'
import sideBarItems from '@/lib/sidebaritems';
import { immer } from 'zustand/middleware/immer';
import { LogBookTable, SideBarItem, Notification } from '@/types/types';

type State = {
    sideBarItem: SideBarItem
    assessment: LogBookTable[]
    notifications: Notification[];
}

type Action = {
    addNewTask: (assessment: LogBookTable) => void
    updateDashboadItem: (item: SideBarItem) => void
}

const usePlatformState = create<State & Action>()(immer((set) => ({
    assessment: [],
    notifications: [],
    sideBarItem: sideBarItems[0],
    updateDashboadItem: (item) => set(() => ({ sideBarItem: item })),
    addNewTask: (assessment) => set((state) => { state.assessment.push(assessment) }),
})))

export default usePlatformState