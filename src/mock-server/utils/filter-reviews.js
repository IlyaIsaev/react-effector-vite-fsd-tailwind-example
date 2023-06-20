const filterByReply = (review, hasReply) =>
  hasReply === "true"
    ? Boolean(review.reply)
    : hasReply === "false"
    ? !review.reply
    : true;

const filterBySearch = (review, searchValue) =>
  review.text.includes(searchValue) || review.author.includes(searchValue);

const getResultWithAddedReview = (result, review) => [...result, review];

export const filterReviews = (reviews, queryParams = {}) =>
  reviews.reduce((acc, review) => {
    const { hasReply, searchValue } = queryParams;

    const hasReplyFilter = "hasReply" in queryParams;

    const hasSearchFilter = "searchValue" in queryParams;

    return hasReplyFilter && !hasSearchFilter
      ? filterByReply(review, hasReply)
        ? getResultWithAddedReview(acc, review)
        : acc
      : !hasReplyFilter && hasSearchFilter
      ? filterBySearch(review, searchValue)
        ? getResultWithAddedReview(acc, review)
        : acc
      : hasReplyFilter && hasSearchFilter
      ? filterBySearch(review, searchValue) && filterByReply(review, hasReply)
        ? getResultWithAddedReview(acc, review)
        : acc
      : getResultWithAddedReview(acc, review);
  }, []);
