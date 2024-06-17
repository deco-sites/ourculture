import type { AnalyticsEvent } from "apps/commerce/types.ts";

interface PostScoreEvent {
  name: "post_score";
  params: {
    score: number;
  };
}

export const sendEvent = <E extends AnalyticsEvent | PostScoreEvent>(
  event: E,
) => {
  console.log(JSON.stringify(event, null, 2));
  globalThis.window.DECO.events.dispatch(event);
};
