export const formatDate = (dateStr: string) => {
        const newDate = new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        return newDate;
    }