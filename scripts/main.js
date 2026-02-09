const dataSource = window.location.pathname.includes('senate') 
    ? 'https://raw.githubusercontent.com/AlfonsoCastanedaAlvarez/CURSO1/master/pro-congress-113-senate.json'
    : 'https://raw.githubusercontent.com/AlfonsoCastanedaAlvarez/CURSO1/master/pro-congress-113-house.json';

fetch(dataSource)
    .then(response => response.json())
    .then(data => {
        const members = data.results[0].members;
        initStatistics(members); 
        renderTables();          
    });

function renderTables() {
    
    const glanceBody = document.getElementById('at-a-glance-body');
    glanceBody.innerHTML = `
        <tr><td>Republicanos</td><td>${statistics.republicans.length}</td><td>${statistics.avg_votes_with_party_rep}%</td></tr>
        <tr><td>Demócratas</td><td>${statistics.democrats.length}</td><td>${statistics.avg_votes_with_party_dem}%</td></tr>
        <tr><td>Independientes</td><td>${statistics.independents.length}</td><td>${statistics.avg_votes_with_party_ind}%</td></tr>
    `;

    
    renderMemberTable('most-engaged-table', statistics.most_engaged, 'missed_votes', 'missed_votes_pct');
    renderMemberTable('least-engaged-table', statistics.least_engaged, 'missed_votes', 'missed_votes_pct');
}

function renderMemberTable(tableId, data, keyNum, keyPct) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    if (!tableBody) return;
    tableBody.innerHTML = data.map(m => `
        <tr>
            <td>${m.first_name} ${m.last_name}</td>
            <td>${m[keyNum]}</td>
            <td>${m[keyPct]}%</td>
        </tr>
    `).join('');
}