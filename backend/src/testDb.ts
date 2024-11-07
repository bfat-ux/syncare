import { AppDataSource } from "./config/database";

const testConnection = async () => {
    try {
        await AppDataSource.initialize();
        console.log("✅ Database connection successful!");
        
        // Test a simple query
        const result = await AppDataSource.query('SELECT NOW()');
        console.log("Database time:", result);
        
        await AppDataSource.destroy();
        process.exit(0);
    } catch (error) {
        console.error("❌ Database connection failed:", error);
        process.exit(1);
    }
};

testConnection();