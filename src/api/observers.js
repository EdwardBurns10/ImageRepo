export default store => {
  const onIChange = callback =>
    store
      .collection("images")
      .changes({ since: "now", live: true })
      .on("change", callback);

  return {
    onIChange
  };
};
