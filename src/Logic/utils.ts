function getYearDifference(date1: Date, date2: Date): number {
    const msPerYear = 365.25 * 24 * 60 * 60 * 1000;

    const diffTime = Math.abs(date1.getTime() - date2.getTime());
    const diffYears = Math.floor(diffTime / msPerYear);
    return diffYears;
}


export function getMyAge(): number {
    const today = new Date();
    const birthday = new Date('2007-02-20');
    return getYearDifference(today, birthday);
}