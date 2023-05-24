import { API_NAMESPACE } from "./const";

export const fetchReviewsMetaInfo = () =>
  fetch(`/${API_NAMESPACE}/reviews-meta-info`).then((res) => res.json());
