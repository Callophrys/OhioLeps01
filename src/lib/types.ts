// Example: export type SomeNewName <T> = Partial<T> & { newMember: boolean }

export type ChecklistCombinedName<T> = Partial<T> & { xname: string }
export type CountyIsMonitored<T> = Partial<T> & { isMonitored: boolean, siteCount: number }