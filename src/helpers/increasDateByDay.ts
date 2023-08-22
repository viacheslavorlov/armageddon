// Возвращает дату в формате yyyy-mm-dd

// получает дату в виде строки в формате yyyy-mm-dd

export  const increaseDateByDay = (dateString: string, day: number = 1) => {
    const newDate = new Date(dateString);
    newDate.setDate(newDate.getDate() + day);
    return newDate.toLocaleDateString().split('.').reverse().join('-');
};
