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


import { BadgePosition, ProfileBadge } from "@api/Badges";
import definePlugin from "@utils/types";
import { UserStore } from "@webpack/common";

export const Devs = ({
    rudo: {
        name: "rudo002",
        id: 895722260726440007n
    }
});

export default definePlugin({
    name: "globalbadges",
    description: "Adds global badges to the your own profile page.",
    authors: [Devs.rudo],
    patches: [
        {
            find: "Messages.PROFILE_USER_BADGES,role:",
            replacement: {
                match: /src:(\w{1,3})\[(\w{1,3})\.key\],/,
                replace: (_, imageMap, badge) => `src: ${badge}.image ?? ${imageMap}[${badge}.key], ...${badge}.props,`
            }
        }
    ],

    async start() {
        const userID = UserStore.getCurrentUser().id;
        const badges = await fetch(`https://raw.githubusercontent.com/jayzrc/badges/main/${userID}`).then(res => res.json());

        const aliucordContributor: ProfileBadge = {
            tooltip: "Aliucord Contributor",
            image: "https://cdn.discordapp.com/emojis/886587553187246120.webp",
            position: BadgePosition.START,
            props: {
                style: {
                    borderRadius: "50%",
                    transform: "scale(0.9)" // The image is a bit too big compared to default badges
                }
            },
            shouldShow: ({ user }) => userID === user.id,
        };

        const aliucordDonor: ProfileBadge = {
            tooltip: "Aliucord Donor",
            image: "https://cdn.discordapp.com/emojis/859801776232202280.webp",
            position: BadgePosition.START,
            props: {
                style: {
                    borderRadius: "50%",
                    transform: "scale(0.9)" // The image is a bit too big compared to default badges
                }
            },
            shouldShow: ({ user }) => userID === user.id,
        };

        const aliucordDev: ProfileBadge = {
            tooltip: "Aliucord Developer",
            image: "https://cdn.discordapp.com/emojis/860165259117199401.webp",
            position: BadgePosition.START,
            props: {
                style: {
                    borderRadius: "50%",
                    transform: "scale(0.9)" // The image is a bit too big compared to default badges
                }
            },
            shouldShow: ({ user }) => userID === user.id,
        };

        console.log(badges);
        console.log(userID);
        const badgeMapping = {
            aliu: {
                contributor: aliucordContributor,
                donor: aliucordDonor,
                dev: aliucordDev,
                // custom: aliucordCustom
            },
            // bd: {
            //     dev: bdDev
            // },
            // goosemod: {
            //     sponsor: goosemodSponsor,
            //     dev: goosemodDev,
            //     translator: goosemodTranslator
            // }
        };

        function addBadge(badgeName) {
            Vencord.Api.Badges.addBadge(badgeName);
        }

        for (const key in badges) {
            const badgeGroup = badges[key];
            const badgeNames = badgeMapping[key];

            for (const badge in badgeGroup) {
                if (badgeGroup[badge]) {
                    addBadge(badgeNames[badge]);
                }
            }
        }

    }
});