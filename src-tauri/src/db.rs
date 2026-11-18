use rusqlite::{Connection, Result};

pub fn init_local_db() -> Result<()> {
    let conn = Connection::open("finops_local_vault.db")?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS audit_snapshots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            scanned_at TEXT NOT NULL,
            total_monthly_spend REAL NOT NULL,
            total_monthly_waste REAL NOT NULL,
            payload_json TEXT NOT NULL
        )",
        [],
    )?;
    Ok(())
}
