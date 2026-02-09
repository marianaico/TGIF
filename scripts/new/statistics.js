const statistics = {
    republicans: [],
    democrats: [],
    independents: [],
    avg_votes_with_party_rep: 0,
    avg_votes_with_party_dem: 0,
    avg_votes_with_party_ind: 0,
    least_engaged: [],
    most_engaged: [],
    least_loyal: [],
    most_loyal: []
};

function initStatistics(members) {
    
    statistics.republicans = members.filter(m => m.party === 'R');
    statistics.democrats = members.filter(m => m.party === 'D');
    statistics.independents = members.filter(m => m.party === 'I');

    // 2. Calcular promedios de votos con el partido
    statistics.avg_votes_with_party_rep = calculateAverage(statistics.republicans, 'votes_with_party_pct');
    statistics.avg_votes_with_party_dem = calculateAverage(statistics.democrats, 'votes_with_party_pct');
    statistics.avg_votes_with_party_ind = calculateAverage(statistics.independents, 'votes_with_party_pct');

    // 3. Rebanadas verticales: Top y Bottom 10%
    // Asistencia (basado en missed_votes_pct)
    statistics.least_engaged = getTopBottom(members, 'missed_votes_pct', 'top'); // Los que más faltan
    statistics.most_engaged = getTopBottom(members, 'missed_votes_pct', 'bottom'); // Los que menos faltan

    // Lealtad (basado en votes_with_party_pct)
    statistics.least_loyal = getTopBottom(members, 'votes_with_party_pct', 'bottom'); // Los que menos siguen al partido
    statistics.most_loyal = getTopBottom(members, 'votes_with_party_pct', 'top'); // Los que más siguen al partido
}

function calculateAverage(array, key) {
    if (array.length === 0) return 0;
    const sum = array.reduce((acc, curr) => acc + curr[key], 0);
    return (sum / array.length).toFixed(2);
}

function getTopBottom(members, key, type) {
    const sorted = [...members].sort((a, b) => type === 'top' ? b[key] - a[key] : a[key] - b[key]);
    const tenPercent = Math.round(members.length * 0.1);
    const result = sorted.slice(0, tenPercent);
    
    // Lógica para incluir empates en el límite del 10%
    const lastValue = result[result.length - 1][key];
    for (let i = tenPercent; i < sorted.length; i++) {
        if (sorted[i][key] === lastValue) result.push(sorted[i]);
        else break;
    }
    return result;
}

// Objeto que actúa como nuestro "Modelo"
export const statistics = {
    senate: {
        glance: [],
        leastEngaged: [],
        mostEngaged: [],
        leastLoyal: [],
        mostLoyal: []
    },
    house: {
        glance: [],
        leastEngaged: [],
        mostEngaged: [],
        leastLoyal: [],
        mostLoyal: []
    }
};

// Funciones de cálculo (Lógica de negocio)
export function calculateStats(members) {
    const filterByParty = (p) => members.filter(m => m.party === p);
    const avg = (arr) => arr.length ? (arr.reduce((acc, m) => acc + m.votes_with_party_pct, 0) / arr.length).toFixed(2) : 0;

    const stats = {
        glance: [
            { party: 'Demócratas', count: filterByParty('D').length, avgVotes: avg(filterByParty('D')) },
            { party: 'Republicanos', count: filterByParty('R').length, avgVotes: avg(filterByParty('R')) },
            { party: 'Independientes', count: filterByParty('I').length, avgVotes: avg(filterByParty('I')) },
            { party: 'Total', count: members.length, avgVotes: avg(members) }
        ],
        // 10% más faltas y 10% menos faltas
        leastEngaged: getTopBottom(members, 'missed_votes_pct', 'desc'),
        mostEngaged: getTopBottom(members, 'missed_votes_pct', 'asc'),
        // 10% menos leales y 10% más leales
        leastLoyal: getTopBottom(members, 'votes_with_party_pct', 'asc'),
        mostLoyal: getTopBottom(members, 'votes_with_party_pct', 'desc')
    };
    return stats;
}

function getTopBottom(members, key, order) {
    let sorted = [...members].sort((a, b) => order === 'desc' ? b[key] - a[key] : a[key] - b[key]);
    let limit = Math.round(members.length * 0.1);
    let result = sorted.slice(0, limit);

    // Incluir empates si el siguiente miembro tiene el mismo valor que el último del 10%
    for (let i = limit; i < sorted.length; i++) {
        if (sorted[i][key] === result[result.length - 1][key]) {
            result.push(sorted[i]);
        } else break;
    }
    return result;
}