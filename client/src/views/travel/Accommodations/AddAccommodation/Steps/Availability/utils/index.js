import dayjs from "dayjs";

export const groupData = (rooms, roomsTypes) => {
    const temp = rooms.map(room => {
        const columns = room.dates.reduce((accumulator, currentValue) => {
            if (accumulator.find(date => currentValue.date === date)) {
                return accumulator;
            }

            return [...accumulator, currentValue.date];
        }, []);

        const rows = [];
        let soldRow = {}
        let availableRow = {}
        let notAvailableRow = {}
        let totalRow = {}

        columns.forEach(column => {
            const dateArray = room.dates.filter(el => el.date === column);
            soldRow[`${column}`] = dateArray.find(date => date.saleStatus === 1) ?
                dateArray.find(date => date.saleStatus === 1).count : 0;
            availableRow[`${column}`] = dateArray.find(date => date.saleStatus === 0) ?
                dateArray.find(date => date.saleStatus === 0).count : 0;
            notAvailableRow[`${column}`] = dateArray.find(date => date.saleStatus === 2) ?
                dateArray.find(date => date.saleStatus === 2).count : 0;
            totalRow[`${column}`] = dateArray.reduce((acc, value) => acc + value.count, 0);
        });

        rows.push({ "ROW_NAME": "Sold", ...soldRow });
        rows.push({ "ROW_NAME": "Available", ...availableRow });
        rows.push({ "ROW_NAME": "Not Available", ...notAvailableRow });
        rows.push({ "ROW_NAME": "Total", ...totalRow });

        return {
            roomTypeName: roomsTypes.find((roomType) => roomType.id === room.roomTypeId)?.name,
            columns: [
                {
                    title: "#",
                    dataIndex: "ROW_NAME",
                    key: "ROW_NAME",
                },
                ...columns.sort((a, b) => {
                    const dateA = new Date(a);
                    const dateB = new Date(b);
                    return dateA - dateB;
                }).map(column => ({
                    title: dayjs(column).format('dddd - DD/MM/YYYY'),
                    dataIndex: `${column}`,
                    key: `${column}`,
                }))
            ],
            rows: rows
        }
    })

    return temp.map(el => flipData(el));
};

const flipData = (data) => {
    const rows = data.columns.map(column => ({
        ...column,
        ...data.rows.reduce((acc, row) => {
            acc[row.ROW_NAME] = row[column.key];
            return acc;
        }, {}),
    }));
    rows.shift();

    const columns = data.rows.map(row => ({ title: row.ROW_NAME, dataIndex: row.ROW_NAME, key: row.ROW_NAME }));
    return {
        roomTypeName: data.roomTypeName,
        rows,
        columns: [{
            title: "Date",
            dataIndex: "title",
            key: "title",
        }, ...columns]
    }
}
