export const countPage = (limit, totalTask) => {
    try {
        let totalPage = 0;
        if (totalTask <= limit) {
            totalPage = 1;
        } else {
            totalPage = parseInt(totalTask / limit);
            if (totalTask % limit > 0) {
                totalPage = totalPage + 1;
            }
        }
        return totalPage;
    } catch (error) {
        console.log("countPage - ", error)
    }
};