const { Client } = require('pg');

const client = new Client({
  host: 'aws-1-us-east-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  user: 'postgres.uvyqqjluwmaycbidxiem',
  password: 'M@eeuteamo12',
  ssl: { rejectUnauthorized: false }
});

client.connect()
  .then(async () => {
    try {
      const res = await client.query('SELECT id, email FROM "Users" WHERE email = $1', ['admin@admin.com']);
      if (res.rows.length > 0) {
        console.log('USUARIO_ENCONTRADO:', res.rows[0].email);
      } else {
        console.log('USUARIO_NAO_ENCONTRADO');
        const allUsers = await client.query('SELECT email FROM "Users" LIMIT 5');
        console.log('ALGUNS_USUARIOS_EXISTENTES:', allUsers.rows.map(r => r.email));
      }
    } catch (e) {
      console.log('ERRO_AO_BUSCAR:', e.message);
    }
    client.end();
  });
