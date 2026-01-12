
import Place from '@/models/Place';
import mongoose from 'mongoose';

// Force Mongoose to use the global promise
mongoose.Promise = global.Promise;

async function migrate() {
  console.log('Starting migration...');
  
  // Connect directly if the lib helper doesn't behave as a script expects (often nextjs libs rely on env vars loaded by next)
  // But we can try using the lib if we load dotenv.
  if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is not set. Run with `dotenv -e .env.local -- npx tsx scripts/migrate-location.ts`");
      process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');

  try {
      // 1. Update all documents that have geometry but no location
      const cursor = Place.find({ 
          'geometry.location.lat': { $exists: true },
          location: { $exists: false }
      }).cursor();

      let count = 0;
      for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
          const lat = doc.geometry?.location?.lat;
          const lng = doc.geometry?.location?.lng;

          if (lat && lng) {
              doc.location = {
                  type: 'Point',
                  coordinates: [lng, lat]
              };
              await doc.save();
              count++;
              if (count % 100 === 0) console.log(`Processed ${count} docs...`);
          }
      }
      console.log(`Migration complete. Updated ${count} documents.`);

      // 2. Ensure Index
      console.log('Creating indexes...');
      await Place.createIndexes();
      console.log('Indexes created successfully.');

  } catch (e) {
      console.error('Migration failed:', e);
  } finally {
      await mongoose.disconnect();
      console.log('Disconnected');
      process.exit(0);
  }
}

migrate();
