const removeColumnPassword = (data) => {
  if (data.length > 0) {
    data.forEach((obj) => {
      delete obj.password;
    });
    return data;
  }
};

module.exports = removeColumnPassword;
