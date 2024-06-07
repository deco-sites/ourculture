import { MatchContext } from "deco/blocks/matcher.ts"

export interface Props {
    campaigns: string[]
}

export default function UtmCampaing({ campaigns }: Props, ctx: MatchContext) {

    const urlSearchParams = new URLSearchParams(new URL(ctx.request.url).search);
    const utmCampaign = urlSearchParams.get("utm_campaign");

    if(!utmCampaign) {
        return false
    }

    const hasUtmCampaign = campaigns.some((campaign) => {
        const hasWildcard = campaign.endsWith("*");

        if(hasWildcard && utmCampaign.startsWith(campaign)) {
            return true;
        };

        if(utmCampaign === campaign) {
            return true;
        };

        return false;
    });

    return hasUtmCampaign;
    
}