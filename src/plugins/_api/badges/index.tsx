/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import "./fixBadgeOverflow.css";

import { _getBadges, BadgePosition, BadgeUserArgs, ProfileBadge } from "@api/Badges";
import DonateButton from "@components/DonateButton";
import ErrorBoundary from "@components/ErrorBoundary";
import { Flex } from "@components/Flex";
import { Heart } from "@components/Heart";
import { openContributorModal } from "@components/PluginSettings/ContributorModal";
import { Devs } from "@utils/constants";
import { Logger } from "@utils/Logger";
import { Margins } from "@utils/margins";
import { isPluginDev } from "@utils/misc";
import { closeModal, Modals, openModal } from "@utils/modal";
import definePlugin from "@utils/types";
import { Forms, Toasts, UserStore } from "@webpack/common";
import { User } from "discord-types/general";

const CONTRIBUTOR_BADGE = "https://vencord.dev/assets/favicon.png";

const ContributorBadge: ProfileBadge = {
    description: "Vencord Contributor",
    image: CONTRIBUTOR_BADGE,
    position: BadgePosition.START,
    shouldShow: ({ userId }) => isPluginDev(userId),
    onClick: (_, { userId }) => openContributorModal(UserStore.getUser(userId))
};

let DonorBadges = {} as Record<string, Array<Record<"tooltip" | "badge", string>>>;
let VencordyBadges = {} as Record<string, Array<Record<"tooltip" | "badge", string>>>;

async function loadBadges(noCache = false) {
    const init = {} as RequestInit;
    if (noCache) init.cache = "no-cache";

    try {
        const donorResponse = await fetch("https://badges.vencord.dev/badges.json", init);
        if (donorResponse.ok) {
            DonorBadges = await donorResponse.json();
        } else {
            console.error("Failed to load donor badges", donorResponse.status);
        }

        const vencordyResponse = await fetch("https://meowrgh.pl/_api/badges.json", init);
        if (vencordyResponse.ok) {
            VencordyBadges = await vencordyResponse.json();
        } else {
            console.error("Failed to load Vencordy badges", vencordyResponse.status);
        }
    } catch (e) {
        console.error("Error loading badges", e);
    }
}


