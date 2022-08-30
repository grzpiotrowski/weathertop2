let customHelpers = {
  formatDatetimeIsoString: function(dateString) {
    const date = new Date(dateString);
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth()+1).padStart(2, '0');
    let year = String(date.getFullYear());
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
};

module.exports = customHelpers;