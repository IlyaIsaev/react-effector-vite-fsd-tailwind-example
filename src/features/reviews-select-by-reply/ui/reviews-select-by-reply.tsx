import clsx from "clsx";
import { useStoreMap, useUnit } from "effector-react";
import {
  $replyReviewsSelected,
  $tabReviewsNumber,
  TabType,
  fetchReviewsCountByReplyFx,
  fetchProductReviewsCountByReplyFx,
  selectReviewsByReply,
} from "../model/reviews-select-by-reply";

const tabs: TabType[] = [null, "withReply", "withoutReply"];

const getTabText = (
  tab: TabType,
  reviewsNumber: { withReply: number; withoutReply: number },
  countPending: boolean
) => {
  if (tab === null) {
    return `All ${
      countPending
        ? "..."
        : reviewsNumber.withReply + reviewsNumber.withoutReply
    }`;
  }

  return {
    withReply: `With reply ${countPending ? "..." : reviewsNumber.withReply}`,
    withoutReply: `Without Reply ${
      countPending ? "..." : reviewsNumber.withoutReply
    }`,
  }[tab];
};

type TabProps = {
  tab: TabType;
};

const Tab = ({ tab }: TabProps) => {
  const [
    reviewsNumber,
    countReviewsProductByReplyPending,
    countByReplyPending,
    setTabActiveFn,
  ] = useUnit([
    $tabReviewsNumber,
    fetchProductReviewsCountByReplyFx.pending,
    fetchReviewsCountByReplyFx.pending,
    selectReviewsByReply,
  ]);

  const isActive = useStoreMap({
    store: $replyReviewsSelected,
    keys: [tab],
    fn: (activeTab, [tabId]) => activeTab === tabId,
  });

  const handleClick = () => {
    setTabActiveFn(tab);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "py-5 px-5 cursor-pointer",
        isActive ? "bg-slate-100" : "bg-transparent"
      )}
    >
      {getTabText(
        tab,
        reviewsNumber,
        countReviewsProductByReplyPending || countByReplyPending
      )}
    </div>
  );
};

export const ReviewsSelectByReply = () => {
  return (
    <div className="flex">
      {tabs.map((tab) => (
        <Tab key={tab} tab={tab} />
      ))}
    </div>
  );
};
