module.exports = buildFileUrl = (protocol, hostname, path, filename) => {
  return `${protocol}://${hostname}${path}/${filename}`;
};
