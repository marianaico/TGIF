// Lista de estados y territorios de EE.UU.
export const states = [
  { name: "Alabama", abbreviation: "AL" },
  { name: "Alaska", abbreviation: "AK" },
  { name: "American Samoa", abbreviation: "AS" },
  { name: "Arizona", abbreviation: "AZ" },
  { name: "Arkansas", abbreviation: "AR" },
  { name: "California", abbreviation: "CA" },
  { name: "Colorado", abbreviation: "CO" },
  { name: "Connecticut", abbreviation: "CT" },
  { name: "Delaware", abbreviation: "DE" },
  { name: "District Of Columbia", abbreviation: "DC" },
  { name: "Florida", abbreviation: "FL" },
  { name: "Georgia", abbreviation: "GA" },
  { name: "Guam", abbreviation: "GU" },
  { name: "Hawaii", abbreviation: "HI" },
  { name: "Idaho", abbreviation: "ID" },
  { name: "Illinois", abbreviation: "IL" },
  { name: "Indiana", abbreviation: "IN" },
  { name: "Iowa", abbreviation: "IA" },
  { name: "Kansas", abbreviation: "KS" },
  { name: "Kentucky", abbreviation: "KY" },
  { name: "Louisiana", abbreviation: "LA" },
  { name: "Maine", abbreviation: "ME" },
  { name: "Maryland", abbreviation: "MD" },
  { name: "Massachusetts", abbreviation: "MA" },
  { name: "Michigan", abbreviation: "MI" },
  { name: "Minnesota", abbreviation: "MN" },
  { name: "Mississippi", abbreviation: "MS" },
  { name: "Missouri", abbreviation: "MO" },
  { name: "Montana", abbreviation: "MT" },
  { name: "Nebraska", abbreviation: "NE" },
  { name: "Nevada", abbreviation: "NV" },
  { name: "New Hampshire", abbreviation: "NH" },
  { name: "New Jersey", abbreviation: "NJ" },
  { name: "New Mexico", abbreviation: "NM" },
  { name: "New York", abbreviation: "NY" },
  { name: "North Carolina", abbreviation: "NC" },
  { name: "North Dakota", abbreviation: "ND" },
  { name: "Ohio", abbreviation: "OH" },
  { name: "Oklahoma", abbreviation: "OK" },
  { name: "Oregon", abbreviation: "OR" },
  { name: "Pennsylvania", abbreviation: "PA" },
  { name: "Rhode Island", abbreviation: "RI" },
  { name: "South Carolina", abbreviation: "SC" },
  { name: "South Dakota", abbreviation: "SD" },
  { name: "Tennessee", abbreviation: "TN" },
  { name: "Texas", abbreviation: "TX" },
  { name: "Utah", abbreviation: "UT" },
  { name: "Vermont", abbreviation: "VT" },
  { name: "Virginia", abbreviation: "VA" },
  { name: "Washington", abbreviation: "WA" },
  { name: "West Virginia", abbreviation: "WV" },
  { name: "Wisconsin", abbreviation: "WI" },
  { name: "Wyoming", abbreviation: "WY" }
];

// Partidos políticos
export const parties = {
  D: "Democrat",
  R: "Republican",
  ID: "Independent"
};

// Función para traer un archivo JSON y devolver una promesa con los datos
export function fetchJson(url) {
  return fetch(url).then(response => response.json());
}

// Genera las filas de la tabla filtrando por partido y estado
export function makeMemberRows(data, selectedParties, selectedState) {
  const members = data.results[0].members;
  let html = "";

  members.forEach(member => {
    if (!selectedParties.includes(member.party)) return;
    if (selectedState && member.state !== selectedState) return;

    // VALIDACIÓN 1: Nombre completo
    const name = `${member.first_name} ${member.middle_name || ""} ${member.last_name}`;

    // VALIDACIÓN 2: Si no hay URL, solo mostrar texto. Si hay URL, mostrar enlace.
    const nameCell = member.url
      ? `<a href="${member.url}" target="_blank">${name}</a>`
      : name;

    // VALIDACIÓN 3: Si el % de votos es null, mostrar "N/A"
    const votesPct = member.votes_with_party_pct 
      ? member.votes_with_party_pct.toFixed(0) + "%" 
      : "N/A";

    html += `
      <tr>
        <td>${nameCell}</td>
        <td>${member.party}</td>
        <td>${member.state}</td>
        <td>${member.seniority}</td>
        <td>${votesPct}</td> 
      </tr>
    `;
  });

  return html;
}

// Genera el HTML del menú desplegable de estados
export function makeStatesMenu() {
  let html = `<option value="">Select a state</option>`;

  states.forEach(state => {
    html += `
      <option value="${state.abbreviation}">
        ${state.name}
      </option>
    `;
  });

  return html;
}
