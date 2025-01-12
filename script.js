document.getElementById('fraudForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const date = document.getElementById('date').value;
    const amount = document.getElementById('amount').value;

    const isFraud = knn({ date, amount });
    console.log("isFraud: " + isFraud)

    //const data = await response.json();
    const resultField = document.getElementById('result');
    if (isFraud) {
        resultField.innerText = "\uD83D\uDEA8 Transaction is Fraudulent!";
        resultField.style.color = 'red';
    } else {
        resultField.innerText = "\u2705 Transaction is Safe.";
        resultField.style.color = 'green';
    }
});

// Simulated historical transactions
let transactionHistory = [
    { date: 1, amount: 100, isFraud: false },
    { date: 2, amount: 200, isFraud: false },
    { date: 3, amount: 300, isFraud: false },
    { date: 4, amount: 400, isFraud: false },
    { date: 5, amount: 500, isFraud: false },
    { date: 25, amount: 10000, isFraud: true },
    { date: 26, amount: 20000, isFraud: true },
    { date: 27, amount: 30000, isFraud: true },
    { date: 28, amount: 40000, isFraud: true },
    { date: 29, amount: 50000, isFraud: true },
];

// Helper function to calculate Euclidean distance
function calculateDistance(transaction1, transaction2) {
    // Example: Using only "amount" as a feature
    return Math.sqrt(Math.pow(transaction1.amount - transaction2.amount, 2));
}

// KNN Algorithm Implementation
function knn(newTransaction, k = 3) {

    // Calculate distances from the new transaction to all historical transactions
    const distances = transactionHistory.map((transaction) => ({
        ...transaction,
        distance: calculateDistance(newTransaction, transaction),
    }));

    // Sort by distance (ascending order)
    distances.sort((a, b) => a.distance - b.distance);
    console.log("distances: " + JSON.stringify(distances))

    // Select the top `k` neighbors
    const neighbors = distances.slice(0, k);

    // Majority voting to determine fraud status
    const fraudVotes = neighbors.filter((neighbor) => neighbor.isFraud).length;
    const nonFraudVotes = k - fraudVotes;

    return fraudVotes > nonFraudVotes; // Return true if more votes are for fraud
}
