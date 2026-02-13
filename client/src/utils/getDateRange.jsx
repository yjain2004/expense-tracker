export function getDateRange(range, customStart, customEnd) {
    const today = new Date();

    const formatDate = (date) =>
        date.toISOString().split("T")[0]; // YYYY-MM-DD

    let startDate, endDate;

    endDate = new Date(today);

    switch (range) {
        case "30days":
            startDate = new Date();
            startDate.setDate(today.getDate() - 30);
            break;

        case "3months":
            startDate = new Date();
            startDate.setMonth(today.getMonth() - 3);
            break;

        case "6months":
            startDate = new Date();
            startDate.setMonth(today.getMonth() - 6);
            break;

        case "fy": {
            const year =
                today.getMonth() >= 3
                    ? today.getFullYear()
                    : today.getFullYear() - 1;

            startDate = new Date(year, 3, 1); // April 1
            endDate = new Date(year + 1, 2, 31); // March 31
            break;
        }

        case "custom":
            if (!customStart || !customEnd) {
                throw new Error("Custom range requires start and end date");
            }
            return {
                startDate: customStart,
                endDate: customEnd
            };

        default:
            throw new Error("Invalid range selected");
    }

    return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
    };
}
