document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);
    const chamber = params.get("chamber") || "senate";

    try {

        const response = await fetch(`src/${chamber}-stats.json`);
        const data = await response.json();

        // ⭐ ESTA ES LA LÍNEA CLAVE
        const members = data.results[0].members;

        renderMembers(members);

    } catch (error) {
        console.error("ERROR loading members:", error);
    }

});


function renderMembers(members) {

    const tbody = document.getElementById("members-table");
    tbody.innerHTML = "";

    members.forEach(member => {

        const name = `
            ${member.first_name}
            ${member.middle_name || ""}
            ${member.last_name}
        `;

        tbody.innerHTML += `
            <tr>
                <td>
                    <a href="${member.url}" target="_blank">${name}</a>
                </td>
                <td>${member.party}</td>
                <td>${member.state}</td>
                <td>${member.seniority}</td>
                <td>${member.votes_with_party_pct}%</td>
            </tr>
        `;
    });

}


