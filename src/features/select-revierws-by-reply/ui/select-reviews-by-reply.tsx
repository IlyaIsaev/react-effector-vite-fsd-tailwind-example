import clsx from "clsx";
import { useStoreMap, useUnit } from "effector-react";
import "../model/select-reviews-by-reply";
import {
  $activeTab,
  $tabReviewsNumber,
  TabType,
  getCountByReplyFx,
  getCountReviewsProductByReplyFx,
  selectTab,
} from "../model/select-reviews-by-reply";

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
    withReply: `With reply ${
      countPending ? "..." : reviewsNumber.withReply
    }`,
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
    selectTabFn,
  ] = useUnit([
    $tabReviewsNumber,
    getCountReviewsProductByReplyFx.pending,
    getCountByReplyFx.pending,
    selectTab,
  ]);

  console.log({ countReviewsProductByReplyPending });

  const isActive = useStoreMap({
    store: $activeTab,
    keys: [tab],
    fn: (activeTab, [tabId]) => activeTab === tabId,
  });

  const handleClick = () => {
    selectTabFn(tab);
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

export const SelectReviewsByReply = () => {
  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <Tab key={tab} tab={tab} />
      ))}
    </div>
  );
};
