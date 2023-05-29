import { useStoreMap, useUnit } from "effector-react";
import "../model/select-reviews-by-reply";
import {
  $activeTab,
  $tabReviewsNumber,
  TabType,
  selectTab,
} from "../model/select-reviews-by-reply";
import clsx from "clsx";

const tabs: TabType[] = [null, "withReply", "withoutReply"];

const getTabText = (
  tab: TabType,
  reviewsNumber: { withReply: number; withoutReply: number }
) => {
  if (tab === null) {
    return `All ${reviewsNumber.withReply + reviewsNumber.withoutReply}`;
  }

  return {
    withReply: `With reply ${reviewsNumber.withReply}`,
    withoutReply: `Without Reply ${reviewsNumber.withoutReply}`,
  }[tab];
};

type TabProps = {
  tab: TabType;
};

const Tab = ({ tab }: TabProps) => {
  const [reviewsNumber, selectTabFn] = useUnit([$tabReviewsNumber, selectTab]);

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
      {getTabText(tab, reviewsNumber)}
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
