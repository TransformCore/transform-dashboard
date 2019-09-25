/**
 * Replaces all underscores with spaces in order to help the includes search from name.
 * example: name=some_name  name.includes('Some Name')== false
 */
function replaceAllUnderscores(name) {
  return name.replace(/_/g, ' ');
}

/**
 * Helps Remove the size parameter from the url
 * @returns the original url without the size parameter "=s220"
 */
function removeThumbnailSize(thumbnailLink) {
  return thumbnailLink.slice(0, -5);
}

module.exports = {
  replaceAllUnderscores,
  removeThumbnailSize
};
