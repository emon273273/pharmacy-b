import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SeedService } from '../src/seed/seed.service';

async function main() {
    // 1. Create a minimal application context (no web server started)
    const app = await NestFactory.createApplicationContext(AppModule);

    // 2. Get the SeedService from the NestJS container
    const seeder = app.get(SeedService);

    try {
        console.log('🚀 Starting seed via NestJS context...');
        await seeder.runAllSeeds();
        console.log('✅ Seed process finished successfully.');
    } catch (error) {
        console.error('❌ Seed process failed:');
        console.error(error);
        process.exit(1);
    } finally {
        // 3. Always close the app to release DB connections
        await app.close();
        process.exit(0);
    }
}

main();