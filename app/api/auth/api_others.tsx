import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

// Initialize the database connection pool
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PGPASSWORD,
  port: Number(process.env.PORT),
});

// API handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  console.log('Fetching uploads data'); // Log to check if API is called

  try {
    const query = `
      WITH t AS (
        SELECT email, filename, timestamp 
        FROM trueprice.uploads 
        ORDER BY timestamp DESC 
        LIMIT 10
      )
      SELECT email, filename, timestamp FROM t ORDER BY timestamp ASC;
    `;
    
    const result = await pool.query(query);
    console.log(result)
    res.status(200).json(result.rows);  // Return the query result as JSON
  } catch (error) {
    console.error('Error fetching uploads:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
