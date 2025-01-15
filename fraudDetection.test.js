// fraudDetection.test.js
const { calculateDistance, knn } = require('./script.js'); // Adjust path as needed

describe('Fraud Detection Tests', () => {
    // Mock transaction history
    const mockTransactionHistory = [
        { date: 1, amount: 100, isFraud: false },
        { date: 25, amount: 10000, isFraud: true },
        { date: 4, amount: 300, isFraud: false },
        { date: 27, amount: 40000, isFraud: true }
    ];

    test('calculateDistance: should return correct Euclidean distance', () => {
        const transaction1 = { amount: 100 };
        const transaction2 = { amount: 300 };
        const distance = calculateDistance(transaction1, transaction2);
        expect(distance).toBe(200); // |300 - 100| = 200
    });

    test('knn: should detect fraudulent transaction correctly', () => {
        const newTransaction = { date: 27, amount: 40000 };
        const isFraud = knn(newTransaction, 3); // k = 3
        expect(isFraud).toBe(true);
    });

    test('knn: should detect safe transaction correctly', () => {
        const newTransaction = { date: 4, amount: 300 };
        const isFraud = knn(newTransaction, 3); // k = 3
        expect(isFraud).toBe(false);
    });

    test('knn: should handle edge case with equal fraud and non-fraud votes', () => {
        const newTransaction = { date: 1, amount: 200 };
        // Create a scenario where fraud and non-fraud votes tie
        const extendedHistory = [
            ...mockTransactionHistory,
            { date: 2, amount: 300, isFraud: false },
            { date: 26, amount: 50000, isFraud: true }
        ];
        const isFraud = knn(newTransaction, 4); // k = 4
        expect(isFraud).toBe(false); // Tied vote, expected to favor non-fraud
    });

    test('knn: should return false for empty transaction history', () => {
        const newTransaction = { date: 10, amount: 500 };
        const isFraud = knn(newTransaction, 3, []); // Empty history
        expect(isFraud).toBe(false);
    });
});
