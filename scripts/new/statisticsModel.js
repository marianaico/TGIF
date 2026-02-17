export function calculateStats(members) {

    const filterByParty = (party) =>
        members.filter(m => m.party === party);

    const average = (array, field) =>
        array.length
            ? (array.reduce((sum, m) => sum + m[field], 0) / array.length).toFixed(2)
            : 0;

    const getTopBottom = (array, field, order) => {

        const sorted = [...array].sort((a, b) =>
            order === "desc"
                ? b[field] - a[field]
                : a[field] - b[field]
        );

        const tenPercent = Math.ceil(array.length * 0.1);
        let result = sorted.slice(0, tenPercent);

        // incluir empates
        for (let i = tenPercent; i < sorted.length; i++) {
            if (sorted[i][field] === result[result.length - 1][field]) {
                result.push(sorted[i]);
            } else break;
        }

        return result;
    };

    return {

        glance: [
            {
                party: "Democrats",
                count: filterByParty("D").length,
                avgMissed: average(filterByParty("D"), "missed_votes_pct"),
                avgVotes: average(filterByParty("D"), "votes_with_party_pct")
            },
            {
                party: "Republicans",
                count: filterByParty("R").length,
                avgMissed: average(filterByParty("R"), "missed_votes_pct"),
                avgVotes: average(filterByParty("R"), "votes_with_party_pct")
            },
            {
                party: "Independents",
                count: filterByParty("I").length,
                avgMissed: average(filterByParty("I"), "missed_votes_pct"),
                avgVotes: average(filterByParty("I"), "votes_with_party_pct")
            }
        ],

        leastEngaged: getTopBottom(members, "missed_votes_pct", "desc"),
        mostEngaged: getTopBottom(members, "missed_votes_pct", "asc"),

        leastLoyal: getTopBottom(members, "votes_with_party_pct", "asc"),
        mostLoyal: getTopBottom(members, "votes_with_party_pct", "desc")
    };
}
