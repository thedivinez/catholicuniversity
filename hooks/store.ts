import { create } from 'zustand'
import sideBarItems from '@/lib/sidebaritems';
import { immer } from 'zustand/middleware/immer';
import { LogBookTable, SideBarItem, Notification, Student, User } from '@/types/types';

type State = {
    user: User
    students: Student[];
    sideBarItem: SideBarItem
    assessment: LogBookTable[]
    notifications: Notification[];
}

type Action = {
    addNewTask: (assessment: LogBookTable) => void
    updateDashboadItem: (item: SideBarItem) => void
}

const usePlatformState = create<State & Action>()(immer((set) => ({
    students: [],
    assessment: [],
    user: {} as User,
    notifications: [],
    sideBarItem: sideBarItems[0],
    updateDashboadItem: (item) => set(() => ({ sideBarItem: item })),
    addNewTask: (assessment) => set((state) => { state.assessment.push(assessment) }),
})))

export default usePlatformState