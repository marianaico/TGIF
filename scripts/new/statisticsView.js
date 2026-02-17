import { calculateStats } from "./statistics.js";

document.addEventListener("DOMContentLoaded", async () => {

    try {

        const response = await fetch("src/senate-stats.json");
        const data = await response.json();

        const members = data.results[0].members;

        const stats = calculateStats(members);

        renderGlance(stats.glance);
        renderTable("least-engaged-body", stats.leastEngaged, "missed_votes_pct");
        renderTable("most-engaged-body", stats.mostEngaged, "missed_votes_pct");
        renderTable("least-loyal-body", stats.leastLoyal, "votes_with_party_pct");
        renderTable("most-loyal-body", stats.mostLoyal, "votes_with_party_pct");

    } catch (error) {
        console.error("ERROR:", error);
    }

});


function renderGlance(data) {
    const tbody = document.getElementById("party-stats-body");

    data.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.party}</td>
                <td>${p.count}</td>
                <td>${p.avgMissed} %</td>
                <td>${p.avgVotes} %</td>
            </tr>
        `;
    });
}


function renderTable(id, members, field) {
    const tbody = document.getElementById(id);

    members.forEach(m => {
        const name = `${m.first_name} ${m.last_name}`;
        tbody.innerHTML += `
            <tr>
                <td><a href="${m.url}" target="_blank">${name}</a></td>
                <td>${m[field]} %</td>
            </tr>
        `;
    });
}

