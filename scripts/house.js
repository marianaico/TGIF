let allMembers = [];

fetch("src/house-stats.json")
.then(res => res.json())
.then(data => {

    allMembers = data.results[0].members;

    populateStates(allMembers);
    renderMembers(allMembers);

    document.querySelectorAll(".party-filter").forEach(cb =>
        cb.addEventListener("change", applyFilters)
    );

    document.getElementById("state-filter")
        .addEventListener("change", applyFilters);
});


function populateStates(members) {

    const select = document.getElementById("state-filter");

    const states = [...new Set(members.map(m => m.state))].sort();

    states.forEach(state => {
        select.innerHTML += `<option value="${state}">${state}</option>`;
    });
}


function applyFilters() {

    const checkedParties = [...document.querySelectorAll(".party-filter:checked")]
        .map(cb => cb.value);

    const selectedState = document.getElementById("state-filter").value;

    let filtered = allMembers.filter(m =>
        checkedParties.includes(m.party)
    );

    if (selectedState !== "all") {
        filtered = filtered.filter(m => m.state === selectedState);
    }

    renderMembers(filtered);
}


function renderMembers(members) {

    const tbody = document.getElementById("members-table");
    tbody.innerHTML = "";

    members.forEach(m => {
        const name = `${m.first_name} ${m.last_name}`;

        tbody.innerHTML += `
            <tr>
                <td><a href="${m.url}" target="_blank">${name}</a></td>
                <td>${m.party}</td>
                <td>${m.state}</td>
                <td>${m.seniority}</td>
                <td>${m.votes_with_party_pct}%</td>
            </tr>
        `;
    });
}

