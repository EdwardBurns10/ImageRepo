export default store => {
  const saveI = async ({ _image, ...content }) =>
    store
      .collection("images")
      .post(content)
      .then(
        ({ id, rev }) =>
          _image &&
          store
            .collection("images")
            .putAttachment(id, "image", rev, _image.data, _image.type)
      );

  const removeI = content => store.collection("images").remove(content);

  const getI = () =>
    store
      .collection("images")
      .allDocs({
        include_docs: true,
        descending: true,
        attachments: true
      })
      .then(doc => doc.rows.map(row => row.doc));

  return {
    saveI,
    removeI,
    getI
  };
};
