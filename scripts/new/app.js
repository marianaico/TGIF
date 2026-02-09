import { calculateStats } from './statistics.js';


const isSenate = window.location.pathname.includes('senate');
const url = isSenate 
    ? "https://raw.githubusercontent.com/AlfonsoCastanedaAlvarez/CURSO1/master/pro-congress-113-senate.json"
    : "https://raw.githubusercontent.com/AlfonsoCastanedaAlvarez/CURSO1/master/pro-congress-113-house.json";

async function loadData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const members = data.results[0].members;
        
        const stats = calculateStats(members);
        renderAll(stats);
    } catch (error) {
        console.error("Error cargando datos:", error);
    }
}

function renderAll(stats) {
    
    document.getElementById('glance-table').innerHTML = stats.glance.map(row => `
        <tr><td>${row.party}</td><td>${row.count}</td><td>${row.avgVotes}%</td></tr>
    `).join('');

    
    renderMemberTable('least-engaged', stats.leastEngaged, 'missed_votes', 'missed_votes_pct');
    renderMemberTable('most-engaged', stats.mostEngaged, 'missed_votes', 'missed_votes_pct');

    
    renderMemberTable('least-loyal', stats.leastLoyal, 'total_votes', 'votes_with_party_pct');
    renderMemberTable('most-loyal', stats.mostLoyal, 'total_votes', 'votes_with_party_pct');
}

function renderMemberTable(id, members, countKey, pctKey) {
    const container = document.getElementById(id);
    container.innerHTML = members.map(m => `
        <tr>
            <td><a href="${m.url}">${m.first_name} ${m.last_name}</a></td>
            <td>${m[countKey]}</td>
            <td>${m[pctKey]}%</td>
        </tr>
    `).join('');
}

loadData();