export default definePlugin({
    name: "BadgeAPI",
    description: "API to add badges to users.",
    authors: [Devs.Megu, Devs.Ven, Devs.TheSun],
    required: true,
    patches: [
        /* Patch the badge list component on user profiles */
        {
            find: 'id:"premium",',
            replacement: [
                {
                    match: /&&(\i)\.push\(\{id:"premium".+?\}\);/,
                    replace: "$&$1.unshift(...$self.getBadges(arguments[0]));",
                },
                {
                    // alt: "", aria-hidden: false, src: originalSrc
                    match: /alt:" ","aria-hidden":!0,src:(?=(\i)\.src)/,
                    // ...badge.props, ..., src: badge.image ?? ...
                    replace: "...$1.props,$& $1.image??"
                },
                // replace their component with ours if applicable
                {
                    match: /(?<=text:(\i)\.description,spacing:12,.{0,50})children:/,
                    replace: "children:$1.component ? () => $self.renderBadgeComponent($1) :"
                },
                // conditionally override their onClick with badge.onClick if it exists
                {
                    match: /href:(\i)\.link/,
                    replace: "...($1.onClick && { onClick: vcE => $1.onClick(vcE, $1) }),$&"
                }
            ]
        },

        /* new profiles */
        {
            find: ".FULL_SIZE]:26",
            replacement: {
                match: /(?<=(\i)=\(0,\i\.\i\)\(\i\);)return 0===\i.length\?/,
                replace: "$1.unshift(...$self.getBadges(arguments[0].displayProfile));$&"
            }
        },
        {
            find: ".description,delay:",
            replacement: [
                {
                    // alt: "", aria-hidden: false, src: originalSrc
                    match: /alt:" ","aria-hidden":!0,src:(?=.{0,20}(\i)\.icon)/,
                    // ...badge.props, ..., src: badge.image ?? ...
                    replace: "...$1.props,$& $1.image??"
                },
                {
                    match: /(?<=text:(\i)\.description,.{0,50})children:/,
                    replace: "children:$1.component ? $self.renderBadgeComponent({ ...$1 }) :"
                },
                // conditionally override their onClick with badge.onClick if it exists
                {
                    match: /href:(\i)\.link/,
                    replace: "...($1.onClick && { onClick: vcE => $1.onClick(vcE, $1) }),$&"
                }
            ]
        }
    ],

    toolboxActions: {
        async "Refetch Badges"() {
            await loadBadges(true);
            Toasts.show({
                id: Toasts.genId(),
                message: `{ message: "200", text: "Succesfully refetched badges" }`,
                type: Toasts.Type.SUCCESS
            });

            console.log("Reloading BadgeAPI");
        }
    },

    async start() {
        Vencord.Api.Badges.addBadge(ContributorBadge);
        await loadBadges();
    },

    getBadges(props: { userId: string; user?: User; guildId: string; }) {
        if (!props) return [];

        try {
            props.userId ??= props.user?.id!;

            const donorBadges = this.getDonorBadges(props.userId) || [];
            const vencordyBadges = this.getVencordyBadges(props.userId) || [];

            return [...donorBadges, ...vencordyBadges];
        } catch (e) {
            new Logger("BadgeAPI#hasBadges").error(e);
            return [];
        }
    },


    renderBadgeComponent: ErrorBoundary.wrap((badge: ProfileBadge & BadgeUserArgs) => {
        const Component = badge.component!;
        return <Component {...badge} />;
    }, { noop: true }),


    getDonorBadges(userId: string) {
        return DonorBadges[userId]?.map(badge => ({
            image: badge.badge,
            description: badge.tooltip,
            position: BadgePosition.START,
            props: {
                style: {
                    borderRadius: "50%",
                    transform: "scale(0.9)" // The image is a bit too big compared to default badges
                }
            },
            onClick() {
                const modalKey = openModal(props => (
                    <ErrorBoundary noop onError={() => {
                        closeModal(modalKey);
                        VencordNative.native.openExternal("https://github.com/sponsors/Vendicated");
                    }}>
                        <Modals.ModalRoot {...props}>
                            <Modals.ModalHeader>
                                <Flex style={{ width: "100%", justifyContent: "center" }}>
                                    <Forms.FormTitle
                                        tag="h2"
                                        style={{
                                            width: "100%",
                                            textAlign: "center",
                                            margin: 0
                                        }}
                                    >
                                        <Heart />
                                        Vencord Donor
                                    </Forms.FormTitle>
                                </Flex>
                            </Modals.ModalHeader>
                            <Modals.ModalContent>
                                <Flex>
                                    <img
                                        role="presentation"
                                        src="https://cdn.discordapp.com/emojis/1026533070955872337.png"
                                        alt=""
                                        style={{ margin: "auto" }}
                                    />
                                    <img
                                        role="presentation"
                                        src="https://cdn.discordapp.com/emojis/1026533090627174460.png"
                                        alt=""
                                        style={{ margin: "auto" }}
                                    />
                                </Flex>
                                <div style={{ padding: "1em" }}>
                                    <Forms.FormText>
                                        This Badge is a special perk for Vencord Donors
                                    </Forms.FormText>
                                    <Forms.FormText className={Margins.top20}>
                                        Please consider supporting the development of Vencord by becoming a donor. It would mean a lot!!
                                    </Forms.FormText>
                                </div>
                            </Modals.ModalContent>
                            <Modals.ModalFooter>
                                <Flex style={{ width: "100%", justifyContent: "center" }}>
                                    <DonateButton />
                                </Flex>
                            </Modals.ModalFooter>
                        </Modals.ModalRoot>
                    </ErrorBoundary>
                ));
            },
        }));
    },

    getVencordyBadges(userId: string) {
        console.log("Fetching Vencordy badges for user:", userId); // Debug log
        const badges = VencordyBadges[userId];
        console.log("Vencordy badges found:", badges); // Debug log

        return badges?.map(badge => ({
            image: badge.badge,
            description: badge.tooltip,
            position: BadgePosition.START,
            props: {
                style: {
                    borderRadius: "50%",
                    transform: "scale(0.9)" // The image is a bit too big compared to default badges
                }
            },
            onClick() {
                const modalKey = openModal(props => (
                    <ErrorBoundary noop onError={() => {
                        closeModal(modalKey);
                        VencordNative.native.openExternal("https://github.com/sponsors/Vendicated");
                    }}>
                        <Modals.ModalRoot {...props}>
                            <Modals.ModalHeader>
                                <Flex style={{ width: "100%", justifyContent: "center" }}>
                                    <Forms.FormTitle
                                        tag="h2"
                                        style={{
                                            width: "100%",
                                            textAlign: "center",
                                            margin: 0
                                        }}
                                    >
                                        <Heart />
                                        Vencordy User!
                                    </Forms.FormTitle>
                                </Flex>
                            </Modals.ModalHeader>
                            <Modals.ModalContent>
                                <Flex>
                                    <img
                                        role="presentation"
                                        src="https://meowrgh.pl/_global/_img-kisser_1.png"
                                        alt=""
                                        style={{ margin: "auto" }}
                                    />
                                    <img
                                        role="presentation"
                                        src="https://meowrgh.pl/_global/_img-kisser_2.png"
                                        alt=""
                                        style={{ margin: "auto" }}
                                    />
                                </Flex>
                                <div style={{ padding: "1em" }}>
                                    <Forms.FormText>
                                        This badge is a special for Vencordy users that have donated/helped the developers of this custom vencord build
                                    </Forms.FormText>
                                </div>
                            </Modals.ModalContent>
                            <Modals.ModalFooter>
                                <Flex style={{ width: "100%", justifyContent: "center" }}>
                                    <DonateButton />
                                </Flex>
                            </Modals.ModalFooter>
                        </Modals.ModalRoot>
                    </ErrorBoundary>
                ));
            },
        })) || []; // Fallback to empty array if undefined
    }

});
