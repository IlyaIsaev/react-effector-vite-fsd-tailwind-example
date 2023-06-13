import { useStoreMap, useUnit } from "effector-react";
import { $activeReviewId, $reviewList, setActiveReview } from "../model/review";

export const ReviewCard = () => {
  const [activeReviewId, setActiveReviewFn] = useUnit([
    $activeReviewId,
    setActiveReview,
  ]);

  const isOpen = useStoreMap($activeReviewId, (activeReviewId) =>
    Boolean(activeReviewId)
  );

  const review = useStoreMap({
    store: $reviewList,
    keys: [activeReviewId],
    fn: (reviewList, [reviewId]) =>
      reviewList.find((review) => review.id === reviewId),
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-full h-full fixed top-0 right-0 z-50">
      <div
        className="z-10 w-full h-full absolute top-0 left-0"
        onClick={() => setActiveReviewFn(null)}
      ></div>
      <div className="w-1/3 h-screen absolute top-0 right-0 bg-white border-l z-20 p-5">
        <div className="flex flex-col space-y-2">
          <div>
            <div className="font-bold">Author</div>
            <div>{review?.author}</div>
          </div>
          <div>
            <div className="font-bold">Date</div>
            <div>
              {review?.date ? new Date(review?.date).toUTCString() : null}
            </div>
          </div>
          <div>
            <div className="font-bold">Text</div>
            <div className="">{review?.text}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
