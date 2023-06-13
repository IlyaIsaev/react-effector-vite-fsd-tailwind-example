import { Review } from "@shared/types/review";
import { api } from "./const";

export const readReview = (reviewId: Review["id"] | null) =>
  reviewId ? api.get(`review/${reviewId}/read`).json() : null;
