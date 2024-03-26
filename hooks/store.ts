import { create } from 'zustand'
import { assessment } from '@/lib/fakedata';
import sideBarItems from '@/lib/sidebaritems';
import { immer } from 'zustand/middleware/immer';
import { LogBookTable, SideBarItem, User } from '@/types/types';

type State = {
    user: User
    sideBarItem: SideBarItem
    assessment: LogBookTable[]
}

type Action = {
    addNewTask: (assessment: LogBookTable) => void
    updateDashboadItem: (item: SideBarItem) => void
}

const usePlatformState = create<State & Action>()(immer((set) => ({
    user: {
        progress: 3,
        firstName: "John",
        lastName: "Claison",
        userType: "Student",
        regNumber: "5655353",
        phone: "+263 777 000 111",
        supervisor: "Mr E. Mutamba",
        email: "johnclaison@gmail.com",
        organization: "Direct Digital World",
        degree: "Bachelor of Software Engineering Honours",
    },
    assessment: assessment,
    sideBarItem: sideBarItems[0],
    updateDashboadItem: (item) => set(() => ({ sideBarItem: item })),
    addNewTask: (assessment) => set((state) => { state.assessment.push(assessment) }),
})))

export default usePlatformState