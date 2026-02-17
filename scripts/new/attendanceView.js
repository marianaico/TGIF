import { calculateStats } from "./statisticsModel.js";

document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);
    const chamber = params.get("chamber") || "senate";

    const response = await fetch(`src/${chamber}-stats.json`);
    const data = await response.json();

    const stats = calculateStats(data.results[0].members);

    stats.glance.forEach(p => {
        document.getElementById("party-body").innerHTML +=
            `<tr><td>${p.party}</td><td>${p.count}</td><td>${p.avgMissed}%</td></tr>`;
    });

    render("least-engaged", stats.leastEngaged, "missed_votes_pct");
    render("most-engaged", stats.mostEngaged, "missed_votes_pct");
});

function render(id, members, field) {
    members.forEach(m => {
        document.getElementById(id).innerHTML +=
            `<tr><td>${m.first_name} ${m.last_name}</td><td>${m[field]}%</td></tr>`;
    });
}
