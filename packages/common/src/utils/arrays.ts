export function arrayKeepLast<T>(list: T[], keepCount: number) {
    const deleteCount = list.length - keepCount;
    if (deleteCount > 0) {
        list.splice(0, deleteCount);
    }
}